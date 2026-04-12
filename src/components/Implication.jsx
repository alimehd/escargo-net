import './Implication.css'

const ways = [
  {
    title: 'Events',
    color: 'orange',
    desc: "Show up for a concert, workshop or build day. No commitment required — just bring your curiosity and good energy. Events are announced through our newsletter and social channels.",
    cta: 'See upcoming events',
    href: '#activities',
  },
  {
    title: 'Couchsurfing & Hosting',
    color: 'blue',
    desc: "Travelers are welcome to sleep at L'Es-Cargo. In exchange for a few hours of daily contribution (gardening, cooking, building), you get a bed, meals and a community to call home — however briefly.",
    cta: 'Request a stay',
    href: '#contact',
  },
  {
    title: 'Land Stewardship',
    color: 'green',
    desc: 'Spend a season as a groundskeeper. Help tend the gardens, manage the land, support ongoing construction and maintain the property. Accommodations provided for longer-term stewards.',
    cta: 'Apply to steward',
    href: '#contact',
  },
  {
    title: 'Camping',
    color: 'mustard',
    desc: "Pitch a tent on L'Es-Cargo's land during the warmer months. A simple, quiet place to disconnect. Access to communal outdoor kitchen and fire circle. Leave it better than you found it.",
    cta: 'Book a spot',
    href: '#contact',
  },
  {
    title: 'Art Residencies',
    color: 'orange',
    desc: "Artists, musicians, writers and makers are invited to spend time creating at L'Es-Cargo. The earthship and its land become your studio. In return, we ask for a shared creation or workshop.",
    cta: 'Propose a residency',
    href: '#contact',
  },
  {
    title: 'Communal Gardens',
    color: 'green',
    desc: 'Join the weekly garden crew. Learn permaculture, seed-saving and natural building through hands-on practice. Meals are shared after every session. All skill levels welcome.',
    cta: 'Join the garden crew',
    href: '#contact',
  },
]

export default function GetInvolved() {
  return (
    <section id="get-involved" className="implication-wrapper">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="impl-header bg-forest">
        <div className="impl-header__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            Get Involved
          </span>
          <h2 className="impl-header__title">
            This place is built<br />by the people who care.
          </h2>
          <p className="impl-header__lead">
            L'Es-Cargo runs on community energy. Whether you have a weekend
            or a whole season, there's a place here for you.
          </p>
        </div>
      </div>

      {/* ── Ways to get involved grid ──────────────────── */}
      <div className="impl-grid">
        {ways.map(({ title, color, desc, cta, href }, i) => (
          <div className={`impl-card impl-card--${color}`} key={title}>
            <span className="impl-card__index mono">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="impl-card__title">{title}</h3>
            <p className="impl-card__desc">{desc}</p>
            <a href={href} className="impl-card__btn">
              {cta} →
            </a>
          </div>
        ))}
      </div>

      {/* ── Big CTA ────────────────────────────────────── */}
      <div className="big-cta" id="contact">
        <div className="big-cta__inner">
          <div className="big-cta__text">
            <span className="tag" style={{ color: 'var(--orange)', borderColor: 'var(--orange)' }}>
              Say hello
            </span>
            <h2 className="big-cta__title">Ready to show up?</h2>
            <p>
              Drop us a message. Whether you want to visit for a weekend,
              volunteer your skills, pitch an event idea or just learn more —
              we'd love to hear from you.
            </p>
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="contact-form__row">
              <input type="text" placeholder="Your name" className="contact-form__input" required />
              <input type="email" placeholder="Your email" className="contact-form__input" required />
            </div>
            <select className="contact-form__input contact-form__select" required defaultValue="">
              <option value="" disabled>I'm interested in…</option>
              <option>Attending an event</option>
              <option>Couchsurfing / hosting</option>
              <option>Land stewardship</option>
              <option>Camping</option>
              <option>Art residency</option>
              <option>Garden crew</option>
              <option>Something else</option>
            </select>
            <textarea
              className="contact-form__input contact-form__textarea"
              placeholder="Tell us a bit about yourself and what brings you here…"
              rows={4}
              required
            />
            <button type="submit" className="contact-form__submit">
              Send it →
            </button>
          </form>
        </div>
      </div>

    </section>
  )
}
