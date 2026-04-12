import { getDb, isAdminEmail, setCorsHeaders } from '../_db.js'

export default async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email, name, pin } = req.body || {}
  if (!email || !name || !pin) {
    return res.status(400).json({ error: 'Email, name, and PIN are required' })
  }
  if (!/^\d{4}$/.test(String(pin))) {
    return res.status(400).json({ error: 'PIN must be exactly 4 digits' })
  }

  const normalised = email.toLowerCase().trim()
  const trimmedName = name.trim()
  const sql = getDb()
  const role = isAdminEmail(normalised) ? 'admin' : 'booker'

  if (role === 'admin') {
    // Upsert the admin user record
    await sql`
      INSERT INTO users (email, name, pin, role)
      VALUES (${normalised}, ${trimmedName}, ${String(pin)}, 'admin')
      ON CONFLICT (email)
      DO UPDATE SET name = ${trimmedName}, pin = ${String(pin)}, role = 'admin'
    `
  } else {
    // Only allow setup if the email already exists in the users table (added by admin)
    const [existing] = await sql`
      SELECT id, pin FROM users WHERE email = ${normalised} AND role = 'booker'
    `
    if (!existing) {
      return res.status(403).json({ error: 'This email has not been granted access' })
    }
    if (existing.pin) {
      return res.status(400).json({ error: 'Account already set up. Contact an admin to reset your PIN.' })
    }
    await sql`
      UPDATE users SET name = ${trimmedName}, pin = ${String(pin)}
      WHERE email = ${normalised}
    `
  }

  return res.json({ user: { email: normalised, name: trimmedName, role } })
}
