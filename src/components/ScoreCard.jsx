import React from 'react';
import './ScoreCard.css';

const ScoreCard = ({ score, totalQuestions, onRestart, answers, questions }) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!' };
    if (percentage >= 70) return { grade: 'B', message: 'Good Job!' };
    if (percentage >= 60) return { grade: 'C', message: 'Fair' };
    return { grade: 'D', message: 'Needs Improvement' };
  };
  
  const { grade, message } = getGrade();
  
  return (
    <div className="score-card">
      <div className="score-header">
        <h1>Test Completed!</h1>
        <div className="grade-display">{grade}</div>
      </div>
      
      <div className="score-details">
        <div className="score-metric">
          <span className="metric-value">{score}</span>
          <span className="metric-label">Correct Answers</span>
        </div>
        <div className="score-metric">
          <span className="metric-value">{totalQuestions - score}</span>
          <span className="metric-label">Incorrect Answers</span>
        </div>
        <div className="score-metric">
          <span className="metric-value">{percentage}%</span>
          <span className="metric-label">Percentage</span>
        </div>
      </div>
      
      <div className="message">
        <h2>{message}</h2>
      </div>
      
      <div className="answer-summary">
        <h3>Answer Summary:</h3>
        {questions.map((q, index) => (
          <div key={q.id} className="summary-item">
            <span className="q-num">Q{index + 1}:</span>
            <span className={answers[index] === q.correctAnswer ? 'correct-mark' : 'incorrect-mark'}>
              {answers[index] === q.correctAnswer ? '✓' : '✗'}
            </span>
            <span className="q-topic">{q.topic}</span>
          </div>
        ))}
      </div>
      
      <button className="restart-btn" onClick={onRestart}>
        Take Test Again
      </button>
    </div>
  );
};

export default ScoreCard;
