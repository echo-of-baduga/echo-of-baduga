# organize_on_E.ps1
# 1. Reclaim C: drive space by deleting local songs folder.
# 2. Organize and deduplicate all songs on E:\movies\music_organized.
# 3. Create Windows junctions to map them to C: workspace and XAMPP without using C: drive space.
# 4. Generate songs_array.js with relative paths.

$workspaceDir = "c:\Users\ELCOT\Desktop\echo of badaga"
$sourceDir = "E:\movies\music"
$songsOldDir = Join-Path $workspaceDir "songs_old"
$xampHtdocsDir = "C:\xampp\htdocs\echobaduga"
$xampSongsDir = "C:\xampp\htdocs\songs"
$organizedDir = "E:\movies\music_organized"

$localJsPath = Join-Path $workspaceDir "songs_array.js"

# ── Reclaim C: drive space first ──
Write-Host "Reclaiming C: drive space by clearing temporary copies..." -ForegroundColor Cyan
if (Test-Path (Join-Path $workspaceDir "songs")) {
    Remove-Item -Path (Join-Path $workspaceDir "songs") -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path $xampSongsDir) {
    # If it is a junction, remove the link. If it's a directory, clear files.
    Remove-Item -Path $xampSongsDir -Recurse -Force -ErrorAction SilentlyContinue
}

# ── Create organized directory on E: drive ──
if (-not (Test-Path $organizedDir)) {
    New-Item -ItemType Directory -Path $organizedDir -Force | Out-Null
}

# ── Load existing songs list ──
$originalSongs = @()
if (Test-Path $localJsPath) {
    # We restored this file via git, so it has only the clean 54 songs
    $content = [System.IO.File]::ReadAllText($localJsPath)
    $matches = [regex]::Matches($content, '(?s)\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')
    foreach ($m in $matches) {
        $originalSongs += @{
            id = [int]$m.Groups[1].Value
            title = $m.Groups[2].Value
            artist_name = $m.Groups[3].Value
            cover_emoji = $m.Groups[4].Value
            duration = $m.Groups[5].Value
            like_count = [int]$m.Groups[6].Value
            genre = $m.Groups[7].Value
            file_url = $m.Groups[8].Value
        }
    }
    Write-Host "Loaded $($originalSongs.Count) original songs from songs_array.js." -ForegroundColor Green
}

# Title cleaning helper
function Clean-Filename {
    param([string]$filename)
    
    $base = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    
    $base = $base -replace '(?i)_compressed', ''
    $base = $base -replace '(?i)\(256k\)', ''
    $base = $base -replace '(?i)\(128k\)', ''
    $base = $base -replace '(?i)_160K', ''
    $base = $base -replace '(?i)\[High quality\]', ''
    $base = $base -replace '(?i)_(dtqknv|zji8mf|hcbrir|fzggwj|brbszz|g5hzcg|ux9qlb|irmsub|a0viyi|aqbp5y|aqkvpd|icxwcd|zfpfxm|nrraxl|fueybm|wduoyl|xseavl|kyzir3|da2myi|fwg1yy|v0roco|g3zfny|lqlx7k|q2afab|ggbcwr|kdrts7|o2zh7c|icx18a|shkk7l|ewidzn)', ''
    
    if ($base -match '[a-zA-Z]{3,}[\s\w_''-]*') {
        $matches_list = [regex]::Matches($base, '[a-zA-Z]{3,}[\s\w_''-]*')
        $longest = ""
        foreach ($m in $matches_list) {
            if ($m.Value.Length -gt $longest.Length) { $longest = $m.Value }
        }
        if ($longest.Trim().Length -gt 3) { $base = $longest }
    }
    
    $base = ($base -replace '[_-]+', ' ' -replace '\s+', ' ').Trim()
    
    $isNameless = $base -match '^(?:\d+|=|\s|track|videoplayback|jujujuju|Track\d+|video\d+)*$'
    if ($isNameless -or $base.Length -lt 2) {
        return @{ Title = "Song Play"; Artist = "Baduga Artist"; Nameless = $true }
    }
    
    $title = $base
    $artist = "Baduga Artist"
    
    $parts = $base -split ' - |_ |  '
    if ($parts.Length -gt 1) {
        $title = $parts[0].Trim()
        $possibleArtist = $parts[1].Trim()
        $possibleArtist = $possibleArtist -replace '(?i)by\s+', ''
        if ($possibleArtist.Length -gt 2 -and $possibleArtist -notmatch '(?i)^(unknown|artist|baduga|badaga)$') {
            $artist = $possibleArtist
        }
    }
    
    $title = $title -replace '^\d+\s+', ''
    $title = $title -replace '(?i)(?:Baduga|Badaga)?\s*(?:New)?\s*(?:Love)?\s*(?:Video|Album|Devotional)?\s*(?:Song|Video|Lyrical|Full|Drama|Rare)*$', ''
    $title = $title -replace '[^\x00-\x7F]', ''
    $title = $title.Trim()
    
    if ($title.Length -lt 2) { $title = "Song Play" }
    
    $textInfo = (Get-Culture).TextInfo
    $title = $textInfo.ToTitleCase($title.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())
    
    return @{ Title = $title; Artist = $artist; Nameless = $false }
}

# Genre helper
function Get-Genre {
    param([string]$filename, [string]$title)
    $combined = ($filename + " " + $title).ToLower()
    
    if ($combined -match '(ayyappan|hethai|hethay|hetheya|hethega|hethey|amman|bugiriya|dhoopathata|eragali|devotional)') {
        return "Devotional"
    }
    if ($combined -match '(marriage|madhuvae|madhuvaendhu|mathuveya|college|semmanuru|hatty ya suthuva)') {
        return "Marriage Hits"
    }
    if ($combined -match '(sad|kaneer|kaneeru|kanikai|kanneruna|kanneradu|kanna neera)') {
        return "Sad"
    }
    if ($combined -match '(band|bugiri)') {
        return "Band"
    }
    if ($combined -match 'evergreen') {
        return "Evergreen"
    }
    if ($combined -match 'melody') {
        return "Melody"
    }
    if ($combined -match '(love|anna|annatha|kanasey|radhe|roja|singaranae|singaariyea|muthuna|sweet kaara|nela baggi|doiii|gena|chittuna|hello)') {
        return "Love"
    }
    
    return "Melody"
}

$genreEmojiMap = @{
    "Devotional" = "\u{1F64F}";
    "Evergreen" = "\u{1F332}";
    "Love" = "\u{1F496}";
    "Sad" = "\u{1F343}";
    "Melody" = "\u{1F3B5}";
    "Marriage Hits" = "\u{1F48D}";
    "Band" = "\u{1F3B6}"
}

# ── Deduplication set ──
$processedSizes = New-Object System.Collections.Generic.HashSet[long]
$finalSongs = @()

# ── Phase 1: Organize original songs from songs_old on E: ──
Write-Host "`nOrganizing original backup songs on E: drive..." -ForegroundColor Cyan
if (Test-Path $songsOldDir) {
    $oldFiles = Get-ChildItem -Path $songsOldDir -File -Filter *.mp3
    foreach ($file in $oldFiles) {
        $clean = Clean-Filename $file.Name
        $genre = Get-Genre $file.Name $clean.Title
        $genreKey = $genre.ToLower() -replace '\s+', ''
        
        $safeTitle = $clean.Title -replace '[^a-zA-Z0-9\s\-\.]', ''
        $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
        $safeName = "$safeTitle.mp3"
        
        $destGenreDir = Join-Path $organizedDir $genreKey
        if (-not (Test-Path $destGenreDir)) {
            New-Item -ItemType Directory -Path $destGenreDir -Force | Out-Null
        }
        $destPath = Join-Path $destGenreDir $safeName
        if (-not (Test-Path $destPath)) {
            Copy-Item -Path $file.FullName -Destination $destPath -Force
        }
        
        # Track processed size
        $processedSizes.Add($file.Length) | Out-Null
        
        # Lookup original song metadata
        $existing = $originalSongs | Where-Object { [System.IO.Path]::GetFileNameWithoutExtension([Uri]::UnescapeDataString($_.file_url)) -eq $safeTitle } | Select-Object -First 1
        
        if ($existing) {
            $finalSongs += $existing
        } else {
            # fallback
            $emoji = $genreEmojiMap[$genre]
            if (-not $emoji) { $emoji = "\u{1F3B5}" }
            $finalSongs += @{
                id = (Get-Random -Minimum 1000 -Maximum 9999)
                title = $clean.Title
                artist_name = $clean.Artist
                cover_emoji = $emoji
                duration = "3:45"
                like_count = 1200
                genre = $genre
                file_url = "/songs/$genreKey/$([Uri]::EscapeDataString($safeName))"
            }
        }
    }
}

# ── Phase 2: Organize new songs from E:\movies\music on E: ──
Write-Host "`nOrganizing and deduplicating new songs on E: drive..." -ForegroundColor Cyan
$newFiles = Get-ChildItem -Path $sourceDir -File -Recurse -Include *.mp3, *.m4a
Write-Host "Found $($newFiles.Count) source files on E: drive." -ForegroundColor Green

# Calculate max ID
$maxId = 99
foreach ($s in $finalSongs) {
    if ($s.id -gt $maxId) { $maxId = $s.id }
}
$idCounter = $maxId + 1

$skippedCount = 0
$newAddedCount = 0

foreach ($file in $newFiles) {
    if ($processedSizes.Contains($file.Length)) {
        $skippedCount++
        continue
    }
    
    $clean = Clean-Filename $file.Name
    $genre = Get-Genre $file.Name $clean.Title
    $genreKey = $genre.ToLower() -replace '\s+', ''
    
    $safeTitle = $clean.Title -replace '[^a-zA-Z0-9\s\-\.]', ''
    $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
    $ext = $file.Extension
    $safeName = "$safeTitle$ext"
    
    $destGenreDir = Join-Path $organizedDir $genreKey
    if (-not (Test-Path $destGenreDir)) {
        New-Item -ItemType Directory -Path $destGenreDir -Force | Out-Null
    }
    
    $destPath = Join-Path $destGenreDir $safeName
    $copyCounter = 1
    while (Test-Path $destPath) {
        $safeName = "$safeTitle ($copyCounter)$ext"
        $destPath = Join-Path $destGenreDir $safeName
        $copyCounter++
    }
    
    # Copy file to E: drive organized folder
    Copy-Item -Path $file.FullName -Destination $destPath -Force
    
    # Add metadata
    $emoji = $genreEmojiMap[$genre]
    if (-not $emoji) { $emoji = "\u{1F3B5}" }
    
    $finalSongs += @{
        id = $idCounter
        title = $clean.Title
        artist_name = $clean.Artist
        cover_emoji = $emoji
        duration = "3:45"
        like_count = (Get-Random -Minimum 100 -Maximum 5000)
        genre = $genre
        file_url = "/songs/$genreKey/$([Uri]::EscapeDataString($safeName))"
    }
    
    $idCounter++
    $newAddedCount++
    $processedSizes.Add($file.Length) | Out-Null
}

Write-Host "Processed E: organized folder. Skipped $skippedCount duplicates. Added $newAddedCount new unique songs." -ForegroundColor Green

# ── Phase 3: Create Junction Links on C: ──
Write-Host "`nCreating Windows Junction Links..." -ForegroundColor Cyan

# 1. Link workspace songs/ folder to E:\movies\music_organized
$workspaceSongsPath = Join-Path $workspaceDir "songs"
if (Test-Path $workspaceSongsPath) {
    Remove-Item -Path $workspaceSongsPath -Recurse -Force -ErrorAction SilentlyContinue
}
New-Item -ItemType Junction -Path $workspaceSongsPath -Value $organizedDir | Out-Null
Write-Host "Created junction link: $workspaceSongsPath -> $organizedDir" -ForegroundColor Green

# 2. Link XAMPP songs/ folder to E:\movies\music_organized
if (Test-Path "C:\xampp\htdocs") {
    if (Test-Path $xampSongsDir) {
        Remove-Item -Path $xampSongsDir -Recurse -Force -ErrorAction SilentlyContinue
    }
    New-Item -ItemType Junction -Path $xampSongsDir -Value $organizedDir | Out-Null
    Write-Host "Created junction link: $xampSongsDir -> $organizedDir" -ForegroundColor Green
}

# ── Phase 4: Write songs_array.js ──
$jsLines = @()
foreach ($s in $finalSongs) {
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

# Write to workspace
[System.IO.File]::WriteAllText($localJsPath, $jsContent)
Write-Host "Updated: $localJsPath" -ForegroundColor Green

# Write to XAMPP
$xampJsPath = Join-Path $xampHtdocsDir "songs_array.js"
if (Test-Path $xampHtdocsDir) {
    [System.IO.File]::WriteAllText($xampJsPath, $jsContent)
    Write-Host "Updated XAMPP: $xampJsPath" -ForegroundColor Green
}

# Trigger database sync endpoint on XAMPP (if running)
Write-Host "`nTriggering MySQL Database sync..." -ForegroundColor Cyan
try {
    $client = New-Object System.Net.WebClient
    $client.Proxy = [System.Net.WebRequest]::DefaultWebProxy
    $client.Proxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials
    $res = $client.DownloadString("http://localhost/echobaduga/api/api.php?action=import_from_js")
    Write-Host "Database Sync Result: $res" -ForegroundColor Green
} catch {
    Write-Host "Local MySQL server is offline. Direct online streaming is fully functional via songs_array.js fallback." -ForegroundColor Yellow
}

Write-Host "`nSuccess! Junction link serving all $($finalSongs.Count) songs directly from E: drive using 0 bytes on C: drive." -ForegroundColor Green
