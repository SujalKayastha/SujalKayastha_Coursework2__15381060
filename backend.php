<?php
include 'config.php'; // Connect to the database

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["signup"])) {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = password_hash($_POST["password"], PASSWORD_DEFAULT); // Hashing the password for security

    // Check if email already exists
    $checkUser = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $checkUser->bind_param("s", $email);
    $checkUser->execute();
    $result = $checkUser->get_result();

    if ($result->num_rows > 0) {
        echo "❌ Email already registered!";
    } else {
        // Insert new user
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $password);

        if ($stmt->execute()) {
            echo "✅ Registration successful!";
            header("Location: login.html"); // Redirect to login page
            exit();
        } else {
            echo "❌ Registration failed!";
        }
    }
}
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["login"])) {
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Get user from database
    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();

        // Verify hashed password
        if (password_verify($password, $user["password"])) {
            $_SESSION["user_id"] = $user["id"];
            $_SESSION["username"] = $user["username"];

            echo "✅ Login successful!";
            header("Location: index.html"); // Redirect to homepage after login
            exit();
        } else {
            echo "❌ Incorrect password!";
        }
    } else {
        echo "❌ User not found!";
    }
}
?>

?>
