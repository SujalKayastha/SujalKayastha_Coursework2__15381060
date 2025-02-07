CREATE DATABASE IF NOT EXISTS cinemahall;
USE cinemahall;

-- Drop tables if they exist to avoid duplicates
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS bookings;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Ensuring password column exists
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Movies Table
CREATE TABLE movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(100),
    language VARCHAR(50),
    cinema VARCHAR(100),
    show_date DATE,
    show_times TEXT
);

-- Bookings Table
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    movie_id INT NOT NULL,
    cinema VARCHAR(100),
    show_date DATE,
    show_time VARCHAR(20),
    seat_numbers TEXT,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- Insert sample data into movies table
INSERT INTO movies (title, genre, language, cinema, show_date, show_times) VALUES
('Badass Ravi Kumar', 'Action', 'Hindi', 'Baneshwor', '2024-02-07', '08:00 AM, 03:00 PM, 06:30 PM'),
('Deadpool 2', 'Action, Comedy', 'English', 'Kalanki', '2024-02-08', '10:00 AM, 05:00 PM');

-- Insert a sample user with hashed password (password: 'test123')
INSERT INTO users (username, email, password) VALUES
('testuser', 'test@example.com', '$2y$10$Wz4PxO4qM7OEfuQnW2Kz.e/1r1kpC2PaY.xbr3NVhP.Po.2hghbb2'); 
-- Hashed password for 'test123'

