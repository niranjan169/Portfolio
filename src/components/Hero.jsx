import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import './Hero.css'

/* ─── Typewriter Hook ─────────────────────────────────────── */
const ROLES = [
    'Software Developer',
    'Java Full Stack Developer'
]
const useTypewriter = (words, speed = 80, pause = 1800) => {
    const [text, setText] = useState('')
    const [wordIdx, setWordIdx] = useState(0)
    const [deleting, setDeleting] = useState(false)
    useEffect(() => {
        const word = words[wordIdx % words.length]
        const timeout = setTimeout(() => {
            if (!deleting) {
                setText(word.slice(0, text.length + 1))
                if (text === word) setTimeout(() => setDeleting(true), pause)
            } else {
                setText(word.slice(0, text.length - 1))
                if (text === '') { setDeleting(false); setWordIdx(i => i + 1) }
            }
        }, deleting ? speed / 2 : speed)
        return () => clearTimeout(timeout)
    }, [text, deleting, wordIdx, words, speed, pause])
    return text
}

/* ─── Magnetic Button ─────────────────────────────────────── */
const MagneticBtn = ({ children, className, onClick }) => {
    const btnRef = useRef(null)
    const onMove = (e) => {
        const b = btnRef.current
        if (!b) return
        const rect = b.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        b.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.04)`
    }
    const onLeave = () => { if (btnRef.current) btnRef.current.style.transform = '' }
    return (
        <button ref={btnRef} className={className} onClick={onClick}
            onMouseMove={onMove} onMouseLeave={onLeave}>
            {children}
        </button>
    )
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/niranjan-t-m-29baa1295', icon: '💼' },
    { label: 'GitHub', href: 'https://github.com/niranjan169', icon: '🐙' },
    { label: 'LeetCode', href: 'https://leetcode.com/u/Niranjan_TM/', icon: '🧩' },
]

const Hero = () => {
    const role = useTypewriter(ROLES)

    return (
        <section className="hero" id="hero">
            {/* Grid BG */}
            <div className="hero__grid" />
            {/* Blobs */}
            <div className="hero__blob hero__blob--1" />
            <div className="hero__blob hero__blob--2" />
            {/* Floating code labels */}
            {['@RestController', 'useState()', 'JWT Bearer', 'SELECT *', '@Autowired'].map((c, i) => (
                <div key={i} className={`hero__code hero__code--${i + 1}`}>{c}</div>
            ))}

            <div className="hero__inner">
                {/* ── LEFT ── */}
                <div className="hero__left">
                    <motion.div className="hero__badge"
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}>
                        <span className="hero__badge-dot" />
                        Available for Full-Time Roles
                    </motion.div>

                    {/* BIG TITLE */}
                    <motion.h1 className="hero__title"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}>
                        HI, I'M<br />
                        <span className="hero__name">NIRANJAN</span>
                    </motion.h1>

                    {/* Typewriter */}
                    <motion.div className="hero__role"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <span className="hero__role-text">{role}</span>
                        <span className="hero__cursor">|</span>
                    </motion.div>

                    <motion.p className="hero__desc"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
                        Building scalable full-stack systems with Java, Spring Boot &amp; React.
                        Clean architecture. Real-world solutions. CGPA&nbsp;8.4.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div className="hero__actions"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.5 }}>
                        <MagneticBtn className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
                            View Projects →
                        </MagneticBtn>
                        <MagneticBtn className="hero__btn hero__btn--ghost" onClick={() => scrollTo('contact')}>
                            Hire Me
                        </MagneticBtn>
                    </motion.div>

                    {/* Socials */}
                    <motion.div className="hero__socials"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                        {SOCIALS.map(s => (
                            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hero__social">
                                {s.icon} {s.label}
                            </a>
                        ))}
                    </motion.div>

                    {/* Stats row */}
                    <motion.div className="hero__stats"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
                        {[['8.4', 'CGPA'], ['3+', 'Projects'], ['200+', 'LeetCode'], ['1', 'Internship']].map(([v, l]) => (
                            <div key={l} className="hero__stat">
                                <span className="hero__stat-val">{v}</span>
                                <span className="hero__stat-lbl">{l}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="hero__scroll">
                <div className="hero__scroll-line" />
                <span className="hero__scroll-txt">Scroll Down</span>
            </div>
        </section>
    )
}

export default Hero
