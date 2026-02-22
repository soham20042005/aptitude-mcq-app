import React, { useState } from "react";
import "./ScoreCard.css";

const ScoreCard = ({
  score,
  totalQuestions,
  onRestart,
  answers,
  questions,
}) => {
  const percentage = ((score / totalQuestions) * 100).toFixed(1);
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const getGrade = () => {
    if (percentage >= 90) return { grade: "A+", message: "Outstanding!" };
    if (percentage >= 80) return { grade: "A", message: "Excellent!" };
    if (percentage >= 70) return { grade: "B", message: "Good Job!" };
    if (percentage >= 60) return { grade: "C", message: "Fair" };
    return { grade: "D", message: "Needs Improvement" };
  };

  const { grade, message } = getGrade();

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

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

      <div className="answer-review">
        <h3>Answer Review</h3>
        {questions.map((q, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === q.correctAnswer;
          const isExpanded = expandedQuestion === index;
          const isUnanswered = userAnswer === undefined || userAnswer === null;

          return (
            <div
              key={q.id}
              className={`review-item ${isCorrect ? "review-correct" : "review-incorrect"}`}
            >
              <div
                className="review-header"
                onClick={() => toggleQuestion(index)}
              >
                <div className="review-header-left">
                  <span
                    className={`review-status ${isCorrect ? "status-correct" : "status-incorrect"}`}
                  >
                    {isCorrect ? "✓" : "✗"}
                  </span>
                  <span className="review-q-num">Q{index + 1}.</span>
                  <span className="review-q-text">{q.question}</span>
                </div>
                <span
                  className={`review-expand-icon ${isExpanded ? "expanded" : ""}`}
                >
                  ▼
                </span>
              </div>

              {isExpanded && (
                <div className="review-details">
                  <div className="review-options">
                    {q.options.map((option, optIdx) => {
                      let optionClass = "review-option";
                      if (optIdx === q.correctAnswer)
                        optionClass += " review-option-correct";
                      if (optIdx === userAnswer && !isCorrect)
                        optionClass += " review-option-wrong";

                      return (
                        <div key={optIdx} className={optionClass}>
                          <span className="review-option-label">
                            {String.fromCharCode(65 + optIdx)}.
                          </span>
                          <span className="review-option-text">{option}</span>
                          {optIdx === q.correctAnswer && (
                            <span className="review-tag correct-tag">
                              Correct Answer
                            </span>
                          )}
                          {optIdx === userAnswer &&
                            optIdx !== q.correctAnswer && (
                              <span className="review-tag wrong-tag">
                                Your Answer
                              </span>
                            )}
                          {optIdx === userAnswer &&
                            optIdx === q.correctAnswer && (
                              <span className="review-tag correct-tag">
                                Your Answer ✓
                              </span>
                            )}
                        </div>
                      );
                    })}
                  </div>
                  {isUnanswered && (
                    <p className="review-unanswered">
                      You did not answer this question.
                    </p>
                  )}
                  {q.explanation && (
                    <div className="review-explanation">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="restart-btn" onClick={onRestart}>
        Take Test Again
      </button>
      <button className="restart-btn" onClick={() => window.location.href = "/Dashboard.jsx"}>back</button>
    </div>
  );
};

export default ScoreCard;
