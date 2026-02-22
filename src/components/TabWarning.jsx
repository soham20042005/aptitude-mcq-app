import React from "react";
import "./TabWarning.css";

const TabWarning = ({ warningCount, maxWarnings, onDismiss }) => {
  const remaining = maxWarnings - warningCount;

  return (
    <div className="tab-warning-overlay">
      <div className="tab-warning-modal">
        <div className="warning-icon-container">
          <div className="warning-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
        </div>

        <h2>Tab Switch Detected!</h2>

        <p className="warning-message">
          You switched away from the test. This is{" "}
          <strong>
            warning {warningCount} of {maxWarnings}
          </strong>
          .
        </p>

        <div className="warning-progress">
          {Array.from({ length: maxWarnings }, (_, i) => (
            <div
              key={i}
              className={`warning-dot ${i < warningCount ? "used" : ""}`}
            />
          ))}
        </div>

        {remaining > 0 ? (
          <p className="warning-remaining">
            {remaining} warning{remaining > 1 ? "s" : ""} remaining. After that,
            your test will be <strong>auto-submitted</strong>.
          </p>
        ) : (
          <p className="warning-remaining critical">
            This was your last warning! Your test is being submitted now...
          </p>
        )}

        <button className="warning-dismiss-btn" onClick={onDismiss}>
          I Understand, Continue Test
        </button>
      </div>
    </div>
  );
};

export default TabWarning;
