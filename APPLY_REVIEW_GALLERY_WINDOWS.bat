@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ================================================
echo  KLOOM Studio - Review Gallery Backend
 echo ================================================
echo.
echo Updating Neon database and importing old review images...
node scripts\apply-review-gallery.mjs
if errorlevel 1 (
  echo.
  echo Update failed. Check DATABASE_URL in .env.local and try again.
  pause
  exit /b 1
)
echo.
if exist .next rmdir /s /q .next
echo Finished. Run npm run dev and open /admin/portfolio
pause
