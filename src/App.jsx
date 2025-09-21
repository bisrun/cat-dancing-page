import { useEffect } from 'react'
import DancingCat from './components/DancingCat'
import AnimationControls from './components/AnimationControls'
import { useAnimation, useLocalStorage } from './hooks/useAnimation'
import './styles/global.css'

function App() {
  const animation = useAnimation()
  const [savedStats, setSavedStats] = useLocalStorage('catDancingStats', {
    totalDances: 0,
    bestMood: '😴 졸림',
    firstVisit: new Date().toISOString()
  })

  // 통계 저장
  useEffect(() => {
    setSavedStats(prev => ({
      ...prev,
      totalDances: Math.max(prev.totalDances, animation.danceCount),
      bestMood: animation.danceCount > 10 ? '😸 매우 행복' : prev.bestMood,
      lastVisit: new Date().toISOString()
    }))
  }, [animation.danceCount, setSavedStats])

  return (
    <div className="app">
      <header className="app-header">
        <h1>고양이 댄싱 페이지</h1>
        <p>클릭해서 고양이와 함께 춤춰보세요! 🐱</p>
        <div className="keyboard-shortcuts">
          <small>
            키보드 단축키: 스페이스(시작/정지) | D(랜덤춤) | R(리셋)
          </small>
        </div>
      </header>

      <main className="app-main">
        <DancingCat
          isAnimating={animation.isAnimating}
          currentDance={animation.currentDance}
          onCatClick={animation.triggerRandomDance}
          animationSpeed={animation.animationSpeed}
        />
        <AnimationControls
          animation={animation}
          savedStats={savedStats}
        />
      </main>
    </div>
  )
}

export default App
