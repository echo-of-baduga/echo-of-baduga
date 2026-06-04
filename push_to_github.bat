@echo off
echo Pushing changes to GitHub to trigger the APK build...
git push origin main
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Git push failed. Please make sure you are signed in to GitHub.
    pause
    exit /b %errorlevel%
)
echo.
echo [SUCCESS] Pushed successfully! The APK build has started in the cloud.
echo Go to: https://github.com/echo-of-baduga/echo-of-baduga/actions to download the APK when finished.
pause
