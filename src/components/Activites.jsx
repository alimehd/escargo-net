import './Activites.css'

const activities = [
  {
    title: 'Permaculture Gardens',
    tag: 'Ongoing',
    color: 'green',
    desc: 'Food forests, vegetable beds, herb spirals and seed-saving initiatives. The gardens are tended collectively and supply both the commune and community meals throughout the growing season.',
  },
  {
    title: 'Construction in Progress',
    tag: 'Build Days',
    color: 'blue',
    desc: "The earthship is always growing. Tire-packing sessions, earthen plastering, bottle-wall building — hands-on construction days open to anyone willing to learn and get their hands dirty. No experience needed.",
  },
  {
    title: 'Material Salvage',
    tag: 'Circular',
    color: 'mustard',
    desc: 'We collect reclaimed tires, glass bottles, aluminum cans, wood and hardware for construction. Regular salvage runs and material drops. Everything destined for the landfill becomes building material.',
  },
  {
    title: 'Communal Art Workshops',
    tag: 'Creative',
    color: 'orange',
    desc: 'Natural pigment painting, sculpture from reclaimed materials, mosaic work, screen printing on fabric. Workshops run by resident and visiting artists in an open, non-hierarchical studio environment.',
  },
  {
    title: 'Fundraising Events',
    tag: 'Community',
    color: 'green',
    desc: 'Potlucks, benefit shows, art auctions and market days. Every event funds the next phase of construction or new programming. Come hungry and leave inspired — and broke in the best way.',
  },
]

export default function Activities() {
  return (
    <section id="activities" className="activites-wrapper">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="act-header">
        <div className="act-header__inner">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            What's happening
          </span>
          <h2 className="act-header__title">Life on the land.</h2>
          <p className="act-header__lead">
            L'Es-Cargo is not a museum piece — it's a living, growing organism.
            Here's what goes on across the seasons.
          </p>
        </div>
      </div>

      {/* ── Activity grid ──────────────────────────────── */}
      <div className="activities-grid">
        {activities.map(({ title, tag, color, desc }, i) => (
          <div className={`activity-card activity-card--${color}`} key={title}>
            <div className="activity-card__top">
              <span className="activity-card__index mono">{String(i + 1).padStart(2, '0')}</span>
              <span className="tag activity-card__tag">{tag}</span>
            </div>
            <h3 className="activity-card__title">{title}</h3>
            <p className="activity-card__desc">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── Seasons callout ────────────────────────────── */}
      <div className="seasons-band">
        <div className="seasons-band__inner">
          <h3 className="seasons-band__title">A place for all seasons</h3>
          <div className="seasons-grid">
            {[
              { season: 'Spring', note: 'Planting, tire-packing sessions, mud season builds.' },
              { season: 'Summer', note: 'Concerts, camping, workshops, market days.' },
              { season: 'Fall', note: 'Harvest, seed-saving, fundraising dinners.' },
              { season: 'Winter', note: 'Earthship tours, planning retreats, cozy art ateliers.' },
            ].map(({ season, note }) => (
              <div className="season-card" key={season}>
                <div className="season-card__name mono">{season}</div>
                <p>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
