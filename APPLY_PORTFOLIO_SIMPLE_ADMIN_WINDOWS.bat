@echo off
chcp 65001 >nul
title KLOOM Studio - Simplify Portfolio Admin

echo ================================================
echo  KLOOM Studio - Portfolio Admin 3 Fixed Categories
echo ================================================
echo.

if not exist package.json (
  echo ERROR: Copy this patch into the project folder that contains package.json first.
  pause
  exit /b 1
)

if exist .next rmdir /s /q .next

echo Patch files are in place.
echo Portfolio is now locked to 3 categories with only image, title and description fields.
echo.
echo Run: npm run dev
pause
