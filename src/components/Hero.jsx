import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import background from '../../background.png'
import logo from '../../LOGO.png'
import earthshipHouse from '../../earthship-house.png'
import mapleTree from '../../maple-tree.png'
import tree2Img from '../../tree2.png'
import mustardPlant from '../../mustard-plant.png'
import mustardPot from '../../mustard-pot.png'
import snailImg from '../../snail.png'
import singleTire from '../../single-tire.png'
import tirePile from '../../tire-pile-removebg-preview.png'
import berriesBushes from '../../berries-bushes.png'
import chanterelles from '../../chanterelles-removebg-preview.png'
import { useLang } from '../context/LangContext'
import './Hero.css'

gsap.registerPlugin(ScrollTrigger)

// Forest config — left side then right side (mirrored), sizes doubled
const FOREST = [
  // ── Left side ───────────────────────────────
  { src: 'maple', pos: 'left:-6%',  w: 1040, dir:  1, dur: 3.8, deg: 4,   mirror: false },
  { src: 'tree2', pos: 'left:4%',   w:  880, dir: -1, dur: 4.3, deg: 3,   mirror: false },
  { src: 'maple', pos: 'left:13%',  w:  960, dir:  1, dur: 3.5, deg: 4.5, mirror: false },
  { src: 'tree2', pos: 'left:22%',  w:  800, dir: -1, dur: 4.8, deg: 3,   mirror: false },
  { src: 'maple', pos: 'left:30%',  w:  720, dir:  1, dur: 3.2, deg: 3.5, mirror: false },
  // ── Right side (mirrored) ───────────────────
  { src: 'maple', pos: 'right:-6%', w: 1040, dir: -1, dur: 3.9, deg: 4,   mirror: true  },
  { src: 'tree2', pos: 'right:4%',  w:  880, dir:  1, dur: 4.1, deg: 3,   mirror: true  },
  { src: 'maple', pos: 'right:13%', w:  960, dir: -1, dur: 3.6, deg: 4.5, mirror: true  },
  { src: 'tree2', pos: 'right:22%', w:  800, dir:  1, dur: 4.6, deg: 3,   mirror: true  },
  { src: 'maple', pos: 'right:30%', w:  720, dir: -1, dur: 3.3, deg: 3.5, mirror: true  },
]

// Mushroom clusters scattered across the ground
const MUSHROOMS = [
  { left: '12%',  w: 30 },
  { left: '22%',  w: 37 },
  { left: '32%',  w: 27 },
  { left: '43%',  w: 43 },
  { left: '53%',  w: 32 },
  { left: '63%',  w: 38 },
  { left: '74%',  w: 28 },
  { left: '83%',  w: 33 },
]

export default function Hero() {
  const { t } = useLang()
  const heroRef         = useRef(null)
  const bgRef           = useRef(null)
  const houseRef        = useRef(null)
  const treeRefs        = useRef([])
  const mushroomRefs    = useRef([])
  const berriesRef      = useRef(null)
  const tirePileRef     = useRef(null)
  const chanterellesRef = useRef(null)
  const mustardPlantRef = useRef(null)
  const mustardPotRef   = useRef(null)
  const snailRef        = useRef(null)
  const tireRef         = useRef(null)
  const titleRef        = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = heroRef.current

      // ── Background ───────────────────────────────────────────────
      gsap.to(bgRef.current, {
        y: -30, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // ── House ────────────────────────────────────────────────────
      gsap.to(houseRef.current, {
        y: -70, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // ── Berries ──────────────────────────────────────────────────
      gsap.to(berriesRef.current, {
        y: -90, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // ── Tire pile ────────────────────────────────────────────────
      gsap.to(tirePileRef.current, {
        y: -100, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // ── Forest trees ─────────────────────────────────────────────
      FOREST.forEach((cfg, i) => {
        const el = treeRefs.current[i]
        if (!el) return
        if (cfg.mirror) gsap.set(el, { scaleX: -1, transformOrigin: 'bottom center' })
        gsap.to(el, {
          y: -(100 + i * 12), ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(el, {
          rotation: cfg.dir * cfg.deg,
          duration: cfg.dur,
          repeat: -1, yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.25,
          transformOrigin: 'bottom center',
        })
      })

      // ── Mushroom clusters ─────────────────────────────────────────
      mushroomRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          y: -(170 + (i % 3) * 20), ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      })

      // ── Chanterelles (original) ───────────────────────────────────
      gsap.to(chanterellesRef.current, {
        y: -190, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })

      // ── Mustard plant ────────────────────────────────────────────
      gsap.to(mustardPlantRef.current, {
        y: -200, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(mustardPlantRef.current, {
        rotation: 5, duration: 2.5, repeat: -1, yoyo: true,
        ease: 'sine.inOut', transformOrigin: 'bottom center',
      })

      // ── Mustard pot ──────────────────────────────────────────────
      gsap.to(mustardPotRef.current, {
        y: -250, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
      })
      gsap.to(mustardPotRef.current, {
        rotation: 360, duration: 8, repeat: -1, ease: 'none',
      })

      // ── Snail — right to left ────────────────────────────────────
      gsap.fromTo(snailRef.current,
        { x: '90vw' },
        { x: '-220px', duration: 55, repeat: -1, ease: 'none', repeatDelay: 4 }
      )

      // ── Single tire — rolls left to right ────────────────────────
      gsap.fromTo(tireRef.current,
        { x: '-180px', rotation: 0 },
        { x: '110vw', rotation: 900, duration: 22, repeat: -1, ease: 'none', repeatDelay: 6 }
      )

      // ── Title fades on scroll ────────────────────────────────────
      gsap.to(titleRef.current, {
        y: -60, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: '38% top', scrub: true },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef} id="hero">

      {/* Layer 1 — Background */}
      <img ref={bgRef} src={background} alt="" className="hero__layer hero__bg" draggable={false} aria-hidden="true" />

      {/* Layer 2 — Forest trees (behind house) */}
      {FOREST.map((cfg, i) => {
        const [side, val] = cfg.pos.split(':')
        const style = {
          [side]: val,
          width: `min(${Math.round(cfg.w / 18)}vw, ${cfg.w}px)`,
        }
        return (
          <img
            key={i}
            ref={el => { treeRefs.current[i] = el }}
            src={cfg.src === 'maple' ? mapleTree : tree2Img}
            alt=""
            className="hero__layer hero__tree"
            style={style}
            draggable={false}
            aria-hidden="true"
          />
        )
      })}

      {/* Layer 3 — Tire pile */}
      <img ref={tirePileRef} src={tirePile} alt="" className="hero__layer hero__tire-pile" draggable={false} aria-hidden="true" />

      {/* Layer 4 — House */}
      <img ref={houseRef} src={earthshipHouse} alt="L'Es-Cargo Earthship" className="hero__layer hero__house" draggable={false} />

      {/* Layer 5 — Foreground vegetation */}
      <img ref={berriesRef}      src={berriesBushes} alt="" className="hero__layer hero__berries"       draggable={false} aria-hidden="true" />
      <img ref={chanterellesRef} src={chanterelles}  alt="" className="hero__layer hero__chanterelles"  draggable={false} aria-hidden="true" />
      <img ref={mustardPlantRef} src={mustardPlant}  alt="" className="hero__layer hero__mustard-plant" draggable={false} aria-hidden="true" />

      {/* Mushroom clusters */}
      {MUSHROOMS.map((m, i) => (
        <img
          key={i}
          ref={el => { mushroomRefs.current[i] = el }}
          src={chanterelles}
          alt=""
          className="hero__layer hero__mushroom-cluster"
          style={{ left: m.left, width: `${m.w}px` }}
          draggable={false}
          aria-hidden="true"
        />
      ))}

      {/* Layer 6 — Animated objects */}
      <img ref={snailRef}      src={snailImg}   alt="" className="hero__layer hero__snail"       draggable={false} aria-hidden="true" />
      <img ref={tireRef}       src={singleTire} alt="" className="hero__layer hero__single-tire" draggable={false} aria-hidden="true" />
      <img ref={mustardPotRef} src={mustardPot} alt="" className="hero__layer hero__mustard-pot" draggable={false} aria-hidden="true" />

      {/* Dark scrim — improves text readability */}
      <div className="hero__scrim" aria-hidden="true" />

      {/* Text */}
      <div className="hero__text" ref={titleRef}>
        <div className="hero__eyebrow mono">{t('hero_eyebrow')}</div>
        <img src={logo} alt="Escargo" className="hero__logo" />
        <p className="hero__subtitle">{t('hero_subtitle')}</p>
        <a href="#welcome" className="hero__cta">{t('hero_cta')}</a>
      </div>

      <div className="hero__scroll-hint" aria-hidden="true">
        <span className="mono">{t('hero_scroll')}</span>
        <div className="hero__scroll-arrow" />
      </div>

    </section>
  )
}
