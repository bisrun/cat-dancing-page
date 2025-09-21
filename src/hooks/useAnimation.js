import { useState, useEffect, useCallback } from 'react'

export function useAnimation() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [currentDance, setCurrentDance] = useState('bounce')
  const [danceCount, setDanceCount] = useState(0)

  const danceStyles = ['bounce', 'wiggle', 'spin', 'pulse', 'swing']

  // 키보드 제어
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.code) {
        case 'Space':
          event.preventDefault()
          toggleAnimation()
          break
        case 'KeyR':
          event.preventDefault()
          resetStats()
          break
        case 'KeyD':
          event.preventDefault()
          triggerRandomDance()
          break
        default:
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [isAnimating])

  const toggleAnimation = useCallback(() => {
    setIsAnimating(prev => {
      const newState = !prev
      if (newState) {
        setDanceCount(count => count + 1)
      }
      return newState
    })
  }, [])

  const triggerRandomDance = useCallback(() => {
    const randomDance = danceStyles[Math.floor(Math.random() * danceStyles.length)]
    setCurrentDance(randomDance)
    setDanceCount(count => count + 1)

    if (!isAnimating) {
      setTimeout(() => {
        setCurrentDance('bounce')
      }, 2000)
    }
  }, [isAnimating])

  const resetStats = useCallback(() => {
    setDanceCount(0)
    setIsAnimating(false)
    setCurrentDance('bounce')
  }, [])

  const setSpeed = useCallback((speed) => {
    setAnimationSpeed(Math.max(0.5, Math.min(3, speed)))
  }, [])

  const getCatMood = useCallback(() => {
    if (danceCount > 10) return '😸 매우 행복'
    if (danceCount > 5) return '😊 기분 좋음'
    if (danceCount > 2) return '😺 보통'
    return '😴 졸림'
  }, [danceCount])

  return {
    isAnimating,
    animationSpeed,
    currentDance,
    danceCount,
    danceStyles,
    toggleAnimation,
    triggerRandomDance,
    resetStats,
    setSpeed,
    getCatMood,
    setCurrentDance
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback((value) => {
    try {
      setStoredValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error)
    }
  }, [key])

  return [storedValue, setValue]
}