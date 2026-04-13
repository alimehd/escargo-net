import { useState, useEffect, useCallback } from 'react'
import logo from '../../LOGO.png'
import './ReservationsPage.css'

// ── Constants ──────────────────────────────────────────────────────────────

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

const SPOT_LETTERS  = ['A','B','C','D','E','F']
const SPOT_NUMBERS  = [1, 2, 3, 4, 5, 6]

function spotLabel(num) { return SPOT_LETTERS[num - 1] ?? num }

// ── Auth helpers ───────────────────────────────────────────────────────────

function getStoredAuth() {
  try { return JSON.parse(localStorage.getItem('escargo_auth') || 'null') }
  catch { return null }
}
function saveAuth(data)  { localStorage.setItem('escargo_auth', JSON.stringify(data)) }
function clearAuth()     { localStorage.removeItem('escargo_auth') }

// ── Fetch wrapper ──────────────────────────────────────────────────────────

async function apiFetch(path, opts = {}, auth = null) {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (auth) {
    headers['x-auth-email'] = auth.email
    headers['x-auth-pin']   = auth.pin
  }
  const res  = await fetch(`/api${path}`, { ...opts, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// ── Date utilities ─────────────────────────────────────────────────────────

function daysInMonth(year, month) { return new Date(year, month + 1, 0).getDate() }

function isoDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function parseLocalDate(str) {
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function formatDisplayDate(str) {
  if (!str) return ''
  return parseLocalDate(str.substring(0, 10))
    .toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' })
}

function addMonths(year, month, n) {
  const d = new Date(year, month + n, 1)
  return { year: d.getFullYear(), month: d.getMonth() }
}

// ── Main page component ────────────────────────────────────────────────────

export default function ReservationsPage() {
  const [auth,        setAuth]        = useState(getStoredAuth)
  const [flow,        setFlow]        = useState('email')
  const [emailInput,  setEmailInput]  = useState('')
  const [pinInput,    setPinInput]    = useState('')
  const [nameInput,   setNameInput]   = useState('')
  const [pinConfirm,  setPinConfirm]  = useState('')
  const [userMeta,    setUserMeta]    = useState(null)
  const [error,       setError]       = useState('')
  const [loading,     setLoading]     = useState(false)

  // Calendar navigation
  const today = new Date()
  const [calYear,  setCalYear]  = useState(today.getFullYear())
  const [calMonth, setCalMonth] = useState(today.getMonth())
  const [calSpan,  setCalSpan]  = useState(1)   // 1 or 3 months

  // Click-to-select state
  const [selecting,  setSelecting]  = useState(null)  // {spotType, spotNumber, date}
  const [hoverDate,  setHoverDate]  = useState(null)  // iso date string

  // Data
  const [reservations, setReservations] = useState([])
  const [resLoading,   setResLoading]   = useState(false)
  const [tab,          setTab]          = useState('calendar')

  // Booking form
  const [showForm,  setShowForm]  = useState(false)
  const [editId,    setEditId]    = useState(null)
  const [formData,  setFormData]  = useState({
    spotType: 'bed', spotNumber: 1, startDate: '', endDate: '', notes: '', isPublic: false,
  })
  const [formError, setFormError] = useState('')

  // Admin
  const [users,        setUsers]        = useState([])
  const [requests,     setRequests]     = useState([])
  const [newUserEmail, setNewUserEmail] = useState('')
  const [adminError,   setAdminError]   = useState('')

  // Unknown visitor access request
  const [reqName,      setReqName]      = useState('')
  const [reqSubmitted, setReqSubmitted] = useState(false)

  const isAdmin    = auth?.role === 'admin'
  const isLoggedIn = !!auth

  // ── Data loading ──────────────────────────────────────────────────────────

  const loadReservations = useCallback(async (currentAuth) => {
    const a = currentAuth || auth
    if (!a) return
    setResLoading(true)
    try {
      const data = await apiFetch('/reservations', {}, a)
      setReservations(data.reservations || [])
    } catch (e) { console.error(e) }
    finally { setResLoading(false) }
  }, [auth])

  const loadAdminData = useCallback(async () => {
    if (!auth || auth.role !== 'admin') return
    try {
      const [uData, rData] = await Promise.all([
        apiFetch('/admin/users', {}, auth),
        apiFetch('/admin/requests', {}, auth),
      ])
      setUsers(uData.users || [])
      setRequests(rData.requests || [])
    } catch (e) { setAdminError(e.message) }
  }, [auth])

  useEffect(() => {
    if (auth) { setFlow('ready'); loadReservations(auth) }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (isAdmin && tab === 'admin') loadAdminData()
  }, [isAdmin, tab, loadAdminData])

  // ── Auth handlers ─────────────────────────────────────────────────────────

  async function handleEmailSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const data = await apiFetch('/auth/check', {
        method: 'POST', body: JSON.stringify({ email: emailInput.trim() }),
      })
      setUserMeta({ email: emailInput.trim().toLowerCase(), ...data })
      setFlow(data.userType === 'unknown' ? 'unknown' : data.setupComplete ? 'pin' : 'setup')
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function handlePinSubmit(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const data = await apiFetch('/auth/verify', {
        method: 'POST', body: JSON.stringify({ email: userMeta.email, pin: pinInput }),
      })
      const authData = { email: userMeta.email, pin: pinInput, ...data.user }
      saveAuth(authData); setAuth(authData); setFlow('ready'); loadReservations(authData)
    } catch (e) { setError(e.message); setPinInput('') }
    finally { setLoading(false) }
  }

  async function handleSetupSubmit(e) {
    e.preventDefault(); setError('')
    if (!/^\d{4}$/.test(pinInput)) { setError('PIN must be exactly 4 digits'); return }
    if (pinInput !== pinConfirm)   { setError('PINs do not match'); return }
    setLoading(true)
    try {
      const data = await apiFetch('/auth/setup', {
        method: 'POST',
        body: JSON.stringify({ email: userMeta.email, name: nameInput.trim(), pin: pinInput }),
      })
      const authData = { email: userMeta.email, pin: pinInput, ...data.user }
      saveAuth(authData); setAuth(authData); setFlow('ready'); loadReservations(authData)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  async function handleAccessRequest(e) {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await apiFetch('/access-request', {
        method: 'POST', body: JSON.stringify({ email: userMeta.email, name: reqName.trim() }),
      })
      setReqSubmitted(true)
    } catch (e) { setError(e.message) }
    finally { setLoading(false) }
  }

  function handleLogout() {
    clearAuth(); setAuth(null); setFlow('email')
    setEmailInput(''); setPinInput(''); setNameInput(''); setPinConfirm('')
    setUserMeta(null); setError(''); setReservations([])
    setTab('calendar'); setSelecting(null)
  }

  // ── Calendar month navigation ─────────────────────────────────────────────

  function prevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1) }
    else setCalMonth(m => m - 1)
  }
  function nextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1) }
    else setCalMonth(m => m + 1)
  }

  // ── Click-to-select date range ────────────────────────────────────────────

  function handleCellClick(spotType, spotNumber, year, month, day) {
    const r = cellReservation(spotType, spotNumber, year, month, day)
    const date = isoDate(new Date(year, month, day))

    // Click on existing reservation: open edit if owner or admin
    if (r) {
      if (r.user_email === auth.email || isAdmin) openEditBooking(r)
      return
    }

    // Empty cell — two-click selection
    if (!selecting) {
      setSelecting({ spotType, spotNumber, date })
      return
    }

    // Same spot: complete selection
    if (selecting.spotType === spotType && selecting.spotNumber === spotNumber) {
      const start = selecting.date <= date ? selecting.date : date
      const end   = selecting.date <= date ? date : selecting.date
      setSelecting(null)
      setHoverDate(null)
      openNewBooking(spotType, spotNumber, start, end)
      return
    }

    // Different spot: restart selection on new spot
    setSelecting({ spotType, spotNumber, date })
  }

  function handleCellHover(spotType, spotNumber, year, month, day) {
    if (!selecting) return
    setHoverDate(isoDate(new Date(year, month, day)))
  }

  function cancelSelection() { setSelecting(null); setHoverDate(null) }

  // ── Booking form ──────────────────────────────────────────────────────────

  function openNewBooking(spotType = 'bed', spotNumber = 1, startDate = '', endDate = '') {
    setFormData({ spotType, spotNumber, startDate, endDate, notes: '', isPublic: false })
    setEditId(null); setFormError(''); setShowForm(true)
  }

  function openEditBooking(r) {
    setFormData({
      spotType:   r.spot_type,
      spotNumber: r.spot_number,
      startDate:  r.start_date.substring(0, 10),
      endDate:    r.end_date.substring(0, 10),
      notes:      r.notes || '',
      isPublic:   r.is_public,
    })
    setEditId(r.id); setFormError(''); setShowForm(true)
  }

  async function handleFormSubmit(e) {
    e.preventDefault(); setFormError(''); setLoading(true)
    try {
      if (editId) {
        await apiFetch(`/reservations/${editId}`, { method: 'PUT', body: JSON.stringify(formData) }, auth)
      } else {
        await apiFetch('/reservations', { method: 'POST', body: JSON.stringify(formData) }, auth)
      }
      setShowForm(false); setEditId(null)
      await loadReservations()
    } catch (e) { setFormError(e.message) }
    finally { setLoading(false) }
  }

  async function handleDeleteReservation(id) {
    if (!window.confirm('Delete this reservation?')) return
    try {
      await apiFetch(`/reservations/${id}`, { method: 'DELETE' }, auth)
      await loadReservations()
    } catch (e) { setError(e.message) }
  }

  // ── Admin handlers ────────────────────────────────────────────────────────

  async function handleAddUser(e) {
    e.preventDefault(); setAdminError('')
    if (!newUserEmail.trim()) return
    try {
      await apiFetch('/admin/users', { method: 'POST', body: JSON.stringify({ email: newUserEmail.trim() }) }, auth)
      setNewUserEmail(''); await loadAdminData()
    } catch (e) { setAdminError(e.message) }
  }

  async function handleRemoveUser(email) {
    if (!window.confirm(`Remove ${email}?`)) return
    try {
      await apiFetch('/admin/users', { method: 'DELETE', body: JSON.stringify({ email }) }, auth)
      await loadAdminData()
    } catch (e) { setAdminError(e.message) }
  }

  async function handleUpdateRequest(id, status) {
    try {
      await apiFetch('/admin/requests', { method: 'PUT', body: JSON.stringify({ id, status }) }, auth)
      await loadAdminData()
    } catch (e) { setAdminError(e.message) }
  }

  // ── Calendar cell helpers ─────────────────────────────────────────────────

  function cellReservation(spotType, spotNumber, year, month, day) {
    const cell = new Date(year, month, day)
    return reservations.find(r => {
      if (r.spot_type !== spotType || r.spot_number !== spotNumber) return false
      const s = parseLocalDate(r.start_date.substring(0, 10))
      const e = parseLocalDate(r.end_date.substring(0, 10))
      return cell >= s && cell <= e
    }) || null
  }

  function cellClass(r, spotType, spotNumber, year, month, day) {
    const date = isoDate(new Date(year, month, day))
    const isSameSpot = selecting &&
      selecting.spotType === spotType && selecting.spotNumber === spotNumber

    if (isSameSpot && date === selecting.date) return 'rscal__cell rscal__cell--start'

    if (isSameSpot && hoverDate && selecting) {
      const lo = selecting.date <= hoverDate ? selecting.date : hoverDate
      const hi = selecting.date <= hoverDate ? hoverDate : selecting.date
      if (date > lo && date < hi) return 'rscal__cell rscal__cell--range'
      if (date === lo || date === hi) return 'rscal__cell rscal__cell--start'
    }

    if (!r) return 'rscal__cell rscal__cell--free'
    if (r.user_email === auth?.email) return 'rscal__cell rscal__cell--mine'
    if (r.is_public)                  return 'rscal__cell rscal__cell--public'
    return 'rscal__cell rscal__cell--private'
  }

  function cellTitle(r, spotType, spotNumber, year, month, day) {
    const date = isoDate(new Date(year, month, day))
    if (selecting && selecting.spotType === spotType && selecting.spotNumber === spotNumber
        && date === selecting.date) {
      return 'Start selected - now click an end date'
    }
    if (!r) return selecting ? 'Click to set end date' : 'Available - click to start booking'
    const name = r.is_public || isAdmin ? r.user_name : 'Reserved'
    return `${name}  |  ${formatDisplayDate(r.start_date)} - ${formatDisplayDate(r.end_date)}`
  }

  // ── Months to display ─────────────────────────────────────────────────────

  const monthsToShow = Array.from({ length: calSpan }, (_, i) =>
    addMonths(calYear, calMonth, i)
  )

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="rsp" onClick={selecting ? undefined : undefined}>
      <div className="rsp__topbar">
        <a href="/" className="rsp__back-logo">
          <img src={logo} alt="L'Es-Cargo" className="rsp__logo-img" />
        </a>
        <h1 className="rsp__title">Reservations</h1>
        {isLoggedIn && (
          <div className="rsp__user">
            <span className="rsp__user-name">{auth.name || auth.email}</span>
            {isAdmin && <span className="rsp__badge">Admin</span>}
            <button className="rs-btn rs-btn--ghost" onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>

      <div className="rsp__body">

        {/* ── Email entry ── */}
        {flow === 'email' && (
          <div className="rsp__card rsp__card--narrow">
            <h2 className="rsp__card-title">Member Access</h2>
            <p className="rsp__card-sub">Enter your email address to continue.</p>
            <form onSubmit={handleEmailSubmit} className="rs-form">
              <label className="rs-label">
                Email address
                <input className="rs-input" type="email" value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  placeholder="you@example.com" required autoFocus />
              </label>
              {error && <p className="rs-error">{error}</p>}
              <button className="rs-btn rs-btn--primary" type="submit" disabled={loading}>
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </form>
          </div>
        )}

        {/* ── PIN entry ── */}
        {flow === 'pin' && (
          <div className="rsp__card rsp__card--narrow">
            <h2 className="rsp__card-title">Enter your PIN</h2>
            <p className="rsp__card-sub">{userMeta?.email}</p>
            <form onSubmit={handlePinSubmit} className="rs-form">
              <label className="rs-label">
                4-digit PIN
                <input className="rs-input rs-input--pin" type="password" inputMode="numeric"
                  maxLength={4} value={pinInput}
                  onChange={e => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••" required autoFocus />
              </label>
              {error && <p className="rs-error">{error}</p>}
              <button className="rs-btn rs-btn--primary" type="submit" disabled={loading}>
                {loading ? 'Verifying...' : 'Log in'}
              </button>
              <button type="button" className="rs-btn rs-btn--ghost"
                onClick={() => { setFlow('email'); setError(''); setPinInput('') }}>
                Back
              </button>
            </form>
          </div>
        )}

        {/* ── First-time setup ── */}
        {flow === 'setup' && (
          <div className="rsp__card rsp__card--narrow">
            <h2 className="rsp__card-title">Welcome - Set Up Your Account</h2>
            <p className="rsp__card-sub">{userMeta?.email}</p>
            <form onSubmit={handleSetupSubmit} className="rs-form">
              <label className="rs-label">
                Your name
                <input className="rs-input" type="text" value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="First and last name" required autoFocus />
              </label>
              <label className="rs-label">
                Choose a 4-digit PIN
                <input className="rs-input rs-input--pin" type="password" inputMode="numeric"
                  maxLength={4} value={pinInput}
                  onChange={e => setPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••" required />
              </label>
              <label className="rs-label">
                Confirm PIN
                <input className="rs-input rs-input--pin" type="password" inputMode="numeric"
                  maxLength={4} value={pinConfirm}
                  onChange={e => setPinConfirm(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="••••" required />
              </label>
              {error && <p className="rs-error">{error}</p>}
              <button className="rs-btn rs-btn--primary" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Create account'}
              </button>
            </form>
          </div>
        )}

        {/* ── Unknown visitor ── */}
        {flow === 'unknown' && (
          <div className="rsp__card rsp__card--narrow">
            {!reqSubmitted ? (
              <>
                <h2 className="rsp__card-title">Access Request</h2>
                <p className="rsp__card-sub">
                  This email does not have access yet. Submit a request and you should
                  receive a response within a few days.
                </p>
                <form onSubmit={handleAccessRequest} className="rs-form">
                  <label className="rs-label">
                    Email
                    <input className="rs-input" type="text" value={userMeta?.email} disabled />
                  </label>
                  <label className="rs-label">
                    Your name
                    <input className="rs-input" type="text" value={reqName}
                      onChange={e => setReqName(e.target.value)}
                      placeholder="First and last name" />
                  </label>
                  {error && <p className="rs-error">{error}</p>}
                  <button className="rs-btn rs-btn--primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Request access'}
                  </button>
                  <button type="button" className="rs-btn rs-btn--ghost"
                    onClick={() => { setFlow('email'); setError('') }}>Back</button>
                </form>
              </>
            ) : (
              <>
                <h2 className="rsp__card-title">Request Submitted</h2>
                <p className="rsp__card-sub">
                  Your request has been received. The hosts will review it and you should
                  hear back within a few days.
                </p>
                <button className="rs-btn rs-btn--ghost"
                  onClick={() => { setFlow('email'); setReqSubmitted(false); setReqName(''); setEmailInput('') }}>
                  Back to login
                </button>
              </>
            )}
          </div>
        )}

        {/* ── Logged-in view ── */}
        {flow === 'ready' && (
          <div className="rsp__main">
            <div className="rs-tabs">
              <button className={`rs-tab ${tab === 'calendar' ? 'rs-tab--active' : ''}`}
                onClick={() => setTab('calendar')}>Calendar</button>
              <button className={`rs-tab ${tab === 'mine' ? 'rs-tab--active' : ''}`}
                onClick={() => setTab('mine')}>My Reservations</button>
              {isAdmin && (
                <button className={`rs-tab ${tab === 'admin' ? 'rs-tab--active' : ''}`}
                  onClick={() => setTab('admin')}>Admin Panel</button>
              )}
            </div>

            {error && <p className="rs-error rs-error--top">{error}</p>}

            {/* Calendar tab */}
            {tab === 'calendar' && (
              <div className="rsp__section">
                <div className="rscal">
                  <div className="rscal__nav">
                    <button className="rs-btn rs-btn--icon" onClick={prevMonth}>&larr;</button>
                    <span className="rscal__month">
                      {MONTHS[calMonth]} {calYear}
                      {calSpan > 1 && ` – ${MONTHS[addMonths(calYear, calMonth, calSpan - 1).month]} ${addMonths(calYear, calMonth, calSpan - 1).year}`}
                    </span>
                    <button className="rs-btn rs-btn--icon" onClick={nextMonth}>&rarr;</button>

                    <div className="rscal__controls">
                      <div className="rscal__span-toggle">
                        <button className={`rscal__span-btn ${calSpan === 1 ? 'rscal__span-btn--active' : ''}`}
                          onClick={() => setCalSpan(1)}>1 month</button>
                        <button className={`rscal__span-btn ${calSpan === 3 ? 'rscal__span-btn--active' : ''}`}
                          onClick={() => setCalSpan(3)}>3 months</button>
                      </div>
                      <button className="rs-btn rs-btn--secondary rscal__new-btn"
                        onClick={() => { cancelSelection(); openNewBooking() }}>
                        + New reservation
                      </button>
                    </div>
                  </div>

                  {selecting && (
                    <div className="rscal__selecting-hint">
                      Bed {spotLabel(selecting.spotNumber)} or Camp {spotLabel(selecting.spotNumber)} selected
                      &nbsp;&mdash;&nbsp;now click an end date on the same spot.
                      <button className="rscal__selecting-cancel" onClick={cancelSelection}>Cancel</button>
                    </div>
                  )}

                  <div className="rscal__legend">
                    <span className="rscal__leg rscal__leg--mine">Your reservation</span>
                    <span className="rscal__leg rscal__leg--public">Public reservation</span>
                    {isAdmin && <span className="rscal__leg rscal__leg--private">Private (admin only)</span>}
                    <span className="rscal__leg rscal__leg--free">Available</span>
                  </div>

                  {resLoading ? (
                    <p className="rscal__loading">Loading...</p>
                  ) : (
                    <div className={`rscal__grids rscal__grids--${calSpan}`}>
                      {monthsToShow.map(({ year, month }) => (
                        <div key={`${year}-${month}`} className="rscal__grid-wrap">
                          {calSpan > 1 && (
                            <div className="rscal__grid-label">{MONTHS[month]} {year}</div>
                          )}
                          <CalendarGrid
                            year={year}
                            month={month}
                            reservations={reservations}
                            authEmail={auth.email}
                            isAdmin={isAdmin}
                            selecting={selecting}
                            hoverDate={hoverDate}
                            onCellClick={handleCellClick}
                            onCellHover={handleCellHover}
                            cellReservation={cellReservation}
                            cellClass={cellClass}
                            cellTitle={cellTitle}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* My reservations tab */}
            {tab === 'mine' && (
              <div className="rsp__section">
                <div className="rsp__section-header">
                  <h2 className="rsp__section-title">My Reservations</h2>
                  <button className="rs-btn rs-btn--secondary" onClick={() => openNewBooking()}>
                    + New reservation
                  </button>
                </div>
                <ReservationList
                  reservations={reservations.filter(r => r.user_email === auth.email)}
                  isAdmin={isAdmin}
                  authEmail={auth.email}
                  onEdit={openEditBooking}
                  onDelete={handleDeleteReservation}
                />
              </div>
            )}

            {/* Admin tab */}
            {tab === 'admin' && isAdmin && (
              <AdminPanel
                users={users}
                requests={requests}
                newUserEmail={newUserEmail}
                setNewUserEmail={setNewUserEmail}
                adminError={adminError}
                onAddUser={handleAddUser}
                onRemoveUser={handleRemoveUser}
                onUpdateRequest={handleUpdateRequest}
                allReservations={reservations}
                onEditReservation={openEditBooking}
                onDeleteReservation={handleDeleteReservation}
              />
            )}
          </div>
        )}
      </div>

      {/* Booking modal */}
      {showForm && (
        <BookingModal
          formData={formData}
          setFormData={setFormData}
          editId={editId}
          formError={formError}
          loading={loading}
          onSubmit={handleFormSubmit}
          onClose={() => { setShowForm(false); setEditId(null); setFormError('') }}
        />
      )}
    </div>
  )
}

// ── Calendar grid ──────────────────────────────────────────────────────────

function CalendarGrid({ year, month, authEmail, isAdmin, selecting, hoverDate,
  onCellClick, onCellHover, cellReservation, cellClass, cellTitle }) {
  const days    = daysInMonth(year, month)
  const dayNums = Array.from({ length: days }, (_, i) => i + 1)

  return (
    <div className="rscal__wrap">
      <table className="rscal__table">
        <thead>
          <tr>
            <th className="rscal__th-spot">Spot</th>
            {dayNums.map(d => <th key={d} className="rscal__th-day">{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {/* Beds */}
          <tr className="rscal__section-row">
            <td colSpan={days + 1} className="rscal__section-label">Beds</td>
          </tr>
          {SPOT_NUMBERS.map(num => (
            <tr key={`bed-${num}`}>
              <td className="rscal__spot-label">Bed {spotLabel(num)}</td>
              {dayNums.map(d => {
                const r   = cellReservation('bed', num, year, month, d)
                const cls = cellClass(r, 'bed', num, year, month, d)
                const tip = cellTitle(r, 'bed', num, year, month, d)
                const canClick = !r || r.user_email === authEmail || isAdmin
                return (
                  <td key={d}
                    className={`${cls}${canClick ? ' rscal__cell--clickable' : ''}`}
                    title={tip}
                    onClick={() => onCellClick('bed', num, year, month, d)}
                    onMouseEnter={() => onCellHover('bed', num, year, month, d)}
                  />
                )
              })}
            </tr>
          ))}
          {/* Camp spots */}
          <tr className="rscal__section-row">
            <td colSpan={days + 1} className="rscal__section-label">Camp Spots</td>
          </tr>
          {SPOT_NUMBERS.map(num => (
            <tr key={`camp-${num}`}>
              <td className="rscal__spot-label">Camp {spotLabel(num)}</td>
              {dayNums.map(d => {
                const r   = cellReservation('camp', num, year, month, d)
                const cls = cellClass(r, 'camp', num, year, month, d)
                const tip = cellTitle(r, 'camp', num, year, month, d)
                const canClick = !r || r.user_email === authEmail || isAdmin
                return (
                  <td key={d}
                    className={`${cls}${canClick ? ' rscal__cell--clickable' : ''}`}
                    title={tip}
                    onClick={() => onCellClick('camp', num, year, month, d)}
                    onMouseEnter={() => onCellHover('camp', num, year, month, d)}
                  />
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── Reservation list ───────────────────────────────────────────────────────

function ReservationList({ reservations, authEmail, isAdmin, onEdit, onDelete }) {
  const sorted = [...reservations].sort((a, b) => new Date(a.start_date) - new Date(b.start_date))

  if (!sorted.length) return <p className="rsp__empty">No reservations to show.</p>

  return (
    <ul className="rslist">
      {sorted.map(r => {
        const canEdit = r.user_email === authEmail || isAdmin
        const label   = `${r.spot_type === 'bed' ? 'Bed' : 'Camp'} ${spotLabel(r.spot_number)}`
        return (
          <li key={r.id} className="rslist__item">
            <div className="rslist__spot">
              {label}
              {r.is_public
                ? <span className="rslist__badge rslist__badge--public">Public</span>
                : <span className="rslist__badge rslist__badge--private">Private</span>
              }
            </div>
            <div className="rslist__dates">
              {formatDisplayDate(r.start_date)} &ndash; {formatDisplayDate(r.end_date)}
            </div>
            {(r.is_public || isAdmin || r.user_email === authEmail) && (
              <div className="rslist__who">{r.user_name}</div>
            )}
            {r.notes && <div className="rslist__notes">{r.notes}</div>}
            {canEdit && (
              <div className="rslist__actions">
                <button className="rs-btn rs-btn--small" onClick={() => onEdit(r)}>Edit</button>
                <button className="rs-btn rs-btn--small rs-btn--danger" onClick={() => onDelete(r.id)}>Delete</button>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ── Booking modal ──────────────────────────────────────────────────────────

function BookingModal({ formData, setFormData, editId, formError, loading, onSubmit, onClose }) {
  function set(key, val) { setFormData(prev => ({ ...prev, [key]: val })) }

  return (
    <div className="rsmodal__overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="rsmodal">
        <div className="rsmodal__header">
          <h2 className="rsmodal__title">{editId ? 'Edit Reservation' : 'New Reservation'}</h2>
          <button className="rsmodal__close" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <form onSubmit={onSubmit} className="rs-form">
          <div className="rs-row">
            <label className="rs-label">
              Spot type
              <select className="rs-input" value={formData.spotType}
                onChange={e => set('spotType', e.target.value)}>
                <option value="bed">Bed</option>
                <option value="camp">Camp Spot</option>
              </select>
            </label>
            <label className="rs-label">
              Spot
              <select className="rs-input" value={formData.spotNumber}
                onChange={e => set('spotNumber', parseInt(e.target.value, 10))}>
                {SPOT_NUMBERS.map(n => (
                  <option key={n} value={n}>{spotLabel(n)}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="rs-row">
            <label className="rs-label">
              Start date
              <input className="rs-input" type="date" value={formData.startDate}
                onChange={e => set('startDate', e.target.value)} required />
            </label>
            <label className="rs-label">
              End date
              <input className="rs-input" type="date" value={formData.endDate}
                min={formData.startDate}
                onChange={e => set('endDate', e.target.value)} required />
            </label>
          </div>
          <label className="rs-label">
            Notes (optional)
            <textarea className="rs-input rs-textarea" value={formData.notes}
              onChange={e => set('notes', e.target.value)}
              placeholder="Any notes about your stay..." rows={3} />
          </label>
          <label className="rs-label rs-label--row">
            <input type="checkbox" className="rs-checkbox" checked={formData.isPublic}
              onChange={e => set('isPublic', e.target.checked)} />
            Make this reservation visible to other members
          </label>
          {formError && <p className="rs-error">{formError}</p>}
          <div className="rsmodal__footer">
            <button type="button" className="rs-btn rs-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="rs-btn rs-btn--primary" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Save changes' : 'Reserve'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Admin panel ────────────────────────────────────────────────────────────

function AdminPanel({ users, requests, newUserEmail, setNewUserEmail, adminError,
  onAddUser, onRemoveUser, onUpdateRequest,
  allReservations, onEditReservation, onDeleteReservation }) {
  const [adminTab, setAdminTab] = useState('reservations')

  return (
    <div className="rsp__section">
      <div className="rs-tabs rs-tabs--sub">
        {['reservations','users','requests'].map(t => (
          <button key={t}
            className={`rs-tab rs-tab--sub ${adminTab === t ? 'rs-tab--active' : ''}`}
            onClick={() => setAdminTab(t)}>
            {t === 'reservations' ? 'All Reservations'
              : t === 'users'     ? 'Manage Access'
              : <>Access Requests
                {requests.filter(r => r.status === 'pending').length > 0 &&
                  <span className="rs-badge">{requests.filter(r => r.status === 'pending').length}</span>}
              </>}
          </button>
        ))}
      </div>

      {adminError && <p className="rs-error">{adminError}</p>}

      {adminTab === 'reservations' && (
        <div>
          <h2 className="rsp__section-title">All Reservations</h2>
          <ReservationList reservations={allReservations} authEmail="__admin__" isAdmin={true}
            onEdit={onEditReservation} onDelete={onDeleteReservation} />
        </div>
      )}

      {adminTab === 'users' && (
        <div>
          <h2 className="rsp__section-title">Permitted Users</h2>
          <form onSubmit={onAddUser} className="rs-form rs-form--inline">
            <input className="rs-input" type="email" value={newUserEmail}
              onChange={e => setNewUserEmail(e.target.value)}
              placeholder="email@example.com" required />
            <button className="rs-btn rs-btn--primary" type="submit">Add user</button>
          </form>
          <table className="rs-table">
            <thead><tr><th>Email</th><th>Name</th><th>Role</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>{u.email}</td>
                  <td>{u.name || <span className="rs-muted">Not set yet</span>}</td>
                  <td>{u.role}</td>
                  <td>{u.setup_complete
                    ? <span className="rs-status rs-status--ok">Active</span>
                    : <span className="rs-status rs-status--pending">Awaiting setup</span>}
                  </td>
                  <td>{u.role !== 'admin' && (
                    <button className="rs-btn rs-btn--small rs-btn--danger"
                      onClick={() => onRemoveUser(u.email)}>Remove</button>
                  )}</td>
                </tr>
              ))}
              {!users.length && <tr><td colSpan={5} className="rs-muted">No users yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {adminTab === 'requests' && (
        <div>
          <h2 className="rsp__section-title">Access Requests</h2>
          <table className="rs-table">
            <thead><tr><th>Email</th><th>Name</th><th>Date</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id}>
                  <td>{r.email}</td>
                  <td>{r.name || <span className="rs-muted">-</span>}</td>
                  <td>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td><span className={`rs-status rs-status--${r.status}`}>{r.status}</span></td>
                  <td>{r.status === 'pending' && (
                    <div className="rslist__actions">
                      <button className="rs-btn rs-btn--small rs-btn--approve"
                        onClick={() => onUpdateRequest(r.id, 'approved')}>Approve</button>
                      <button className="rs-btn rs-btn--small rs-btn--danger"
                        onClick={() => onUpdateRequest(r.id, 'denied')}>Deny</button>
                    </div>
                  )}</td>
                </tr>
              ))}
              {!requests.length && <tr><td colSpan={5} className="rs-muted">No requests yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
