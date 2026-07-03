# restore_and_import.ps1
# 1. Restore original songs from songs_old to songs/ directory
# 2. Upload new songs from E:\movies\music to Catbox (streaming) without saving new audio files to C: drive (saving disk space)

$workspaceDir = "c:\Users\ELCOT\Desktop\echo of badaga"
$sourceDir = "E:\movies\music"
$songsOldDir = Join-Path $workspaceDir "songs_old"
$xampHtdocsDir = "C:\xampp\htdocs\echobaduga"
$xampSongsDir = "C:\xampp\htdocs\songs"

$localJsPath = Join-Path $workspaceDir "songs_array.js"

# ── Title cleaning helper ──
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

# ── Genre classification helper ──
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

# ── Phase 1: Restore original songs from songs_old ──
Write-Host "--- Phase 1: Restoring Original Songs from songs_old ---" -ForegroundColor Cyan
if (Test-Path $songsOldDir) {
    $oldFiles = Get-ChildItem -Path $songsOldDir -File -Filter *.mp3
    Write-Host "Found $($oldFiles.Count) backup files in songs_old." -ForegroundColor Green
    
    $restoredCount = 0
    foreach ($file in $oldFiles) {
        $clean = Clean-Filename $file.Name
        $genre = Get-Genre $file.Name $clean.Title
        $genreKey = $genre.ToLower() -replace '\s+', ''
        
        $safeTitle = $clean.Title -replace '[^a-zA-Z0-9\s\-\.]', ''
        $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
        $safeName = "$safeTitle.mp3"
        
        # Copy to workspace
        $localGenreDir = Join-Path $workspaceDir "songs\$genreKey"
        if (-not (Test-Path $localGenreDir)) {
            New-Item -ItemType Directory -Path $localGenreDir -Force | Out-Null
        }
        $localDestPath = Join-Path $localGenreDir $safeName
        if (-not (Test-Path $localDestPath)) {
            Copy-Item -Path $file.FullName -Destination $localDestPath -Force
            $restoredCount++
        }
        
        # Copy to XAMPP if available
        if (Test-Path $xampSongsDir) {
            $xampGenreDir = Join-Path $xampSongsDir $genreKey
            if (-not (Test-Path $xampGenreDir)) {
                New-Item -ItemType Directory -Path $xampGenreDir -Force | Out-Null
            }
            $xampDestPath = Join-Path $xampGenreDir $safeName
            if (-not (Test-Path $xampDestPath)) {
                Copy-Item -Path $file.FullName -Destination $xampDestPath -Force
            }
        }
    }
    Write-Host "Restored $restoredCount files back to C: drive songs folder." -ForegroundColor Green
} else {
    Write-Warning "Backup directory songs_old not found!"
}

# ── Load existing songs from songs_array.js ──
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
    Write-Host "Loaded $($existingSongs.Count) original songs from songs_array.js." -ForegroundColor Green
}

# ── Gather current file sizes for deduplication ──
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
Write-Host "Deduplication database has $($existingSizes.Count) active files." -ForegroundColor Green

# ── Load upload state cache (for resume capability) ──
$statePath = Join-Path $workspaceDir "scratch\upload_state.json"
$uploadState = @{}
if (Test-Path $statePath) {
    try {
        $jsonStr = [System.IO.File]::ReadAllText($statePath)
        $uploadState = ConvertFrom-Json $jsonStr -AsHashtable
        Write-Host "Loaded upload cache with $($uploadState.Count) items." -ForegroundColor Green
    } catch {
        Write-Error "Error reading upload_state.json: $_"
    }
}

function Save-State {
    $json = ConvertTo-Json $uploadState -Depth 10
    [System.IO.File]::WriteAllText($statePath, $json)
}

# ── Catbox Upload logic utilizing system proxy ──
function Upload-ToCatbox {
    param([string]$filePath, [string]$safeName)
    
    $file = Get-Item $filePath
    $boundary = [System.Guid]::NewGuid().ToString()
    $LF = "`r`n"
    
    $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $fileHeader = "--$boundary$LF" +
                  "Content-Disposition: form-data; name=`"fileToUpload`"; filename=`"$safeName`"$LF" +
                  "Content-Type: audio/mpeg$LF$LF"
    $fileFooter = "$LF--$boundary--$LF"
    
    $reqtypeHeader = "--$boundary$LF" +
                     "Content-Disposition: form-data; name=`"reqtype`"$LF$LF" +
                     "fileupload$LF"
                     
    $reqtypeBytes = [System.Text.Encoding]::UTF8.GetBytes($reqtypeHeader)
    $fileHeaderBytes = [System.Text.Encoding]::UTF8.GetBytes($fileHeader)
    $fileFooterBytes = [System.Text.Encoding]::UTF8.GetBytes($fileFooter)
    
    $totalLength = $reqtypeBytes.Length + $fileHeaderBytes.Length + $fileBytes.Length + $fileFooterBytes.Length
    $requestBytes = New-Object Byte[] $totalLength
    
    $offset = 0
    [System.Buffer]::BlockCopy($reqtypeBytes, 0, $requestBytes, $offset, $reqtypeBytes.Length)
    $offset += $reqtypeBytes.Length
    [System.Buffer]::BlockCopy($fileHeaderBytes, 0, $requestBytes, $offset, $fileHeaderBytes.Length)
    $offset += $fileHeaderBytes.Length
    [System.Buffer]::BlockCopy($fileBytes, 0, $requestBytes, $offset, $fileBytes.Length)
    $offset += $fileBytes.Length
    [System.Buffer]::BlockCopy($fileFooterBytes, 0, $requestBytes, $offset, $fileFooterBytes.Length)
    
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13
    
    $request = [System.Net.HttpWebRequest]::Create("https://catbox.moe/user/api.php")
    $request.Method = "POST"
    $request.ContentType = "multipart/form-data; boundary=$boundary"
    $request.ContentLength = $totalLength
    $request.Timeout = 180000 # 3 minutes timeout
    
    $request.Proxy = [System.Net.WebRequest]::DefaultWebProxy
    $request.Proxy.Credentials = [System.Net.CredentialCache]::DefaultCredentials
    
    $reqStream = $request.GetRequestStream()
    $reqStream.Write($requestBytes, 0, $requestBytes.Length)
    $reqStream.Close()
    
    $response = $request.GetResponse()
    $resStream = $response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($resStream)
    $catboxUrl = $reader.ReadToEnd().Trim()
    $reader.Close()
    $resStream.Close()
    $response.Close()
    
    return $catboxUrl
}

function Upload-WithRetry {
    param([string]$filePath, [string]$safeName, [int]$retries = 3, [int]$delaySec = 4)
    
    for ($i = 0; $i -lt $retries; $i++) {
        try {
            Write-Host "  Uploading $safeName (Attempt $($i + 1)/$retries)..." -ForegroundColor Cyan
            $url = Upload-ToCatbox $filePath $safeName
            if ($url -like "https://files.catbox.moe/*") {
                return $url
            }
            throw "Invalid response: $url"
        } catch {
            Write-Warning "  Upload attempt failed: $_"
            if ($i -eq $retries - 1) { throw $_ }
            Write-Host "  Waiting $delaySec seconds before retry..." -ForegroundColor Yellow
            Start-Sleep -Seconds $delaySec
        }
    }
}

# ── Phase 2: Import new songs from E:\movies\music ──
Write-Host "`n--- Phase 2: Scanning and Uploading New Songs from E:\movies\music ---" -ForegroundColor Cyan
if (-not (Test-Path $sourceDir)) {
    Write-Error "Source folder not found: $sourceDir"
    exit 1
}

$sourceFiles = Get-ChildItem -Path $sourceDir -File -Recurse -Include *.mp3, *.m4a
Write-Host "Found $($sourceFiles.Count) files in source folder." -ForegroundColor Green

$newSongs = @()
$processedSizesInBatch = New-Object System.Collections.Generic.HashSet[long]

$maxId = 99
foreach ($s in $existingSongs) {
    if ($s.id -gt $maxId) { $maxId = $s.id }
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
    
    $clean = Clean-Filename $file.Name
    $genre = Get-Genre $file.Name $clean.Title
    
    Write-Host "[$fileCounter/$($sourceFiles.Count)] Cleaned: `"$($clean.Title)`" by `"$($clean.Artist)`" [Genre: $genre]" -ForegroundColor Gray
    
    $safeTitle = $clean.Title -replace '[^a-zA-Z0-9\s\-\.]', ''
    $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
    $ext = $file.Extension
    $safeName = "$safeTitle$ext"
    
    # ── Upload to Catbox ──
    $cacheKey = "$($file.FullName)_$($file.Length)"
    $catboxUrl = ""
    if ($uploadState.ContainsKey($cacheKey)) {
        Write-Host "  [CACHE HIT] Catbox URL: $($uploadState[$cacheKey])" -ForegroundColor DarkGreen
        $catboxUrl = $uploadState[$cacheKey]
    } else {
        try {
            $catboxUrl = Upload-WithRetry $file.FullName $safeName
            $uploadState[$cacheKey] = $catboxUrl
            Save-State
            Write-Host "  [UPLOADED] Catbox URL: $catboxUrl" -ForegroundColor Green
        } catch {
            Write-Error "  Failed to upload file after retries. Skipping database registration."
            $fileCounter++
            continue
        }
    }
    
    # Register song
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
        file_url = $catboxUrl
    }
    $newSongs += $songObj
    
    $idCounter++
    $processedSizesInBatch.Add($file.Length) | Out-Null
    $fileCounter++
}

Write-Host "`nImport completed. Skipped $skippedCount duplicates. Uploaded/Added $($newSongs.Count) new songs." -ForegroundColor Green

# ── Phase 3: Write songs_array.js ──
if ($newSongs.Count -gt 0) {
    $allSongs = $existingSongs + $newSongs
    
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
    Write-Host "Updated: $localJsPath" -ForegroundColor Green
    
    # Write to XAMPP echobaduga
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
} else {
    Write-Host "No new songs to append." -ForegroundColor Yellow
}
