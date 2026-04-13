const { getDb, setCorsHeaders, verifyAuth } = require('../_db')

module.exports = async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = getDb()
  const user = await verifyAuth(req, sql)
  if (!user) return res.status(401).json({ error: 'Unauthorised' })

  // ── GET: list reservations ───────────────────────────────────────────────
  if (req.method === 'GET') {
    const reservations = user.role === 'admin'
      ? await sql`SELECT * FROM reservations ORDER BY start_date, spot_type, spot_number`
      : await sql`
          SELECT * FROM reservations
          WHERE is_public = true OR user_email = ${user.email}
          ORDER BY start_date, spot_type, spot_number
        `
    return res.json({ reservations })
  }

  // ── POST: create reservation ─────────────────────────────────────────────
  if (req.method === 'POST') {
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

    const conflicts = await sql`
      SELECT id FROM reservations
      WHERE spot_type = ${spotType}
        AND spot_number = ${num}
        AND start_date <= ${endDate}
        AND end_date   >= ${startDate}
    `
    if (conflicts.length) {
      return res.status(409).json({ error: 'That spot is already reserved for part or all of the selected dates' })
    }

    const rows = await sql`
      INSERT INTO reservations
        (user_email, user_name, spot_type, spot_number, start_date, end_date, notes, is_public)
      VALUES
        (${user.email}, ${user.name}, ${spotType}, ${num}, ${startDate}, ${endDate},
         ${notes || null}, ${!!isPublic})
      RETURNING *
    `
    return res.status(201).json({ reservation: rows[0] })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
