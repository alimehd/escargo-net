import './Accueil.css'

export default function Welcome() {
  return (
    <section id="welcome" className="accueil-wrapper">

      {/* ── Mission band ─────────────────────────────────── */}
      <div className="mission-band">
        <div className="mission-band__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            Our Mission
          </span>
          <h2 className="mission-band__title">
            Cultivate the imagination.
          </h2>
          <p className="mission-band__text">
            To nurture new ways of living, creating, and connecting on the grounds
            of Quebec's first earthship — through community, art, and sustainable practice.
          </p>
        </div>
      </div>

      {/* ── Three pillars ────────────────────────────────── */}
      <div className="pillars">
        <div className="pillar pillar--blue">
          <h3 className="pillar__title">Live</h3>
          <p>An autonomous habitat: solar energy, rainwater harvesting, tire walls, integrated gardens. A home that breathes with the earth.</p>
        </div>
        <div className="pillar pillar--mustard">
          <h3 className="pillar__title">Create</h3>
          <p>Community art workshops, music, participatory construction and crafts. L'Es-Cargo is a canvas in perpetual evolution.</p>
        </div>
        <div className="pillar pillar--green">
          <h3 className="pillar__title">Connect</h3>
          <p>Events, traveler hosting, land stewardship and residencies. An open community weaving lasting bonds.</p>
        </div>
      </div>

      {/* ── Location ─────────────────────────────────────── */}
      <div className="location-block">
        <div className="location-block__text">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            Location
          </span>
          <h2 className="location-block__title">In the heart of Quebec</h2>
          <p>
            Nestled in the Laurentians, L'Es-Cargo is a living place — surrounded
            by forests, rivers and starry skies. A little more than an hour from Montreal,
            but light-years away from the urban pace.
          </p>
          <p>
            The property hosts the main earthship structure, camping spaces,
            permaculture gardens, and construction zones in continuous development.
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="location-block__map-btn"
          >
            View on map →
          </a>
        </div>
        <div className="location-block__map-placeholder">
          <div className="map-pin-anim" aria-hidden="true">
            <div className="map-pin">📍</div>
            <div className="map-ripple" />
            <div className="map-ripple map-ripple--2" />
          </div>
          <p className="mono" style={{ fontSize: '0.7rem', marginTop: '1rem', opacity: 0.6 }}>
            Laurentians, Quebec, Canada
          </p>
        </div>
      </div>

    </section>
  )
}
