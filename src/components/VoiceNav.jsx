import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudio from '../hooks/useAudio'
import './VoiceNav.css'

const VoiceNav = () => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const { playHover, playPowerUp, playClick } = useAudio()
    const recognitionRef = useRef(null)

    useEffect(() => {
        // Initialize SpeechRecognition API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!SpeechRecognition) return

        const recognition = new SpeechRecognition()
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'
        recognitionRef.current = recognition

        recognition.onstart = () => {
            setIsListening(true)
            setTranscript('Listening...')
            playHover()
        }

        recognition.onresult = (event) => {
            const current = event.resultIndex
            const rawText = event.results[current][0].transcript.toLowerCase()
            setTranscript(`"${rawText}"`)

            // Navigation Logic based on intent
            if (rawText.includes('skill') || rawText.includes('tech')) scrollTo('skills')
            else if (rawText.includes('project') || rawText.includes('work')) scrollTo('projects')
            else if (rawText.includes('about') || rawText.includes('who')) scrollTo('about')
            else if (rawText.includes('education') || rawText.includes('study')) scrollTo('education')
            else if (rawText.includes('achieve') || rawText.includes('award')) scrollTo('achievements')
            else if (rawText.includes('contact') || rawText.includes('hire')) scrollTo('contact')
            else if (rawText.includes('home') || rawText.includes('top')) scrollTo('hero')
            else {
                setTranscript('Command not recognized.')
                setTimeout(() => setTranscript(''), 2000)
            }
        }

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error)
            setIsListening(false)

            if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                setTranscript('Mic Access Blocked!')
                alert("Microphone is blocked! Please click the lock/mic icon in your Chrome URL bar and allow Microphone permissions to use Voice Navigation.")
            } else if (event.error === 'network') {
                setTranscript('Network Error (Browser API)')
                alert("Your browser is blocking the Web Speech API network requests. If you are using Brave or a Chromium fork, you may need to use standard Google Chrome or Edge for Voice Features.")
            } else {
                setTranscript(`Voice Error: ${event.error}`)
            }

            setTimeout(() => setTranscript(''), 4000)
        }

        recognition.onend = () => {
            setIsListening(false)
            setTimeout(() => setTranscript(''), 3000) // Keep text briefly
        }

    }, [playHover])

    const scrollTo = (id) => {
        playPowerUp()
        const element = document.getElementById(id)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const toggleListen = () => {
        if (!recognitionRef.current) {
            alert("Your browser does not support Voice Navigation. Try Google Chrome.")
            return
        }

        if (isListening) {
            try { recognitionRef.current.stop() } catch (e) { console.error(e) }
        } else {
            playClick()
            try {
                recognitionRef.current.start()
            } catch (err) {
                console.error("Failed to start SpeechRecognition:", err)
            }
        }
    }

    // Don't render if API is not supported in window
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) return null

    return (
        <div className="voice-nav-container">
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        className="voice-transcript"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        {transcript}
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                className={`voice-nav-btn ${isListening ? 'voice-nav-btn--listening' : ''}`}
                onClick={toggleListen}
                title="AI Voice Navigation"
            >
                {isListening ? (
                    <div className="voice-waves">
                        <span className="wave" />
                        <span className="wave" />
                        <span className="wave" />
                    </div>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" y1="19" x2="12" y2="23"></line>
                        <line x1="8" y1="23" x2="16" y2="23"></line>
                    </svg>
                )}
                {isListening && <span className="voice-nav-glow" />}
            </button>
        </div>
    )
}

export default VoiceNav
