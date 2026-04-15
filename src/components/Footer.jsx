import logo from '../../LOGO.png'
import { useLang } from '../context/LangContext'
import './Footer.css'

export default function Footer() {
  const { t } = useLang()
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src={logo} alt="Escargo" className="footer__logo" />
          <p className="footer__tagline">
            {t('footer_tagline').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">{t('footer_navigate')}</h4>
          <ul className="footer__links">
            <li><a href="#welcome">{t('nav_home')}</a></li>
            <li><a href="#history">{t('nav_history')}</a></li>
            <li><a href="#activities">{t('nav_activities')}</a></li>
            <li><a href="#get-involved">{t('nav_getInvolved')}</a></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">{t('footer_getInvolved')}</h4>
          <ul className="footer__links">
            <li><a href="#get-involved">{t('footer_events')}</a></li>
            <li><a href="#get-involved">{t('footer_couch')}</a></li>
            <li><a href="#get-involved">{t('footer_land')}</a></li>
            <li><a href="#get-involved">{t('footer_art')}</a></li>
            <li><a href="#get-involved">{t('footer_camping')}</a></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">{t('footer_contact')}</h4>
          <ul className="footer__links">
            <li><a href="mailto:hello@escargo.ca">hello@escargo.ca</a></li>
            <li><a href="#contact">{t('footer_sendMsg')}</a></li>
          </ul>
          <div className="footer__social">
            <a href="#" aria-label="Instagram" className="footer__social-link">Ig</a>
            <a href="#" aria-label="Facebook" className="footer__social-link">Fb</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <hr className="divider" style={{ borderColor: 'rgba(255,212,73,0.25)', marginBottom: '1.5rem' }} />
        <div className="footer__bottom-inner">
          <p className="mono" style={{ fontSize: '0.68rem', opacity: 0.45, letterSpacing: '0.1em' }}>
            {t('footer_copy').replace('{year}', year)}
          </p>
          <p className="mono" style={{ fontSize: '0.68rem', opacity: 0.35, letterSpacing: '0.08em' }}>
            {t('footer_built')}
          </p>
        </div>
      </div>
    </footer>
  )
}
