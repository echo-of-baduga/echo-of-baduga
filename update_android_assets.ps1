# update_android_assets.ps1 - Auto-resize new logo for all Android resource files
Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path $PSScriptRoot "assets\logo.png"
if (-not (Test-Path $srcPath)) {
    Write-Error "Source logo file not found at $srcPath"
    exit 1
}

$srcImg = [System.Drawing.Image]::FromFile($srcPath)

# Function to resize and save launcher icons
function Save-ResizedIcon($width, $height, $destFolder, $destFileName, $hasPadding = $false) {
    $destPath = Join-Path $PSScriptRoot "android\app\src\main\res\$destFolder"
    if (-not (Test-Path $destPath)) {
        New-Item -ItemType Directory -Path $destPath | Out-Null
    }
    
    # Create new bitmap
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    
    # Set high quality render settings
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Clear canvas with transparent color for launcher icon
    $g.Clear([System.Drawing.Color]::Transparent)
    
    if ($hasPadding) {
        # Logo takes up center 66% of the canvas to avoid adaptive icon clipping
        $logoWidth = [int]($width * 0.66)
        $logoHeight = [int]($height * 0.66)
        $x = [int](($width - $logoWidth) / 2)
        $y = [int](($height - $logoHeight) / 2)
        $g.DrawImage($srcImg, $x, $y, $logoWidth, $logoHeight)
    } else {
        # Full size
        $g.DrawImage($srcImg, 0, 0, $width, $height)
    }
    
    # Clean up graphics
    $g.Dispose()
    
    # Save bitmap
    $fullDestPath = Join-Path $destPath $destFileName
    $newBmp.Save($fullDestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
    Write-Host "Generated: $destFolder\$destFileName ($width`x$height)" -ForegroundColor Green
}

# Function to generate centered splash screen on a dark background
function Save-Splash($width, $height, $destFolder) {
    $destPath = Join-Path $PSScriptRoot "android\app\src\main\res\$destFolder"
    if (-not (Test-Path $destPath)) {
        New-Item -ItemType Directory -Path $destPath | Out-Null
    }
    
    # Create canvas
    $newBmp = New-Object System.Drawing.Bitmap($width, $height)
    $g = [System.Drawing.Graphics]::FromImage($newBmp)
    
    # Clear with dark theme color #0b0c10
    $bgColor = [System.Drawing.ColorTranslator]::FromHtml("#0b0c10")
    $g.Clear($bgColor)
    
    # Calculate centered logo size (e.g., logo is 35% of the shortest side)
    $logoSize = [int]([Math]::Min($width, $height) * 0.35)
    if ($logoSize -lt 96) { $logoSize = 96 }
    
    # Center position
    $x = [int](($width - $logoSize) / 2)
    $y = [int](($height - $logoSize) / 2)
    
    # Draw logo
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $g.DrawImage($srcImg, $x, $y, $logoSize, $logoSize)
    
    $g.Dispose()
    
    $fullDestPath = Join-Path $destPath "splash.png"
    $newBmp.Save($fullDestPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $newBmp.Dispose()
    Write-Host "Generated: $destFolder\splash.png ($width`x$height)" -ForegroundColor Cyan
}

# 1. Generate Mipmap Icons
$mipmaps = @(
    @{ name = "mipmap-mdpi"; size = 48 },
    @{ name = "mipmap-hdpi"; size = 72 },
    @{ name = "mipmap-xhdpi"; size = 96 },
    @{ name = "mipmap-xxhdpi"; size = 144 },
    @{ name = "mipmap-xxxhdpi"; size = 192 }
)

foreach ($mip in $mipmaps) {
    Save-ResizedIcon $mip.size $mip.size $mip.name "ic_launcher.png"
    Save-ResizedIcon $mip.size $mip.size $mip.name "ic_launcher_round.png"
    Save-ResizedIcon $mip.size $mip.size $mip.name "ic_launcher_foreground.png" $true
}

# 2. Generate Splashes
# Portrait Splashes
Save-Splash 320 480 "drawable-port-mdpi"
Save-Splash 480 800 "drawable-port-hdpi"
Save-Splash 720 1280 "drawable-port-xhdpi"
Save-Splash 960 1600 "drawable-port-xxhdpi"
Save-Splash 1280 1920 "drawable-port-xxxhdpi"

# Landscape Splashes
Save-Splash 480 320 "drawable-land-mdpi"
Save-Splash 800 480 "drawable-land-hdpi"
Save-Splash 1280 720 "drawable-land-xhdpi"
Save-Splash 1600 960 "drawable-land-xxhdpi"
Save-Splash 1920 1280 "drawable-land-xxxhdpi"

# Default drawable splash
Save-Splash 512 512 "drawable"

# Clean up
$srcImg.Dispose()
Write-Host "All Android Icons & Splashes have been successfully updated with the new app logo!" -ForegroundColor Green
