# build_android.ps1 - Package the Echo of Baduga App for Android

# 1. Create the build directory (www)
Write-Host "Creating www distribution directory..." -ForegroundColor Green
$wwwPath = Join-Path $PSScriptRoot "www"
if (-not (Test-Path $wwwPath)) {
    New-Item -ItemType Directory -Path $wwwPath | Out-Null
}

# 2. Copy the web assets
Write-Host "Copying core application files..." -ForegroundColor Green
Copy-Item (Join-Path $PSScriptRoot "index.html") (Join-Path $wwwPath "index.html") -Force
Copy-Item (Join-Path $PSScriptRoot "app.js") (Join-Path $wwwPath "app.js") -Force
Copy-Item (Join-Path $PSScriptRoot "songs_array.js") (Join-Path $wwwPath "songs_array.js") -Force
Copy-Item (Join-Path $PSScriptRoot "manifest.json") (Join-Path $wwwPath "manifest.json") -Force
Copy-Item (Join-Path $PSScriptRoot "sw.js") (Join-Path $wwwPath "sw.js") -Force

# Copy assets folder
$wwwAssetsPath = Join-Path $wwwPath "assets"
if (-not (Test-Path $wwwAssetsPath)) {
    New-Item -ItemType Directory -Path $wwwAssetsPath | Out-Null
}
Copy-Item (Join-Path $PSScriptRoot "assets\*") $wwwAssetsPath -Recurse -Force

Write-Host "Core assets copied successfully!" -ForegroundColor Green

# 3. Optional: Sync songs (explain streaming vs. local bundling)
$wwwSongsPath = Join-Path $wwwPath "songs"
if (Test-Path $wwwSongsPath) {
    Write-Host "Songs folder already exists in www." -ForegroundColor Yellow
} else {
    Write-Host "`n--- SONG BUNDLING OPTIONS ---" -ForegroundColor Cyan
    Write-Host "Streaming is recommended for production (APK size ~5MB)." -ForegroundColor Cyan
    Write-Host "If you want to bundle songs offline inside the APK (APK size ~800MB)," -ForegroundColor Cyan
    Write-Host "create a junction link by running this command in cmd as Administrator:" -ForegroundColor Yellow
    Write-Host "mklink /j `"$wwwSongsPath`" `"$PSScriptRoot\songs`"" -ForegroundColor Yellow
    Write-Host "----------------------------`n" -ForegroundColor Cyan
}

# 4. Sync with Capacitor
Write-Host "Running Capacitor Sync..." -ForegroundColor Green
npx cap sync android

Write-Host "`nBuild and sync completed successfully!" -ForegroundColor Green
Write-Host "To open the project in Android Studio, run: npm run open:android" -ForegroundColor Cyan
