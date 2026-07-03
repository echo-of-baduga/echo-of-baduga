# upload_to_catbox.ps1
# Script to upload MP3 songs recursively from a local folder to Catbox,
# clean their filenames/metadata, and import them directly into songs_array.js and index.html.

$localSongsDir = $args[0]
if ([string]::IsNullOrEmpty($localSongsDir)) {
    $localSongsDir = "E:\movies\music_organized"
}
if (-not (Test-Path $localSongsDir)) {
    Write-Error "Directory not found at $localSongsDir!"
    exit 1
}

$files = Get-ChildItem -Path $localSongsDir -Filter *.mp3 -Recurse
Write-Host "Found $($files.Count) songs to process." -ForegroundColor Cyan

$jsonArr = @()
$idCounter = 100
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

$counter = 1
foreach ($file in $files) {
    $parentFolder = $file.Directory.Name.ToLower()
    $origName = $file.Name
    $baseName = $file.BaseName
    
    Write-Host "`n[$counter/$($files.Count)] Processing: $origName" -ForegroundColor Yellow
    
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

    # 2. Upload to Catbox
    Write-Host "Uploading to Catbox..." -ForegroundColor Gray
    $catboxUrl = ""
    $retries = 3
    for ($attempt = 1; $attempt -le $retries; $attempt++) {
        try {
            $filePath = $file.FullName
            $result = & curl.exe -s -F "reqtype=fileupload" -F "fileToUpload=@$filePath" https://catbox.moe/user/api.php
            $catboxUrl = $result.Trim()
            if ($catboxUrl -match "https://files.catbox.moe/") {
                break
            } else {
                Write-Host "Attempt $attempt failed: $catboxUrl" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "Attempt $attempt exception: $_" -ForegroundColor Yellow
        }
        Start-Sleep -Seconds 2
    }

    if ($catboxUrl -match "https://files.catbox.moe/") {
        Write-Host "Uploaded successfully! Link: $catboxUrl" -ForegroundColor Green
    } else {
        Write-Host "Upload failed. Skipping." -ForegroundColor Red
        $counter++
        continue;
    }

    # 3. Save metadata
    $emoji = "\u{1F3B5}"
    if ($emoji_map.ContainsKey($parentFolder)) {
        $emoji = $emoji_map[$parentFolder]
    }
    
    $genre = $textInfo.ToTitleCase($parentFolder)
    if ($parentFolder -eq "marriagehits") {
        $genre = "Marriage Hits"
    } elseif ($parentFolder -eq "band") {
        $genre = "Band"
    }
    
    $jsObj = "    {`n" +
             "        id: $idCounter,`n" +
             "        title: `"$cleanTitle`",`n" +
             "        artist_name: `"$artist`",`n" +
             "        cover_emoji: `"$emoji`",`n" +
             "        duration: `"3:45`",`n" +
             "        like_count: $(Get-Random -Minimum 100 -Maximum 5000),`n" +
             "        genre: `"$genre`",`n" +
             "        file_url: `"$catboxUrl`"`n" +
             "    }"
    
    $jsonArr += $jsObj
    $idCounter++
    $counter++
}

# 4. Generate local JS database code
if ($jsonArr.Count -gt 0) {
    $jsSongs = $jsonArr -join ",`n"
    $newSongsArrayBlock = "const DEMO_SONGS = [`n$jsSongs`n];"
    
    # Save to local file
    $localJsPath = Join-Path $PSScriptRoot "songs_array.js"
    Set-Content -Path $localJsPath -Value $newSongsArrayBlock
    
    # Update local index.html too
    $htmlPath = Join-Path $PSScriptRoot "index.html"
    if (Test-Path $htmlPath) {
        $content = [System.IO.File]::ReadAllText($htmlPath)
        $pattern = '(?s)const DEMO_SONGS = \[[^\]]*?\];?( //.*)?'
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $newSongsArrayBlock
            [System.IO.File]::WriteAllText($htmlPath, $content)
            Write-Host "Successfully updated index.html local JS cache!" -ForegroundColor Green
        }
    }
    
    Write-Host "`nProcess finished! Uploaded $($jsonArr.Count) songs to Catbox." -ForegroundColor Green
    Write-Host "Run 'powershell -ExecutionPolicy Bypass -File .\build_android.ps1' or 'npx cap sync android' to sync them to your mobile app!" -ForegroundColor Cyan
} else {
    Write-Host "No songs were uploaded successfully." -ForegroundColor Yellow
}
