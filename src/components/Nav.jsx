import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import logo from '../../LOGO.png'
import { useLang } from '../context/LangContext'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { lang, setLang, t } = useLang()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function anchorHref(hash) {
    return isHome ? hash : `/${hash}`
  }

  const homeLinks = [
    { href: '#welcome',      label: t('nav_home') },
    { href: '#history',      label: t('nav_history') },
    { href: '#activities',   label: t('nav_activities') },
    { href: '#get-involved', label: t('nav_getInvolved') },
  ]

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <a href={isHome ? '#hero' : '/'} className="nav__logo">
        <img src={logo} alt="Escargo" className="nav__logo-img" />
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
            {t('nav_reservations')}
          </a>
        </li>
        <li>
          <a href={anchorHref('#get-involved')} className="nav__cta" onClick={() => setOpen(false)}>
            {t('nav_joinUs')}
          </a>
        </li>
        <li>
          <button
            className="nav__lang-toggle"
            onClick={() => { setLang(lang === 'en' ? 'fr' : 'en'); setOpen(false) }}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
        </li>
      </ul>
    </nav>
  )
}
