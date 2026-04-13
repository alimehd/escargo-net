import './Activites.css'

// Summer 2026 — June 1 = Monday
const MONTHS = [
  {
    name: 'June',
    events: [
      { date: 6,  day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 7,  day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 13, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 14, day: 'Sun', label: 'Build Day',                        type: 'build'   },
      { date: 20, day: 'Sat', label: 'Garden Day & Solstice Gathering',  type: 'special' },
      { date: 21, day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 27, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 28, day: 'Sun', label: 'Open House & Site Tour',           type: 'special' },
    ],
  },
  {
    name: 'July',
    events: [
      { date: 4,  day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 5,  day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 11, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 12, day: 'Sun', label: 'Build Day',                        type: 'build'   },
      { date: 18, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 19, day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 25, day: 'Sat', label: 'Garden Day & Market Day',          type: 'market'  },
      { date: 26, day: 'Sun', label: 'Midsummer Potluck & Music',        type: 'special' },
    ],
  },
  {
    name: 'August',
    events: [
      { date: 1,  day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 2,  day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 8,  day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 9,  day: 'Sun', label: 'Build Day',                        type: 'build'   },
      { date: 15, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 16, day: 'Sun', label: 'Community Brunch',                  type: 'brunch'  },
      { date: 22, day: 'Sat', label: 'Garden Day & Harvest Market',      type: 'market'  },
      { date: 29, day: 'Sat', label: 'Garden Day',                       type: 'garden'  },
      { date: 30, day: 'Sun', label: 'End of Summer Celebration',        type: 'special' },
    ],
  },
]

const TYPE_META = {
  garden:  { label: 'Garden',   color: 'green'   },
  brunch:  { label: 'Brunch',   color: 'orange'  },
  build:   { label: 'Build',    color: 'blue'    },
  market:  { label: 'Market',   color: 'mustard' },
  special: { label: 'Special',  color: 'red'     },
}

export default function Activities() {
  return (
    <section id="activities" className="activites-wrapper">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="act-header">
        <div className="act-header__inner">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            What's happening
          </span>
          <h2 className="act-header__title">Summer 2026.</h2>
          <p className="act-header__lead">
            Garden days every Saturday, community brunch every two weeks, build days,
            market days and a few surprises. Here is what we have planned.
          </p>
        </div>
      </div>

      {/* ── Events calendar ─────────────────────────────── */}
      <div className="events-calendar">
        {MONTHS.map(({ name, events }) => (
          <div className="events-month" key={name}>
            <div className="events-month__header">
              <h3 className="events-month__name">{name}</h3>
              <span className="events-month__year mono">2026</span>
            </div>
            <ul className="events-list">
              {events.map((ev, i) => {
                const meta = TYPE_META[ev.type]
                return (
                  <li key={i} className={`event-row event-row--${meta.color}`}>
                    <div className="event-row__date">
                      <span className="event-row__day mono">{ev.day}</span>
                      <span className="event-row__num">{ev.date}</span>
                    </div>
                    <span className="event-row__label">{ev.label}</span>
                    <span className={`event-row__tag event-row__tag--${meta.color} mono`}>
                      {meta.label}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Legend ──────────────────────────────────────── */}
      <div className="events-legend">
        {Object.values(TYPE_META).map(({ label, color }) => (
          <span key={label} className={`events-legend__item events-legend__item--${color}`}>
            <span className={`events-legend__dot events-legend__dot--${color}`} />
            {label}
          </span>
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
              { season: 'Fall',   note: 'Harvest, seed-saving, fundraising dinners.' },
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
