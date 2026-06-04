$sourceDir = "C:\xampp\htdocs\song"
$destDir = "c:\Users\ELCOT\Desktop\echo of badaga\song"

if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Force -Path $destDir }

$files = Get-ChildItem -Path $sourceDir -Filter *.mp3
$jsonArr = @()
$idCounter = 100

foreach ($file in $files) {
    $origName = $file.Name
    $baseName = $file.BaseName
    
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
    $cleanTitle = $cleanTitle -replace '🤍.*$',''
    $cleanTitle = $cleanTitle -replace '🎵.*$',''
    $cleanTitle = $cleanTitle -replace '🔥.*$',''
    $cleanTitle = $cleanTitle -replace '☂.*$',''
    $cleanTitle = $cleanTitle -replace '__.*$',''
    $cleanTitle = $cleanTitle -replace '#.*$',''

    $cleanTitle = $cleanTitle.Trim()
    if ($cleanTitle -eq '') { $cleanTitle = "Song $idCounter" }

    $artist = "Unknown Artist"
    if ($parts.Length -gt 1) {
        $a = $parts[1].Trim()
        $a = $a -replace '(?i)Baduga.*$',''
        $a = $a -replace '(?i)Badaga.*$',''
        $a = $a -replace '(?i)Song.*$',''
        $a = $a.Trim()
        if ($a.Length -gt 2) { $artist = $a }
        elseif ($parts.Length -gt 2) { $artist = $parts[2].Trim() }
    }
    
    $textInfo = (Get-Culture).TextInfo
    $cleanTitle = $textInfo.ToTitleCase($cleanTitle.ToLower())
    $artist = $textInfo.ToTitleCase($artist.ToLower())
    
    $newName = "$cleanTitle.mp3"
    
    $finalPath = Join-Path -Path $destDir -ChildPath $newName
    $duplicateCounter = 1
    while (Test-Path $finalPath) {
        $newName = "$cleanTitle ($duplicateCounter).mp3"
        $finalPath = Join-Path -Path $destDir -ChildPath $newName
        $duplicateCounter++
    }
    
    Copy-Item -Path $file.FullName -Destination $finalPath
    
    $newHtdocsPath = Join-Path -Path $sourceDir -ChildPath $newName
    if ($file.FullName -ne $newHtdocsPath -and -not (Test-Path $newHtdocsPath)) {
        Rename-Item -Path $file.FullName -NewName $newName
    }

    $jsObj = @"
    {
        id: $idCounter,
        title: "$cleanTitle",
        artist_name: "$artist",
        cover_emoji: "🎵",
        duration: "4:00",
        like_count: $(Get-Random -Minimum 100 -Maximum 5000),
        genre: "$((Get-Random -InputObject ("Melody","Sad","Love","Marriage Hits","Evergreen")))",
        file_url: "http://localhost/song/$newName"
    }
"@
    $jsonArr += $jsObj
    $idCounter++
}

$finalJson = "const DEMO_SONGS = [`n" + ($jsonArr -join ",`n") + "`n];"
Set-Content -Path "C:\Users\ELCOT\Desktop\echo of badaga\songs_array.js" -Value $finalJson
Write-Output "Done! Processed $($idCounter - 100) songs."
