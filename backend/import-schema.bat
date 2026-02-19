@echo off
echo ========================================
echo Importing Database Schema
echo ========================================
echo.

cd /d "%~dp0"

echo Current directory: %CD%
echo.

echo Importing schema.sql into MySQL...
echo Please enter your MySQL root password when prompted.
echo.

mysql -u root -p aptitude_db < database\schema.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database schema imported.
    echo ========================================
    echo.
    echo Tables created:
    echo - users
    echo - test_sessions
    echo - user_statistics (view)
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to import schema
    echo ========================================
    echo.
    echo Please make sure:
    echo 1. MySQL is running
    echo 2. Database 'aptitude_db' exists
    echo 3. You entered the correct password
    echo.
)

pause
