import { useLang } from '../context/LangContext'
import './Activites.css'

export default function Activities() {
  const { t } = useLang()

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

      {/* ── Two event poster cards ─────────────────────── */}
      <div className="event-posters">

        {/* ── Toilet Inauguration ── */}
        <div className="event-poster event-poster--green">
          <div className="event-poster__bg-num" aria-hidden="true">23</div>
          <div className="event-poster__inner">
            <div className="event-poster__top">
              <span className="event-poster__weekend mono">{t('event_victoriaWeekend')}</span>
              <span className="event-poster__save mono">{t('event_saveDate')}</span>
            </div>
            <div className="event-poster__date">
              <span className="event-poster__month mono">{t('month_may')}</span>
              <span className="event-poster__day">23</span>
              <span className="event-poster__year mono">2026</span>
            </div>
            <h3 className="event-poster__title">{t('event_toiletInauguration')}</h3>
            <p className="event-poster__desc">{t('event_toiletDesc')}</p>
            <a href="#contact" className="event-poster__btn">{t('nav_joinUs')} →</a>
          </div>
        </div>

        {/* ── St-Jean Launch Party ── */}
        <div className="event-poster event-poster--orange">
          <div className="event-poster__bg-num" aria-hidden="true">20</div>
          <div className="event-poster__inner">
            <div className="event-poster__top">
              <span className="event-poster__weekend mono">{t('event_stjeanWeekend')}</span>
              <span className="event-poster__save mono">{t('event_saveDate')}</span>
            </div>
            <div className="event-poster__date">
              <span className="event-poster__month mono">{t('month_june')}</span>
              <span className="event-poster__day">20</span>
              <span className="event-poster__year mono">2026</span>
            </div>
            <h3 className="event-poster__title">{t('event_stjeanLaunch')}</h3>
            <p className="event-poster__desc">{t('event_stjeanDesc')}</p>
            <a href="#contact" className="event-poster__btn">{t('nav_joinUs')} →</a>
          </div>
        </div>

      </div>

    </section>
  )
}
