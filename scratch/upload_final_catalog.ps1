# upload_final_catalog.ps1
# Stateful multi-threaded parallel uploader for final catalog to Catbox.moe

$localSongsDir = "E:\movies\Echo of baduga\badu songs"
if (-not (Test-Path $localSongsDir)) {
    Write-Error "Songs folder not found at $localSongsDir"
    exit 1
}

$files = Get-ChildItem -Path $localSongsDir -Filter *.mp3 -Recurse
$totalFiles = $files.Count
Write-Host "Found $totalFiles songs to organize and upload." -ForegroundColor Green

$scratchDir = "c:\Users\ELCOT\Desktop\echo of badaga\scratch"
$mainProgressFile = Join-Path $scratchDir "upload_progress.json"
$mainProgress = @{}
$cachedLookup = @{}

# Load existing progress cache
if (Test-Path $mainProgressFile) {
    try {
        $existing = Get-Content -Path $mainProgressFile -Raw | ConvertFrom-Json
        if ($existing) {
            foreach ($prop in $existing.PSObject.Properties) {
                $mainProgress[$prop.Name] = $prop.Value
                $filename = [System.IO.Path]::GetFileName($prop.Name).ToLower()
                $cachedLookup[$filename] = $prop.Value
            }
            Write-Host "Loaded $($mainProgress.Count) completed uploads from main cache." -ForegroundColor Green
            Write-Host "Name-based index contains $($cachedLookup.Count) files." -ForegroundColor Green
        }
    } catch {
        Write-Host "Could not load main progress cache." -ForegroundColor Yellow
    }
}

# Partition files into 8 chunks
$chunks = 8
$chunkSize = [Math]::Ceiling($totalFiles / $chunks)

# Pre-populate and write worker progress files
for ($i = 0; $i -lt $chunks; $i++) {
    $start = $i * $chunkSize
    $end = [Math]::Min($start + $chunkSize - 1, $totalFiles - 1)
    if ($start -ge $totalFiles) { break }

    $subset = $files[$start..$end]
    $workerProgress = @{}

    foreach ($file in $subset) {
        if ($null -eq $file) { continue }
        $filePathKey = $file.FullName
        $filenameLower = $file.Name.ToLower()
        
        if ($mainProgress.ContainsKey($filePathKey)) {
            $workerProgress[$filePathKey] = $mainProgress[$filePathKey]
        } elseif ($cachedLookup.ContainsKey($filenameLower)) {
            # Reuse URL from the name-based lookup cache!
            $workerProgress[$filePathKey] = $cachedLookup[$filenameLower]
        }
    }

    # Write worker progress file
    $workerProgressFile = Join-Path $scratchDir "progress_$i.json"
    $workerProgress | ConvertTo-Json | Out-File -FilePath $workerProgressFile -Encoding utf8
}

# Create the worker script
$workerScriptPath = Join-Path $scratchDir "upload_worker_final.ps1"
$workerScriptContent = @'
param(
    [int]$chunkIdx,
    [int]$startIndex,
    [int]$endIndex
)

$localSongsDir = "E:\movies\Echo of baduga\badu songs"
$files = Get-ChildItem -Path $localSongsDir -Filter *.mp3 -Recurse
$subset = $files[$startIndex..$endIndex]

$scratchDir = "c:\Users\ELCOT\Desktop\echo of badaga\scratch"
$progressFile = Join-Path $scratchDir "progress_$chunkIdx.json"
$progress = @{}

if (Test-Path $progressFile) {
    try {
        $existing = Get-Content -Path $progressFile -Raw | ConvertFrom-Json
        if ($existing) {
            foreach ($prop in $existing.PSObject.Properties) {
                $progress[$prop.Name] = $prop.Value
            }
        }
    } catch {}
}

$textInfo = (Get-Culture).TextInfo
$counter = 1
foreach ($file in $subset) {
    if ($null -eq $file) { continue }
    if ($file.Length -eq 0) { continue }
    
    $filePathKey = $file.FullName
    $catboxUrl = ""

    if ($progress.ContainsKey($filePathKey)) {
        $catboxUrl = $progress[$filePathKey]
        Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Cached: $($file.Name)"
    } else {
        Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Uploading: $($file.Name) ($($file.Length) bytes)..."
        
        $retries = 3
        for ($attempt = 1; $attempt -le $retries; $attempt++) {
            try {
                $result = & curl.exe -sS -F "reqtype=fileupload" -F "fileToUpload=@$filePathKey" https://catbox.moe/user/api.php
                $trimmed = $result.Trim()
                if ($trimmed -match "https://files.catbox.moe/") {
                    $catboxUrl = $trimmed
                    break
                }
            } catch {}
            Start-Sleep -Seconds 2
        }

        if ($catboxUrl -match "https://files.catbox.moe/") {
            $progress[$filePathKey] = $catboxUrl
            # Save progress immediately
            $progress | ConvertTo-Json | Out-File -FilePath $progressFile -Encoding utf8
            Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Success: $catboxUrl"
        } else {
            Write-Output "[$chunkIdx] ($counter/$($subset.Count)) Failed: $($file.Name)"
        }
    }
    $counter++
}
'@

Set-Content -Path $workerScriptPath -Value $workerScriptContent -Encoding utf8

# Launch chunks in parallel
Write-Host "Launching 8 parallel workers..." -ForegroundColor Green
$processes = @()
for ($i = 0; $i -lt $chunks; $i++) {
    $start = $i * $chunkSize
    $end = [Math]::Min($start + $chunkSize - 1, $totalFiles - 1)
    if ($start -ge $totalFiles) { break }
    
    $stdoutFile = Join-Path $scratchDir "worker_$i.log"
    $stderrFile = Join-Path $scratchDir "worker_err_$i.log"
    
    $p = Start-Process powershell.exe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$workerScriptPath`" -chunkIdx $i -startIndex $start -endIndex $end" -RedirectStandardOutput $stdoutFile -RedirectStandardError $stderrFile -PassThru -WindowStyle Hidden
    $processes += $p
}

# Wait for all processes to complete
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

# Merge progress files back
$mergedProgress = @{}
for ($i = 0; $i -lt $chunks; $i++) {
    $workerProgressFile = Join-Path $scratchDir "progress_$i.json"
    if (Test-Path $workerProgressFile) {
        try {
            $content = Get-Content -Path $workerProgressFile -Raw
            if (-not [string]::IsNullOrEmpty($content)) {
                $existing = ConvertFrom-Json $content
                if ($existing) {
                    foreach ($prop in $existing.PSObject.Properties) {
                        $mergedProgress[$prop.Name] = $prop.Value
                    }
                }
            }
        } catch {}
        Remove-Item $workerProgressFile -Force
    }
}

# Save main progress file
$mergedProgress | ConvertTo-Json | Out-File -FilePath $mainProgressFile -Encoding utf8

# Now generate final songs_array.js
Write-Host "Generating final songs_array.js..." -ForegroundColor Green
$allSongs = @()
$idCounter = 100

$emoji_map = @{
    "sad" = "\u{1F343}"
    "evergreen" = "\u{1F332}"
    "love" = "\u{1F496}"
    "marriage hits" = "\u{1F48D}"
    "devotional" = "\u{1F64F}"
    "melody" = "\u{1F3B5}"
    "band" = "\u{1F3BA}"
    "funeral" = "\u{1F3A4}"
    "golden hits" = "\u{1F3C6}"
    "heart break" = "\u{1F494}"
    "hethaee" = "\u{1F5FE}"
    "soulful" = "\u{1F49E}"
    "up beat" = "\u{1F525}"
    "wedding hits" = "\u{1F48F}"
    "unknown" = "\u{1F3A7}"
}

$textInfo = (Get-Culture).TextInfo
foreach ($file in $files) {
    if ($file.Length -eq 0) { continue }
    
    $filePathKey = $file.FullName
    if (-not $mergedProgress.ContainsKey($filePathKey)) {
        continue # Skip if upload failed
    }
    
    $catboxUrl = $mergedProgress[$filePathKey]
    $parentFolder = $file.Directory.Name.ToLower()
    $grandParentFolder = $file.Directory.Parent.Name.ToLower()
    
    # 1. Clean Title and Artist name
    $baseName = $file.BaseName
    $parts = $baseName -split ' - | _ |  '
    $cleanTitle = $parts[0].Trim()
    
    # Remove junk suffixes
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
    
    $artist = "Baduga Artist"
    $genre = "Evergreen"
    
    if ($grandParentFolder -eq "artists") {
        # Inside Artists/<artist_name>
        $artist = $parentFolder
        if ($artist -eq "amma") { $genre = "Devotional"; $artist = "Amma" }
        elseif ($artist -eq "gowtham") { $genre = "Soulful"; $artist = "Gowtham" }
        elseif ($artist -eq "udhaya devan") { $genre = "Soulful"; $artist = "Udhaya Devan" }
        elseif ($artist -eq "vishak") { $genre = "Soulful"; $artist = "Vishak" }
    } else {
        # Standard folder mapping
        if ($parentFolder -eq "love") { $genre = "Love" }
        elseif ($parentFolder -eq "heart break") { $genre = "Heart Break" }
        elseif ($parentFolder -eq "funeral") { $genre = "Heart Break" }
        elseif ($parentFolder -eq "hethaee") { $genre = "Hethaee" }
        elseif ($parentFolder -eq "bhajan") { $genre = "Bhajan" }
        elseif ($parentFolder -eq "devotional") { $genre = "Devotional" }
        elseif ($parentFolder -eq "golden hits" -or $parentFolder -eq "unknown") { $genre = "Golden Hits" }
        elseif ($parentFolder -eq "soulful") { $genre = "Soulful" }
        elseif ($parentFolder -eq "up beat") { $genre = "Up Beat" }
        elseif ($parentFolder -eq "wedding hits" -or $parentFolder -eq "weddinghits") { $genre = "Wedding Hits" }
        elseif ($parentFolder -eq "band") { $genre = "Band" }
        
        # Check if artist name is in the filename split
        if ($parts.Length -gt 1) {
            $a = $parts[1].Trim()
            $a = $a -replace '(?i)Baduga.*$',''
            $a = $a -replace '(?i)Badaga.*$',''
            $a = $a -replace '(?i)Song.*$',''
            $a = $a -replace '[^\x00-\x7F]',''
            $a = ($a -replace '\s+', ' ').Trim()
            if ($a.Length -gt 2) { $artist = $a }
        }
    }
    
    $cleanTitle = $textInfo.ToTitleCase($cleanTitle.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())
    if ($cleanTitle -eq '') { $cleanTitle = "Song $idCounter" }

    $emoji = "\u{1F3B5}"
    if ($emoji_map.ContainsKey($parentFolder)) {
        $emoji = $emoji_map[$parentFolder]
    }

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
    $allSongs += $songObj
    $idCounter++
}

# Write songs_array.js
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

$songsArrayPath = "c:\Users\ELCOT\Desktop\echo of badaga\songs_array.js"
Set-Content -Path $songsArrayPath -Value $jsContent -Encoding utf8

# Clean up
Remove-Item $workerScriptPath -Force

Write-Host "Success! Created songs_array.js with $($allSongs.Count) songs." -ForegroundColor Green
