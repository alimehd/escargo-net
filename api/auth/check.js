import { getDb, isAdminEmail, setCorsHeaders } from '../_db.js'

export default async function handler(req, res) {
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
    const [user] = await sql`
      SELECT pin FROM users WHERE email = ${normalised}
    `
    return res.json({ userType: 'admin', setupComplete: !!(user?.pin) })
  }

  const [user] = await sql`
    SELECT pin FROM users WHERE email = ${normalised} AND role = 'booker'
  `

  if (user) {
    return res.json({ userType: 'booker', setupComplete: !!(user.pin) })
  }

  return res.json({ userType: 'unknown' })
}
