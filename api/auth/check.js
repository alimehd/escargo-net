const { getDb, isAdminEmail, setCorsHeaders } = require('../_db')

module.exports = async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email } = req.body || {}
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' })
  }

  const normalised = email.toLowerCase().trim()
  const sql = getDb()

  if (isAdminEmail(normalised)) {
    const rows = await sql`SELECT pin FROM users WHERE email = ${normalised}`
    return res.json({ userType: 'admin', setupComplete: !!(rows[0] && rows[0].pin) })
  }

  const rows = await sql`
    SELECT pin FROM users WHERE email = ${normalised} AND role = 'booker'
  `

  if (rows.length) {
    return res.json({ userType: 'booker', setupComplete: !!(rows[0].pin) })
  }

  return res.json({ userType: 'unknown' })
}
