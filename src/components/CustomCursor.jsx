import { useEffect, useState, useRef } from 'react'
import './CustomCursor.css'

const CustomCursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const trailsRef = useRef([])
    const [visible, setVisible] = useState(false)
    const [clicking, setClicking] = useState(false)
    const [hovering, setHovering] = useState(false)
    const pos = useRef({ x: 0, y: 0 })
    const ringPos = useRef({ x: 0, y: 0 })
    const rafRef = useRef(null)

    useEffect(() => {
        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY }
            if (!visible) setVisible(true)
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            }
        }

        const onDown = () => setClicking(true)
        const onUp = () => setClicking(false)
        const onLeave = () => setVisible(false)
        const onEnter = () => setVisible(true)

        const onHoverStart = (e) => {
            const el = e.target
            if (el.closest('a, button, .project-card, .skill-card, .achievement-card')) {
                setHovering(true)
            }
        }
        const onHoverEnd = () => setHovering(false)

        const animate = () => {
            const dx = pos.current.x - ringPos.current.x
            const dy = pos.current.y - ringPos.current.y
            ringPos.current.x += dx * 0.14
            ringPos.current.y += dy * 0.14
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`
            }
            rafRef.current = requestAnimationFrame(animate)
        }
        rafRef.current = requestAnimationFrame(animate)

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mousedown', onDown)
        window.addEventListener('mouseup', onUp)
        document.documentElement.addEventListener('mouseleave', onLeave)
        document.documentElement.addEventListener('mouseenter', onEnter)
        document.addEventListener('mouseover', onHoverStart)
        document.addEventListener('mouseout', onHoverEnd)

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousedown', onDown)
            window.removeEventListener('mouseup', onUp)
            document.documentElement.removeEventListener('mouseleave', onLeave)
            document.documentElement.removeEventListener('mouseenter', onEnter)
            document.removeEventListener('mouseover', onHoverStart)
            document.removeEventListener('mouseout', onHoverEnd)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [visible])

    return (
        <>
            <div
                ref={dotRef}
                className={`cursor__dot ${clicking ? 'cursor__dot--click' : ''} ${!visible ? 'cursor--hidden' : ''}`}
            />
            <div
                ref={ringRef}
                className={`cursor__ring ${hovering ? 'cursor__ring--hover' : ''} ${clicking ? 'cursor__ring--click' : ''} ${!visible ? 'cursor--hidden' : ''}`}
            />
        </>
    )
}

export default CustomCursor
