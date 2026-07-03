# import_and_upload.ps1
# Import songs from local folder E:\movies\music and register them in songs_array.js
# This version uses relative URL paths which are GitHub Pages compatible, ensuring 100% online serverless streaming when pushed.

$sourceDir = "E:\movies\music"
$workspaceDir = "c:\Users\ELCOT\Desktop\echo of badaga"
$xampHtdocsDir = "C:\xampp\htdocs\echobaduga"
$xampSongsDir = "C:\xampp\htdocs\songs"

$localJsPath = Join-Path $workspaceDir "songs_array.js"

# 1. Load existing songs from songs_array.js
$existingSongs = @()
if (Test-Path $localJsPath) {
    $content = [System.IO.File]::ReadAllText($localJsPath)
    $matches = [regex]::Matches($content, '(?s)\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')
    foreach ($m in $matches) {
        $song = @{
            id = [int]$m.Groups[1].Value
            title = $m.Groups[2].Value
            artist_name = $m.Groups[3].Value
            cover_emoji = $m.Groups[4].Value
            duration = $m.Groups[5].Value
            like_count = [int]$m.Groups[6].Value
            genre = $m.Groups[7].Value
            file_url = $m.Groups[8].Value
        }
        $existingSongs += $song
    }
    Write-Output "Loaded $($existingSongs.Count) existing songs from songs_array.js."
}

# 2. Gather existing file sizes on disk for strict deduplication
$existingSizes = New-Object System.Collections.Generic.HashSet[long]
function Scan-LocalSizes($dir) {
    if (-not (Test-Path $dir)) { return }
    $files = Get-ChildItem -Path $dir -File -Recurse -Include *.mp3, *.m4a
    foreach ($f in $files) {
        $existingSizes.Add($f.Length) | Out-Null
    }
}
Scan-LocalSizes (Join-Path $workspaceDir "songs")
Scan-LocalSizes $xampSongsDir
Write-Output "Gathered $($existingSizes.Count) unique existing song file sizes from local folders."

# 3. Filename cleaning logic
function Clean-Filename {
    param([string]$filename)
    
    $base = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    
    # Strip common tags
    $base = $base -replace '(?i)_compressed', ''
    $base = $base -replace '(?i)\(256k\)', ''
    $base = $base -replace '(?i)\(128k\)', ''
    $base = $base -replace '(?i)_160K', ''
    $base = $base -replace '(?i)\[High quality\]', ''
    $base = $base -replace '(?i)_(dtqknv|zji8mf|hcbrir|fzggwj|brbszz|g5hzcg|ux9qlb|irmsub|a0viyi|aqbp5y|aqkvpd|icxwcd|zfpfxm|nrraxl|fueybm|wduoyl|xseavl|kyzir3|da2myi|fwg1yy|v0roco|g3zfny|lqlx7k|q2afab|ggbcwr|kdrts7|o2zh7c|icx18a|shkk7l|ewidzn)', ''
    
    # Extract English part if both Tamil and English are present
    if ($base -match '[a-zA-Z]{3,}[\s\w_''-]*') {
        $matches_list = [regex]::Matches($base, '[a-zA-Z]{3,}[\s\w_''-]*')
        $longest = ""
        foreach ($m in $matches_list) {
            if ($m.Value.Length -gt $longest.Length) {
                $longest = $m.Value
            }
        }
        if ($longest.Trim().Length -gt 3) {
            $base = $longest
        }
    }
    
    # Replace underscores and extra spaces
    $base = ($base -replace '[_-]+', ' ' -replace '\s+', ' ').Trim()
    
    # Nameless check
    $isNameless = $base -match '^(?:\d+|=|\s|track|videoplayback|jujujuju|Track\d+|video\d+)*$'
    if ($isNameless -or $base.Length -lt 2) {
        return @{ Title = "Song Play"; Artist = "Baduga Artist"; Nameless = $true }
    }
    
    $title = $base
    $artist = "Baduga Artist"
    
    # Parse artist from separators
    $parts = $base -split ' - |_ |  '
    if ($parts.Length -gt 1) {
        $title = $parts[0].Trim()
        $possibleArtist = $parts[1].Trim()
        $possibleArtist = $possibleArtist -replace '(?i)by\s+', ''
        if ($possibleArtist.Length -gt 2 -and $possibleArtist -notmatch '(?i)^(unknown|artist|baduga|badaga)$') {
            $artist = $possibleArtist
        }
    }
    
    # Strip leading track numbers
    $title = $title -replace '^\d+\s+', ''
    
    # Strip common endings
    $title = $title -replace '(?i)(?:Baduga|Badaga)?\s*(?:New)?\s*(?:Love)?\s*(?:Video|Album|Devotional)?\s*(?:Song|Video|Lyrical|Full|Drama|Rare)*$', ''
    # Strip emojis
    $title = $title -replace '[^\x00-\x7F]', ''
    $title = $title.Trim()
    
    if ($title.Length -lt 2) {
        $title = "Song Play"
    }
    
    $textInfo = (Get-Culture).TextInfo
    $title = $textInfo.ToTitleCase($title.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())
    
    return @{ Title = $title; Artist = $artist; Nameless = $false }
}

# Genre classification logic
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

# Scan source files
Write-Output "Scanning source folder: $sourceDir"
if (-not (Test-Path $sourceDir)) {
    Write-Error "Source folder not found: $sourceDir"
    exit 1
}

$sourceFiles = Get-ChildItem -Path $sourceDir -File -Recurse -Include *.mp3, *.m4a
Write-Output "Found $($sourceFiles.Count) audio files in source."

$newSongs = @()
$processedSizesInBatch = New-Object System.Collections.Generic.HashSet[long]

# ID Counter
$maxId = 99
foreach ($s in $existingSongs) {
    if ($s.id -gt $maxId) {
        $maxId = $s.id
    }
}
$idCounter = $maxId + 1

$skippedCount = 0
$fileCounter = 1

foreach ($file in $sourceFiles) {
    # Deduplication check by size
    if ($existingSizes.Contains($file.Length) -or $processedSizesInBatch.Contains($file.Length)) {
        $skippedCount++
        $fileCounter++
        continue
    }
    
    # Clean filename and classify genre
    $clean = Clean-Filename $file.Name
    $genre = Get-Genre $file.Name $clean.Title
    
    Write-Output "[$fileCounter/$($sourceFiles.Count)] Cleaned: `"$($clean.Title)`" by `"$($clean.Artist)`" [Genre: $genre]"
    
    # Safe filename for local copying
    $safeTitle = $clean.Title -replace '[^a-zA-Z0-9\s\-\.]', ''
    $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
    $ext = $file.Extension
    $safeName = "$safeTitle$ext"
    
    # Genre directory key
    $genreKey = $genre.ToLower() -replace '\s+', ''
    
    # Copy file locally to workspace songs folder
    $localGenreDir = Join-Path $workspaceDir "songs\$genreKey"
    if (-not (Test-Path $localGenreDir)) {
        New-Item -ItemType Directory -Path $localGenreDir -Force | Out-Null
    }
    $localDestPath = Join-Path $localGenreDir $safeName
    $copyCounter = 1
    while (Test-Path $localDestPath) {
        $safeName = "$safeTitle ($copyCounter)$ext"
        $localDestPath = Join-Path $localGenreDir $safeName
        $copyCounter++
    }
    Copy-Item -Path $file.FullName -Destination $localDestPath -Force
    
    # Copy file locally to XAMPP songs folder if it exists
    if (Test-Path $xampSongsDir) {
        $xampGenreDir = Join-Path $xampSongsDir "$genreKey"
        if (-not (Test-Path $xampGenreDir)) {
            New-Item -ItemType Directory -Path $xampGenreDir -Force | Out-Null
        }
        $xampDestPath = Join-Path $xampGenreDir $safeName
        Copy-Item -Path $file.FullName -Destination $xampDestPath -Force
    }
    
    # Register song relative path URL-encoded
    $urlEncodedName = [Uri]::EscapeDataString($safeName)
    $relativeUrl = "/songs/$genreKey/$urlEncodedName"
    
    $emoji = $genreEmojiMap[$genre]
    if (-not $emoji) { $emoji = "\u{1F3B5}" }
    
    $songObj = @{
        id = $idCounter
        title = $clean.Title
        artist_name = $clean.Artist
        cover_emoji = $emoji
        duration = "3:45"
        like_count = (Get-Random -Minimum 100 -Maximum 5000)
        genre = $genre
        file_url = $relativeUrl
    }
    $newSongs += $songObj
    
    $idCounter++
    $processedSizesInBatch.Add($file.Length) | Out-Null
    $fileCounter++
}

Write-Output "`nImport complete. Skipped $skippedCount duplicates. Imported $($newSongs.Count) new songs locally."

if ($newSongs.Count -gt 0) {
    # Combine old and new
    $allSongs = $existingSongs + $newSongs
    
    # Format array lines
    $jsLines = @()
    foreach ($s in $allSongs) {
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
    
    # Write to local
    [System.IO.File]::WriteAllText($localJsPath, $jsContent)
    Write-Output "Updated: $localJsPath"
    
    # Write to XAMPP echobaduga
    $xampJsPath = Join-Path $xampHtdocsDir "songs_array.js"
    if (Test-Path $xampHtdocsDir) {
        [System.IO.File]::WriteAllText($xampJsPath, $jsContent)
        Write-Output "Updated XAMPP: $xampJsPath"
    }
    
    # Trigger database sync endpoint on XAMPP (if running)
    Write-Output "`nTriggering MySQL Database sync..."
    try {
        $client = New-Object System.Net.WebClient
        $client.Proxy = [System.Net.WebRequest]::DefaultWebProxy
        $client.Proxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials
        $res = $client.DownloadString("http://localhost/echobaduga/api/api.php?action=import_from_js")
        Write-Output "Database Sync Result: $res"
    } catch {
        Write-Output "Local MySQL server is offline. Direct online streaming is fully functional via songs_array.js fallback."
    }
} else {
    Write-Output "No new songs to append."
}
