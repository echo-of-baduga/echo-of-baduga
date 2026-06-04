# match_artists.ps1
$songsArrayPath = "c:\Users\ELCOT\Desktop\echo of badaga\songs_array.js"

$artist_mapping = @{
    "Eera Maasi Hethey" = "BBH Productions"
    "Haalakeru Hallamadu New" = "Pedhuva Raman"
    "Habba" = "Vishak Rajagopalan & Murugesh Porthy"
    "Hetheya Gava" = "Murugesh Porthy"
    "Hetheya Morana Naalu" = "Annikorai Mano"
    "Kanneeruna Kanikai New" = "Halan Sankaran"
    "Keruna Gamalu" = "Hethetha Nera Ganesh"
    "Singara Maadu Hethe New" = "Annikorai Mano & Ayakeru Magesh"
    "Uttuga Radhi" = "Badaga Song Lyrics"
    "Aaluna Manasu Hethaega" = "Pedhuva Raman"
    "Aaluna Thattae" = "Murugesh Porthy"
    "Annatha Anna" = "Ctn Chandran"
    "Baanuna Hunnavae" = "Babu Kanna & Thikisha Jivani"
    "Billi Hoo" = "Murugesh Porthy"
    "Dhoorono Thooralu" = "Kallakorai Gowtham"
    "Doiii" = "Kallakorai Gowtham"
    "Enna Easare Yeagi Koruchuvane New Song" = "Ctn Chandran"
    "Enna Nenapu Ella..New Song...2025" = "Ctn Chandran"
    "Eraduna Manasu" = "Kallakorai Gowtham"
    "Ganduna Gava 2" = "PaaS Studio's"
    "Gavadha Kaneeru" = "Murugesh Porthy"
    "Gavailayo" = "Badaga Tunes"
    "Gille Gille" = "Nagu Chandran"
    "Hathe Noda Beda Nae" = "Udhaya Devan"
    "Ill Thaka Saiyya" = "Covai Sathish & Murugesh Porthy"
    "Jakkathooru Echira Heathe" = "Malla Devan Bhojan"
    "Jil Jung Juk" = "Murugesh Porthy & Kallakorai Gowtham"
    "Kivi Oranaa" = "BBH Productions"
    "Maathaadu Malligea" = "Kallakorai Gowtham"
    "Manja Neeru" = "Badaga Tunes"
    "Marava Manasille" = "Pravinu Rajumaathi & Murugesh Porthy"
    "Mollakodiya Gava Dhoovegatta-" = "Vishak Rajagopalan"
    "Muthu maniyae" = "Murugesh Porthy"
    "Neeragi uttithalayoo" = "SathiyaKathi Hethae"
    "Nela Baggi Song By Kallakorai Gowtham" = "Kallakorai Gowtham"
    "Nela Baggi" = "Kallakorai Gowtham"
    "Nenapu Ondhu Nenjunogae" = "Kallakorai Gowtham"
    "Nethi Keppuna" = "Vishak Rajagopalan"
    "Nethi Neruna" = "Murugesh Porthy"
    "Ninna Gaena" = "Udhaya Devan"
    "Ninna Noduvanangey Haraney" = "Badaga Tunes"
    "Oh Kanmaniyea" = "Kallakorai Gowtham"
    "Radhe" = "Kallakorai Gowtham"
    "Sathiya Kaathi" = "Rangasamy Devaraj & Murugesh Porthy"
    "Singaranae -" = "BMW Production"
    "Singaranae 2" = "BMW Production"
    "Song 147" = "Kallakorai Gowtham"
    "Song 148" = "Vishak Rajagopalan"
    "Song 149" = "Murugesh Porthy (Composer)"
    "Sweet Kaara 4K" = "Pridisha & Milidhane Dinesh"
    "Thirigi Nodu" = "Suryaa Kallakorai"
    "Ullathi Bussuthogae" = "Javvoniya Jara"
    "We" = "Murugesh Porthy"
    "Kanneruna kadhaeya" = "SathiyaKathi Hethae"
    "Olluna Uruchu" = "Udhaya Devan"
}

# Load the current songs array from songs_array.js
$content = [System.IO.File]::ReadAllText($songsArrayPath)

# We want to extract each block { ... } inside the array
# We can use regex to find all objects
$matches = [regex]::Matches($content, '(?s)\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}')

$newObjects = @()

foreach ($m in $matches) {
    $id = $m.Groups[1].Value
    $title = $m.Groups[2].Value
    $artist_name = $m.Groups[3].Value
    $cover_emoji = $m.Groups[4].Value
    $duration = $m.Groups[5].Value
    $like_count = $m.Groups[6].Value
    $genre = $m.Groups[7].Value
    $file_url = $m.Groups[8].Value

    # Apply mapping if exists
    $mapped_artist = $artist_mapping[$title]
    if ($mapped_artist -ne $null) {
        $artist_name = $mapped_artist
    }
    
    # Check for cleaned title
    if ($title -eq "Nela Baggi Song By Kallakorai Gowtham") {
        $title = "Nela Baggi"
        $artist_name = "Kallakorai Gowtham"
    }

    # Format back as js object
    $jsObj = "    {`n" +
             "        id: $id,`n" +
             "        title: `"$title`",`n" +
             "        artist_name: `"$artist_name`",`n" +
             "        cover_emoji: `"$cover_emoji`",`n" +
             "        duration: `"$duration`",`n" +
             "        like_count: $like_count,`n" +
             "        genre: `"$genre`",`n" +
             "        file_url: `"$file_url`"`n" +
             "    }"
    $newObjects += $jsObj
}

$jsSongs = $newObjects -join ",`n"
$newSongsArrayBlock = "const DEMO_SONGS = [`n$jsSongs`n];"

# Write to songs_array.js
[System.IO.File]::WriteAllText($songsArrayPath, $newSongsArrayBlock)
Write-Output "Updated songs_array.js successfully with manual overrides"
