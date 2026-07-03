<?php
$conn = new mysqli('127.0.0.1', 'root', '');
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

if ($conn->query("CREATE DATABASE IF NOT EXISTS echobaduga") === TRUE) {
    echo "DB created. ";
} else {
    echo "DB Error: " . $conn->error;
}

$conn->select_db('echobaduga');
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mobile VARCHAR(20) NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'listener',
    otp_code VARCHAR(100) NULL,
    otp_expiry DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");
$conn->query("CREATE TABLE IF NOT EXISTS songs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    artist_name VARCHAR(255) NOT NULL,
    cover_emoji VARCHAR(50) DEFAULT '🎵',
    duration VARCHAR(10) DEFAULT '3:30',
    like_count INT DEFAULT 0,
    play_count INT DEFAULT 0,
    genre VARCHAR(50) DEFAULT 'Folk',
    file_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");
$conn->query("CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    rating INT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");
echo "OK.";
?>
