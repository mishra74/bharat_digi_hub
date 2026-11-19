
<?php

require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    exit("Method not allowed.");
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$subject = trim($_POST["subject"] ?? "");
$message = trim($_POST["message"] ?? "");

if (
    $name === "" ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    $message === ""
) {
    exit("Please enter valid contact details.");
}

$sql = "INSERT INTO contact_messages
        (name, email, phone, subject, message)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssss",
    $name,
    $email,
    $phone,
    $subject,
    $message
);

if ($stmt->execute()) {
    echo "Thank you! Your message has been submitted successfully.";
} else {
    http_response_code(500);
    echo "Unable to submit your message. Please try again.";
}

$stmt->close();
$conn->close();

?>
