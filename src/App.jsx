import { useState, useCallback, useEffect } from 'react'
import useKonamiCode from './hooks/useKonamiCode'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import LeetCodeCity from './components/LeetCodeCity'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import HakiCursor from './components/HakiCursor'
import ScrollProgress from './components/ScrollProgress'

import VoiceNav from './components/VoiceNav'
import LoadingScreen from './components/LoadingScreen'
import BackToTop from './components/BackToTop'
import FloatingActions from './components/FloatingActions'


function App() {
    const [loaded, setLoaded] = useState(false)
    const handleDone = useCallback(() => setLoaded(true), [])

    // Listen for the secret easter egg code 'l u f f y'
    const isKonamiUnlocked = useKonamiCode(['l', 'u', 'f', 'f', 'y'])

    return (
        <>
            {/* Global features */}
            <CustomCursor />
            <HakiCursor />
            <ScrollProgress />

            <VoiceNav />
            <BackToTop />
            <FloatingActions />

            {/* Loading screen */}
            {!loaded && <LoadingScreen onDone={handleDone} />}

            {/* Portfolio */}
            <div className={`app${loaded ? ' app--loaded' : ''}`}>
                <Navbar />
                <main>
                    <Hero />
                    <About />
                    <Education />
                    <Skills />
                    <Projects />
                    <Achievements />
                    <LeetCodeCity />
                    <Contact />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default App
