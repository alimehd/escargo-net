import { getDb, setCorsHeaders, verifyAuth } from '../_db.js'

export default async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = getDb()
  const user = await verifyAuth(req, sql)
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }

  // ── GET: list permitted users ────────────────────────────────────────────
  if (req.method === 'GET') {
    const users = await sql`
      SELECT id, email, name, role, pin,
             CASE WHEN pin IS NOT NULL THEN true ELSE false END AS setup_complete,
             created_at
      FROM users
      ORDER BY created_at DESC
    `
    return res.json({ users })
  }

  // ── POST: add a permitted user ───────────────────────────────────────────
  if (req.method === 'POST') {
    const { email } = req.body || {}
    if (!email) return res.status(400).json({ error: 'Email is required' })

    const normalised = email.toLowerCase().trim()

    const [existing] = await sql`SELECT id FROM users WHERE email = ${normalised}`
    if (existing) {
      return res.status(409).json({ error: 'This email is already in the system' })
    }

    const [created] = await sql`
      INSERT INTO users (email, role)
      VALUES (${normalised}, 'booker')
      RETURNING id, email, role, created_at
    `
    return res.status(201).json({ user: created })
  }

  // ── DELETE: remove a permitted user ─────────────────────────────────────
  if (req.method === 'DELETE') {
    const { email } = req.body || {}
    if (!email) return res.status(400).json({ error: 'Email is required' })

    const normalised = email.toLowerCase().trim()
    await sql`DELETE FROM users WHERE email = ${normalised} AND role = 'booker'`
    return res.json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
