$userHome = "C:\Users\ELCOT"
$dirs = Get-ChildItem -Path $userHome -Directory -ErrorAction SilentlyContinue
$result = @()
foreach ($dir in $dirs) {
    if ($dir.Name -eq "AppData") {
        # AppData has subdirs, let's scan them
        $appDataSub = Get-ChildItem -Path $dir.FullName -Directory -ErrorAction SilentlyContinue
        foreach ($sub in $appDataSub) {
            $files = Get-ChildItem -Path $sub.FullName -Recurse -File -ErrorAction SilentlyContinue
            $sum = 0
            foreach ($f in $files) { $sum += $f.Length }
            $result += [PSCustomObject]@{
                Name = "AppData\" + $sub.Name
                SizeMB = [math]::Round($sum / 1MB, 2)
            }
        }
        continue
    }
    $files = Get-ChildItem -Path $dir.FullName -Recurse -File -ErrorAction SilentlyContinue
    $sum = 0
    foreach ($f in $files) { $sum += $f.Length }
    $result += [PSCustomObject]@{
        Name = $dir.Name
        SizeMB = [math]::Round($sum / 1MB, 2)
    }
}
$result | Sort-Object SizeMB -Descending | Format-Table -AutoSize
