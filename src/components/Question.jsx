import React from 'react';
import './Question.css';

const Question = ({ question, selectedAnswer, onAnswerSelect, showExplanation }) => {
  return (
    <div className="question-container">
      <div className="question-header">
        <span className="category-badge">{question.category}</span>
        <span className="topic-badge">{question.topic}</span>
      </div>
      
      <h2 className="question-text">{question.question}</h2>
      
      <div className="options-container">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedAnswer === index ? 'selected' : ''} 
              ${showExplanation && index === question.correctAnswer ? 'correct' : ''}
              ${showExplanation && selectedAnswer === index && index !== question.correctAnswer ? 'incorrect' : ''}`}
            onClick={() => !showExplanation && onAnswerSelect(index)}
          >
            <span className="option-label">{String.fromCharCode(65 + index)}.</span>
            <span className="option-text">{option}</span>
          </div>
        ))}
      </div>
      
      {showExplanation && (
        <div className="explanation">
          <h3>Explanation:</h3>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default Question;
