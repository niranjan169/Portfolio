import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const NAV_LINKS = [
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
]

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
    }

    return (
        <motion.nav
            className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="navbar__inner">
                <button className="navbar__logo" onClick={() => scrollTo('hero')}>
                    Niranjan<span className="navbar__dot">.</span>
                </button>

                <div className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
                    {NAV_LINKS.map((link) => (
                        <button key={link.id} className="navbar__link" onClick={() => scrollTo(link.id)}>
                            {link.label}
                        </button>
                    ))}
                </div>

                <button
                    className="navbar__hamburger"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`bar${menuOpen ? ' bar--open' : ''}`} />
                    <span className={`bar bar--mid${menuOpen ? ' bar--open' : ''}`} />
                    <span className={`bar${menuOpen ? ' bar--open' : ''}`} />
                </button>
            </div>
        </motion.nav>
    )
}

export default Navbar
