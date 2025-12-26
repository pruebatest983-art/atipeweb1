<?php
// db.php - Database Connection
// Upload this file to your 'api' folder on the server.

// CORS Headers (Allow requests from your domain)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database Configuration
// IMPORTANT: Change these values to match your Plesk Database credentials
$host = 'localhost';
$dbname = 'atipe_db';     // Your Database Name
$username = 'atipe_user'; // Your Database Username
$password = 'password';   // Your Database Password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $e->getMessage()]);
    exit();
}
?>
