const { getDb, isAdminEmail, setCorsHeaders } = require('./_db')

module.exports = async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, name } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Email is required' })

  const normalised = email.toLowerCase().trim()

  if (isAdminEmail(normalised)) {
    return res.status(400).json({ error: 'This email is already an admin account' })
  }

  const sql = getDb()

  const existing = await sql`SELECT id FROM users WHERE email = ${normalised}`
  if (existing.length) {
    return res.status(400).json({ error: 'This email already has access' })
  }

  const pending = await sql`
    SELECT id FROM access_requests
    WHERE email = ${normalised} AND status = 'pending'
  `
  if (pending.length) {
    return res.json({ ok: true, message: 'A request is already pending for this email' })
  }

  await sql`
    INSERT INTO access_requests (email, name)
    VALUES (${normalised}, ${(name || '').trim() || null})
  `

  return res.status(201).json({ ok: true })
}
