import React, { useState, useEffect } from "react";
import apiService from "../services/api";
import "./Dashboard.css";

const Dashboard = ({ user, onStartTest, onLogout }) => {
  const [statistics, setStatistics] = useState(null);
  const [history, setHistory] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [testDuration, setTestDuration] = useState(60); // default 60 minutes
  const [numQuestions, setNumQuestions] = useState(100); // default 100 questions
  const [showTestConfig, setShowTestConfig] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, historyData, leaderboardData] = await Promise.all([
        apiService.getStatistics(),
        apiService.getHistory(1, 5),
        apiService.getLeaderboard(10),
      ]);

      if (statsData.success) {
        setStatistics(statsData.statistics);
      }
      if (historyData.success) {
        setHistory(historyData.data);
      }
      if (leaderboardData.success) {
        setLeaderboard(leaderboardData.leaderboard);
      }
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="user-info">
            <div className="avatar">
              {user.fullName?.charAt(0) || user.username.charAt(0)}
            </div>
            <div>
              <h2>Welcome, {user.fullName || user.username}!</h2>
              <p>@{user.username}</p>
            </div>
          </div>
          <div className="header-actions">
            <button
              className="start-test-btn"
              onClick={() => setShowTestConfig(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M9 11l3 3L22 4" strokeWidth="2" />
                <path
                  d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                  strokeWidth="2"
                />
              </svg>
              Start New Test
            </button>
            <button className="logout-btn" onClick={onLogout}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"
                  strokeWidth="2"
                />
                <polyline points="16 17 21 12 16 7" strokeWidth="2" />
                <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: "var(--color-primary-light)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{statistics?.total_tests || 0}</h3>
              <p>Tests Taken</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: "var(--color-success-light)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-success)"
                strokeWidth="2"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{statistics?.avg_percentage || 0}%</h3>
              <p>Average Score</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: "var(--color-warning-light)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-warning)"
                strokeWidth="2"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{statistics?.best_percentage || 0}%</h3>
              <p>Best Score</p>
            </div>
          </div>

          <div className="stat-card">
            <div
              className="stat-icon"
              style={{
                background: "var(--color-primary-light)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="stat-info">
              <h3>{formatTime(statistics?.total_time_spent || 0)}</h3>
              <p>Time Spent</p>
            </div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Test History
          </button>
          <button
            className={`tab ${activeTab === "leaderboard" ? "active" : ""}`}
            onClick={() => setActiveTab("leaderboard")}
          >
            Leaderboard
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "overview" && (
            <div className="overview-content">
              <div className="recent-tests">
                <h3>Recent Tests</h3>
                {history.length === 0 ? (
                  <div className="empty-state">
                    <p>No tests taken yet. Start your first test!</p>
                  </div>
                ) : (
                  <div className="test-list">
                    {history.map((test) => (
                      <div key={test.id} className="test-item">
                        <div className="test-score">
                          <div
                            className={`score-circle ${test.percentage >= 70 ? "good" : test.percentage >= 50 ? "average" : "poor"}`}
                          >
                            {test.percentage}%
                          </div>
                        </div>
                        <div className="test-details">
                          <h4>
                            {test.score} / {test.total_questions} Correct
                          </h4>
                          <p>{formatDate(test.test_date)}</p>
                        </div>
                        <div className="test-time">
                          {formatTime(test.time_taken)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="history-content">
              <h3>Complete Test History</h3>
              {history.length === 0 ? (
                <div className="empty-state">
                  <p>No test history available.</p>
                </div>
              ) : (
                <div className="history-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((test) => (
                        <tr key={test.id}>
                          <td>{formatDate(test.test_date)}</td>
                          <td>
                            {test.score}/{test.total_questions}
                          </td>
                          <td>
                            <span
                              className={`badge ${test.percentage >= 70 ? "success" : test.percentage >= 50 ? "warning" : "danger"}`}
                            >
                              {test.percentage}%
                            </span>
                          </td>
                          <td>{formatTime(test.time_taken)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div className="leaderboard-content">
              <h3>Top Performers</h3>
              {leaderboard.length === 0 ? (
                <div className="empty-state">
                  <p>Leaderboard is empty.</p>
                </div>
              ) : (
                <div className="leaderboard-list">
                  {leaderboard.map((user, index) => (
                    <div key={index} className="leaderboard-item">
                      <div className="rank">
                        {index + 1 <= 3 ? (
                          <div className={`medal medal-${index + 1}`}>
                            #{index + 1}
                          </div>
                        ) : (
                          <span>#{index + 1}</span>
                        )}
                      </div>
                      <div className="user-avatar">
                        {user.full_name?.charAt(0) || user.username.charAt(0)}
                      </div>
                      <div className="user-details">
                        <h4>{user.full_name || user.username}</h4>
                        <p>
                          {user.total_tests} tests • Best: {user.best_score}%
                        </p>
                      </div>
                      <div className="user-score">
                        <strong>{user.avg_percentage}%</strong>
                        <span>Avg</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Test Configuration Modal */}
      {showTestConfig && (
        <div
          className="test-config-overlay"
          onClick={() => setShowTestConfig(false)}
        >
          <div
            className="test-config-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Configure Your Test</h2>
            <p className="config-subtitle">
              Choose how many questions and how long you want to practice
            </p>

            <div className="config-section">
              <label>Number of Questions</label>
              <div className="duration-options">
                {[10, 20, 30, 50, 75, 100].map((n) => (
                  <button
                    key={n}
                    className={`duration-btn ${numQuestions === n ? "active" : ""}`}
                    onClick={() => setNumQuestions(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="custom-duration">
                <label>Custom:</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={numQuestions}
                  onChange={(e) =>
                    setNumQuestions(
                      Math.max(
                        1,
                        Math.min(100, parseInt(e.target.value) || 100),
                      ),
                    )
                  }
                />
              </div>
            </div>

            <div className="config-section">
              <label>Test Duration</label>
              <div className="duration-options">
                {[15, 30, 45, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    className={`duration-btn ${testDuration === mins ? "active" : ""}`}
                    onClick={() => setTestDuration(mins)}
                  >
                    {mins < 60
                      ? `${mins} min`
                      : `${mins / 60} hr${mins > 60 ? "s" : ""}`}
                  </button>
                ))}
              </div>
              <div className="custom-duration">
                <label>Custom (minutes):</label>
                <input
                  type="number"
                  min="5"
                  max="180"
                  value={testDuration}
                  onChange={(e) =>
                    setTestDuration(
                      Math.max(
                        5,
                        Math.min(180, parseInt(e.target.value) || 60),
                      ),
                    )
                  }
                />
              </div>
            </div>

            <div className="config-info">
              <div className="config-info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                <span>{numQuestions} Questions</span>
              </div>
              <div className="config-info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                <span>Random Order</span>
              </div>
              <div className="config-info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>{testDuration} Minutes</span>
              </div>
              <div className="config-info-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <span>3 Tab-Switch Warnings</span>
              </div>
            </div>

            <div className="config-warning">
              <strong>Important:</strong> Switching tabs or opening other
              apps will trigger warnings. After 3 warnings, your test will be
              auto-submitted.
            </div>

            <div className="config-actions">
              <button
                className="config-cancel-btn"
                onClick={() => setShowTestConfig(false)}
              >
                Cancel
              </button>
              <button
                className="config-start-btn"
                onClick={() => {
                  setShowTestConfig(false);
                  onStartTest(testDuration, numQuestions);
                }}
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
