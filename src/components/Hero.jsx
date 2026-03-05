import { motion } from 'framer-motion'
import './Hero.css'

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' },
})

const SOCIALS = [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/niranjantm', icon: '💼' },
    { label: 'GitHub', href: 'https://github.com/niranjantm', icon: '🐙' },
    { label: 'LeetCode', href: 'https://leetcode.com/niranjantm', icon: '🧩' },
]

const Hero = () => (
    <section className="hero" id="hero">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />

        <div className="hero__container">
            <motion.div className="hero__badge" {...fadeUp(0.1)}>
                <span className="hero__badge-dot" />
                Open to Full-Time Roles & Internships
            </motion.div>

            <motion.h1 className="hero__title" {...fadeUp(0.2)}>
                Hi, I'm <span className="hero__name">Niranjan TM</span>
            </motion.h1>

            <motion.h2 className="hero__subtitle" {...fadeUp(0.3)}>
                Java Full Stack Developer
            </motion.h2>

            <motion.p className="hero__description" {...fadeUp(0.4)}>
                Enthusiastic Software Developer skilled in Java, Spring Boot, React, and PostgreSQL.
                I build scalable REST APIs and end-to-end applications following clean architecture
                principles. Currently pursuing B.E. ECE at PSNA College (CGPA&nbsp;8.4).
            </motion.p>

            <motion.div className="hero__actions" {...fadeUp(0.5)}>
                <button className="hero__btn hero__btn--primary" onClick={() => scrollTo('projects')}>
                    View Projects
                </button>
                <button className="hero__btn hero__btn--outline" onClick={() => scrollTo('contact')}>
                    Get In Touch
                </button>
            </motion.div>

            <motion.div className="hero__socials" {...fadeUp(0.6)}>
                {SOCIALS.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hero__social-link">
                        <span>{s.icon}</span> {s.label}
                    </a>
                ))}
            </motion.div>

            <motion.div className="hero__tags" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                {['Java', 'Spring Boot', 'React.js', 'PostgreSQL', 'REST APIs', 'JWT'].map((t) => (
                    <span key={t} className="hero__tag">{t}</span>
                ))}
            </motion.div>
        </div>

        <div className="hero__scroll">
            <div className="hero__scroll-mouse"><div className="hero__scroll-wheel" /></div>
        </div>
    </section>
)

export default Hero
