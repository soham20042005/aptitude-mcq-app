# Aptitude MCQ Test App - Complete Setup Guide

A full-stack React application with MySQL database for aptitude testing, featuring user authentication, score tracking, and interactive UI.

## 🎯 Features

### Authentication & User Management
- ✅ User registration and login
- ✅ JWT-based authentication
- ✅ Secure password hashing with bcrypt
- ✅ Session management

### Test Features
- ✅ Interactive MCQ interface with animations
- ✅ Real-time timer
- ✅ Progress tracking
- ✅ Instant score calculation with detailed explanations

### Dashboard Features
- ✅ User statistics (tests taken, average score, best score)
- ✅ Complete test history
- ✅ Leaderboard showing top performers
- ✅ Recent test trends

### Database Integration
- ✅ MySQL database for persistent storage
- ✅ User data management
- ✅ Test session tracking
- ✅ Score history

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/

2. **MySQL Server** (v5.7 or higher)
   - Download from: https://dev.mysql.com/downloads/mysql/
   - Or install via XAMPP/WAMP/MAMP

3. **Git** (optional, for cloning)

## 🚀 Installation Steps

### Step 1: Install MySQL and Create Database

1. **Start MySQL Server**
   - If using XAMPP: Start Apache and MySQL from XAMPP Control Panel
   - If standalone MySQL: Make sure MySQL service is running

2. **Access MySQL**
   ```bash
   # Open MySQL Command Line or use phpMyAdmin
   mysql -u root -p
   ```

3. **Create Database**
   ```sql
   CREATE DATABASE aptitude_db;
   USE aptitude_db;
   ```

4. **Import Database Schema**
   - The schema file is located at: `backend/database/schema.sql`
   - You can import it via:
   
   **Option A - Command Line:**
   ```bash
   mysql -u root -p aptitude_db < backend/database/schema.sql
   ```
   
   **Option B - phpMyAdmin:**
   - Select `aptitude_db` database
   - Go to "Import" tab
   - Choose `schema.sql` file and click "Go"

### Step 2: Configure Backend

1. **Navigate to backend folder**
   ```bash
   cd aptitude-mcq-app/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Open `backend/.env` file
   - Update the following based on your MySQL setup:
   
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=aptitude_db
   DB_PORT=3306
   
   PORT=5000
   JWT_SECRET=change_this_to_random_secure_string
   JWT_EXPIRE=7d
   ```

4. **Test the database connection**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   ✅ MySQL Database connected successfully
   🚀 Server running on port 5000
   ```

### Step 3: Configure Frontend

1. **Navigate to the main app folder**
   ```bash
   cd ..
   # (You should be in aptitude-mcq-app folder)
   ```

2. **Dependencies should already be installed**
   - If not, run: `npm install`

3. **Start the frontend**
   ```bash
   npm run dev
   ```

The app should open at `http://localhost:5173/`

## 🎮 Using the Application

### First Time Setup

1. **Start MySQL Server**
   - Make sure MySQL is running

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Keep this terminal running.

3. **Start Frontend (in a new terminal)**
   ```bash
   cd aptitude-mcq-app
   npm run dev
   ```

4. **Access the Application**
   - Open browser: `http://localhost:5173/`

### Creating Your First Account

1. Click **"Sign Up"** on the login page
2. Fill in:
   - Username
   - Email
   - Password (minimum 6 characters)
   - Full Name (optional)
3. Click **"Sign Up"**
4. You'll be automatically logged in

### Taking a Test

1. From the dashboard, click **"Start New Test"**
2. Answer the questions
3. Navigate using **Next/Previous** buttons
4. Click **"Submit Test"** to see results
5. Your score is automatically saved to the database

### Viewing Your Progress

**Dashboard Tabs:**
- **Overview**: See your statistics and recent tests
- **Test History**: View all your past test sessions
- **Leaderboard**: Compare your performance with other users

## 📂 Project Structure

```
aptitude-mcq-app/
├── backend/
│   ├── config/
│   │   └── database.js          # MySQL connection config
│   ├── database/
│   │   └── schema.sql            # Database schema
│   ├── middleware/
│   │   └── auth.js               # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js               # Login/Register routes
│   │   └── scores.js             # Score tracking routes
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── server.js                 # Express server
├── src/
│   ├── components/
│   │   ├── Auth.jsx              # Login/Signup component
│   │   ├── Dashboard.jsx         # User dashboard
│   │   ├── Question.jsx          # MCQ question display
│   │   ├── Navigation.jsx        # Test navigation
│   │   └── ScoreCard.jsx         # Results display
│   ├── services/
│   │   └── api.js                # API service for backend
│   ├── data/
│   │   └── questions.json        # Question database
│   └── App.jsx                   # Main app component
└── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Scores
- `POST /api/scores/save` - Save test session
- `GET /api/scores/history` - Get user test history
- `GET /api/scores/statistics` - Get user statistics
- `GET /api/scores/leaderboard` - Get leaderboard

## 📝 Adding Questions

Edit `src/data/questions.json`:

```json
{
  "id": 6,
  "category": "Arithmetic",
  "topic": "Profit and Loss",
  "question": "Your question here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation here"
}
```

## 🐛 Troubleshooting

### Database Connection Error

**Problem:** `❌ Database connection failed`

**Solutions:**
1. Verify MySQL is running
2. Check credentials in `backend/.env`
3. Ensure database `aptitude_db` exists
4. Check if port 3306 is available

### Backend Server Won't Start

**Problem:** Port 5000 already in use

**Solution:**
```env
# Change PORT in backend/.env
PORT=5001
```

Then update API_URL in `src/services/api.js`:
```javascript
const API_URL = 'http://localhost:5001/api';
```

### CORS Error

**Problem:** Frontend can't connect to backend

**Solution:**
- Make sure backend is running on `http://localhost:5000`
- Check CORS is enabled in `backend/server.js` (already configured)

### MySQL Authentication Error

**Problem:** `ER_NOT_SUPPORTED_AUTH_MODE`

**Solution:**
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

## 🔒 Security Notes

**For Production:**

1. **Change JWT Secret**
   ```env
   JWT_SECRET=use_a_very_long_random_string_here
   ```

2. **Use Strong MySQL Password**

3. **Enable HTTPS**

4. **Set Secure Cookie Options**

5. **Add Rate Limiting**

## 🎨 Customization

### Change Theme Colors

Edit `src/App.css`:
```css
background: linear-gradient(135deg, #yourColor1 0%, #yourColor2 100%);
```

### Modify Database Schema

1. Edit `backend/database/schema.sql`
2. Reimport the schema
3. Update API routes accordingly

## 📊 Database Tables

### users
- id, username, email, password, full_name, created_at, updated_at

### test_sessions
- id, user_id, score, total_questions, percentage, time_taken
- correct_answers, wrong_answers, test_date, answers (JSON)

## 🚦 Running in Production

1. Build frontend:
   ```bash
   npm run build
   ```

2. Use PM2 for backend:
   ```bash
   npm install -g pm2
   pm2 start backend/server.js --name aptitude-backend
   ```

3. Configure nginx as reverse proxy

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the error logs
3. Verify all prerequisites are installed

## 📜 License

This project is open source and available for educational purposes.

---

**Happy Learning! 📚**

## Quick Start Commands Summary

```bash
# Terminal 1 - Backend
cd aptitude-mcq-app/backend
npm install
# Configure .env file
npm run dev

# Terminal 2 - Frontend
cd aptitude-mcq-app
npm run dev

# Access app at: http://localhost:5173/
```
