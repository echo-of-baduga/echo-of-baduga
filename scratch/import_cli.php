<?php
// import_cli.php
// Seeding script for local MySQL database

$host = 'localhost';
$db = 'echobaduga';
$user = 'root';
$pass = '';

$conn = @new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    $conn = @new mysqli('127.0.0.1', $user, $pass);
}

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error . "\n");
}

if (!$conn->select_db($db)) {
    die("Database selection failed: " . $conn->error . "\n");
}

$js_path = __DIR__ . '/../songs_array.js';
if (!file_exists($js_path)) {
    die("songs_array.js not found at " . $js_path . "\n");
}

$content = file_get_contents($js_path);
preg_match_all('/\{\s*id:\s*(\d+),\s*title:\s*"([^"]+)",\s*artist_name:\s*"([^"]+)",\s*cover_emoji:\s*"([^"]+)",\s*duration:\s*"([^"]+)",\s*like_count:\s*(\d+),\s*genre:\s*"([^"]+)",\s*file_url:\s*"([^"]+)"\s*\}/', $content, $matches, PREG_SET_ORDER);

if (empty($matches)) {
    die("No songs parsed from songs_array.js\n");
}

$inserted = 0;
$skipped = 0;
$errors = 0;

foreach ($matches as $match) {
    $title = $conn->real_escape_string($match[2]);
    $artist_name = $conn->real_escape_string($match[3]);
    $cover_emoji = $conn->real_escape_string($match[4]);
    $duration = $conn->real_escape_string($match[5]);
    $like_count = (int)$match[6];
    $genre = $conn->real_escape_string($match[7]);
    $file_url = $conn->real_escape_string($match[8]);

    // Check if duplicate
    $check = $conn->query("SELECT id FROM songs WHERE file_url='$file_url'");
    if ($check && $check->num_rows > 0) {
        $skipped++;
    } else {
        $sql = "INSERT INTO songs (title, artist_name, cover_emoji, duration, like_count, genre, file_url) 
                VALUES ('$title', '$artist_name', '$cover_emoji', '$duration', $like_count, '$genre', '$file_url')";
        if ($conn->query($sql)) {
            $inserted++;
        } else {
            $errors++;
        }
    }
}

echo "Import finished!\n";
echo "Total parsed: " . count($matches) . "\n";
echo "Inserted: $inserted\n";
echo "Skipped: $skipped\n";
echo "Errors: $errors\n";
