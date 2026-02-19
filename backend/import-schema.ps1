# Database Schema Import Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Importing Database Schema" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Current directory: $PWD" -ForegroundColor Yellow
Write-Host ""

# Read the SQL file
$sqlFile = "database\schema.sql"

if (Test-Path $sqlFile) {
    Write-Host "Importing $sqlFile into MySQL..." -ForegroundColor Green
    Write-Host "Please enter your MySQL root password when prompted." -ForegroundColor Yellow
    Write-Host ""
    
    # Execute the SQL file
    Get-Content $sqlFile | mysql -u root -p aptitude_db
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "SUCCESS! Database schema imported." -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Tables created:" -ForegroundColor Cyan
        Write-Host "  - users" -ForegroundColor White
        Write-Host "  - test_sessions" -ForegroundColor White
        Write-Host "  - user_statistics (view)" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Red
        Write-Host "ERROR: Failed to import schema" -ForegroundColor Red
        Write-Host "========================================" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please make sure:" -ForegroundColor Yellow
        Write-Host "1. MySQL is running" -ForegroundColor White
        Write-Host "2. Database 'aptitude_db' exists" -ForegroundColor White
        Write-Host "3. You entered the correct password" -ForegroundColor White
        Write-Host ""
    }
} else {
    Write-Host "ERROR: Could not find $sqlFile" -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
