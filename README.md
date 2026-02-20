# Aptitude MCQ Test App

A full-stack React application with MySQL backend for aptitude testing, featuring authentication, dashboard, and score tracking.

## ✨ Features

### 🔐 Authentication System

- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Session management

### 📊 Dashboard

- View personal statistics (tests taken, average score, best score)
- Track complete test history
- See performance trends
- Compare with leaderboard of top performers

### 🎯 Interactive Testing

- Real-time timer
- Animated UI transitions
- Progress tracking with visual indicators
- Instant feedback
- Detailed explanations for each answer

### 💾 Database Integration

- MySQL database for persistent storage
- User management
- Test session tracking
- Score history and statistics

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MySQL Server (v5.7+)

### Installation

1. **Setup MySQL Database**

   ```bash
   # Login to MySQL
   mysql -u root -p

   # Create database and import schema
   CREATE DATABASE aptitude_db;
   USE aptitude_db;
   source backend/database/schema.sql;
   ```

2. **Configure Backend**

   ```bash
   cd backend
   npm install

   # Copy .env.example to .env and update with your MySQL credentials
   cp .env.example .env
   # Edit .env file with your database credentials
   ```

3. **Start Backend Server**

   ```bash
   npm run dev
   ```

   Backend will run on http://localhost:5000

4. **Start Frontend** (in new terminal)
   ```bash
   cd ..
   npm run dev
   ```
   Frontend will run on http://localhost:5173

### Windows Quick Start

Simply double-click `start.bat` to start both servers automatically!

## 📖 Complete Documentation

See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for:

- Detailed installation steps
- Troubleshooting guide
- API documentation
- Database schema details
- Security best practices
- Production deployment

## 🎮 How to Use

1. **Register/Login** - Create a new account or login
2. **Dashboard** - View your statistics and test history
3. **Start Test** - Click "Start New Test" to begin
4. **Take Test** - Answer MCQ questions with timer running
5. **Submit** - View results with detailed explanations
6. **Track Progress** - All scores saved automatically to database

## 📁 Project Structure

```
aptitude-mcq-app/
├── backend/              # Express API server
│   ├── config/          # Database configuration
│   ├── routes/          # API endpoints (auth, scores)
│   ├── middleware/      # JWT authentication
│   ├── database/        # SQL schema
│   ├── .env            # Environment variables
│   └── server.js       # Main server file
├── src/
│   ├── components/      # React components
│   │   ├── Auth.jsx    # Login/Signup
│   │   ├── Dashboard.jsx # User dashboard
│   │   ├── Question.jsx  # MCQ display
│   │   ├── Navigation.jsx # Test navigation
│   │   └── ScoreCard.jsx # Results
│   ├── services/        # API services
│   │   └── api.js      # Backend API calls
│   └── data/           # Questions JSON
│       └── questions.json
├── SETUP_GUIDE.md      # Detailed documentation
└── start.bat           # Quick start script (Windows)
```

## 🔧 Tech Stack

**Frontend:**

- React 18
- Vite
- CSS3 with animations
- Local storage for session persistence

**Backend:**

- Node.js & Express.js
- MySQL2 (database driver)
- JWT for authentication
- Bcrypt for password hashing
- Express-validator for input validation
- CORS enabled

## 📝 Adding Questions

Edit `src/data/questions.json` to add questions from your R.S. Aggarwal book:

```json
{
  "id": 6,
  "category": "Arithmetic",
  "topic": "Profit and Loss",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Step-by-step solution explanation"
}
```

### Available Categories:

- Arithmetic (Percentages, Profit/Loss, Time & Work, etc.)
- Algebra
- Geometry
- Data Interpretation

## 🐛 Troubleshooting

**Database Connection Error?**

- ✅ Verify MySQL is running
- ✅ Check credentials in `backend/.env`
- ✅ Ensure database `aptitude_db` exists

**Port Already in Use?**

- Change PORT in `backend/.env`
- Update API_URL in `src/services/api.js`

**CORS Error?**

- Ensure backend is running on http://localhost:5000
- Check CORS is enabled in server.js

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting solutions.

## 📊 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Scores & Statistics

- `POST /api/scores/save` - Save test session (requires auth)
- `GET /api/scores/history` - Get user test history (requires auth)
- `GET /api/scores/statistics` - Get user statistics (requires auth)
- `GET /api/scores/leaderboard` - Get top performers (public)

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT token-based authentication
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation on all endpoints
- ✅ CORS configured
- ✅ Environment variables for sensitive data

## 🎨 UI Features

- Animated login/signup page with floating shapes
- Interactive MCQ options with hover effects
- Pulse animation on answer selection
- Smooth transitions between screens
- Responsive design for all devices
- Visual feedback for correct/incorrect answers
- Real-time progress tracking

## 📄 License

Open source - Free for educational use

## 👨‍💻 Next Steps

1. **Add More Questions** - Fill `questions.json` from your R.S. Aggarwal book
2. **Customize Themes** - Modify color gradients in CSS files
3. **Add Categories** - Organize questions by topics
4. **Extend Features** - Add difficulty levels, time limits per question
5. **Deploy** - Host on cloud platforms

---

**Built with ❤️ for aptitude learning**

For detailed setup instructions and troubleshooting, see **[SETUP_GUIDE.md](SETUP_GUIDE.md)**

## Quick Command Reference

```bash
# Start Backend
cd backend && npm run dev

# Start Frontend (new terminal)
npm run dev

# Or use Windows batch file
start.bat

# Access:
# Frontend: http://localhost:5173/
# Backend API: http://localhost:5000/api
# Health Check: http://localhost:5000/api/health
```
