import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudio from '../hooks/useAudio'
import './CommandTerminal.css'

const CommandTerminal = ({ isOpen, onClose }) => {
    const { playPowerUp, playHover, playClick } = useAudio()
    const [history, setHistory] = useState([
        { type: 'sys', text: 'N-OS Kernel v9.4 loaded. Awaiting input...' },
        { type: 'sys', text: 'Type "help" to see available commands.' }
    ])
    const [input, setInput] = useState('')
    const bottomRef = useRef(null)

    // Scroll to bottom logically
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [history])

    // Power up sound on open
    useEffect(() => {
        if (isOpen) playPowerUp()
    }, [isOpen, playPowerUp])

    const processCommand = (cmd) => {
        const cleanCmd = cmd.trim().toLowerCase()
        const newHistory = [...history, { type: 'in', text: `root@niranjan:~# ${cmd}` }]

        switch (cleanCmd) {
            case 'help':
                newHistory.push({ type: 'sys', text: 'Commands: whoami, skills, projects, sudo hire, clear, exit' })
                playHover()
                break
            case 'whoami':
                newHistory.push({ type: 'sys', text: 'Niranjan TM - Java Full Stack Developer & System Architect. Building scalable, resilient, and beautiful tech.' })
                break
            case 'skills':
                newHistory.push({ type: 'sys', text: 'Initializing Stack Trace...' })
                newHistory.push({ type: 'sys', text: '> Java, Spring Boot, React.js, PostgreSQL, Docker, Framer Motion...' })
                break
            case 'sudo hire':
                newHistory.push({ type: 'success', text: '[SUCCESS] Direct employment protocol initiated. Deploying contract to HR...' })
                newHistory.push({ type: 'sys', text: 'Please contact via email or the Holographic form.' })
                playClick()
                break
            case 'clear':
                setHistory([])
                setInput('')
                return
            case 'exit':
                onClose()
                return
            default:
                if (cleanCmd) {
                    newHistory.push({ type: 'err', text: `bash: ${cmd}: command not found` })
                }
        }

        setHistory(newHistory)
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            processCommand(input)
        } else if (e.key === 'Escape') {
            onClose()
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="cmd-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="cmd-window"
                        initial={{ y: 50, scale: 0.95, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 20, scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3, type: 'spring' }}
                    >
                        <div className="cmd-header">
                            <div className="cmd-dots">
                                <span className="cmd-dot cmd-dot--close" onClick={onClose} />
                                <span className="cmd-dot cmd-dot--min" />
                                <span className="cmd-dot cmd-dot--max" />
                            </div>
                            <div className="cmd-title">root@niranjan:~ - bash</div>
                        </div>

                        <div className="cmd-body" onClick={() => document.getElementById('cmd-input')?.focus()}>
                            {history.map((log, i) => (
                                <div key={i} className={`cmd-line cmd-line--${log.type}`}>
                                    {log.text}
                                </div>
                            ))}
                            <div className="cmd-input-row">
                                <span className="cmd-prompt">root@niranjan:~#</span>
                                <input
                                    id="cmd-input"
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                            <div ref={bottomRef} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default CommandTerminal
