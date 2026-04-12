import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../LOGO.png'
import './Nav.css'

const homeLinks = [
  { href: '#welcome',     label: 'Home' },
  { href: '#history',     label: 'History' },
  { href: '#activities',  label: 'Activities' },
  { href: '#get-involved', label: 'Get Involved' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Build anchor href: on home page use fragment; from other pages prepend /
  function anchorHref(hash) {
    return isHome ? hash : `/${hash}`
  }

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href={isHome ? '#hero' : '/'} className="nav__logo">
        <img src={logo} alt="L'Es-Cargo" className="nav__logo-img" />
      </a>

      <button
        className={`nav__burger ${open ? 'nav__burger--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>

      <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
        {homeLinks.map(({ href, label }) => (
          <li key={href}>
            <a href={anchorHref(href)} className="nav__link" onClick={() => setOpen(false)}>
              {label}
            </a>
          </li>
        ))}
        <li>
          <a href="/reservations" className="nav__link" onClick={() => setOpen(false)}>
            Reservations
          </a>
        </li>
        <li>
          <a href={anchorHref('#get-involved')} className="nav__cta" onClick={() => setOpen(false)}>
            Join Us
          </a>
        </li>
      </ul>
    </nav>
  )
}
