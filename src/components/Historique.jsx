import { useLang } from '../context/LangContext'
import photo1 from '../../photo-1.png'
import photo2 from '../../photo-2.png'
import './Historique.css'

export default function History() {
  const { t } = useLang()

  const principles = [
    [t('principle_1_title'), t('principle_1_desc')],
    [t('principle_2_title'), t('principle_2_desc')],
    [t('principle_3_title'), t('principle_3_desc')],
    [t('principle_4_title'), t('principle_4_desc')],
    [t('principle_5_title'), t('principle_5_desc')],
  ]

  return (
    <section id="history" className="historique-wrapper">

      {/* ── Section header ─────────────────────────────── */}
      <div className="hist-header bg-forest">
        <div className="hist-header__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            {t('hist_tag')}
          </span>
          <h2 className="hist-header__title">
            {t('hist_title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="hist-header__lead">
            {t('hist_lead')}
          </p>
        </div>
      </div>

      {/* ── What is an Earthship ───────────────────────── */}
      <div className="earthship-explainer">
        <div className="earthship-explainer__text">
          <span className="tag" style={{ color: 'var(--forest-green)', borderColor: 'var(--forest-green)' }}>
            {t('earthship_tag')}
          </span>
          <h3>{t('earthship_title')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('earthship_p1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('earthship_p2') }} />
          <p>{t('earthship_p3')}</p>
        </div>
        <div className="earthship-explainer__principles">
          {principles.map(([title, desc], i) => (
            <div className="principle-card" key={title}>
              <span className="principle-card__num mono">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <strong>{title}</strong>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Photo strip ───────────────────────────────── */}
      <div className="hist-photo-strip">
        <div className="hist-photo-strip__cell">
          <img src={photo1} alt="Escargo earthship exterior" loading="lazy" />
        </div>
        <div className="hist-photo-strip__cell">
          <img src={photo2} alt="Escargo solar panels and structure" loading="lazy" />
        </div>
      </div>

    </section>
  )
}
