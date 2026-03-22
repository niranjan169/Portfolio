import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useAudio from '../hooks/useAudio'
import './ProjectModal.css'

/* ─── SVG Flowchart ─────────────────────────────────────────── */
const Flowchart = ({ data }) => {
    const [drawn, setDrawn] = useState(false)

    useEffect(() => {
        const t = setTimeout(() => setDrawn(true), 120)
        return () => clearTimeout(t)
    }, [])

    const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]))
    const W = 620
    const H = 420
    const NODE_W = 90
    const NODE_H = 46

    return (
        <div className="flowchart__wrap">
            <svg viewBox={`0 0 ${W} ${H}`} className="flowchart__svg" aria-label="Project flowchart">
                <defs>
                    <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                        <path d="M0,0 L0,6 L8,3 z" fill="rgba(148,163,184,0.6)" />
                    </marker>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Edges */}
                {data.edges.map((edge, idx) => {
                    const from = nodeMap[edge.from]
                    const to = nodeMap[edge.to]
                    if (!from || !to) return null
                    const x1 = from.x + NODE_W / 2
                    const y1 = from.y + NODE_H
                    const x2 = to.x + NODE_W / 2
                    const y2 = to.y
                    const len = Math.hypot(x2 - x1, y2 - y1)
                    const mx = (x1 + x2) / 2
                    const my = (y1 + y2) / 2
                    const d = `M${x1},${y1} Q${mx + (y2 - y1) * 0.1},${my} ${x2},${y2}`
                    return (
                        <path
                            key={idx}
                            d={d}
                            fill="none"
                            stroke="rgba(148,163,184,0.5)"
                            strokeWidth="1.5"
                            markerEnd="url(#arrow)"
                            strokeDasharray={len * 2.5}
                            strokeDashoffset={drawn ? 0 : len * 2.5}
                            style={{
                                transition: `stroke-dashoffset 0.9s ease ${idx * 0.12}s`,
                            }}
                        />
                    )
                })}

                {/* Nodes */}
                {data.nodes.map((node, idx) => (
                    <g key={node.id} style={{ animation: `nodeAppear 0.4s ease ${0.3 + idx * 0.08}s both` }}>
                        {/* Glow rect */}
                        <rect
                            x={node.x - 2} y={node.y - 2}
                            width={NODE_W + 4} height={NODE_H + 4}
                            rx="11" ry="11"
                            fill={node.color}
                            opacity="0.18"
                            filter="url(#glow)"
                        />
                        {/* Main rect */}
                        <rect
                            x={node.x} y={node.y}
                            width={NODE_W} height={NODE_H}
                            rx="9" ry="9"
                            fill="rgba(15,29,53,0.9)"
                            stroke={node.color}
                            strokeWidth="1.5"
                            strokeOpacity="0.8"
                        />
                        {/* Label (split on \n) */}
                        {node.label.split('\n').map((line, li) => (
                            <text
                                key={li}
                                x={node.x + NODE_W / 2}
                                y={node.y + NODE_H / 2 + li * 13.5 - (node.label.includes('\n') ? 6 : 0)}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fill={node.color}
                                fontSize="11"
                                fontFamily="Inter, sans-serif"
                                fontWeight="700"
                            >
                                {line}
                            </text>
                        ))}
                    </g>
                ))}
            </svg>
        </div>
    )
}

/* ─── Workflow Timeline ──────────────────────────────────────── */
const WorkflowTimeline = ({ steps }) => (
    <div className="workflow__timeline">
        {steps.map((step, i) => (
            <motion.div
                key={step.step}
                className="workflow__step"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: 'easeOut' }}
            >
                <div className="workflow__step-left">
                    <div className="workflow__step-badge">{step.step}</div>
                    {i < steps.length - 1 && <div className="workflow__step-line" />}
                </div>
                <div className="workflow__step-content">
                    <h4 className="workflow__step-title">{step.title}</h4>
                    <p className="workflow__step-desc">{step.desc}</p>
                </div>
            </motion.div>
        ))}
    </div>
)

/* ─── Overview Tab ──────────────────────────────────────────── */
const OverviewTab = ({ project }) => (
    <motion.div
        className="modal__overview"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
    >
        <div className="modal__overview-icon-wrap" style={{ background: `rgba(${project.colorRgb},0.12)`, border: `1px solid rgba(${project.colorRgb},0.3)` }}>
            <span className="modal__overview-icon">{project.icon}</span>
        </div>
        <h3 className="modal__overview-title" style={{ color: project.color }}>{project.title}</h3>
        <div className="modal__overview-tech">
            {project.tech.map((t) => (
                <span key={t} className="modal__tech-tag" style={{ borderColor: `rgba(${project.colorRgb},0.4)`, color: project.color }}>
                    {t}
                </span>
            ))}
        </div>
        <div className="modal__overview-body">
            {project.explanation.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
            ))}
        </div>
        <a
            className="modal__github-link"
            href="https://github.com/niranjan169"
            target="_blank"
            rel="noreferrer"
            style={{ '--link-color': project.color, '--link-rgb': project.colorRgb }}
        >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
        </a>
    </motion.div>
)

/* ─── Modal Component ───────────────────────────────────────── */
const TABS = ['Overview', 'Workflow', 'Flowchart']

const ProjectModal = ({ project, onClose }) => {
    const [activeTab, setActiveTab] = useState('Overview')
    const panelRef = useRef(null)
    const { playPowerUp, playHover } = useAudio()

    useEffect(() => {
        setActiveTab('Overview')
        playPowerUp()
    }, [project.id, playPowerUp])

    // Escape key to close
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') onClose() }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = '' }
    }, [])

    const handleBackdrop = (e) => {
        if (e.target === e.currentTarget) onClose()
    }

    return (
        <motion.div
            className="modal__backdrop"
            onClick={handleBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                ref={panelRef}
                className="modal__panel"
                style={{ '--modal-color': project.color, '--modal-rgb': project.colorRgb }}
                initial={{ opacity: 0, scale: 0.86, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="modal__accent-bar" style={{ background: `linear-gradient(90deg, ${project.color}, rgba(${project.colorRgb},0.2))` }} />

                {/* Close button */}
                <button className="modal__close-btn" onClick={onClose} aria-label="Close modal">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Header */}
                <div className="modal__header">
                    <span className="modal__header-badge" style={{ background: `rgba(${project.colorRgb},0.12)`, color: project.color, border: `1px solid rgba(${project.colorRgb},0.3)` }}>
                        {project.icon}&nbsp; Project Deep Dive
                    </span>
                </div>

                {/* Tabs */}
                <div className="modal__tabs">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            className={`modal__tab ${activeTab === tab ? 'modal__tab--active' : ''}`}
                            onClick={() => { setActiveTab(tab); playHover(); }}
                            style={activeTab === tab ? {
                                color: project.color,
                                borderBottomColor: project.color,
                                background: `rgba(${project.colorRgb},0.06)`,
                            } : {}}
                        >
                            {tab === 'Overview' && '📋 '}
                            {tab === 'Workflow' && '⚙️ '}
                            {tab === 'Flowchart' && '🗺️ '}
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="modal__body">
                    <AnimatePresence mode="wait">
                        {activeTab === 'Overview' && (
                            <motion.div key="overview" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
                                <OverviewTab project={project} />
                            </motion.div>
                        )}
                        {activeTab === 'Workflow' && (
                            <motion.div key="workflow" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
                                <WorkflowTimeline steps={project.workflow} />
                            </motion.div>
                        )}
                        {activeTab === 'Flowchart' && (
                            <motion.div key="flowchart" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
                                <Flowchart data={project.flowchart} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ProjectModal
