const { getDb, setCorsHeaders, verifyAuth } = require('../_db')

module.exports = async function handler(req, res) {
  setCorsHeaders(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  const sql = getDb()
  const user = await verifyAuth(req, sql)
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' })
  }

  // ── GET: list all access requests ────────────────────────────────────────
  if (req.method === 'GET') {
    const requests = await sql`
      SELECT * FROM access_requests ORDER BY created_at DESC
    `
    return res.json({ requests })
  }

  // ── PUT: approve or deny a request ───────────────────────────────────────
  if (req.method === 'PUT') {
    const { id, status } = req.body || {}
    if (!id || !status) return res.status(400).json({ error: 'id and status are required' })
    if (!['approved', 'denied'].includes(status)) {
      return res.status(400).json({ error: 'status must be "approved" or "denied"' })
    }

    const rows = await sql`
      UPDATE access_requests SET status = ${status} WHERE id = ${id} RETURNING *
    `
    if (!rows.length) return res.status(404).json({ error: 'Request not found' })

    if (status === 'approved') {
      const existing = await sql`SELECT id FROM users WHERE email = ${rows[0].email}`
      if (!existing.length) {
        await sql`
          INSERT INTO users (email, role) VALUES (${rows[0].email}, 'booker')
          ON CONFLICT (email) DO NOTHING
        `
      }
    }

    return res.json({ request: rows[0] })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
