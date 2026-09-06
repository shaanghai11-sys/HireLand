@echo off
title Hireland Local Server
cd /d "%~dp0"
echo.
echo ========================================
echo        HIRELAND LOCAL LAUNCHER
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js was not found.
  echo Install the current Node.js LTS release and run this file again.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Installing dependencies for the first run...
  call npm install
  if errorlevel 1 (
    echo npm install failed.
    pause
    exit /b 1
  )
)

if not exist ".env" (
  if exist ".env.example" (
    copy ".env.example" ".env" >nul
    echo.
    echo Created .env from .env.example.
    echo Add your OPENAI_API_KEY to .env to enable AI challenge generation.
    echo The site can still start with local fallback challenges.
    echo.
  )
)

echo Starting Hireland at http://localhost:8000
echo Press Ctrl+C to stop the server.
echo.
start "" http://localhost:8000
call npm start
