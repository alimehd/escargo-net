import { useLang } from '../context/LangContext'
import photo4 from '../../photo-4.png'
import photo5 from '../../photo-5.png'
import './Implication.css'

const WAY_KEYS = [
  { titleKey: 'way1_title', descKey: 'way1_desc', ctaKey: 'way1_cta', color: 'orange', href: '#activities' },
  { titleKey: 'way2_title', descKey: 'way2_desc', ctaKey: 'way2_cta', color: 'blue',   href: '#contact'    },
  { titleKey: 'way3_title', descKey: 'way3_desc', ctaKey: 'way3_cta', color: 'green',  href: '#contact'    },
  { titleKey: 'way4_title', descKey: 'way4_desc', ctaKey: 'way4_cta', color: 'mustard',href: '#contact'    },
  { titleKey: 'way5_title', descKey: 'way5_desc', ctaKey: 'way5_cta', color: 'orange', href: '#contact'    },
  { titleKey: 'way6_title', descKey: 'way6_desc', ctaKey: 'way6_cta', color: 'green',  href: '#contact'    },
]

export default function GetInvolved() {
  const { t } = useLang()

  return (
    <section id="get-involved" className="implication-wrapper">

      {/* ── Header ─────────────────────────────────────── */}
      <div className="impl-header bg-forest">
        <div className="impl-header__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            {t('impl_tag')}
          </span>
          <h2 className="impl-header__title">
            {t('impl_title').split('\n').map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h2>
          <p className="impl-header__lead">{t('impl_lead')}</p>
        </div>
      </div>

      {/* ── Ways to get involved grid ──────────────────── */}
      <div className="impl-grid">
        {WAY_KEYS.map(({ titleKey, descKey, ctaKey, color, href }, i) => (
          <div className={`impl-card impl-card--${color}`} key={titleKey}>
            <span className="impl-card__index mono">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="impl-card__title">{t(titleKey)}</h3>
            <p className="impl-card__desc">{t(descKey)}</p>
            <a href={href} className="impl-card__btn">
              {t(ctaKey)} →
            </a>
          </div>
        ))}
      </div>

      {/* ── Kitchen photo strip ────────────────────────── */}
      <div className="impl-photo-strip">
        <div className="impl-photo-strip__cell">
          <img src={photo4} alt="Communal kitchen inside the earthship" loading="lazy" />
        </div>
        <div className="impl-photo-strip__cell">
          <img src={photo5} alt="Fresh produce in the communal kitchen" loading="lazy" />
        </div>
      </div>

      {/* ── Big CTA ────────────────────────────────────── */}
      <div className="big-cta" id="contact">
        <div className="big-cta__inner">
          <div className="big-cta__text">
            <span className="tag" style={{ color: 'var(--orange)', borderColor: 'var(--orange)' }}>
              {t('cta_tag')}
            </span>
            <h2 className="big-cta__title">{t('cta_title')}</h2>
            <p>{t('cta_text')}</p>
          </div>
          <form className="contact-form" onSubmit={e => e.preventDefault()}>
            <div className="contact-form__row">
              <input type="text" placeholder={t('form_name')} className="contact-form__input" required />
              <input type="email" placeholder={t('form_email')} className="contact-form__input" required />
            </div>
            <select className="contact-form__input contact-form__select" required defaultValue="">
              <option value="" disabled>{t('form_select')}</option>
              <option>{t('form_opt1')}</option>
              <option>{t('form_opt2')}</option>
              <option>{t('form_opt3')}</option>
              <option>{t('form_opt4')}</option>
              <option>{t('form_opt5')}</option>
              <option>{t('form_opt6')}</option>
              <option>{t('form_opt7')}</option>
            </select>
            <textarea
              className="contact-form__input contact-form__textarea"
              placeholder={t('form_message')}
              rows={4}
              required
            />
            <button type="submit" className="contact-form__submit">
              {t('form_submit')}
            </button>
          </form>
        </div>
      </div>

    </section>
  )
}
