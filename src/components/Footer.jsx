import './Footer.css'

const Footer = () => (
    <footer className="footer">
        <div className="footer__container">
            <div className="footer__top">
                <div className="footer__brand">
                    <span className="footer__logo">Niranjan TM<span className="footer__dot">.</span></span>
                    <p className="footer__tagline">Java Full Stack Developer</p>
                    <p className="footer__email">niranjantm06@gmail.com &nbsp;|&nbsp; 9363231171</p>
                </div>
                <div className="footer__social">
                    <a href="https://linkedin.com/in/niranjantm" target="_blank" rel="noreferrer" className="footer__social-link">LinkedIn</a>
                    <a href="https://github.com/niranjantm" target="_blank" rel="noreferrer" className="footer__social-link">GitHub</a>
                    <a href="https://leetcode.com/niranjantm" target="_blank" rel="noreferrer" className="footer__social-link">LeetCode</a>
                </div>
            </div>
            <div className="footer__divider" />
            <p className="footer__copy">
                © {new Date().getFullYear()} Niranjan TM. Built with ☕ Java &amp; ⚛️ React.
            </p>
        </div>
    </footer>
)

export default Footer
