import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import useAudio from '../hooks/useAudio'

/**
 * MagneticButton wrapping component uses framer-motion springs
 * to physically pull the interior children towards the user's mouse cursor
 */
const MagneticButton = ({ children, className = '', onClick }) => {
    const ref = useRef(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const { playHover } = useAudio()
    const hitRef = useRef(false)

    const handleMouse = (e) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current.getBoundingClientRect()

        // Calculate center of the button bounding box
        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        // Apply magnetic pull factor (stronger in middle, weaker at edges)
        // 0.3 means the button travels ~30% of the distance to the mouse
        setPosition({ x: middleX * 0.35, y: middleY * 0.35 })

        if (!hitRef.current) {
            playHover()
            hitRef.current = true
        }
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 })
        hitRef.current = false
    }

    const snapToClick = (e) => {
        reset()
        if (onClick) onClick(e)
    }

    return (
        <motion.div
            ref={ref}
            onPointerMove={handleMouse}
            onPointerLeave={reset}
            onClick={snapToClick}
            className={`magnetic-wrap ${className}`}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-flex' }}
        >
            {children}
        </motion.div>
    )
}

export default MagneticButton
