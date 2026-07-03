# clean_and_generate_songs.ps1
# This script renames files in the local XAMPP songs directory to make them URL-safe,
# and generates a fully populated DEMO_SONGS array to update index.html and songs_array.js.

$baseDir = "C:\xampp\htdocs\songs"
if (-not (Test-Path $baseDir)) {
    Write-Error "XAMPP songs directory not found at $baseDir"
    exit 1
}

$files = Get-ChildItem -Path $baseDir -Filter *.mp3 -Recurse
Write-Output "Found $($files.Count) MP3 files in XAMPP songs folder."

$jsonArr = @()
$idCounter = 100

# Emoji map using JS Unicode escapes to prevent any PowerShell encoding issues
$emoji_map = @{
    "sad" = "\u{1F343}";
    "evergreen" = "\u{1F332}";
    "love" = "\u{1F496}";
    "marriage" = "\u{1F48D}";
    "devotional" = "\u{1F64F}";
    "melody" = "\u{1F3B5}";
    "unknown" = "\u{1F3A7}"
}

$textInfo = (Get-Culture).TextInfo

foreach ($file in $files) {
    $parentFolder = $file.Directory.Name.ToLower()
    $origName = $file.Name
    $baseName = $file.BaseName
    
    # 1. Clean Title and Artist
    # Split by standard dividers
    $parts = $baseName -split ' - | _ |  '
    $cleanTitle = $parts[0].Trim()
    
    # Remove undesirable suffixes/tags from Title
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga New Love Video Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Full Video.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga Album Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Album Song.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Baduga.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Badaga.*$',''
    $cleanTitle = $cleanTitle -replace '(?i)\s*Video Song.*$',''
    
    # Strip emojis / non-ASCII characters
    $cleanTitle = $cleanTitle -replace '[^\x00-\x7F]',''
    
    # Replace other problematic characters
    $cleanTitle = $cleanTitle -replace '__',''
    $cleanTitle = $cleanTitle -replace '#',''
    $cleanTitle = $cleanTitle -replace '\?',''
    $cleanTitle = $cleanTitle -replace '\*',''
    $cleanTitle = $cleanTitle -replace '\+',''
    $cleanTitle = $cleanTitle -replace '&','And'
    $cleanTitle = $cleanTitle -replace '%',''
    
    # Remove any extra spaces and trim
    $cleanTitle = ($cleanTitle -replace '\s+', ' ').Trim()
    if ($cleanTitle -eq '') { $cleanTitle = "Song $idCounter" }

    # Parse Artist
    $artist = "Baduga Artist"
    if ($parts.Length -gt 1) {
        $a = $parts[1].Trim()
        $a = $a -replace '(?i)Baduga.*$',''
        $a = $a -replace '(?i)Badaga.*$',''
        $a = $a -replace '(?i)Song.*$',''
        $a = $a -replace '[^\x00-\x7F]',''
        $a = $a -replace '\?',''
        $a = $a -replace '#',''
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
    
    # Title Case format
    $cleanTitle = $textInfo.ToTitleCase($cleanTitle.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())
    
    # 2. Build Safe Filename (remove all special characters that break URLs)
    # Only keep alphanumeric characters, spaces, hyphens, and dots
    $safeTitle = $cleanTitle -replace '[^a-zA-Z0-9\s\-\.]',''
    $safeTitle = ($safeTitle -replace '\s+', ' ').Trim()
    
    $newName = "$safeTitle.mp3"
    
    $oldPath = $file.FullName
    $newPath = Join-Path $file.DirectoryName $newName
    
    if ($oldPath -ne $newPath) {
        # Avoid duplicate name collision
        $duplicateCounter = 1
        while (Test-Path $newPath) {
            $newName = "$safeTitle ($duplicateCounter).mp3"
            $newPath = Join-Path $file.DirectoryName $newName
            $duplicateCounter++
        }
        Rename-Item -Path $oldPath -NewName $newName -Force
        Write-Output "Renamed file: '$origName' -> '$newName'"
    } else {
        Write-Output "Already clean filename: '$origName'"
    }
    
    # Get category emoji escape
    $emoji = "\u{1F3B5}"
    if ($emoji_map.ContainsKey($parentFolder)) {
        $emoji = $emoji_map[$parentFolder]
    }
    
    # Construct JavaScript Object string
    $jsObj = "    {`n" +
             "        id: $idCounter,`n" +
             "        title: `"$cleanTitle`",`n" +
             "        artist_name: `"$artist`",`n" +
             "        cover_emoji: `"$emoji`",`n" +
             "        duration: `"3:45`",`n" +
             "        like_count: $(Get-Random -Minimum 100 -Maximum 5000),`n" +
             "        genre: `"$($textInfo.ToTitleCase($parentFolder))`",`n" +
             "        file_url: `"/songs/$parentFolder/$([Uri]::EscapeDataString($newName))`"`n" +
             "    }"
    
    $jsonArr += $jsObj
    $idCounter++
}

# 3. Join Objects into JavaScript Array block
$jsSongs = $jsonArr -join ",`n"
$newSongsArrayBlock = "const DEMO_SONGS = [`n$jsSongs`n];"

# 4. Write/Update index.html and songs_array.js in both locations
$targets = @(
    @{
        Type = "html"
        Path = "c:\Users\ELCOT\Desktop\echo of badaga\player.html"
    },
    @{
        Type = "html"
        Path = "C:\xampp\htdocs\echobaduga\player.html"
    },
    @{
        Type = "js"
        Path = "c:\Users\ELCOT\Desktop\echo of badaga\songs_array.js"
    },
    @{
        Type = "js"
        Path = "C:\xampp\htdocs\echobaduga\songs_array.js"
    }
)

foreach ($target in $targets) {
    $path = $target.Path
    if (Test-Path $path) {
        $content = [System.IO.File]::ReadAllText($path)
        
        # Regex replacement to cleanly update DEMO_SONGS definition
        if ($target.Type -eq "html") {
            # Find: const DEMO_SONGS = [...];
            $pattern = '(?s)const DEMO_SONGS = \[[^\]]*?\];?( //.*)?'
            if ($content -match $pattern) {
                $content = $content -replace $pattern, $newSongsArrayBlock
                # Save as UTF-8 without BOM to keep HTML standard
                [System.IO.File]::WriteAllText($path, $content)
                Write-Output "Successfully updated player.html at $path"
            } else {
                Write-Warning "Could not find DEMO_SONGS pattern in $path"
            }
        } elseif ($target.Type -eq "js") {
            # Replace entire content of songs_array.js with the array definition
            [System.IO.File]::WriteAllText($path, $newSongsArrayBlock)
            Write-Output "Successfully updated songs_array.js at $path"
        }
    } else {
        Write-Warning "Target file not found: $path"
    }
}

Write-Output "Done! Cleaned and generated $($jsonArr.Count) songs."
