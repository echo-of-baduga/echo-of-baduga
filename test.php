<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$conn = new mysqli('127.0.0.1', 'root', '', 'echobaduga');
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$res = $conn->query("SELECT id, name, email, mobile, password, role FROM users");
if ($res) {
    echo "Users list:\n";
    while ($row = $res->fetch_assoc()) {
        print_r($row);
    }
} else {
    echo "No users found or error: " . $conn->error . "\n";
}
$conn->close();
?>
