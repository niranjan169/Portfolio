import { motion } from 'framer-motion'
import './Achievements.css'

const achievements = [
    {
        icon: '🧩',
        title: '200+ LeetCode Problems',
        desc: 'Solved 200+ problems with consistent ratings, demonstrating strong algorithmic thinking and problem-solving skills.',
        tag: 'Competitive Coding',
    },
    {
        icon: '🏆',
        title: 'Zoho Cliqtrix 2025',
        desc: 'Participated in Zoho Cliqtrix 2025 technical competition, competing against top technical talent.',
        tag: 'Competition',
    },
    {
        icon: '🤖',
        title: 'NIT Trichy AI Pragyan Hackathon',
        desc: 'Competed in NIT Trichy AI Pragyan Hackathon, focusing on AI innovation and real-world problem solving.',
        tag: 'Hackathon',
    },
    {
        icon: '📄',
        title: 'Paper Presentation at CIT Coimbatore',
        desc: 'Presented a technical paper at CIT Coimbatore, showcasing research depth and strong presentation skills.',
        tag: 'Research',
    },
]

const Achievements = () => (
    <section className="achievements" id="achievements">
        <div className="achievements__container">
            <motion.div
                className="section__header"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="section__tag">Highlights</span>
                <h2 className="section__title">Achievements</h2>
                <p className="section__subtitle">Competitions, hackathons, and academic milestones</p>
            </motion.div>

            <div className="achievements__grid">
                {achievements.map((a, i) => (
                    <motion.div
                        key={a.title}
                        className="achievement-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    >
                        <div className="achievement-card__icon">{a.icon}</div>
                        <div className="achievement-card__body">
                            <div className="achievement-card__top">
                                <span className="achievement-card__tag">{a.tag}</span>
                            </div>
                            <h3 className="achievement-card__title">{a.title}</h3>
                            <p className="achievement-card__desc">{a.desc}</p>
                        </div>
                        <div className="achievement-card__glow" />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
)

export default Achievements
