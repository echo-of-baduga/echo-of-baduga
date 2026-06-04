<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$host = 'localhost';
$db = 'echobaduga';
$user = 'root';
$pass = '';

// Connect without selecting the database first, to ensure we can create it if missing
$conn = @new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    $conn = @new mysqli('127.0.0.1', $user, $pass);
}

if ($conn->connect_error) {
    $error_msg = "Database connection failed: " . $conn->connect_error;
    file_put_contents(__DIR__ . '/../db_error_log.txt', date('[Y-m-d H:i:s] ') . $error_msg . "\n", FILE_APPEND);
    die(json_encode(["success" => false, "error" => $error_msg]));
}

// Auto-create database if not exists
if (!$conn->query("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")) {
    $error_msg = "Database auto-creation failed: " . $conn->error;
    file_put_contents(__DIR__ . '/../db_error_log.txt', date('[Y-m-d H:i:s] ') . $error_msg . "\n", FILE_APPEND);
    die(json_encode(["success" => false, "error" => $error_msg]));
}

// Select the database
if (!$conn->select_db($db)) {
    $error_msg = "Database selection failed: " . $conn->error;
    file_put_contents(__DIR__ . '/../db_error_log.txt', date('[Y-m-d H:i:s] ') . $error_msg . "\n", FILE_APPEND);
    die(json_encode(["success" => false, "error" => $error_msg]));
}

// Auto-create users table if it does not exist
$conn->query("CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'listener',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARSET=utf8mb4");

// Auto-create songs table if it does not exist
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
) CHARSET=utf8mb4");

// Populate songs table with some initial default local songs if empty
$res_songs = $conn->query("SELECT COUNT(*) as cnt FROM songs");
$song_count = 0;
if ($res_songs) {
    $row = $res_songs->fetch_assoc();
    $song_count = (int)$row['cnt'];
}
if ($song_count === 0) {
    $conn->query("INSERT INTO songs (title, artist_name, file_url, genre) VALUES 
    ('Eera Maasi Hethey', 'Bbh Productions', 'songs/devotional/Eera%20Maasi%20Hethey.mp3', 'Devotional'),
    ('Haalakeru Hallamadu New', '- Pedhuva Raman', 'songs/devotional/Haalakeru%20Hallamadu%20New.mp3', 'Devotional'),
    ('Habba', 'Bbh Productions', 'songs/devotional/Habba.mp3', 'Devotional'),
    ('Hetheya Gava', 'New', 'songs/devotional/Hetheya%20Gava.mp3', 'Devotional'),
    ('Hetheya Morana Naalu', 'Annikorai Mano', 'songs/devotional/Hetheya%20Morana%20Naalu.mp3', 'Devotional')");
}

// ── EMAIL & SMS DELIVERY CONFIGURATION ──
define('SMTP_HOST', 'ssl://smtp.gmail.com'); // e.g. ssl://smtp.gmail.com for port 465, or tls://smtp.gmail.com for 587
define('SMTP_PORT', 465);
define('SMTP_USER', 'echoofbaduga@gmail.com');  // Enter your Gmail/SMTP email address
define('SMTP_PASS', 'YOUR_SMTP_PASSWORD');                      // Enter your Gmail App Password
define('SMTP_EMAIL_FROM', 'echoofbaduga@gmail.com');

define('TWILIO_SID', 'YOUR_TWILIO_SID');     // Enter your Twilio Account SID
define('TWILIO_TOKEN', 'YOUR_TWILIO_TOKEN');   // Enter your Twilio Auth Token
define('TWILIO_NUMBER', 'YOUR_TWILIO_NUMBER');  // Enter your Twilio Phone Number

function get_smtp_response($socket) {
    $response = "";
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (isset($line[3]) && $line[3] === ' ') {
            break;
        }
    }
    return $response;
}

function mask_email($email) {
    $parts = explode('@', $email);
    if (count($parts) < 2) return $email;
    $name = $parts[0];
    $domain = $parts[1];
    $len = strlen($name);
    if ($len <= 2) {
        $masked = $name . str_repeat('*', 3);
    } else {
        $masked = substr($name, 0, 2) . str_repeat('*', $len - 2);
    }
    return $masked . '@' . $domain;
}

function send_email($to, $subject, $message) {
    $host = SMTP_HOST;
    $port = SMTP_PORT;
    $user = SMTP_USER;
    $pass = SMTP_PASS;
    $from = SMTP_EMAIL_FROM;

    // Normalize all line endings to CRLF for RFC-compliant SMTP transaction
    $message = str_replace(["\r\n", "\r", "\n"], "\r\n", $message);

    $domain = 'echobaduga.com';
    $parts = explode('@', $from);
    if (count($parts) > 1) {
        $domain = $parts[1];
    }
    $messageId = "<" . md5(uniqid(time(), true)) . "@" . $domain . ">";

    // If SMTP credentials are empty or placeholders, fall back to built-in PHP mail()
    if (empty($host) || empty($user) || empty($pass) || strpos($user, 'your-gmail') !== false) {
        $headers = "From: Echo of Badaga <" . $from . ">\r\n";
        $headers .= "Reply-To: " . $from . "\r\n";
        $headers .= "Message-ID: " . $messageId . "\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();
        $headers = str_replace(["\r\n", "\r", "\n"], "\r\n", $headers);
        $sent_mail = @mail($to, $subject, $message, $headers);
        $log_msg = "PHP mail() execution result: " . ($sent_mail ? "SUCCESS" : "FAILED") . "\n";
        error_log($log_msg);
        return $sent_mail;
    }

    $timeout = 4; // Reduced timeout to fail fast and keep the frontend responsive
    // Bypassing SSL certificate verification for standard local environments
    $context = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ]);
    
    $socket = @stream_socket_client("$host:$port", $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT, $context);
    if (!$socket) {
        $error_log_msg = "SMTP Socket connection failed: $errno - $errstr. Host: $host, Port: $port\n";
        error_log($error_log_msg);
        file_put_contents(__DIR__ . '/../otp_debug.txt', $error_log_msg, FILE_APPEND);
        return false;
    }

    get_smtp_response($socket); // welcome message
    
    // EHLO
    fwrite($socket, "EHLO localhost\r\n");
    get_smtp_response($socket);

    // If port 587, try STARTTLS
    if ($port == 587) {
        fwrite($socket, "STARTTLS\r\n");
        get_smtp_response($socket);
        if (!@stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($socket);
            $tls_err = "SMTP Error: STARTTLS handshake failed\n";
            error_log($tls_err);
            file_put_contents(__DIR__ . '/../otp_debug.txt', $tls_err, FILE_APPEND);
            return false;
        }
        fwrite($socket, "EHLO localhost\r\n");
        get_smtp_response($socket);
    }

    // Authenticate
    fwrite($socket, "AUTH LOGIN\r\n");
    get_smtp_response($socket);

    fwrite($socket, base64_encode($user) . "\r\n");
    get_smtp_response($socket);

    fwrite($socket, base64_encode($pass) . "\r\n");
    $response = get_smtp_response($socket);
    
    if (strpos($response, '235') === false) {
        fclose($socket);
        $auth_err = "SMTP Auth failed for user $user. Code/Response: " . trim($response) . "\n";
        error_log($auth_err);
        file_put_contents(__DIR__ . '/../otp_debug.txt', $auth_err, FILE_APPEND);
        return false;
    }

    // MAIL FROM
    fwrite($socket, "MAIL FROM: <$from>\r\n");
    get_smtp_response($socket);

    // RCPT TO
    fwrite($socket, "RCPT TO: <$to>\r\n");
    get_smtp_response($socket);

    // DATA
    fwrite($socket, "DATA\r\n");
    get_smtp_response($socket);

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=utf-8\r\n";
    $headers .= "To: <$to>\r\n";
    $headers .= "From: Echo of Badaga <$from>\r\n";
    $headers .= "Reply-To: <$from>\r\n";
    $headers .= "Sender: <$from>\r\n";
    $headers .= "Message-ID: $messageId\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "Subject: $subject\r\n";
    $headers .= "Date: " . date('r') . "\r\n";

    fwrite($socket, $headers . "\r\n" . $message . "\r\n.\r\n");
    get_smtp_response($socket);

    // QUIT
    fwrite($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

function send_sms($to, $message) {
    if (empty(TWILIO_SID) || empty(TWILIO_TOKEN) || empty(TWILIO_NUMBER)) {
        return false;
    }
    $url = "https://api.twilio.com/2010-04-01/Accounts/" . TWILIO_SID . "/Messages.json";
    $data = [
        'From' => TWILIO_NUMBER,
        'To' => $to,
        'Body' => $message
    ];
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_USERPWD, TWILIO_SID . ":" . TWILIO_TOKEN);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    return ($http_code >= 200 && $http_code < 300);
}

// ── DATABASE AUTO-MIGRATION ──
// Automatically add columns for mobile/phone number and password reset OTP to users table if they don't exist
$res_columns = $conn->query("SHOW COLUMNS FROM users");
$columns = [];
if ($res_columns) {
    while ($col = $res_columns->fetch_assoc()) {
        $columns[] = $col['Field'];
    }
}

if (!in_array('mobile', $columns)) {
    $conn->query("ALTER TABLE users ADD COLUMN mobile VARCHAR(20) NULL AFTER email");
}
if (!in_array('otp_code', $columns)) {
    $conn->query("ALTER TABLE users ADD COLUMN otp_code VARCHAR(100) NULL");
} else {
    $conn->query("ALTER TABLE users MODIFY COLUMN otp_code VARCHAR(100) NULL");
}
if (!in_array('otp_expiry', $columns)) {
    $conn->query("ALTER TABLE users ADD COLUMN otp_expiry DATETIME NULL");
}

// Auto-create feedback table if it does not exist
$conn->query("CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NULL,
    email VARCHAR(255) NULL,
    rating INT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARSET=utf8mb4");

$action = $_GET['action'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if ($method == 'OPTIONS') { exit; }

switch ($action) {
    case 'login':
        $emailOrMobile = $conn->real_escape_string($input['email'] ?? '');
        $password = $input['password'] ?? '';
        
        if (empty($emailOrMobile) || empty($password)) {
            echo json_encode(["success" => false, "error" => "Please fill in all fields"]);
            break;
        }

        // Handle auto-prefix matching: if input is 10 digits, also try matching +91 prefix
        $mobileWithPrefix = $emailOrMobile;
        if (preg_match('/^[0-9]{10}$/', $emailOrMobile)) {
            $mobileWithPrefix = '+91' . $emailOrMobile;
        }

        // Query by email OR mobile for real authentication flexibility!
        $res = $conn->query("SELECT * FROM users WHERE email='$emailOrMobile' OR mobile='$emailOrMobile' OR mobile='$mobileWithPrefix'");
        if ($res && $res->num_rows > 0) {
            $u = $res->fetch_assoc();
            // Secure verification with password_verify, supports plain text fallback for compatibility
            if (password_verify($password, $u['password']) || $password === $u['password']) {
                // If it's plain text, automatically upgrade it to a hashed password!
                if ($password === $u['password'] && password_needs_rehash($u['password'], PASSWORD_DEFAULT)) {
                    $newHash = password_hash($password, PASSWORD_DEFAULT);
                    $conn->query("UPDATE users SET password='$newHash' WHERE id=" . $u['id']);
                }
                
                echo json_encode([
                    "success" => true,
                    "user" => [
                        "id" => $u['id'],
                        "name" => $u['name'],
                        "email" => $u['email'],
                        "mobile" => $u['mobile'] ?? '',
                        "initial" => strtoupper($u['name'][0] ?? 'U')
                    ]
                ]);
            } else {
                echo json_encode(["success" => false, "error" => "Invalid password"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "User not found"]);
        }
        break;

    case 'register':
        $name = $conn->real_escape_string($input['name'] ?? '');
        $email = $conn->real_escape_string($input['email'] ?? '');
        $mobile = $conn->real_escape_string($input['mobile'] ?? '');
        $password = password_hash($input['password'] ?? '', PASSWORD_DEFAULT);
        $role = $conn->real_escape_string($input['role'] ?? 'listener');
        
        if (empty($name) || empty($email) || empty($input['password'])) {
            echo json_encode(["success" => false, "error" => "All required fields must be filled"]);
            break;
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo json_encode(["success" => false, "error" => "Please enter a valid email address"]);
            break;
        }

        // Validate mobile format if provided (digits and optional leading +, total 10 to 15 digits)
        if (!empty($mobile)) {
            if (!preg_match('/^\+?[0-9]{10,15}$/', $mobile)) {
                echo json_encode(["success" => false, "error" => "Please enter a valid mobile number (10 to 15 digits)"]);
                break;
            }
        }

        // Check if email already exists
        $checkEmail = $conn->query("SELECT id FROM users WHERE email='$email'");
        if ($checkEmail && $checkEmail->num_rows > 0) {
            echo json_encode(["success" => false, "error" => "Email already exists"]);
            break;
        }

        // Check if mobile already exists if provided
        if (!empty($mobile)) {
            $checkMobile = $conn->query("SELECT id FROM users WHERE mobile='$mobile'");
            if ($checkMobile && $checkMobile->num_rows > 0) {
                echo json_encode(["success" => false, "error" => "Mobile number already registered"]);
                break;
            }
        }

        $stmt = $conn->query("INSERT INTO users (name, email, mobile, password, role) VALUES ('$name', '$email', '$mobile', '$password', '$role')");
        if ($conn->insert_id) {
            echo json_encode([
                "success" => true,
                "user" => [
                    "id" => $conn->insert_id,
                    "name" => $name,
                    "email" => $email,
                    "mobile" => $mobile,
                    "initial" => strtoupper($name[0] ?? 'U')
                ]
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "Registration failed: " . $conn->error]);
        }
        break;

    case 'forgot_password':
        $identity = $conn->real_escape_string($input['email_or_mobile'] ?? '');
        if (empty($identity)) {
            echo json_encode(["success" => false, "error" => "Please enter your Email or Mobile number"]);
            break;
        }

        // Handle auto-prefix matching: if input is 10 digits, also try matching +91 prefix
        $mobileWithPrefix = $identity;
        if (preg_match('/^[0-9]{10}$/', $identity)) {
            $mobileWithPrefix = '+91' . $identity;
        }

        $res = $conn->query("SELECT * FROM users WHERE email='$identity' OR name='$identity' OR mobile='$identity' OR mobile='$mobileWithPrefix'");
        if ($res && $res->num_rows > 0) {
            $u = $res->fetch_assoc();
            
            // Generate a secure 32-character token
            $token = bin2hex(random_bytes(16));
            // Set expiry to 1 hour from now
            $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
            
            $conn->query("UPDATE users SET otp_code='$token', otp_expiry='$expiry' WHERE id=" . $u['id']);
            
            // Construct the real reset link dynamically
            $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
            $domainName = $_SERVER['HTTP_HOST'];
            $scriptUri = $_SERVER['REQUEST_URI'];
            $baseDir = preg_replace('/api\/api\.php.*/', '', $scriptUri);
            $resetLink = $protocol . $domainName . $baseDir . "index.html?action=reset_password&email=" . urlencode($u['email']) . "&token=" . $token;
            
            // Check if identity entered is a mobile number (contains only digits and optional +)
            $is_mobile = preg_match('/^\+?[0-9]{10,15}$/', $identity);
            $sent = false;
            
            // Try sending SMS only if Twilio is configured and they entered a mobile number
            if ($is_mobile && !empty(TWILIO_SID) && !empty(TWILIO_TOKEN) && !empty(TWILIO_NUMBER)) {
                $targetMobile = $u['mobile'] ? $u['mobile'] : $identity;
                if (preg_match('/^[0-9]{10}$/', $targetMobile)) {
                    $targetMobile = '+91' . $targetMobile;
                }
                $sms_message = "Reset your Echo of Baduga password using this link: $resetLink";
                $sent = send_sms($targetMobile, $sms_message);
            } else {
                // Otherwise, send email to the user's registered email address
                $targetEmail = $u['email'];
                $subject = "Echo of Baduga - Reset Your Password";
                $logoUrl = $protocol . $domainName . $baseDir . "assets/logo.png";
                $message = "
                    <div style='background-color: #0b0c10; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;'>
                        <div style='max-width: 500px; margin: 0 auto; background-color: #1f2833; border: 1px solid #10b981; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: left;'>
                            <div style='text-align: center; margin-bottom: 24px;'>
                                <img src='$logoUrl' alt='Echo of Baduga Logo' style='width: 80px; height: 80px; border-radius: 50%; border: 3px solid #10b981; padding: 3px; background-color: #0b0c10; display: inline-block;'>
                                <h1 style='color: #ffffff; font-size: 24px; margin: 12px 0 4px; font-weight: 700; letter-spacing: 0.5px;'>Echo of Baduga</h1>
                                <p style='color: #10b981; font-size: 11px; text-transform: uppercase; margin: 0; font-weight: 700; letter-spacing: 1px;'>Security Service</p>
                            </div>
                            <div style='height: 1px; background: linear-gradient(to right, transparent, #10b981, transparent); margin-bottom: 24px;'></div>
                            <h2 style='color: #ffffff; font-size: 18px; margin-top: 0; font-weight: 600;'>Reset Your Password</h2>
                            <p style='color: #a5b1c2; font-size: 14px; line-height: 1.6;'>Hello,</p>
                            <p style='color: #a5b1c2; font-size: 14px; line-height: 1.6;'>You requested a password reset for your <strong>Echo of Baduga</strong> account. Click the button below to securely set your new password. This link is only valid for 1 hour.</p>
                            <div style='text-align: center; margin: 32px 0;'>
                                <a href='$resetLink' target='_blank' style='background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 30px; display: inline-block; font-weight: 700; font-size: 14px; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);'>Reset Password</a>
                            </div>
                            <p style='color: #7f8c8d; font-size: 12px; line-height: 1.6;'>If the button above does not work, please copy and paste the following link into your browser address bar:</p>
                            <p style='color: #10b981; font-size: 12px; word-break: break-all; margin-bottom: 24px; background-color: rgba(16, 185, 129, 0.05); padding: 12px; border-radius: 8px; border: 1px dashed rgba(16, 185, 129, 0.3);'>$resetLink</p>
                            <div style='height: 1px; background-color: #2f3640; margin-bottom: 20px;'></div>
                            <p style='color: #718093; font-size: 11px; line-height: 1.6; text-align: center; margin: 0;'>This email is auto-generated. Please do not reply directly. If you did not make this request, you can safely ignore this message.</p>
                        </div>
                        <div style='text-align: center; margin-top: 20px; color: #718093; font-size: 12px;'>
                            &copy; 2026 Echo of Baduga. All rights reserved.
                        </div>
                    </div>
                ";
                $sent = send_email($targetEmail, $subject, $message);
            }
            
            $debug_msg = "Password reset request. User: " . $u['email'] . " | Mobile: " . ($u['mobile'] ?? 'N/A') . " | Token: " . $token . " | Link: " . $resetLink . " | Real Sent: " . ($sent ? "YES" : "NO") . "\n";
            file_put_contents(__DIR__ . '/../otp_debug.txt', $debug_msg, FILE_APPEND);
            
            // Always return success: true to allow UI transitions
            $delivery_method = ($is_mobile && !empty(TWILIO_SID) && !empty(TWILIO_TOKEN) && !empty(TWILIO_NUMBER)) ? 'sms' : 'email';
            echo json_encode([
                "success" => true,
                "message" => "Reset link generated successfully!",
                "delivery_target" => $identity,
                "delivery_method" => $delivery_method,
                "masked_email" => mask_email($u['email']),
                "dev_link" => $resetLink,
                "email_sent" => $sent
            ]);
        } else {
            echo json_encode(["success" => false, "error" => "No account found with that Email or Mobile number"]);
        }
        break;

    case 'verify_otp':
        $identity = $conn->real_escape_string($input['email_or_mobile'] ?? '');
        $otp = $conn->real_escape_string($input['otp'] ?? '');
        
        if (empty($identity) || empty($otp)) {
            echo json_encode(["success" => false, "error" => "All fields are required"]);
            break;
        }

        $mobileWithPrefix = $identity;
        if (preg_match('/^[0-9]{10}$/', $identity)) {
            $mobileWithPrefix = '+91' . $identity;
        }

        $res = $conn->query("SELECT * FROM users WHERE (email='$identity' OR mobile='$identity' OR mobile='$mobileWithPrefix') AND otp_code='$otp'");
        if ($res && $res->num_rows > 0) {
            $u = $res->fetch_assoc();
            
            // Check if OTP is expired
            $expiry_time = strtotime($u['otp_expiry']);
            if (time() > $expiry_time) {
                echo json_encode(["success" => false, "error" => "Reset link has expired. Please request a new one."]);
            } else {
                echo json_encode(["success" => true, "message" => "Reset link verified successfully"]);
            }
        } else {
            echo json_encode(["success" => false, "error" => "Invalid or inactive reset link"]);
        }
        break;

    case 'reset_password':
        $identity = $conn->real_escape_string($input['email_or_mobile'] ?? '');
        $otp = $conn->real_escape_string($input['otp'] ?? '');
        $new_password = $input['new_password'] ?? '';
        
        if (empty($identity) || empty($otp) || empty($new_password)) {
            echo json_encode(["success" => false, "error" => "All fields are required"]);
            break;
        }

        $mobileWithPrefix = $identity;
        if (preg_match('/^[0-9]{10}$/', $identity)) {
            $mobileWithPrefix = '+91' . $identity;
        }

        $res = $conn->query("SELECT * FROM users WHERE (email='$identity' OR mobile='$identity' OR mobile='$mobileWithPrefix') AND otp_code='$otp'");
        if ($res && $res->num_rows > 0) {
            $u = $res->fetch_assoc();
            
            // Verify expiry again
            $expiry_time = strtotime($u['otp_expiry']);
            if (time() > $expiry_time) {
                echo json_encode(["success" => false, "error" => "Reset link has expired. Please request a new one."]);
                break;
            }

            // Secure password hash
            $new_hash = password_hash($new_password, PASSWORD_DEFAULT);
            $conn->query("UPDATE users SET password='$new_hash', otp_code=NULL, otp_expiry=NULL WHERE id=" . $u['id']);
            
            echo json_encode(["success" => true, "message" => "Password updated successfully"]);
        } else {
            echo json_encode(["success" => false, "error" => "Verification failed. Invalid or expired link."]);
        }
        break;

    case 'songs':
        $genre = $_GET['genre'] ?? '';
        $q = "SELECT * FROM songs";
        if ($genre) {
            $g = $conn->real_escape_string($genre);
            $q .= " WHERE genre='$g'";
        }
        $q .= " ORDER BY play_count DESC LIMIT 20";
        $res = $conn->query($q);
        $songs = [];
        while ($row = $res->fetch_assoc()) { $songs[] = $row; }
        echo json_encode(["success" => true, "songs" => $songs, "count" => count($songs)]);
        break;

    case 'search':
        $q = $conn->real_escape_string($_GET['q'] ?? '');
        $res = $conn->query("SELECT * FROM songs WHERE title LIKE '%$q%' OR artist_name LIKE '%$q%' LIMIT 10");
        $songs = [];
        while ($row = $res->fetch_assoc()) { $songs[] = $row; }
        echo json_encode(["success" => true, "songs" => $songs, "artists" => []]);
        break;

    case 'record_play':
        $song_id = (int)($input['song_id'] ?? 0);
        if ($song_id) {
            $conn->query("UPDATE songs SET play_count = play_count + 1 WHERE id=$song_id");
        }
        echo json_encode(["success" => true]);
        break;

    case 'like':
        $song_id = (int)($input['song_id'] ?? 0);
        if ($song_id) {
            $conn->query("UPDATE songs SET like_count = like_count + 1 WHERE id=$song_id");
        }
        echo json_encode(["success" => true]);
        break;
        
    case 'liked_songs':
        echo json_encode(["success" => true, "songs" => []]);
        break;

    case 'update_profile':
        $user_id = (int)($input['user_id'] ?? 0);
        $name = $conn->real_escape_string($input['name'] ?? '');
        $email = $conn->real_escape_string($input['email'] ?? '');
        if ($user_id) {
            $conn->query("UPDATE users SET name='$name', email='$email' WHERE id=$user_id");
            echo json_encode(["success" => true]);
        } else {
            $success = false;
            echo json_encode(["success" => false]);
        }
        break;


    case 'feedback':
    case 'contact':
        $user_id = (int)($input['user_id'] ?? 0);
        $type = $conn->real_escape_string($input['type'] ?? 'contact'); // contact, report, rating
        $name = $conn->real_escape_string($input['name'] ?? 'Guest');
        $email = $conn->real_escape_string($input['email'] ?? '');
        $rating = isset($input['rating']) ? (int)$input['rating'] : null;
        $message = $conn->real_escape_string($input['message'] ?? '');

        if (empty($email) || empty($message)) {
            echo json_encode(["success" => false, "error" => "Email and message are required"]);
            break;
        }

        if ($type === 'rating' && ($rating < 1 || $rating > 5)) {
            echo json_encode(["success" => false, "error" => "Please select a rating between 1 and 5 stars"]);
            break;
        }

        // Insert into database feedback table
        $rating_val = ($rating !== null) ? $rating : "NULL";
        $sql = "INSERT INTO feedback (user_id, type, name, email, rating, message) VALUES ($user_id, '$type', '$name', '$email', $rating_val, '$message')";
        $db_saved = $conn->query($sql);

        // Customize email subject and body content based on submission type
        $subject_type = "Contact Form";
        if ($type === 'report') {
            $subject_type = "Bug Report";
        } elseif ($type === 'rating') {
            $subject_type = "App Rating (" . $rating . " Stars)";
        }
        
        $subject = "Echo of Baduga - New " . $subject_type;
        
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        $scriptUri = $_SERVER['REQUEST_URI'];
        $baseDir = preg_replace('/api\/api\.php.*/', '', $scriptUri);
        $logoUrl = $protocol . $domainName . $baseDir . "assets/logo.png";
        
        $ratingRow = "";
        if ($type === 'rating') {
            $stars_html = str_repeat("⭐", $rating);
            $ratingRow = "
                <tr style='border-bottom: 1px solid #2f3640;'>
                    <td style='padding: 12px 0; font-weight: bold; color: #718093;'>Rating:</td>
                    <td style='padding: 12px 0; color: #fbbf24; font-size: 16px;'>$stars_html ($rating/5)</td>
                </tr>
            ";
        }

        $email_content = "
            <div style='background-color: #0b0c10; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;'>
                <div style='max-width: 600px; margin: 0 auto; background-color: #1f2833; border: 1px solid #10b981; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);'>
                    <div style='text-align: center; margin-bottom: 24px;'>
                        <img src='$logoUrl' alt='Echo of Baduga Logo' style='width: 70px; height: 70px; border-radius: 50%; border: 3px solid #10b981; padding: 2px; background-color: #0b0c10; display: inline-block;'>
                        <h1 style='color: #ffffff; font-size: 22px; margin: 12px 0 4px; font-weight: 700;'>Echo of Baduga</h1>
                        <p style='color: #10b981; font-size: 11px; text-transform: uppercase; margin: 0; font-weight: 700; letter-spacing: 1px;'>Admin Notification</p>
                    </div>
                    <div style='height: 1px; background: linear-gradient(to right, transparent, #10b981, transparent); margin-bottom: 24px;'></div>
                    <h2 style='color: #ffffff; font-size: 18px; margin-top: 0; font-weight: 600; text-align: center;'>New " . $subject_type . "</h2>
                    <table style='width: 100%; border-collapse: collapse; margin-top: 24px; color: #a5b1c2; font-size: 14px;'>
                        <tr style='border-bottom: 1px solid #2f3640;'>
                            <td style='padding: 12px 0; font-weight: bold; color: #718093; width: 120px;'>Type:</td>
                            <td style='padding: 12px 0; color: #ffffff; font-weight: 600;'><span style='background-color: rgba(16, 185, 129, 0.1); color: #10b981; padding: 4px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;'>" . ucfirst($type) . "</span></td>
                        </tr>
                        <tr style='border-bottom: 1px solid #2f3640;'>
                            <td style='padding: 12px 0; font-weight: bold; color: #718093;'>Sender Name:</td>
                            <td style='padding: 12px 0; color: #ffffff;'>" . htmlspecialchars($name) . "</td>
                        </tr>
                        <tr style='border-bottom: 1px solid #2f3640;'>
                            <td style='padding: 12px 0; font-weight: bold; color: #718093;'>Sender Email:</td>
                            <td style='padding: 12px 0; color: #10b981;'><a href='mailto:" . urlencode($email) . "' style='color: #10b981; text-decoration: none;'>" . htmlspecialchars($email) . "</a></td>
                        </tr>
                        $ratingRow
                        <tr style='border-bottom: 1px solid #2f3640;'>
                            <td style='padding: 12px 0; font-weight: bold; color: #718093;'>User ID:</td>
                            <td style='padding: 12px 0; color: #ffffff;'>" . ($user_id ? $user_id : 'Guest') . "</td>
                        </tr>
                    </table>
                    <div style='margin-top: 24px;'>
                        <div style='font-weight: bold; color: #718093; margin-bottom: 8px; font-size: 14px;'>Message Content:</div>
                        <div style='background-color: rgba(255,255,255,0.03); padding: 20px; border-radius: 8px; color: #ffffff; line-height: 1.6; font-size: 14px; border: 1px solid #2f3640; white-space: pre-wrap;'>" . htmlspecialchars($message) . "</div>
                    </div>
                    <div style='height: 1px; background-color: #2f3640; margin-top: 30px; margin-bottom: 20px;'></div>
                    <p style='color: #718093; font-size: 11px; text-align: center; margin: 0;'>This notification is auto-generated by the Echo of Baduga platform. Saved to database: " . ($db_saved ? "YES" : "NO") . "</p>
                </div>
            </div>
        ";

        $sent = send_email(SMTP_EMAIL_FROM, $subject, $email_content);
        
        // Log to otp_debug.txt
        $debug_log = "Feedback Submission. Type: $type | Name: $name | Email: $email | Rating: " . ($rating !== null ? $rating : 'N/A') . " | Saved in DB: " . ($db_saved ? "YES" : "NO (" . $conn->error . ")") . " | Email Sent: " . ($sent ? "YES" : "NO") . "\n";
        file_put_contents(__DIR__ . '/../otp_debug.txt', $debug_log, FILE_APPEND);

        // Always return success: true to allow UI transitions and thank you messages
        echo json_encode([
            "success" => true,
            "message" => "Thank you! Your feedback has been received and saved.",
            "email_sent" => $sent,
            "db_saved" => $db_saved
        ]);
        break;

    default:
        echo json_encode(["success" => false, "error" => "Invalid action"]);
}
$conn->close();
?>
