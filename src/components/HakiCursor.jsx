import { useEffect, useRef } from 'react'
import './HakiCursor.css'

const HakiCursor = () => {
    const canvasRef = useRef(null)
    const pointsRef = useRef([])
    const mouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

    // Fallback for React Router if needed to reset on navigation


    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId

        // Haki Settings
        const MAX_POINTS = 25
        const LIGHTNING_SEGMENTS = 3
        const JITTER = 8

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const onMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY }
            pointsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 })
            if (pointsRef.current.length > MAX_POINTS) {
                pointsRef.current.shift()
            }
        }

        window.addEventListener('resize', resize)
        window.addEventListener('mousemove', onMouseMove)
        resize()

        const drawLightning = (p1, p2, opacity) => {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            let currX = p1.x
            let currY = p1.y

            for (let i = 1; i <= LIGHTNING_SEGMENTS; i++) {
                const targetX = p1.x + (p2.x - p1.x) * (i / LIGHTNING_SEGMENTS)
                const targetY = p1.y + (p2.y - p1.y) * (i / LIGHTNING_SEGMENTS)

                // Add jitter
                const jx = targetX + (Math.random() - 0.5) * JITTER
                const jy = targetY + (Math.random() - 0.5) * JITTER

                ctx.lineTo(jx, jy)
                currX = jx; currY = jy
            }

            const isGolden = document.body.classList.contains('konami-unlocked')

            // Base glowing core (Golden)
            ctx.strokeStyle = isGolden ? `rgba(255, 215, 0, ${opacity})` : `rgba(180, 10, 30, ${opacity})`
            ctx.lineWidth = 1.5
            ctx.stroke()

            // Inner lightning (White when golden)
            ctx.strokeStyle = isGolden ? `rgba(255, 255, 255, ${opacity * 0.8})` : `rgba(0, 0, 0, ${opacity * 0.8})`
            ctx.lineWidth = 0.5
            ctx.stroke()
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const points = pointsRef.current

            // Update age
            for (let i = 0; i < points.length; i++) {
                points[i].age += 1
            }

            // Remove dead points
            while (points.length > 0 && points[0].age > MAX_POINTS) {
                points.shift()
            }

            // Draw erratic Haki lightning connecting the points
            if (points.length > 1) {
                for (let i = 0; i < points.length - 1; i++) {
                    const p1 = points[i]
                    const p2 = points[i + 1]
                    const opacity = 1 - (p1.age / MAX_POINTS)

                    // Main black/red lightning strike between historical points
                    drawLightning(p1, p2, opacity)

                    // Branching arcs for chaos (Haki feel)
                    if (Math.random() > 0.6) {
                        const branchEnd = {
                            x: p2.x + (Math.random() - 0.5) * 40,
                            y: p2.y + (Math.random() - 0.5) * 40
                        }
                        drawLightning(p1, branchEnd, opacity * 0.5)
                    }
                }
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="haki-cursor"
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100vw', height: '100vh',
                pointerEvents: 'none',
                zIndex: 9998
            }}
        />
    )
}

export default HakiCursor
