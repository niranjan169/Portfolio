import { useState, useEffect } from 'react'
import useAudio from './useAudio'

const useKonamiCode = (secretCode = ['l', 'u', 'f', 'f', 'y']) => {
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [inputFocus, setInputFocus] = useState([])
    const { playPowerUp } = useAudio()

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isUnlocked) return

            const key = e.key.toLowerCase()
            const currentFocus = [...inputFocus, key]

            // Only keep the recent keystrokes matching the length of the secret code
            if (currentFocus.length > secretCode.length) {
                currentFocus.shift()
            }

            setInputFocus(currentFocus)

            // Check if arrays match
            const isMatch = currentFocus.length === secretCode.length &&
                currentFocus.every((val, index) => val === secretCode[index])

            if (isMatch) {
                setIsUnlocked(true)
                playPowerUp() // Play the heavy sci-fi sound

                // Add a global CSS class to trigger the Golden Haki state
                document.body.classList.add('konami-unlocked')

                // Optionally remove the class after 10 seconds to drain the Haki
                setTimeout(() => {
                    document.body.classList.remove('konami-unlocked')
                    setIsUnlocked(false)
                    setInputFocus([])
                }, 15000)
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [inputFocus, isUnlocked, secretCode, playPowerUp])

    return isUnlocked
}

export default useKonamiCode
