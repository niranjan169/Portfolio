import { motion } from 'framer-motion'
import './Education.css'

const education = [
    {
        degree: 'B.E. Electronics & Communication Engineering',
        institution: 'PSNA College of Engineering And Technology',
        location: 'Dindigul',
        period: '2023 – 2027',
        detail: 'CGPA: 8.4',
        icon: '🎓',
        type: 'Degree',
    },
    {
        degree: 'HSC (Higher Secondary Certificate)',
        institution: "St. Mary's Higher Secondary School",
        location: 'Dindigul',
        period: '2022 – 2023',
        detail: 'Percentage: 90%',
        icon: '🏫',
        type: 'School',
    },
]

const internship = {
    role: 'Java Full Stack Developer Intern',
    company: 'Vinsup Infotech',
    location: 'Madurai',
    period: 'Internship',
    icon: '💼',
    points: [
        'Developed and maintained full-stack web applications using Java, Spring Boot, and modern frontend technologies.',
        'Built RESTful APIs, integrated databases, and implemented end-to-end application features following industry best practices.',
    ],
}

const Education = () => (
    <section className="education" id="education">
        <div className="education__container">
            <motion.div
                className="section__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="section__tag">Academic Background</span>
                <h2 className="section__title">Education & Experience</h2>
                <p className="section__subtitle">My academic journey and professional experience</p>
            </motion.div>

            <div className="education__grid">
                {/* Education Cards */}
                <div className="education__col">
                    <h3 className="education__col-title">📚 Education</h3>
                    {education.map((edu, i) => (
                        <motion.div
                            key={edu.degree}
                            className="edu-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                        >
                            <div className="edu-card__icon">{edu.icon}</div>
                            <div className="edu-card__body">
                                <div className="edu-card__top">
                                    <span className="edu-card__type">{edu.type}</span>
                                    <span className="edu-card__period">{edu.period}</span>
                                </div>
                                <h4 className="edu-card__degree">{edu.degree}</h4>
                                <p className="edu-card__institution">{edu.institution}</p>
                                <div className="edu-card__meta">
                                    <span>📍 {edu.location}</span>
                                    <span className="edu-card__detail">{edu.detail}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Internship */}
                <div className="education__col">
                    <h3 className="education__col-title">💼 Internship</h3>
                    <motion.div
                        className="intern-card"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="intern-card__header">
                            <div>
                                <span className="edu-card__type">Internship</span>
                                <h4 className="intern-card__role">{internship.role}</h4>
                                <p className="intern-card__company">
                                    🏢 {internship.company} &mdash; 📍 {internship.location}
                                </p>
                            </div>
                            <div className="intern-card__icon">{internship.icon}</div>
                        </div>
                        <ul className="intern-card__points">
                            {internship.points.map((pt) => (
                                <li key={pt}>{pt}</li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    </section>
)

export default Education
