import photo1 from '../../photo-1.png'
import photo2 from '../../photo-2.png'
import photo3 from '../../photo-3.png'
import photo4 from '../../photo-4.png'
import photo5 from '../../photo-5.png'
import photo6 from '../../photo-6.png'
import { useLang } from '../context/LangContext'
import './Gallery.css'

const PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6]

export default function Gallery() {
  const { t } = useLang()

  return (
    <section className="gallery-wrapper">
      <div className="gallery-header">
        <div className="gallery-header__inner">
          <span className="tag" style={{ color: 'var(--mustard)', borderColor: 'var(--mustard)' }}>
            {t('gallery_tag')}
          </span>
          <h2 className="gallery-header__title">{t('gallery_title')}</h2>
          <p className="gallery-header__lead">{t('gallery_lead')}</p>
        </div>
      </div>

      <div className="gallery-grid">
        {PHOTOS.map((src, i) => (
          <div className="gallery-cell" key={i}>
            <img src={src} alt="" className="gallery-cell__img" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>
    </section>
  )
}
