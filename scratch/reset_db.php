<?php
// reset_db.php
// Truncate the local MySQL songs table

$user = 'root';
$pass = '';
$db = 'echobaduga';
$conn = @new mysqli('127.0.0.1', $user, $pass, $db);

if ($conn->connect_error) {
    $conn = @new mysqli('localhost', $user, $pass, $db);
}

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error . "\n");
}

if ($conn->query("TRUNCATE TABLE songs")) {
    echo "Successfully truncated songs table.\n";
} else {
    echo "Error truncating table: " . $conn->error . "\n";
}

$conn->close();
?>
