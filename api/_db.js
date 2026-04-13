const { neon } = require('@neondatabase/serverless')

function getDb() {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL environment variable is not set')
  }
  return neon(process.env.NEON_DATABASE_URL)
}

function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean)
}

function isAdminEmail(email) {
  return getAdminEmails().includes(email.toLowerCase().trim())
}

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,x-auth-email,x-auth-pin')
}

async function verifyAuth(req, sql) {
  const email = (req.headers['x-auth-email'] || '').toLowerCase().trim()
  const pin   = (req.headers['x-auth-pin'] || '').trim()
  if (!email || !pin) return null

  if (isAdminEmail(email)) {
    const rows = await sql`
      SELECT id, email, name, role, pin
      FROM users WHERE email = ${email} AND pin = ${pin}
    `
    if (rows.length) return { ...rows[0], role: 'admin' }
    return null
  }

  const rows = await sql`
    SELECT id, email, name, role, pin
    FROM users WHERE email = ${email} AND pin = ${pin} AND role = 'booker'
  `
  return rows.length ? rows[0] : null
}

module.exports = { getDb, getAdminEmails, isAdminEmail, setCorsHeaders, verifyAuth }
