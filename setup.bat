@echo off
REM Luxury Shop - Quick Setup Script
REM This script automates initial setup

echo.
echo ========================================
echo   LUXURY SHOP - QUICK SETUP
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [✓] Node.js found: 
node --version

echo.
echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [✓] Dependencies installed

echo.
echo [2/4] Checking for .env.local file...
if not exist ".env.local" (
    echo [!] .env.local not found
    echo [!] Copying from .env.example...
    copy .env.example .env.local
    echo.
    echo [✓] Created .env.local
    echo [!] IMPORTANT: Update .env.local with your Firebase credentials!
    echo [!] Guide: See DEPLOYMENT_GUIDE.md
    pause
) else (
    echo [✓] .env.local exists
)

echo.
echo [3/4] Project structure:
dir /b src

echo.
echo [4/4] Ready to start development!
echo.
echo Next steps:
echo 1. Update .env.local with Firebase credentials
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo For deployment:
echo - See README.md for full instructions
echo - See DEPLOYMENT_GUIDE.md for step-by-step guide
echo.
pause
