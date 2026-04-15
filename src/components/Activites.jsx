import { useLang } from '../context/LangContext'
import './Activites.css'

// May 20, 2026 is a Wednesday; the Victoria Day long weekend is May 23–25
// St-Jean-Baptiste (Fête nationale) is June 24 — celebrations on the preceding weekend June 20–21
const MONTH_DATA = [
  {
    key: 'month_may',
    events: [
      { date: 23, dayKey: 'Sat', eventKey: 'event_toiletInauguration', type: 'special' },
      { date: 24, dayKey: 'Sun', eventKey: 'event_communityBrunch',    type: 'brunch'  },
    ],
  },
  {
    key: 'month_june',
    events: [
      { date: 6,  dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 7,  dayKey: 'Sun', eventKey: 'event_communityBrunch',  type: 'brunch'  },
      { date: 13, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 14, dayKey: 'Sun', eventKey: 'event_buildDay',         type: 'build'   },
      { date: 20, dayKey: 'Sat', eventKey: 'event_stjeanLaunch',     type: 'special' },
      { date: 21, dayKey: 'Sun', eventKey: 'event_gardenSolstice',   type: 'special' },
      { date: 27, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 28, dayKey: 'Sun', eventKey: 'event_openHouse',        type: 'special' },
    ],
  },
  {
    key: 'month_july',
    events: [
      { date: 4,  dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 5,  dayKey: 'Sun', eventKey: 'event_communityBrunch',  type: 'brunch'  },
      { date: 11, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 12, dayKey: 'Sun', eventKey: 'event_buildDay',         type: 'build'   },
      { date: 18, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 19, dayKey: 'Sun', eventKey: 'event_communityBrunch',  type: 'brunch'  },
      { date: 25, dayKey: 'Sat', eventKey: 'event_gardenMarket',     type: 'market'  },
      { date: 26, dayKey: 'Sun', eventKey: 'event_midsummer',        type: 'special' },
    ],
  },
  {
    key: 'month_august',
    events: [
      { date: 1,  dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 2,  dayKey: 'Sun', eventKey: 'event_communityBrunch',  type: 'brunch'  },
      { date: 8,  dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 9,  dayKey: 'Sun', eventKey: 'event_buildDay',         type: 'build'   },
      { date: 15, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 16, dayKey: 'Sun', eventKey: 'event_communityBrunch',  type: 'brunch'  },
      { date: 22, dayKey: 'Sat', eventKey: 'event_gardenHarvest',    type: 'market'  },
      { date: 29, dayKey: 'Sat', eventKey: 'event_gardenDay',        type: 'garden'  },
      { date: 30, dayKey: 'Sun', eventKey: 'event_endSummer',        type: 'special' },
    ],
  },
]

const TYPE_COLOR = {
  garden:  'green',
  brunch:  'orange',
  build:   'blue',
  market:  'mustard',
  special: 'red',
}

const TYPE_LABEL_KEY = {
  garden:  'type_garden',
  brunch:  'type_brunch',
  build:   'type_build',
  market:  'type_market',
  special: 'type_special',
}

const SEASONS = [
  { nameKey: 'season_spring_name', noteKey: 'season_spring_note' },
  { nameKey: 'season_summer_name', noteKey: 'season_summer_note' },
  { nameKey: 'season_fall_name',   noteKey: 'season_fall_note'   },
  { nameKey: 'season_winter_name', noteKey: 'season_winter_note' },
]

// Day abbreviations by language
const DAY_LABELS = {
  en: { Sat: 'Sat', Sun: 'Sun' },
  fr: { Sat: 'Sam', Sun: 'Dim' },
}

export default function Activities() {
  const { t, lang } = useLang()
  const days = DAY_LABELS[lang] ?? DAY_LABELS.en

  return (
    <section id="activities" className="activites-wrapper">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="act-header">
        <div className="act-header__inner">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            {t('act_tag')}
          </span>
          <h2 className="act-header__title">{t('act_title')}</h2>
          <p className="act-header__lead">{t('act_lead')}</p>
        </div>
      </div>

      {/* ── Events calendar ─────────────────────────────── */}
      <div className="events-calendar">
        {MONTH_DATA.map(({ key, events }) => (
          <div className="events-month" key={key}>
            <div className="events-month__header">
              <h3 className="events-month__name">{t(key)}</h3>
              <span className="events-month__year mono">2026</span>
            </div>
            <ul className="events-list">
              {events.map((ev, i) => {
                const color = TYPE_COLOR[ev.type]
                return (
                  <li key={i} className={`event-row event-row--${color}`}>
                    <div className="event-row__date">
                      <span className="event-row__day mono">{days[ev.dayKey]}</span>
                      <span className="event-row__num">{ev.date}</span>
                    </div>
                    <span className="event-row__label">{t(ev.eventKey)}</span>
                    <span className={`event-row__tag event-row__tag--${color} mono`}>
                      {t(TYPE_LABEL_KEY[ev.type])}
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
        {Object.entries(TYPE_COLOR).map(([type, color]) => (
          <span key={type} className={`events-legend__item events-legend__item--${color}`}>
            <span className={`events-legend__dot events-legend__dot--${color}`} />
            {t(TYPE_LABEL_KEY[type])}
          </span>
        ))}
      </div>

      {/* ── Seasons callout ────────────────────────────── */}
      <div className="seasons-band">
        <div className="seasons-band__inner">
          <h3 className="seasons-band__title">{t('act_seasons_title')}</h3>
          <div className="seasons-grid">
            {SEASONS.map(({ nameKey, noteKey }) => (
              <div className="season-card" key={nameKey}>
                <div className="season-card__name mono">{t(nameKey)}</div>
                <p>{t(noteKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
