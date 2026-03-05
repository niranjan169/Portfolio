import { motion } from 'framer-motion'
import './About.css'

const stats = [
  { value: '8.4', label: 'CGPA' },
  { value: '3+', label: 'Projects Built' },
  { value: '200+', label: 'LeetCode Solved' },
  { value: '1', label: 'Internship' },
]

const About = () => (
  <section className="about" id="about">
    <div className="about__container">
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section__tag">Who I Am</span>
        <h2 className="section__title">About Me</h2>
        <p className="section__subtitle">A developer passionate about crafting scalable solutions</p>
      </motion.div>

      <div className="about__grid">
        <motion.div
          className="about__text"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p>
            I'm <strong>Niranjan TM</strong>, an enthusiastic and detail-oriented
            <strong> Java Full Stack Developer</strong> currently pursuing B.E. in Electronics &amp;
            Communication Engineering at <strong>PSNA College of Engineering And Technology</strong>
            , Dindigul (CGPA: 8.4, 2023–2027).
          </p>
          <p>
            I completed an internship at <strong>Vinsup Infotech, Madurai</strong> as a Java Full Stack
            Developer Intern, where I developed and maintained full-stack web applications using Java,
            Spring Boot, and modern frontend technologies. I built RESTful APIs, integrated databases,
            and implemented end-to-end features following industry best practices.
          </p>
          <p>
            I'm skilled in designing responsive applications, building REST APIs, and implementing
            efficient algorithms. I love solving complex problems and am eager to contribute to
            dynamic teams while learning cutting-edge technologies.
          </p>

          <div className="about__contact-row">
            <a href="mailto:niranjantm06@gmail.com" className="about__contact-chip">
              📧 niranjantm06@gmail.com
            </a>
            <span className="about__contact-chip">📱 9363231171</span>
            <span className="about__contact-chip">📍 India</span>
          </div>
        </motion.div>

        <motion.div
          className="about__stats"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="about__stat"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
            >
              <span className="about__stat-value">{s.value}</span>
              <span className="about__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
)

export default About
