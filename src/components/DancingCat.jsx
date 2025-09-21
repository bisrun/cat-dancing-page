import { useEffect } from 'react'
import catSvg from '../assets/images/cat.svg'
import '../styles/animations.css'

function DancingCat({ isAnimating, currentDance, onCatClick, animationSpeed }) {
  const danceStyles = [
    'bounce',
    'wiggle',
    'spin',
    'pulse',
    'swing'
  ]

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        const randomDance = danceStyles[Math.floor(Math.random() * danceStyles.length)]
        // 부모 컴포넌트에서 관리하도록 변경 예정
      }, 2000 / animationSpeed)

      return () => clearInterval(interval)
    }
  }, [isAnimating, animationSpeed])

  const handleCatClick = () => {
    onCatClick?.()
  }

  return (
    <div className="dancing-cat-container">
      <div
        className={`dancing-cat ${isAnimating ? 'auto-dance' : ''} ${currentDance}`}
        onClick={handleCatClick}
        role="button"
        tabIndex={0}
        aria-label="댄싱 고양이 - 클릭하면 춤을 춥니다"
        style={{
          animationDuration: `${2 / animationSpeed}s`,
          '--animation-speed': animationSpeed
        }}
      >
        <img
          src={catSvg}
          alt="귀여운 댄싱 고양이"
          className="cat-image"
        />
        <div className="dance-effects">
          <span className="sparkle sparkle-1">✨</span>
          <span className="sparkle sparkle-2">⭐</span>
          <span className="sparkle sparkle-3">💫</span>
          <span className="sparkle sparkle-4">🌟</span>
        </div>
      </div>

      <div className="cat-status">
        {isAnimating ? (
          <p className="status-text dancing">
            🎵 자동 댄싱 모드 (속도: {animationSpeed}x) 🎵
          </p>
        ) : (
          <p className="status-text idle">클릭해서 춤춰보세요! 🐾</p>
        )}
        <div className="current-dance-info">
          <small>현재 춤: {currentDance}</small>
        </div>
      </div>
    </div>
  )
}

export default DancingCat