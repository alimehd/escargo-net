import { useLang } from '../context/LangContext'
import './Accueil.css'

export default function Welcome() {
  const { t } = useLang()

  return (
    <section id="welcome" className="accueil-wrapper">

      {/* ── Mission band ─────────────────────────────────── */}
      <div className="mission-band">
        <div className="mission-band__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            {t('welcome_tag')}
          </span>
          <h2 className="mission-band__title">
            {t('welcome_title')}
          </h2>
          <p className="mission-band__text">
            {t('welcome_text')}
          </p>
        </div>
      </div>

      {/* ── Three pillars ────────────────────────────────── */}
      <div className="pillars">
        <div className="pillar pillar--blue">
          <h3 className="pillar__title">{t('pillar_live_title')}</h3>
          <p>{t('pillar_live_text')}</p>
        </div>
        <div className="pillar pillar--mustard">
          <h3 className="pillar__title">{t('pillar_create_title')}</h3>
          <p>{t('pillar_create_text')}</p>
        </div>
        <div className="pillar pillar--green">
          <h3 className="pillar__title">{t('pillar_connect_title')}</h3>
          <p>{t('pillar_connect_text')}</p>
        </div>
      </div>

      {/* ── Location ─────────────────────────────────────── */}
      <div className="location-block">
        <div className="location-block__text">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            {t('location_tag')}
          </span>
          <h2 className="location-block__title">{t('location_title')}</h2>
          <p>{t('location_p1')}</p>
          <p>{t('location_p2')}</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="location-block__map-btn"
          >
            {t('location_btn')}
          </a>
        </div>
        <div className="location-block__map-placeholder">
          <div className="map-pin-anim" aria-hidden="true">
            <div className="map-pin">📍</div>
            <div className="map-ripple" />
            <div className="map-ripple map-ripple--2" />
          </div>
          <p className="mono" style={{ fontSize: '0.7rem', marginTop: '1rem', opacity: 0.6 }}>
            {t('location_sub')}
          </p>
        </div>
      </div>

    </section>
  )
}
