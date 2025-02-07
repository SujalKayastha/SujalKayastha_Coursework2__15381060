<?php   
session_start();
include("config.php"); // DB Connection
error_reporting(E_ALL);
ini_set('display_errors', 1);

$error = ""; // Initialize error message variable

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $password = $_POST["password"];

    $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) { 
        $id = $row['id'];
        $username = $row['username'];
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            // ✅ Store user info in SESSION
            $_SESSION["user_id"] = $id;
            $_SESSION["username"] = $username;

            // ✅ Redirect to homepage after login
            echo "<script>
                alert('Login Successful!'); 
                window.location.href = 'index.html';
            </script>";
            exit();
        } else {
            $error = "❌ Invalid password!";
        }
    } else {
        $error = "❌ User not found!";
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
    <title>Login - Tarantino Theaters</title>
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
            <a href="login.php" class="active">Sign In</a>
        </nav>
    </header>

    <!-- AUTHENTICATION FORM -->
    <section class="auth-container">
        <div class="form-box">
            <h2>Welcome Back</h2>
            <p class="subtext">Login to access your account</p>

            <!-- ✅ Display error message here -->
            <?php if (!empty($error)): ?>
                <p class="error-message" style="color: red; font-weight: bold;">
                    <?php echo $error; ?>
                </p>
            <?php endif; ?>

            <!-- LOGIN FORM -->
            <form action="login.php" method="POST">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn-login">Login</button>
            </form>

            <p class="switch-form">Don't have an account? <a href="register.php">Sign Up</a></p>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <p>&copy; 2025 Tarantino Theaters. All Rights Reserved.</p>
    </footer>

</body>
</html>
