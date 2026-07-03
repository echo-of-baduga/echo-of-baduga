# seed_supabase.ps1
# Seed the 663 songs catalog from songs_array.js directly into Supabase Cloud database

$js_path = "c:\Users\ELCOT\Desktop\echo of badaga\songs_array.js"
if (-not (Test-Path $js_path)) {
    Write-Error "songs_array.js not found!"
    exit 1
}

$content = Get-Content -Path $js_path -Raw
# Parse JS array via regex
$matches = [regex]::Matches($content, '\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')

$songs = @()
foreach ($m in $matches) {
    $song = [PSCustomObject]@{
        title       = $m.Groups[2].Value
        artist_name = $m.Groups[3].Value
        cover_emoji = $m.Groups[4].Value
        duration    = $m.Groups[5].Value
        like_count  = [int]$m.Groups[6].Value
        genre       = $m.Groups[7].Value
        file_url    = $m.Groups[8].Value
    }
    $songs += $song
}

Write-Host "Parsed $($songs.Count) songs from songs_array.js." -ForegroundColor Green

# Supabase URL & Key
$url = "https://iwkyfdhmbkhlpfgybsry.supabase.co/rest/v1/songs"
$key = "sb_publishable_UyIEXHFzRqrtXS5WDdPogw_xRhEzrs3"

$headers = @{
    "apikey"        = $key
    "Authorization" = "Bearer $key"
    "Content-Type"  = "application/json"
    "Prefer"        = "return=minimal"
}

# Clear existing entries first to avoid duplicates
Write-Host "Clearing old songs from Supabase..."
try {
    $deleteRes = Invoke-RestMethod -Uri "$url?id=gt.0" -Method Delete -Headers $headers
    Write-Host "Cleared successfully!" -ForegroundColor Green
} catch {
    Write-Warning "Could not clear table: $_"
}

# Upload in batches of 100
$batchSize = 100
for ($i = 0; $i -lt $songs.Count; $i += $batchSize) {
    $end = [Math]::Min($i + $batchSize - 1, $songs.Count - 1)
    $batch = $songs[$i..$end]
    $json = $batch | ConvertTo-Json -Depth 5
    
    Write-Host "Uploading songs $i to $end to Supabase..."
    try {
        $res = Invoke-RestMethod -Uri $url -Method Post -Headers $headers -Body $json
        Write-Host "Batch uploaded successfully!" -ForegroundColor Green
    } catch {
        Write-Error "Failed to upload batch: $_"
    }
}
Write-Host "Supabase Seeding Completed!" -ForegroundColor Green
