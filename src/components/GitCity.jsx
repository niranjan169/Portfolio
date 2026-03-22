import { motion } from 'framer-motion'
import './GitCity.css'

// Simulating a year of GitHub contributions (flattened for 3D grid)
// Values 0-4 represent contribution intensity (0=none, 4=high)
const generateMockData = () => {
    const weeks = 20 // Show last 20 weeks for visual density
    const days = 7
    let grid = []
    for (let w = 0; w < weeks; w++) {
        for (let d = 0; d < days; d++) {
            // Random distribution strongly skewed to 0 and 1, occasional spikes
            const rand = Math.random()
            let val = 0
            if (rand > 0.6) val = 1
            if (rand > 0.85) val = 2
            if (rand > 0.95) val = 3
            if (rand > 0.98) val = 4
            grid.push({ w, d, val })
        }
    }
    return grid
}

const GitCity = () => {
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

    // Color intensity mapping (Dark Red theme)
    const getIntensityColor = (val) => {
        if (val === 0) return 'rgba(20, 15, 15, 0.4)'
        if (val === 1) return '#7f1d1d'
        if (val === 2) return '#be123c'
        if (val === 3) return '#e11d48'
        if (val === 4) return '#fb7185'
        return '#111'
    }

    return (
        <section className="gitcity-sec">
            <div className="section__header section__header--center">
                <span className="section__tag">Activity</span>
                <h2 className="section__title">GitHub Cityscape</h2>
                <p className="section__subtitle">A 3D isometric visualization of recent commit density</p>
            </div>

            <div className="gitcity-container">
                <div className="gitcity-grid">
                    {data.map((bl, i) => (
                        <motion.div
                            key={i}
                            className="gitcity-block"
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

            <div className="gitcity-legend">
                <span>Less</span>
                <div className="legend-box" style={{ background: 'rgba(20, 15, 15, 0.4)' }} />
                <div className="legend-box" style={{ background: '#7f1d1d' }} />
                <div className="legend-box" style={{ background: '#be123c' }} />
                <div className="legend-box" style={{ background: '#e11d48' }} />
                <div className="legend-box" style={{ background: '#fb7185', boxShadow: '0 0 10px #fb7185' }} />
                <span>More</span>
            </div>
        </section>
    )
}

export default GitCity
