import { useState } from 'react'

function AnimationControls({ animation, savedStats }) {
  const [showStats, setShowStats] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  return (
    <div className="animation-controls">
      <div className="control-panel">
        <button
          className={`control-button ${animation.isAnimating ? 'stop' : 'start'}`}
          onClick={animation.toggleAnimation}
          aria-label={animation.isAnimating ? '애니메이션 정지' : '애니메이션 시작'}
        >
          <span className="button-icon">
            {animation.isAnimating ? '⏹️' : '▶️'}
          </span>
          <span className="button-text">
            {animation.isAnimating ? '정지' : '자동 댄싱'}
          </span>
        </button>

        <button
          className="control-button secondary"
          onClick={animation.triggerRandomDance}
          aria-label="랜덤 춤"
        >
          <span className="button-icon">🎲</span>
          <span className="button-text">랜덤 춤</span>
        </button>

        <button
          className="stats-button"
          onClick={() => setShowStats(!showStats)}
          aria-label="통계 보기"
        >
          📊 통계
        </button>

        <button
          className="stats-button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          aria-label="고급 설정"
        >
          ⚙️ 설정
        </button>
      </div>

      {showAdvanced && (
        <div className="advanced-panel">
          <h3>고급 설정</h3>
          <div className="speed-control">
            <label htmlFor="speed-slider">애니메이션 속도: {animation.animationSpeed}x</label>
            <input
              id="speed-slider"
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={animation.animationSpeed}
              onChange={(e) => animation.setSpeed(parseFloat(e.target.value))}
              className="speed-slider"
            />
          </div>
          <div className="dance-selector">
            <label>춤 스타일 선택:</label>
            <div className="dance-buttons">
              {animation.danceStyles.map(dance => (
                <button
                  key={dance}
                  className={`dance-button ${animation.currentDance === dance ? 'active' : ''}`}
                  onClick={() => animation.setCurrentDance(dance)}
                >
                  {dance}
                </button>
              ))}
            </div>
          </div>
          <button
            className="reset-button"
            onClick={animation.resetStats}
            aria-label="통계 리셋"
          >
            🔄 리셋
          </button>
        </div>
      )}

      {showStats && (
        <div className="stats-panel">
          <h3>댄싱 통계</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">이번 세션:</span>
              <span className="stat-value">{animation.danceCount}회</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">총 댄싱 횟수:</span>
              <span className="stat-value">{savedStats.totalDances}회</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">현재 상태:</span>
              <span className="stat-value">
                {animation.isAnimating ? '🎵 댄싱 중' : '😴 휴식 중'}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">고양이 기분:</span>
              <span className="stat-value">{animation.getCatMood()}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">최고 기록:</span>
              <span className="stat-value">{savedStats.bestMood}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">첫 방문:</span>
              <span className="stat-value">
                {new Date(savedStats.firstVisit).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="control-tips">
        <p>💡 팁: 고양이를 직접 클릭해도 춤을 춘답니다!</p>
        <p>🎮 키보드: 스페이스(시작/정지) | D(랜덤춤) | R(리셋)</p>
      </div>
    </div>
  )
}

export default AnimationControls