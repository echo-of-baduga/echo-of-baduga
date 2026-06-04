<?php
$conn = new mysqli('127.0.0.1', 'root', '');
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($conn->query("CREATE DATABASE IF NOT EXISTS echobaduga") === TRUE) {
    echo "DB created. ";
} else {
    echo "DB Error: " . $conn->error;
}

$conn->select_db('echobaduga');
$conn->query("CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), role VARCHAR(50), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");
$conn->query("CREATE TABLE IF NOT EXISTS songs (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), artist_name VARCHAR(255), cover_emoji VARCHAR(50) DEFAULT '🎵', duration VARCHAR(10) DEFAULT '3:30', like_count INT DEFAULT 0, play_count INT DEFAULT 0, genre VARCHAR(50) DEFAULT 'Folk', file_url VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)");

$conn->query("DELETE FROM songs;");
$conn->query("INSERT INTO songs (title, artist_name, file_url) VALUES ('Song 1', 'Baduga Artist', 'http://localhost/song/song1.mp3'), ('Song 2', 'Baduga Artist', 'http://localhost/song/song2.mp3'), ('Song 3', 'Baduga Artist', 'http://localhost/song/song3.mp3'), ('Song 4', 'Baduga Artist', 'http://localhost/song/song4.mp3'), ('Song 5', 'Baduga Artist', 'http://localhost/song/song5.mp3'), ('Song 6', 'Baduga Artist', 'http://localhost/song/song6.mp3'), ('Song 7', 'Baduga Artist', 'http://localhost/song/song7.mp3'), ('Song 8', 'Baduga Artist', 'http://localhost/song/song8.mp3')");
echo "OK.";
?>
