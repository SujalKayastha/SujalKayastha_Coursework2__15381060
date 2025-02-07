<?php
session_start();
include('config.php'); // Database connection

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $email = $_POST["email"];
    $password = $_POST["password"];

    // Check if email already exists
    $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $error = "⚠️ Email already in use! Try logging in.";
    } else {
        // Hash password before saving
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user
        $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $username, $email, $hashed_password);

        if ($stmt->execute()) {
            $success = "✅ Registration successful! Redirecting to login...";
            header("refresh:2; url=login.php"); // Redirect after 2 sec
        } else {
            $error = "⚠️ Registration failed! Try again.";
        }
    }
    $stmt->close();
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - Tarantino Theaters</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- HEADER -->
    <header>
        <div class="logo">
            <a href="index.html">
                <img src="assets/logos/Tarantino Theaters Logo.png" alt="Tarantino Theaters Logo">
            </a>
        </div>
        <nav>
            <a href="index.html">Home</a>
            <a href="movies.html">Movies</a>
            <a href="schedules.html">Schedules</a>
            <a href="login.php">Sign In</a>
        </nav>
    </header>

    <!-- AUTHENTICATION FORM -->
    <section class="auth-container">
        <div class="form-box">
            <h2>Create Account</h2>
            <p class="subtext">Join Tarantino Theaters today</p>

            <!-- DISPLAY ERROR OR SUCCESS MESSAGE -->
            <?php if ($error): ?>
                <p class="error-message"><?php echo $error; ?></p>
            <?php elseif ($success): ?>
                <p class="success-message"><?php echo $success; ?></p>
            <?php endif; ?>

            <!-- REGISTRATION FORM -->
            <form action="register.php" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn-signup">Sign Up</button>
            </form>

            <p class="switch-form">Already have an account? <a href="login.php">Login</a></p>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <p>&copy; 2025 Tarantino Theaters. All Rights Reserved.</p>
    </footer>

</body>
</html>
