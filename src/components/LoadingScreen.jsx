import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './LoadingScreen.css'

const LoadingScreen = ({ onDone }) => {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState('counting') // counting | done

    useEffect(() => {
        const duration = 1800
        const interval = 20
        const steps = duration / interval
        let current = 0
        const timer = setInterval(() => {
            current++
            setProgress(Math.min(Math.round((current / steps) * 100), 100))
            if (current >= steps) {
                clearInterval(timer)
                setPhase('done')
                setTimeout(onDone, 600)
            }
        }, interval)
        return () => clearInterval(timer)
    }, [onDone])

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="loading"
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Rotating rings */}
                    <div className="loading__ring loading__ring--1" />
                    <div className="loading__ring loading__ring--2" />
                    <div className="loading__ring loading__ring--3" />

                    {/* Initials */}
                    <div className="loading__center">
                        <motion.div
                            className="loading__initials"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                        >
                            NTM
                        </motion.div>
                        <div className="loading__progress-num">{progress}%</div>
                    </div>

                    {/* Progress bar */}
                    <div className="loading__bar-wrap">
                        <div className="loading__bar" style={{ width: `${progress}%` }} />
                    </div>

                    <div className="loading__label">Initializing Portfolio...</div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen
