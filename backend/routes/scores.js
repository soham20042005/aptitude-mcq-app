import express from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Save test session
router.post('/save',
  authenticateToken,
  [
    body('score').isInt({ min: 0 }).withMessage('Score must be a positive integer'),
    body('totalQuestions').isInt({ min: 1 }).withMessage('Total questions must be at least 1'),
    body('timeTaken').isInt({ min: 0 }).withMessage('Time taken must be a positive integer'),
    body('answers').isArray().withMessage('Answers must be an array')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
          success: false, 
          errors: errors.array() 
        });
      }

      const { score, totalQuestions, timeTaken, answers } = req.body;
      const userId = req.user.id;

      const percentage = ((score / totalQuestions) * 100).toFixed(2);
      const correctAnswers = score;
      const wrongAnswers = totalQuestions - score;

      const [result] = await pool.query(
        `INSERT INTO test_sessions 
        (user_id, score, total_questions, percentage, time_taken, correct_answers, wrong_answers, answers) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [userId, score, totalQuestions, percentage, timeTaken, correctAnswers, wrongAnswers, JSON.stringify(answers)]
      );

      res.status(201).json({
        success: true,
        message: 'Test session saved successfully',
        sessionId: result.insertId,
        data: {
          score,
          totalQuestions,
          percentage,
          timeTaken
        }
      });
    } catch (error) {
      console.error('Save score error:', error);
      res.status(500).json({
        success: false,
        message: 'Error saving test session'
      });
    }
  }
);

// Get user's test history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [sessions] = await pool.query(
      `SELECT id, score, total_questions, percentage, time_taken, 
       correct_answers, wrong_answers, test_date 
       FROM test_sessions 
       WHERE user_id = ? 
       ORDER BY test_date DESC 
       LIMIT ? OFFSET ?`,
      [userId, limit, offset]
    );

    const [countResult] = await pool.query(
      'SELECT COUNT(*) as total FROM test_sessions WHERE user_id = ?',
      [userId]
    );

    res.json({
      success: true,
      data: sessions,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching test history'
    });
  }
});

// Get user statistics
router.get('/statistics', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const [stats] = await pool.query(
      `SELECT 
        COUNT(*) as total_tests,
        ROUND(AVG(percentage), 2) as avg_percentage,
        MAX(percentage) as best_percentage,
        MIN(percentage) as lowest_percentage,
        SUM(time_taken) as total_time_spent,
        MAX(score) as highest_score
       FROM test_sessions 
       WHERE user_id = ?`,
      [userId]
    );

    // Get recent improvement trend (last 5 tests)
    const [recentTests] = await pool.query(
      `SELECT percentage, test_date 
       FROM test_sessions 
       WHERE user_id = ? 
       ORDER BY test_date DESC 
       LIMIT 5`,
      [userId]
    );

    res.json({
      success: true,
      statistics: stats[0],
      recentTrend: recentTests.reverse()
    });
  } catch (error) {
    console.error('Get statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics'
    });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;

    const [leaderboard] = await pool.query(
      `SELECT 
        u.username,
        u.full_name,
        COUNT(ts.id) as total_tests,
        ROUND(AVG(ts.percentage), 2) as avg_percentage,
        MAX(ts.percentage) as best_score
       FROM users u
       INNER JOIN test_sessions ts ON u.id = ts.user_id
       GROUP BY u.id, u.username, u.full_name
       ORDER BY avg_percentage DESC, total_tests DESC
       LIMIT ?`,
      [limit]
    );

    res.json({
      success: true,
      leaderboard
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leaderboard'
    });
  }
});

export default router;
