$env:JAVA_HOME="C:\Users\ELCOT\.antigravity\extensions\redhat.java-1.54.0-win32-x64\jre\21.0.10-win32-x86_64"
cd "c:\Users\ELCOT\Desktop\echo of badaga\android"
Write-Host "Starting Gradle compile..." -ForegroundColor Green
.\gradlew.bat assembleDebug
Write-Host "Gradle compile finished!" -ForegroundColor Green

if (Test-Path "app\build\outputs\apk\debug\app-debug.apk") {
    Copy-Item "app\build\outputs\apk\debug\app-debug.apk" "..\app-release.apk" -Force
    if (Test-Path "..\www") {
        Copy-Item "app\build\outputs\apk\debug\app-debug.apk" "..\www\app-release.apk" -Force
    }
    Write-Host "✓ Copied compiled APK to root and www as app-release.apk!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Warning: Compiled APK was not found in outputs folder." -ForegroundColor Yellow
}
