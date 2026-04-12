import { neon } from '@neondatabase/serverless'

export function getDb() {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL environment variable is not set')
  }
  return neon(process.env.NEON_DATABASE_URL)
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

export function isAdminEmail(email) {
  return getAdminEmails().includes(email.toLowerCase().trim())
}

export function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-auth-email,x-auth-pin')
}

export async function verifyAuth(req, sql) {
  const email = (req.headers['x-auth-email'] || '').toLowerCase().trim()
  const pin   = (req.headers['x-auth-pin'] || '').trim()
  if (!email || !pin) return null

  if (isAdminEmail(email)) {
    const [user] = await sql`
      SELECT id, email, name, role, pin
      FROM users WHERE email = ${email} AND pin = ${pin}
    `
    if (user) return { ...user, role: 'admin' }
    return null
  }

  const [user] = await sql`
    SELECT id, email, name, role, pin
    FROM users WHERE email = ${email} AND pin = ${pin} AND role = 'booker'
  `
  return user || null
}
