import { motion } from 'framer-motion'
import './Skills.css'

const skills = [
    { name: 'Java', icon: '☕', level: 'Expert', desc: 'OOP, Collections, Multithreading, DSA' },
    { name: 'Spring Boot', icon: '🍃', level: 'Expert', desc: 'REST APIs, JPA, Security, Microservices' },
    { name: 'React.js', icon: '⚛️', level: 'Advanced', desc: 'Hooks, Context, Router, State Management' },
    { name: 'PostgreSQL', icon: '🐘', level: 'Advanced', desc: 'Schema design, Queries, Joins, Indexing' },
    { name: 'MySQL', icon: '🗄️', level: 'Advanced', desc: 'Relational DB design, stored procedures' },
    { name: 'JavaScript', icon: '⚡', level: 'Advanced', desc: 'ES6+, DOM, Async/Await, Fetch API' },
    { name: 'Spring Security', icon: '🔒', level: 'Advanced', desc: 'JWT Auth, Role-based Access Control' },
    { name: 'Git', icon: '📦', level: 'Advanced', desc: 'Version control, Branching, Pull Requests' },
    { name: 'HTML & CSS', icon: '🎨', level: 'Expert', desc: 'Semantic HTML, Responsive CSS, Flexbox' },
    { name: 'REST APIs', icon: '🔗', level: 'Expert', desc: 'Design, Versioning, Swagger, Testing' },
    { name: 'Data Structures', icon: '🧮', level: 'Advanced', desc: 'Arrays, Trees, Graphs, DP — 200+ LeetCode' },
    { name: 'VS Code / Tools', icon: '🛠️', level: 'Proficient', desc: 'VS Code, Chrome Extensions, Postman' },
]

const Skills = () => (
    <section className="skills" id="skills">
        <div className="skills__container">
            <motion.div
                className="section__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="section__tag">What I Know</span>
                <h2 className="section__title">Technical Skills</h2>
                <p className="section__subtitle">Technologies I use to build production-ready applications</p>
            </motion.div>

            <div className="skills__grid">
                {skills.map((skill, i) => (
                    <motion.div
                        key={skill.name}
                        className="skill-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.06 }}
                        whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    >
                        <div className="skill-card__glow" />
                        <div className="skill-card__icon">{skill.icon}</div>
                        <div className="skill-card__body">
                            <div className="skill-card__row">
                                <h3 className="skill-card__name">{skill.name}</h3>
                                <span className="skill-card__badge">{skill.level}</span>
                            </div>
                            <p className="skill-card__desc">{skill.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

export default Skills
