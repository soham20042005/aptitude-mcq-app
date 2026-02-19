import React, { useState, useEffect, useRef, useCallback } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Question from './components/Question';
import Navigation from './components/Navigation';
import ScoreCard from './components/ScoreCard';
import TabWarning from './components/TabWarning';
import apiService from './services/api';
import allQuestions from './data/questions.json';
import './App.css';

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Test config
  const [testDuration, setTestDuration] = useState(60); // in minutes
  const [timeRemaining, setTimeRemaining] = useState(0); // countdown in seconds
  const [questions, setQuestions] = useState([]); // shuffled questions for this test

  // Test state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  // Tab switch warning state
  const [tabWarnings, setTabWarnings] = useState(0);
  const [showTabWarning, setShowTabWarning] = useState(false);
  const MAX_WARNINGS = 3;

  const submitRef = useRef(null);

  // Check if user is already logged in
  useEffect(() => {
    const token = apiService.getToken();
    const savedUser = apiService.getUser();
    if (token && savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
  }, []);

  // Auto-submit handler (needs to be a ref so the timer/tab callbacks always have latest)
  const handleAutoSubmit = useCallback(async () => {
    if (showResults) return;
    const score = calculateScoreFromState();

    if (isAuthenticated) {
      const totalTime = testDuration * 60 - timeRemaining;
      const scoreData = {
        score,
        totalQuestions: questions.length,
        timeTaken: totalTime > 0 ? totalTime : testDuration * 60,
        answers: questions.map((q, index) => ({
          questionId: q.id,
          question: q.question,
          userAnswer: answers[index],
          correctAnswer: q.correctAnswer,
          isCorrect: answers[index] === q.correctAnswer
        }))
      };
      try { await apiService.saveScore(scoreData); } catch (e) { console.error('Error saving score:', e); }
    }
    setShowResults(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, questions, isAuthenticated, testDuration, timeRemaining, showResults]);

  // Keep a ref to the latest auto-submit
  useEffect(() => { submitRef.current = handleAutoSubmit; }, [handleAutoSubmit]);

  // ─── Countdown timer ───
  useEffect(() => {
    let timer;
    if (testStarted && !showResults && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            // Time's up – auto submit
            setTimeout(() => submitRef.current?.(), 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, showResults, timeRemaining]);

  // ─── Tab / visibility change detection ───
  useEffect(() => {
    if (!testStarted || showResults) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabWarnings(prev => {
          const newCount = prev + 1;
          if (newCount >= MAX_WARNINGS) {
            // Auto-submit on 3rd warning
            setTimeout(() => submitRef.current?.(), 100);
          } else {
            setShowTabWarning(true);
          }
          return newCount;
        });
      }
    };

    const handleWindowBlur = () => {
      setTabWarnings(prev => {
        const newCount = prev + 1;
        if (newCount >= MAX_WARNINGS) {
          setTimeout(() => submitRef.current?.(), 100);
        } else {
          setShowTabWarning(true);
        }
        return newCount;
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [testStarted, showResults]);

  // ─── Handlers ───
  const handleAnswerSelect = (answerIndex) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async () => {
    const score = calculateScoreFromState();

    if (isAuthenticated) {
      const totalTime = testDuration * 60 - timeRemaining;
      const scoreData = {
        score,
        totalQuestions: questions.length,
        timeTaken: totalTime,
        answers: questions.map((q, index) => ({
          questionId: q.id,
          question: q.question,
          userAnswer: answers[index],
          correctAnswer: q.correctAnswer,
          isCorrect: answers[index] === q.correctAnswer
        }))
      };
      try { await apiService.saveScore(scoreData); } catch (error) { console.error('Error saving score:', error); }
    }
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setShowResults(false);
    setTimeRemaining(0);
    setTestStarted(false);
    setShowDashboard(true);
    setTabWarnings(0);
    setShowTabWarning(false);
    setQuestions([]);
  };

  const calculateScoreFromState = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) score++;
    });
    return score;
  };

  const startTest = (durationMinutes, numQuestions) => {
    const duration = durationMinutes || testDuration;
    const count = numQuestions || allQuestions.length;
    setTestDuration(duration);
    setTimeRemaining(duration * 60);
    // Shuffle and pick the requested number of questions
    setQuestions(shuffleArray(allQuestions).slice(0, count));
    setTestStarted(true);
    setShowDashboard(false);
    setTabWarnings(0);
    setShowTabWarning(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setTestStarted(false);
    setShowDashboard(true);
    setShowResults(false);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(0);
    setTabWarnings(0);
    setQuestions([]);
  };

  // ─── Render ───

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  if (showDashboard && !testStarted) {
    return <Dashboard user={user} onStartTest={startTest} onLogout={handleLogout} />;
  }

  if (showResults) {
    const totalTime = testDuration * 60 - timeRemaining;
    return (
      <div className="app">
        <ScoreCard
          score={calculateScoreFromState()}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          answers={Object.values(answers)}
          questions={questions}
          timeElapsed={totalTime}
        />
      </div>
    );
  }

  return (
    <div className="app">
      {/* Tab warning overlay */}
      {showTabWarning && (
        <TabWarning
          warningCount={tabWarnings}
          maxWarnings={MAX_WARNINGS}
          onDismiss={() => setShowTabWarning(false)}
        />
      )}

      <header className="app-header">
        <div className="header-container">
          <div>
            <h1>Aptitude MCQ Test</h1>
            <p>{questions.length} Questions • {testDuration} Minutes</p>
          </div>
          <div className="header-right">
            {tabWarnings > 0 && (
              <div className="warning-badge">
                ⚠️ {tabWarnings}/{MAX_WARNINGS} warnings
              </div>
            )}
            <button className="back-to-dashboard-btn" onClick={() => {
              if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
                handleRestart();
              }
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M3 12h18M3 12l6-6M3 12l6 6" strokeWidth="2"/>
              </svg>
              Exit Test
            </button>
          </div>
        </div>
      </header>

      <div className="test-container">
        <Question
          question={questions[currentQuestionIndex]}
          selectedAnswer={answers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          showExplanation={false}
        />

        <Navigation
          currentQuestion={currentQuestionIndex}
          totalQuestions={questions.length}
          onNext={handleNext}
          onPrev={handlePrev}
          onSubmit={handleSubmit}
          hasAnswer={answers[currentQuestionIndex] !== undefined}
          timeRemaining={timeRemaining}
        />
      </div>
    </div>
  );
}

export default App;
