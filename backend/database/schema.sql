-- Create database
CREATE DATABASE IF NOT EXISTS aptitude_db;
USE aptitude_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_username (username),
  INDEX idx_email (email)
);

-- Test sessions table
CREATE TABLE IF NOT EXISTS test_sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  score INT NOT NULL,
  total_questions INT NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  time_taken INT NOT NULL COMMENT 'Time in seconds',
  correct_answers INT NOT NULL,
  wrong_answers INT NOT NULL,
  test_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  answers JSON COMMENT 'Stores user answers and question details',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_test_date (test_date)
);

-- User statistics view
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
  u.id,
  u.username,
  u.full_name,
  COUNT(ts.id) as total_tests,
  ROUND(AVG(ts.percentage), 2) as avg_percentage,
  MAX(ts.percentage) as best_percentage,
  MIN(ts.percentage) as lowest_percentage,
  SUM(ts.time_taken) as total_time_spent
FROM users u
LEFT JOIN test_sessions ts ON u.id = ts.user_id
GROUP BY u.id, u.username, u.full_name;

-- Sample data (optional - remove in production)
-- INSERT INTO users (username, email, password, full_name) 
-- VALUES ('demo', 'demo@example.com', '$2a$10$demo_hashed_password', 'Demo User');
