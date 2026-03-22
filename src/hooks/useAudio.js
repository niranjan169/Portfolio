import { useState, useEffect, useCallback } from 'react'

// Lightweight synthesized UI sounds using Web Audio API so we don't need external generic mp3 files.
// This is extremely high performance and ensures the audio context unlocks properly.

const useAudio = () => {
    const [audioCtx, setAudioCtx] = useState(null)
    const [muted, setMuted] = useState(() => {
        return localStorage.getItem('portfolio-muted') === 'true'
    })

    // Init Audio Context on first interaction
    useEffect(() => {
        const initAudio = () => {
            if (!audioCtx) {
                const ctx = new (window.AudioContext || window.webkitAudioContext)()
                setAudioCtx(ctx)
            }
        }
        window.addEventListener('click', initAudio, { once: true })
        window.addEventListener('keydown', initAudio, { once: true })
        return () => {
            window.removeEventListener('click', initAudio)
            window.removeEventListener('keydown', initAudio)
        }
    }, [audioCtx])

    // Save mute state
    useEffect(() => {
        localStorage.setItem('portfolio-muted', muted)
    }, [muted])

    const playHover = useCallback(() => {
        if (muted || !audioCtx) return
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)

        // High-tech subtle tick
        osc.type = 'sine'
        osc.frequency.setValueAtTime(800, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.05)

        gain.gain.setValueAtTime(0, audioCtx.currentTime)
        gain.gain.linearRampToValueAtTime(0.02, audioCtx.currentTime + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)

        osc.start()
        osc.stop(audioCtx.currentTime + 0.05)
    }, [audioCtx, muted])

    const playClick = useCallback(() => {
        if (muted || !audioCtx) return
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)

        // Deep bass thud down
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(150, audioCtx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1)

        gain.gain.setValueAtTime(0.2, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2)

        osc.start()
        osc.stop(audioCtx.currentTime + 0.2)
    }, [audioCtx, muted])

    const playPowerUp = useCallback(() => {
        if (muted || !audioCtx) return
        // Used for terminal open, major success states
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.connect(gain)
        gain.connect(audioCtx.destination)

        osc.type = 'square'
        osc.frequency.setValueAtTime(100, audioCtx.currentTime)
        osc.frequency.linearRampToValueAtTime(600, audioCtx.currentTime + 0.3)

        gain.gain.setValueAtTime(0, audioCtx.currentTime)
        gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.15)
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4)

        osc.start()
        osc.stop(audioCtx.currentTime + 0.4)
    }, [audioCtx, muted])

    return { playHover, playClick, playPowerUp, muted, setMuted }
}

export default useAudio
