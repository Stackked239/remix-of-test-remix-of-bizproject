@echo off
REM Build SSG Script for BizHealth.ai (Windows)
REM This script builds the app and prerenders all routes for SEO

echo Starting Static Site Generation build...

REM Step 1: Build the Vite app
echo Building Vite app...
call npm run build

if %errorlevel% neq 0 (
  echo Vite build failed!
  exit /b %errorlevel%
)

echo Vite build complete!

REM Step 2: Run prerender script
echo Prerendering all routes...
node prerender.js

if %errorlevel% neq 0 (
  echo Prerender failed!
  exit /b %errorlevel%
)

echo Prerender complete!
echo Static Site Generation build finished successfully!
echo Output directory: dist/
