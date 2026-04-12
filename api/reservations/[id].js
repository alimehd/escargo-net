import { getDb, setCorsHeaders, verifyAuth } from '../_db.js'

export default async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = getDb()
  const user = await verifyAuth(req, sql)
  if (!user) return res.status(401).json({ error: 'Unauthorised' })

  const id = parseInt(req.query.id, 10)
  if (!id) return res.status(400).json({ error: 'Invalid reservation ID' })

  const [existing] = await sql`SELECT * FROM reservations WHERE id = ${id}`
  if (!existing) return res.status(404).json({ error: 'Reservation not found' })

  const isOwner = existing.user_email === user.email
  const isAdmin = user.role === 'admin'
  if (!isOwner && !isAdmin) return res.status(403).json({ error: 'Forbidden' })

  // ── PUT: update reservation ──────────────────────────────────────────────
  if (req.method === 'PUT') {
    const { spotType, spotNumber, startDate, endDate, notes, isPublic } = req.body || {}

    if (!spotType || !spotNumber || !startDate || !endDate) {
      return res.status(400).json({ error: 'spotType, spotNumber, startDate, and endDate are required' })
    }
    if (!['bed', 'camp'].includes(spotType)) {
      return res.status(400).json({ error: 'spotType must be "bed" or "camp"' })
    }
    const num = parseInt(spotNumber, 10)
    if (num < 1 || num > 6) {
      return res.status(400).json({ error: 'spotNumber must be between 1 and 6' })
    }
    if (new Date(startDate) > new Date(endDate)) {
      return res.status(400).json({ error: 'End date must be on or after start date' })
    }

    const [conflict] = await sql`
      SELECT id FROM reservations
      WHERE spot_type = ${spotType}
        AND spot_number = ${num}
        AND start_date <= ${endDate}
        AND end_date   >= ${startDate}
        AND id != ${id}
    `
    if (conflict) {
      return res.status(409).json({ error: 'That spot is already reserved for part or all of the selected dates' })
    }

    const [updated] = await sql`
      UPDATE reservations
      SET spot_type   = ${spotType},
          spot_number = ${num},
          start_date  = ${startDate},
          end_date    = ${endDate},
          notes       = ${notes || null},
          is_public   = ${!!isPublic}
      WHERE id = ${id}
      RETURNING *
    `
    return res.json({ reservation: updated })
  }

  // ── DELETE: remove reservation ───────────────────────────────────────────
  if (req.method === 'DELETE') {
    await sql`DELETE FROM reservations WHERE id = ${id}`
    return res.json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
