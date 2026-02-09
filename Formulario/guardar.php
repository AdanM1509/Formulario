<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "formulario_db");

if ($conn->connect_error) {
    http_response_code(500);
    exit("Error de conexión");
}

$firstName = $_POST['firstName'] ?? '';
$lastName  = $_POST['lastName'] ?? '';
$email     = $_POST['email'] ?? '';
$queryType = $_POST['queryType'] ?? '';
$message   = $_POST['message'] ?? '';
$consent   = isset($_POST['consent']) ? 1 : 0;

$sql = "INSERT INTO contactos 
(first_name, last_name, email, query_type, message, consent)
VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssssi",
    $firstName,
    $lastName,
    $email,
    $queryType,
    $message,
    $consent
);

if ($stmt->execute()) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Error al guardar";
}

$stmt->close();
$conn->close();
?>
