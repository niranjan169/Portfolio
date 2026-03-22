import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LiveStatus.css'

const STATUSES = [
    '> Compiling Java Spring Boot architecture...',
    '> Tuning PostgreSQL query performance...',
    '> Solving LeetCode Hard #42...',
    '> Architecting React component trees...',
    '> Sipping strong coffee...',
    '> Deploying Docker containers...',
    '> Synchronizing Framer Motion physics...',
    '> 🟢 System Nominal. Ready for deployment.'
]

const LiveStatus = () => {
    const [statusIndex, setStatusIndex] = useState(0)
    const [text, setText] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [isPulse, setIsPulse] = useState(false)
    const [cycles, setCycles] = useState(0)

    // Typewriter effect logic
    useEffect(() => {
        let timer
        const currentStatus = STATUSES[statusIndex]

        if (isDeleting) {
            timer = setTimeout(() => {
                setText(currentStatus.substring(0, text.length - 1))
                if (text === '') {
                    setIsDeleting(false)
                    // If we've shown a few statuses, show the "Ready" status for longer
                    if (cycles > 4 && statusIndex !== STATUSES.length - 1) {
                        setStatusIndex(STATUSES.length - 1)
                    } else {
                        setStatusIndex((i) => (i + 1) % STATUSES.length)
                    }
                }
            }, 30) // Erase speed
        } else {
            timer = setTimeout(() => {
                setText(currentStatus.substring(0, text.length + 1))
                if (text === currentStatus) {
                    // Pause at the end before deleting
                    if (statusIndex === STATUSES.length - 1) {
                        setIsPulse(true)
                        setTimeout(() => {
                            setIsPulse(false)
                            setIsDeleting(true)
                            setCycles(0)
                        }, 5000) // Hold the "Ready" state for 5 seconds
                    } else {
                        setTimeout(() => {
                            setIsDeleting(true)
                            setCycles(c => c + 1)
                        }, 2000) // Hold normal statuses for 2 seconds
                    }
                }
            }, 50) // Type speed
        }

        return () => clearTimeout(timer)
    }, [text, isDeleting, statusIndex, cycles])

    return (
        <div className="live-status-box">
            <div className="live-status-header">
                <span className="live-pulse" /> Live System Feed
            </div>
            <div className={`live-status-text ${isPulse ? 'live-status-text--ready' : ''}`}>
                {text}<span className="live-cursor">_</span>
            </div>
        </div>
    )
}

export default LiveStatus
