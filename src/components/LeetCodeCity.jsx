import { motion } from 'framer-motion'
import './LeetCodeCity.css'

// Simulating a year of LeetCode submissions (flattened for 3D grid)
// Values 0-4 represent submission intensity (0=none, 4=high)
const generateMockData = () => {
    const weeks = 20 // Show last 20 weeks for visual density
    const days = 7
    let grid = []
    for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < days; d++) {
            // Random distribution skewed to represent LeetCode problem solving
            const rand = Math.random()
            let val = 0
            if (rand > 0.65) val = 1
            if (rand > 0.85) val = 2
            if (rand > 0.94) val = 3
            if (rand > 0.98) val = 4
            grid.push({ w, d, val })
        }
    }
    return grid
}

const LeetCodeCity = () => {
    const data = generateMockData()

    // Height multiplier for the pillars based on intensity
    const getIntensityHeight = (val) => {
        if (val === 0) return 4
        if (val === 1) return 15
        if (val === 2) return 30
        if (val === 3) return 55
        if (val === 4) return 90
        return 4
    }

    // Color intensity mapping (LeetCode Orange/Yellow theme)
    const getIntensityColor = (val) => {
        if (val === 0) return 'rgba(30, 20, 10, 0.4)'
        if (val === 1) return '#9a3412' // orange-800
        if (val === 2) return '#c2410c' // orange-700
        if (val === 3) return '#ea580c' // orange-600
        if (val === 4) return '#ffa116' // leetcode vivid orange
        return '#111'
    }

    return (
        <section className="leetcode-sec">
            <div className="section__header section__header--center">
                <span className="section__tag">Problem Solving</span>
                <h2 className="section__title">LeetCode Cityscape</h2>
                <p className="section__subtitle">A 3D isometric visualization of recent submission density</p>
                <a
                    href="https://leetcode.com/u/Niranjan_TM/"
                    target="_blank"
                    rel="noreferrer"
                    className="leetcode-link-btn"
                >
                    View LeetCode Profile
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                </a>
            </div>

            <div className="leetcode-container">
                <div className="leetcode-grid">
                    {data.map((bl, i) => (
                        <motion.div
                            key={i}
                            className="leetcode-block"
                            style={{
                                '--b-color': getIntensityColor(bl.val),
                                '--b-height': `${getIntensityHeight(bl.val)}px`
                            }}
                            initial={{ opacity: 0, scaleZ: 0, translateZ: -20 }}
                            whileInView={{ opacity: 1, scaleZ: 1, translateZ: 0 }}
                            viewport={{ once: true, margin: "100px" }}
                            transition={{ duration: 0.6, delay: (bl.w * 0.02) + (bl.d * 0.01) }}
                        >
                            <div className="block-face block-face--top" />
                            <div className="block-face block-face--left" />
                            <div className="block-face block-face--right" />
                            {bl.val > 2 && <div className="block-glow" />}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="leetcode-legend">
                <span>Less</span>
                <div className="legend-box" style={{ background: 'rgba(30, 20, 10, 0.4)' }} />
                <div className="legend-box" style={{ background: '#9a3412' }} />
                <div className="legend-box" style={{ background: '#c2410c' }} />
                <div className="legend-box" style={{ background: '#ea580c' }} />
                <div className="legend-box" style={{ background: '#ffa116', boxShadow: '0 0 10px #ffa116' }} />
                <span>More</span>
            </div>
        </section>
    )
}

export default LeetCodeCity
