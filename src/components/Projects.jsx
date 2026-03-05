import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
    {
        icon: '�',
        color: '#3b82f6',
        title: 'SkillConnect – Secure Full Stack Job Portal',
        description:
            'Role-based job portal backend using Spring Boot, JWT, and PostgreSQL with secure authentication, resume upload handling, recruiter dashboard, and admin approval workflows following clean architecture principles.',
        tech: ['Spring Boot', 'JWT', 'PostgreSQL', 'Spring Security', 'REST APIs'],
    },
    {
        icon: '🏥',
        color: '#6366f1',
        title: 'AI Medical Portal for Hospitals',
        description:
            'Full-stack AI-powered hospital portal with smart patient triage and appointment management. Integrated AI-based decision support to improve healthcare workflow and operational efficiency.',
        tech: ['Java', 'Spring Boot', 'React.js', 'AI/ML', 'PostgreSQL'],
    },
    {
        icon: '🎬',
        color: '#8b5cf6',
        title: 'Movie App (React.js + API Integration)',
        description:
            'Responsive movie browsing application using React.js with third-party API integration to fetch trending movies, display dynamic details, and features like search, filter, and favorites list.',
        tech: ['React.js', 'JavaScript', 'REST APIs', 'CSS', 'HTML'],
    },
]

const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
)

const Projects = () => (
    <section className="projects" id="projects">
        <div className="projects__container">
            <motion.div
                className="section__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="section__tag">What I've Built</span>
                <h2 className="section__title">Featured Projects</h2>
                <p className="section__subtitle">A selection of projects showcasing real-world expertise</p>
            </motion.div>

            <div className="projects__grid">
                {projects.map((p, i) => (
                    <motion.div
                        key={p.title}
                        className="project-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.15 }}
                    >
                        <div className="project-card__header">
                            <div className="project-card__icon" style={{ background: `${p.color}20` }}>
                                {p.icon}
                            </div>
                            <a className="project-card__github-btn" href="https://github.com/niranjan169" target="_blank" rel="noreferrer" aria-label="GitHub">
                                <GitHubIcon /> GitHub
                            </a>
                        </div>
                        <h3 className="project-card__title">{p.title}</h3>
                        <p className="project-card__desc">{p.description}</p>
                        <div className="project-card__tech">
                            {p.tech.map((t) => (
                                <span key={t} className="project-card__tag">{t}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

export default Projects
