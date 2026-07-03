# upload_parallel.ps1
# Multi-threaded parallel uploader for Catbox songs

$localSongsDir = "E:\movies\music_organized"
if (-not (Test-Path $localSongsDir)) {
    Write-Error "Songs folder not found at $localSongsDir"
    exit 1
}

$files = Get-ChildItem -Path $localSongsDir -Filter *.mp3 -Recurse
$totalFiles = $files.Count
Write-Host "Found $totalFiles songs to upload." -ForegroundColor Green

# Partition files into 8 chunks
$chunks = 8
$chunkSize = [Math]::Ceiling($totalFiles / $chunks)
$scratchDir = "c:\Users\ELCOT\Desktop\echo of badaga\scratch"

# Ensure scratch directory exists and clean old chunk files
if (-not (Test-Path $scratchDir)) {
    New-Item -ItemType Directory -Path $scratchDir | Out-Null
}
Remove-Item (Join-Path $scratchDir "chunk_*.json") -ErrorAction SilentlyContinue

# Create the worker script
$workerScriptPath = Join-Path $scratchDir "upload_worker.ps1"
$workerScriptContent = @'
param(
    [int]$chunkIdx,
    [int]$startIndex,
    [int]$endIndex
)

$localSongsDir = "E:\movies\music_organized"
$files = Get-ChildItem -Path $localSongsDir -Filter *.mp3 -Recurse
$subset = $files[$startIndex..$endIndex]

$jsonArr = @()
$textInfo = (Get-Culture).TextInfo
$emoji_map = @{
    "sad" = "\u{1F343}";
    "evergreen" = "\u{1F332}";
    "love" = "\u{1F496}";
    "marriagehits" = "\u{1F48D}";
    "devotional" = "\u{1F64F}";
    "melody" = "\u{1F3B5}";
    "band" = "\u{1F3BA}";
    "unknown" = "\u{1F3A7}"
}

$idCounter = 100 + $startIndex
$counter = 1
foreach ($file in $subset) {
    if ($null -eq $file) { continue }
    $parentFolder = $file.Directory.Name.ToLower()
    $origName = $file.Name
    $baseName = $file.BaseName
    
    # 1. Clean Title and Artist
    $parts = $baseName -split ' - | _ |  '
    $cleanTitle = $parts[0].Trim()
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga New Love Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Full Video.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga Album Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Album Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '[^\x00-\x7F]',''
    $cleanTitle = $cleanTitle -replace '&','And'
    $cleanTitle = ($cleanTitle -replace '\s+', ' ').Trim()
    if ($cleanTitle -eq '') { $cleanTitle = "Song $idCounter" }

    $artist = "Baduga Artist"
    if ($parts.Length -gt 1) {
        $a = $parts[1].Trim()
        $a = $a -replace '(?i)Baduga.*$',''
        $a = $a -replace '(?i)Badaga.*$',''
        $a = $a -replace '(?i)Song.*$',''
        $a = $a -replace '[^\x00-\x7F]',''
        $a = ($a -replace '\s+', ' ').Trim()
        if ($a.Length -gt 2) { $artist = $a }
        elseif ($parts.Length -gt 2) {
            $a2 = $parts[2].Trim()
            $a2 = $a2 -replace '(?i)Baduga.*$',''
            $a2 = $a2 -replace '(?i)Badaga.*$',''
            $a2 = $a2 -replace '(?i)Song.*$',''
            $a2 = $a2 -replace '[^\x00-\x7F]',''
            $a2 = ($a2 -replace '\s+', ' ').Trim()
            if ($a2.Length -gt 2) { $artist = $a2 }
        }
    }
    
    $cleanTitle = $textInfo.ToTitleCase($cleanTitle.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())

    # 2. Upload using curl.exe
    $catboxUrl = ""
    $retries = 3
    for ($attempt = 1; $attempt -le $retries; $attempt++) {
        try {
            $filePath = $file.FullName
            $result = & curl.exe -s -F "reqtype=fileupload" -F "fileToUpload=@$filePath" https://catbox.moe/user/api.php
            $catboxUrl = $result.Trim()
            if ($catboxUrl -match "https://files.catbox.moe/") {
                break
            }
        } catch {}
        Start-Sleep -Seconds 2
    }

    if ($catboxUrl -match "https://files.catbox.moe/") {
        $emoji = "\u{1F3B5}"
        if ($emoji_map.ContainsKey($parentFolder)) {
            $emoji = $emoji_map[$parentFolder]
        }
        
        $genre = $textInfo.ToTitleCase($parentFolder)
        if ($parentFolder -eq "marriagehits") { $genre = "Marriage Hits" }
        elseif ($parentFolder -eq "band") { $genre = "Band" }

        $songObj = [PSCustomObject]@{
            id          = $idCounter
            title       = $cleanTitle
            artist_name = $artist
            cover_emoji = $emoji
            duration    = "3:45"
            like_count  = (Get-Random -Minimum 100 -Maximum 5000)
            genre       = $genre
            file_url    = $catboxUrl
        }
        $jsonArr += $songObj
        Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Uploaded: $cleanTitle"
    } else {
        Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Failed: $($file.Name)"
    }
    $idCounter++
    $counter++
}

# Save chunk JSON
$jsonArr | ConvertTo-Json | Out-File -FilePath "c:\Users\ELCOT\Desktop\echo of badaga\scratch\chunk_$chunkIdx.json" -Encoding utf8
'@

Set-Content -Path $workerScriptPath -Value $workerScriptContent -Encoding utf8

# Launch chunks in parallel
Write-Host "Launching parallel workers..." -ForegroundColor Green
$processes = @()
for ($i = 0; $i -lt $chunks; $i++) {
    $start = $i * $chunkSize
    $end = [Math]::Min($start + $chunkSize - 1, $totalFiles - 1)
    if ($start -ge $totalFiles) { break }
    
    Write-Host "Worker $i - files $start to $end"
    
    $stdoutFile = "c:\Users\ELCOT\Desktop\echo of badaga\scratch\worker_$i.log"
    $stderrFile = "c:\Users\ELCOT\Desktop\echo of badaga\scratch\worker_err_$i.log"
    
    # Start worker process with redirection
    $p = Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$workerScriptPath`" -chunkIdx $i -startIndex $start -endIndex $end" -RedirectStandardOutput $stdoutFile -RedirectStandardError $stderrFile -PassThru -WindowStyle Hidden
    $processes += $p
}

# Wait for all processes to complete
Write-Host "Waiting for uploads to complete..." -ForegroundColor Yellow
$completed = $false
while (-not $completed) {
    $running = $processes | Where-Object { -not $_.HasExited }
    if ($null -eq $running -or $running.Count -eq 0) {
        $completed = $true
    } else {
        Write-Host "$($running.Count) workers still running..."
        Start-Sleep -Seconds 5
    }
}

Write-Host "All workers completed! Merging results..." -ForegroundColor Green

# Merge JSON files
$allSongs = @()
for ($i = 0; $i -lt $chunks; $i++) {
    $chunkFile = "c:\Users\ELCOT\Desktop\echo of badaga\scratch\chunk_$i.json"
    if (Test-Path $chunkFile) {
        $content = Get-Content -Path $chunkFile -Raw
        if (-not [string]::IsNullOrEmpty($content)) {
            $arr = ConvertFrom-Json $content
            if ($arr) {
                if ($arr -is [Array]) {
                    $allSongs += $arr
                } else {
                    $allSongs += @($arr)
                }
            }
        }
        Remove-Item $chunkFile -Force
    }
}

# Sort songs by ID
$allSongs = $allSongs | Sort-Object id

# Format songs_array.js
$jsContent = "const DEMO_SONGS = [`r`n"
$jsLines = @()
foreach ($song in $allSongs) {
    $line = "    {`r`n" +
            "        id: $($song.id),`r`n" +
            "        title: `"$($song.title)`",`r`n" +
            "        artist_name: `"$($song.artist_name)`",`r`n" +
            "        cover_emoji: `"$($song.cover_emoji)`",`r`n" +
            "        duration: `"$($song.duration)`",`r`n" +
            "        like_count: $($song.like_count),`r`n" +
            "        genre: `"$($song.genre)`",`r`n" +
            "        file_url: `"$($song.file_url)`"`r`n" +
            "    }"
    $jsLines += $line
}
$jsContent += ($jsLines -join ",`r`n") + "`r`n];"

# Write to songs_array.js
$songsArrayPath = "c:\Users\ELCOT\Desktop\echo of badaga\songs_array.js"
Set-Content -Path $songsArrayPath -Value $jsContent -Encoding utf8

# Clean up temporary worker script
Remove-Item $workerScriptPath -Force

Write-Host "Success! Uploaded and indexed $($allSongs.Count) songs to songs_array.js." -ForegroundColor Green
