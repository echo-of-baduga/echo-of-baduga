# cleanup_new_songs.ps1
# Delete files in songs/ that are not part of the original 54 songs to free up C: drive space

$workspaceDir = "c:\Users\ELCOT\Desktop\echo of badaga"
$xampSongsDir = "C:\xampp\htdocs\songs"
$localJsPath = Join-Path $workspaceDir "songs_array.js"

# 1. Load original 54 songs from songs_array.js
$originalSongs = @()
if (Test-Path $localJsPath) {
    $content = [System.IO.File]::ReadAllText($localJsPath)
    $matches = [regex]::Matches($content, '(?s)\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')
    foreach ($m in $matches) {
        # Extract file path relative or name
        $url = $m.Groups[8].Value
        # Decode URL and get filename
        $decodedUrl = [Uri]::UnescapeDataString($url)
        $fileName = [System.IO.Path]::GetFileName($decodedUrl)
        $originalSongs += $fileName.ToLower()
    }
    Write-Output "Loaded $($originalSongs.Count) original song filenames."
} else {
    Write-Error "Original songs_array.js not found!"
    exit 1
}

# 2. Function to delete new files
function Clean-Directory($dir) {
    if (-not (Test-Path $dir)) { return }
    Write-Output "Scanning directory: $dir"
    $files = Get-ChildItem -Path $dir -File -Recurse
    $deletedCount = 0
    $deletedBytes = 0
    
    foreach ($f in $files) {
        $nameLower = $f.Name.ToLower()
        if (-not ($originalSongs -contains $nameLower)) {
            $size = $f.Length
            try {
                Remove-Item -Path $f.FullName -Force
                $deletedCount++
                $deletedBytes += $size
            } catch {
                Write-Error "Failed to delete $($f.FullName): $_"
            }
        }
    }
    Write-Output "Deleted $deletedCount files ($([Math]::Round($deletedBytes / (1024*1024), 2)) MB) from $dir."
}

Clean-Directory (Join-Path $workspaceDir "songs")
Clean-Directory $xampSongsDir
