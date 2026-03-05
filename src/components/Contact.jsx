import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitContact } from '../services/contactService'
import './Contact.css'

const INIT = { name: '', email: '', subject: '', message: '' }

const Contact = () => {
    const [form, setForm] = useState(INIT)
    const [errors, setErrors] = useState({})
    const [status, setStatus] = useState(null)

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Name is required'
        if (!form.email.trim()) e.email = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
        if (!form.message.trim()) e.message = 'Message is required'
        return e
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm((f) => ({ ...f, [name]: value }))
        if (errors[name]) setErrors((ev) => ({ ...ev, [name]: undefined }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        if (Object.keys(errs).length) { setErrors(errs); return }
        setStatus('loading')
        try {
            await submitContact(form)
            setStatus('success')
            setForm(INIT)
            setErrors({})
        } catch {
            setStatus('error')
        }
    }

    return (
        <section className="contact" id="contact">
            <div className="contact__container">
                <motion.div
                    className="section__header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="section__tag">Let's Talk</span>
                    <h2 className="section__title">Get In Touch</h2>
                    <p className="section__subtitle">Have a project in mind? I'd love to hear from you.</p>
                </motion.div>

                <div className="contact__layout">
                    <motion.div
                        className="contact__info"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="contact__info-title">Let's build something great together</h3>
                        <p className="contact__info-text">
                            I'm currently open to full-time roles and freelance projects. Whether you have
                            an idea, a question, or just want to say hi — my inbox is always open.
                        </p>
                        <ul className="contact__details">
                            <li><span>📧</span> niranjan@portfolio.dev</li>
                            <li><span>📍</span> India</li>
                            <li><span>⏰</span> Response within 24 hours</li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="contact__form-wrap"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {status === 'success' ? (
                            <div className="contact__success">
                                <div className="contact__success-icon">✅</div>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                                <button className="contact__submit-btn" onClick={() => setStatus(null)}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit} noValidate>
                                <div className="contact__row">
                                    <div className="contact__field">
                                        <label htmlFor="name">Full Name <span>*</span></label>
                                        <input
                                            id="name" name="name" type="text"
                                            className={errors.name ? 'input--error' : ''}
                                            placeholder="Your full name"
                                            value={form.name}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                        />
                                        {errors.name && <span className="contact__err">{errors.name}</span>}
                                    </div>
                                    <div className="contact__field">
                                        <label htmlFor="email">Email Address <span>*</span></label>
                                        <input
                                            id="email" name="email" type="email"
                                            className={errors.email ? 'input--error' : ''}
                                            placeholder="your@email.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            disabled={status === 'loading'}
                                        />
                                        {errors.email && <span className="contact__err">{errors.email}</span>}
                                    </div>
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        id="subject" name="subject" type="text"
                                        placeholder="What's this about?"
                                        value={form.subject}
                                        onChange={handleChange}
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div className="contact__field">
                                    <label htmlFor="message">Message <span>*</span></label>
                                    <textarea
                                        id="message" name="message" rows={5}
                                        className={errors.message ? 'input--error' : ''}
                                        placeholder="Tell me about your project or inquiry..."
                                        value={form.message}
                                        onChange={handleChange}
                                        disabled={status === 'loading'}
                                    />
                                    {errors.message && <span className="contact__err">{errors.message}</span>}
                                </div>

                                {status === 'error' && (
                                    <div className="contact__alert">
                                        ⚠️ Something went wrong. Please try again or email me directly.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="contact__submit-btn"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading'
                                        ? <><span className="contact__spinner" /> Sending...</>
                                        : 'Send Message →'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Contact
