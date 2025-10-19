@echo off
REM Build SSG Script for BizHealth.ai (Windows)
REM This script builds the app and prerenders all routes for SEO

echo Starting Static Site Generation build...
echo.

REM Step 1: Extract routes from App.tsx
echo Extracting routes from App.tsx...
node extract-routes.js

if %errorlevel% neq 0 (
  echo Route extraction failed!
  exit /b %errorlevel%
)

echo.

REM Step 2: Build the Vite app
echo Building Vite app...
call npm run build

if %errorlevel% neq 0 (
  echo Vite build failed!
  exit /b %errorlevel%
)

echo Vite build complete!
echo.

REM Step 3: Run prerender script
echo Prerendering all routes...
node prerender.js

if %errorlevel% neq 0 (
  echo Prerender failed!
  exit /b %errorlevel%
)

echo.
echo Static Site Generation build finished successfully!
echo Output directory: dist/
echo.
echo To test locally, run: npm run preview
