<?php
header('Content-Type: application/json');

$category = isset($_GET['category']) ? $_GET['category'] : 'sad';
$allowed_categories = ['sad', 'evergreen', 'love', 'marriage', 'devotional', 'melody', 'unknown'];

if (!in_array($category, $allowed_categories)) {
    echo json_encode(['success' => false, 'error' => 'Invalid category']);
    exit;
}

// Use DOCUMENT_ROOT to reliably find the songs folder on XAMPP
$dir = $_SERVER['DOCUMENT_ROOT'] . "/songs/" . $category . "/";
$web_path = "/songs/" . $category . "/";

if (!is_dir($dir)) {
    echo json_encode([
        'success' => true, 
        'category' => $category, 
        'songs' => [], 
        'message' => "Folder 'songs/$category/' not found on server."
    ]);
    exit;
}

$files = scandir($dir);
$songs = [];
$id = 1;

$emoji_map = [
    'sad' => '🍃',
    'evergreen' => '🌲',
    'love' => '💖',
    'marriage' => '💍',
    'devotional' => '🙏',
    'melody' => '🎵',
    'unknown' => '🎧'
];

foreach ($files as $file) {
    if ($file === '.' || $file === '..') continue;
    
    $path_info = pathinfo($file);
    if (isset($path_info['extension']) && strtolower($path_info['extension']) === 'mp3') {
        $title = str_replace(['_', '-'], ' ', $path_info['filename']);
        $title = ucwords(strtolower($title));
        
        $songs[] = [
            'id' => $id++,
            'title' => $title,
            'artist_name' => 'Baduga Artist',
            'cover_emoji' => isset($emoji_map[$category]) ? $emoji_map[$category] : '🎵',
            'duration' => '3:45',
            'genre' => ucfirst($category),
            'file_url' => $web_path . rawurlencode($file)
        ];
    }
}

echo json_encode([
    'success' => true,
    'category' => $category,
    'count' => count($songs),
    'songs' => $songs
]);
?>
