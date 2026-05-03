import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useI18n } from '@/i18n/I18nContext'

const HERO_SLIDES = [
  {
    avif: '/hero-collaborative.avif',
    webp: '/hero-collaborative.webp',
    png: '/hero-collaborative.png',
    preferOriginal: false,
  },
  {
    avif: '/hero-collaborative-2.avif',
    webp: '/hero-collaborative-2.webp',
    png: '/hero-collaborative-2.png',
    preferOriginal: true,
  },
  {
    avif: '/hero-collaborative-3.avif',
    webp: '/hero-collaborative-3.webp',
    png: '/hero-collaborative-3.png',
    preferOriginal: true,
  },
] as const

export function HomeHero() {
  const { t, path } = useI18n()
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 z-0" aria-hidden>
        {HERO_SLIDES.map((slide, i) => (
          <picture
            key={slide.png}
            className={`absolute inset-0 block h-full w-full transition-opacity duration-1000 ${
              i === active ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {!slide.preferOriginal && <source srcSet={slide.avif} type="image/avif" />}
            {!slide.preferOriginal && <source srcSet={slide.webp} type="image/webp" />}
            <img
              src={slide.png}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </picture>
        ))}
      </div>
      <div className="absolute inset-0 z-[1] bg-[#0F5AA0]/18" aria-hidden />
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl xl:max-w-3xl -mt-8 sm:-mt-10 lg:-mt-12 rounded-3xl border border-white/40 bg-white/30 p-8 sm:p-10 lg:p-12 shadow-2xl shadow-slate-900/10 backdrop-blur-[1.5px]"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-slate-950 font-display">
            {t.home.heroTitle}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-lg sm:text-xl lg:text-2xl text-black leading-relaxed font-normal"
          >
            {t.home.heroSubtitle}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-black font-semibold leading-relaxed"
          >
            {t.home.heroTagline}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 sm:mt-12 flex flex-wrap gap-4"
          >
            <Link
              to={path('/contact')}
              className="group inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-2xl font-semibold hover:bg-brand-dark active:bg-brand-dark shadow-brand hover:shadow-brand-lg transition-all duration-300"
            >
              {t.hero.cta1}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to={path('/projects')}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand text-brand rounded-2xl font-semibold bg-white/40 hover:bg-white/60 active:bg-white/60 transition-all duration-300"
            >
              {t.hero.cta2}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
