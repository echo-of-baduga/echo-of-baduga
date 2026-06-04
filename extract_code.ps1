# Find the original VIEW_FILE of index.html that contains the full JS code
$transcriptPath = "C:\Users\ELCOT\.gemini\antigravity\brain\706ea221-b0e9-4c05-b7fd-8d1513e7e33f\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $transcriptPath

# Look at early VIEW_FILE entries (before modifications) that contain 'loadSongs' or 'showPage' or 'splash'
foreach ($i in @(19, 20, 21, 22)) {
    $line = $lines[$i]
    $preview = $line.Substring(0, [Math]::Min(300, $line.Length))
    Write-Output "--- Line $i (len=$($line.Length)) ---"
    Write-Output $preview
    Write-Output ""
}
