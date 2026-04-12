import { getDb, isAdminEmail, setCorsHeaders } from '../_db.js'

export default async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, pin } = req.body || {}
  if (!email || !pin) {
    return res.status(400).json({ error: 'Email and PIN are required' })
  }

  const normalised = email.toLowerCase().trim()
  const pinStr = String(pin).trim()
  const sql = getDb()

  const [user] = await sql`
    SELECT id, email, name, role, pin
    FROM users
    WHERE email = ${normalised} AND pin = ${pinStr}
  `

  if (!user) {
    return res.status(401).json({ error: 'Incorrect PIN' })
  }

  const role = isAdminEmail(normalised) ? 'admin' : user.role
  return res.json({ user: { email: user.email, name: user.name, role } })
}
