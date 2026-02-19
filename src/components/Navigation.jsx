import React from 'react';
import './Navigation.css';

const Navigation = ({ 
  currentQuestion, 
  totalQuestions, 
  onNext, 
  onPrev, 
  onSubmit,
  hasAnswer,
  timeRemaining
}) => {
  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemaining <= 300; // 5 minutes
  const isCriticalTime = timeRemaining <= 60; // 1 minute

  return (
    <div className="navigation-container">
      <div className="progress-section">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
      </div>
      
      <div className={`timer ${isLowTime ? 'timer-warning' : ''} ${isCriticalTime ? 'timer-critical' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" strokeWidth="2"/>
          <path d="M12 6v6l4 2" strokeWidth="2"/>
        </svg>
        {formatTime(timeRemaining)}
      </div>
      
      <div className="nav-buttons">
        <button 
          className="nav-btn prev-btn" 
          onClick={onPrev}
          disabled={currentQuestion === 0}
        >
          ← Previous
        </button>
        
        {currentQuestion < totalQuestions - 1 ? (
          <button 
            className="nav-btn next-btn" 
            onClick={onNext}
            disabled={!hasAnswer}
          >
            Next →
          </button>
        ) : (
          <button 
            className="nav-btn submit-btn" 
            onClick={onSubmit}
          >
            Submit Test
          </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;
