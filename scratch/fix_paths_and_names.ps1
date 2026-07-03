# fix_paths_and_names.ps1

$workspaceDir = "c:\Users\ELCOT\Desktop\echo of badaga"
$xampHtdocsDir = "C:\xampp\htdocs\echobaduga"
$organizedDir = "E:\movies\music_organized"
$localJsPath = Join-Path $workspaceDir "songs_array.js"

# 1. Correct the XAMPP Junction Link
Write-Host "Correcting XAMPP Junction Link..." -ForegroundColor Cyan
$xampLocalSongsPath = Join-Path $xampHtdocsDir "songs"
if (Test-Path $xampLocalSongsPath) {
    # Delete existing folder/junction
    Remove-Item -Path $xampLocalSongsPath -Recurse -Force -ErrorAction SilentlyContinue
}
New-Item -ItemType Junction -Path $xampLocalSongsPath -Value $organizedDir | Out-Null
Write-Host "Created corrected XAMPP junction: $xampLocalSongsPath -> $organizedDir" -ForegroundColor Green

# 2. Update song titles in songs_array.js
Write-Host "Updating song titles..." -ForegroundColor Cyan
$songs = @()
if (Test-Path $localJsPath) {
    $content = [System.IO.File]::ReadAllText($localJsPath)
    $matches = [regex]::Matches($content, '(?s)\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')
    
    foreach ($m in $matches) {
        $id = [int]$m.Groups[1].Value
        $title = $m.Groups[2].Value
        $artist = $m.Groups[3].Value
        $emoji = $m.Groups[4].Value
        $duration = $m.Groups[5].Value
        $like = [int]$m.Groups[6].Value
        $genre = $m.Groups[7].Value
        $url = $m.Groups[8].Value
        
        # Clean title:
        # A. Rename placeholder/generic titles to "Song Play"
        if ($title -match '^(Song\s+\d+|Track\s+\d+|Track0\d+|Track\d+)$' -or $title -eq '') {
            $title = "Song Play"
        }
        
        # B. Strip trailing garbage/numbers
        $title = $title -replace '(?i)\s*Baduga Drama Song.*$', ''
        $title = $title -replace '(?i)\s*Badaga Drama Song.*$', ''
        $title = $title -replace '(?i)\s*Mp3\s*\d*$', ''
        $title = $title -replace '(?i)\s*Video Song.*$', ''
        $title = $title -replace '(?i)\s*Album Song.*$', ''
        $title = $title.Trim()
        
        if ($title -eq '') {
            $title = "Song Play"
        }
        
        $songs += @{
            id = $id
            title = $title
            artist_name = $artist
            cover_emoji = $emoji
            duration = $duration
            like_count = $like
            genre = $genre
            file_url = $url
        }
    }
}

# 3. Format and write updated songs_array.js
$jsLines = @()
foreach ($s in $songs) {
    $jsLine = "    {`n" +
              "        id: $($s.id),`n" +
              "        title: `"$($s.title)`",`n" +
              "        artist_name: `"$($s.artist_name)`",`n" +
              "        cover_emoji: `"$($s.cover_emoji)`",`n" +
              "        duration: `"$($s.duration)`",`n" +
              "        like_count: $($s.like_count),`n" +
              "        genre: `"$($s.genre)`",`n" +
              "        file_url: `"$($s.file_url)`"`n" +
              "    }"
    $jsLines += $jsLine
}
$jsContent = "const DEMO_SONGS = [`n" + ($jsLines -join ",`n") + "`n];`n"

[System.IO.File]::WriteAllText($localJsPath, $jsContent)
Write-Host "Updated workspace songs_array.js" -ForegroundColor Green

$xampJsPath = Join-Path $xampHtdocsDir "songs_array.js"
if (Test-Path $xampHtdocsDir) {
    [System.IO.File]::WriteAllText($xampJsPath, $jsContent)
    Write-Host "Updated XAMPP songs_array.js" -ForegroundColor Green
}
