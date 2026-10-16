@echo off
title Publish GIG Portfolio to GitHub
echo ====================================================
echo        Publishing GIG Portfolio to GitHub
echo ====================================================
echo.

cd /d "%~dp0"

echo [1/4] Initializing Git repository...
git init
git branch -M main

echo [2/4] Staging files (excluding .env and node_modules)...
git add .

echo [3/4] Creating commit...
git commit -m "Deploy: GIG modern portfolio website"

echo [4/4] Setting remote to https://github.com/glenrykian-beep/portfolio.git ...
git remote remove origin 2>nul
git remote add origin https://github.com/glenrykian-beep/portfolio.git

echo Pushing to GitHub main branch...
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ====================================================
    echo SUCCESS! Your code is now live on GitHub:
    echo https://github.com/glenrykian-beep/portfolio
    echo ====================================================
) else (
    echo.
    echo ====================================================
    echo NOTE: If you haven't created the repository yet,
    echo create an empty repo named "portfolio" at:
    echo https://github.com/new
    echo (Do not initialize with README or .gitignore)
    echo Then run this script again!
    echo ====================================================
)

echo.
pause
