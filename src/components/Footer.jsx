import logo from '../../LOGO.png'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <img src={logo} alt="L'Es-Cargo" className="footer__logo" />
          <p className="footer__tagline">
            Quebec's first earthship commune.<br />
            Cultivate the imagination.
          </p>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">Navigate</h4>
          <ul className="footer__links">
            <li><a href="#welcome">Home</a></li>
            <li><a href="#history">History</a></li>
            <li><a href="#activities">Activities</a></li>
            <li><a href="#get-involved">Get Involved</a></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">Get Involved</h4>
          <ul className="footer__links">
            <li><a href="#get-involved">Events</a></li>
            <li><a href="#get-involved">Couchsurfing</a></li>
            <li><a href="#get-involved">Land Stewardship</a></li>
            <li><a href="#get-involved">Art Residencies</a></li>
            <li><a href="#get-involved">Camping</a></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-heading mono">Contact</h4>
          <ul className="footer__links">
            <li><a href="mailto:hello@lescargo.ca">hello@lescargo.ca</a></li>
            <li><a href="#contact">Send a message</a></li>
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
            © {new Date().getFullYear()} L'Es-Cargo Commune · Laurentians, Quebec, Canada
          </p>
          <p className="mono" style={{ fontSize: '0.68rem', opacity: 0.35, letterSpacing: '0.08em' }}>
            Built with reclaimed code & good intentions
          </p>
        </div>
      </div>
    </footer>
  )
}
