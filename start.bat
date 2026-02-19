@echo off
echo ========================================
echo Starting Aptitude MCQ Test App
echo ========================================
echo.

echo Checking MySQL server...
echo If MySQL is not running, please start it first!
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Frontend Dev Server" cmd /k "npm run dev"

echo.
echo ========================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to close this window...
pause >nul
