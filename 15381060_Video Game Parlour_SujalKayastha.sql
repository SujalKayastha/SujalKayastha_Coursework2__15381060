create database GamingParlour;
use GamingParlour;
-- 1. Create Membership Table (Parent Table)
CREATE TABLE Membership (
    Member_Type VARCHAR(20) PRIMARY KEY,
    Membership_Fee DECIMAL(10,2) NOT NULL
);

-- 2. Create Customers Table (Child Table, References Membership)
CREATE TABLE Customers (
    Customer_ID INT PRIMARY KEY AUTO_INCREMENT,
    First_Name VARCHAR(50) NOT NULL,
    Surname VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Member_Type VARCHAR(20),
    Join_Date DATE NOT NULL,
    Date_of_Birth DATE NOT NULL,
    FOREIGN KEY (Member_Type) REFERENCES Membership(Member_Type)
);

-- 3. Create Session Types Table
CREATE TABLE Session_Types (
    Session_Type_ID INT PRIMARY KEY AUTO_INCREMENT,
    Session_Type VARCHAR(50) NOT NULL,
    Price DECIMAL(10,2) NOT NULL
);

-- 4. Create Sessions Table (References Session Types)
CREATE TABLE Sessions (
    Session_Number INT PRIMARY KEY AUTO_INCREMENT,
    Session_Day VARCHAR(15) NOT NULL,
    Session_Start_Time TIME NOT NULL,
    Session_End_Time TIME NOT NULL,
    Session_Type_ID INT,
    FOREIGN KEY (Session_Type_ID) REFERENCES Session_Types(Session_Type_ID)
);

-- 5. Create Games Table
CREATE TABLE Games (
    Game_ID INT PRIMARY KEY AUTO_INCREMENT,
    Game_Name VARCHAR(100) NOT NULL,
    PEGI VARCHAR(10) NOT NULL
);

-- 6. Create Arcade Machines Table (References Games)
CREATE TABLE Arcade_Machines (
    Machine_Number INT PRIMARY KEY AUTO_INCREMENT,
    Year INT NOT NULL,
    Floor INT NOT NULL,
    Game_ID INT,
    FOREIGN KEY (Game_ID) REFERENCES Games(Game_ID)
);

-- 7. Create Consoles Table
CREATE TABLE Consoles (
    Console_ID INT PRIMARY KEY AUTO_INCREMENT,
    Console_Name VARCHAR(50) NOT NULL,
    Console_QTY INT NOT NULL
);

-- 8. Create Bookings Table (References Sessions & Customers)
CREATE TABLE Bookings (
    Booking_ID INT PRIMARY KEY AUTO_INCREMENT,
    Session_Number INT,
    Customer_ID INT,
    Date DATE NOT NULL,
    Pre_Paid_YN TINYINT(1) NOT NULL,
    FOREIGN KEY (Session_Number) REFERENCES Sessions(Session_Number),
    FOREIGN KEY (Customer_ID) REFERENCES Customers(Customer_ID)
);

-- 9. Create Session Consoles Table (References Sessions & Consoles)
CREATE TABLE Session_Consoles (
    Session_Number INT,
    Console_ID INT,
    Qty INT NOT NULL,
    FOREIGN KEY (Session_Number) REFERENCES Sessions(Session_Number),
    FOREIGN KEY (Console_ID) REFERENCES Consoles(Console_ID),
    PRIMARY KEY (Session_Number, Console_ID)
);

-- 10. Create Roles Table
CREATE TABLE Roles (
    Role_ID INT PRIMARY KEY AUTO_INCREMENT,
    Role VARCHAR(50) NOT NULL
);

-- 11. Create Staff Table (References Roles)
CREATE TABLE Staff (
    Staff_ID INT PRIMARY KEY AUTO_INCREMENT,
    Staff_Name VARCHAR(100) NOT NULL,
    Role_ID INT,
    FOREIGN KEY (Role_ID) REFERENCES Roles(Role_ID)
);

-- 12. Create Session Staff Table (References Sessions & Staff)
CREATE TABLE Session_Staff (
    Session_Number INT,
    Staff_ID INT,
    FOREIGN KEY (Session_Number) REFERENCES Sessions(Session_Number),
    FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID),
    PRIMARY KEY (Session_Number, Staff_ID)
);
SHOW TABLES;
-- Inserting Values
INSERT INTO Membership (Member_Type, Membership_Fee) VALUES 
('Standard', 1500.00),
('Premium', 20000.00);
INSERT INTO Session_Types (Session_Type, Price) VALUES 
('Free', 1500.00),
('Special', 1000.00);
INSERT INTO Games (Game_Name, PEGI) VALUES 
('COC', 'PG'),
('GTA', '18'),
('Spiderman', 'PG'),
('PUBG', '16');
INSERT INTO Consoles (Console_Name, Console_QTY) VALUES 
('PS2', 3),
('PS3', 2),
('Xbox 360', 3),
('Nintendo 64', 2),
('Nintendo Switch', 4);
INSERT INTO Roles (Role) VALUES 
('Cafe'), 
('Maintenance'), 
('Counter');
INSERT INTO Customers (First_Name, Surname, Address, Member_Type, Join_Date, Date_of_Birth) VALUES 
('Saanvi', 'Bhatta', 'Baneshwor, Kathmandu', 'Standard', '2024-01-01', '2015-03-01'),
('Bill', 'Gates', 'Maitidevi, Kathmandu', 'Premium', '2024-07-06', '2001-10-12'),
('Elon', 'Musk', 'Putalisadak, Kathmandu', 'Premium', '2024-03-28', '2003-07-20'),
('Kamala', 'Harris', 'Kapan, Kathmandu', 'Standard', '2024-01-05', '1973-05-01');
INSERT INTO Sessions (Session_Day, Session_Start_Time, Session_End_Time, Session_Type_ID) VALUES 
('Sunday', '09:00:00', '21:00:00', 1),
('Sunday', '09:00:00', '21:00:00', 1),
('Saturday', '09:00:00', '21:00:00', 1),
('Friday', '18:00:00', '22:00:00', 2);
INSERT INTO Arcade_Machines (Year, Floor, Game_ID) VALUES 
(2010, 1, 1),
(2013, 1, 2),
(2016, 2, 3),
(2004, 1, 4);
INSERT INTO Bookings (Session_Number, Customer_ID, Date, Pre_Paid_YN) VALUES 
(1, 1, '2024-07-22', 0),
(1, 2, '2024-07-22', 1),
(1, 3, '2024-07-22', 1),
(1, 4, '2024-08-25', 0),
(2, 1, '2024-07-22', 0),
(4, 3, '2024-07-05', 1);
INSERT INTO Session_Consoles (Session_Number, Console_ID, Qty) VALUES 
(1, 1, 2),
(2, 2, 2);
INSERT INTO Staff (Staff_Name, Role_ID) VALUES 
('Sagar Aryal', 1),
('Bikesh Khagdi', 2),
('Saroj Sapkota', 3),
('Jonathan Shrestha', 3),
('Rohan Chaudhary', 2),
('Rajeev Karmacharya', 1);
INSERT INTO Session_Staff (Session_Number, Staff_ID) VALUES 
(1, 1), (1, 2), (1, 3),
(2, 4), (2, 5), (2, 6);

SELECT * FROM Customers;
SELECT * FROM Membership;
SELECT * FROM Bookings;
SELECT * FROM Sessions;
SELECT * FROM Session_Types;
SELECT * FROM Arcade_Machines;
SELECT * FROM Games;
SELECT * FROM Consoles;
SELECT * FROM Session_Consoles;
SELECT * FROM Roles;
SELECT * FROM Staff;
SELECT * FROM Session_Staff;

-- Ques iii
SELECT Customers.Customer_ID, Customers.First_Name, Customers.Surname, Bookings.Date 
FROM Customers
JOIN Bookings ON Customers.Customer_ID = Bookings.Customer_ID
WHERE Bookings.Session_Number = 1 AND Bookings.Pre_Paid_YN = 0;

-- Ques iv
SELECT Machine_Number, Year, Floor, Game_ID 
FROM Arcade_Machines
WHERE Floor = 1
ORDER BY Machine_Number DESC;

-- Ques v
SELECT COUNT(*) AS Total_PS3_Games 
FROM Games
JOIN Consoles ON Games.Game_ID = Consoles.Console_ID
WHERE Consoles.Console_Name = 'PS3';

-- Ques vi
SELECT Staff.Staff_ID, Staff.Staff_Name, Roles.Role 
FROM Staff
JOIN Session_Staff ON Staff.Staff_ID = Session_Staff.Staff_ID
JOIN Roles ON Staff.Role_ID = Roles.Role_ID
WHERE Session_Staff.Session_Number = 1 AND Roles.Role = 'Maintenance';

-- Ques vii
UPDATE Arcade_Machines
SET Floor = 2
WHERE Game_ID = (SELECT Game_ID FROM Games WHERE Game_Name = 'PUBG') AND Floor = 1;
SELECT Machine_Number, Game_ID, Floor
FROM Arcade_Machines
WHERE Game_ID = (SELECT Game_ID FROM Games WHERE Game_Name = 'PUBG');


-- Ques viii
DELETE FROM Arcade_Machines
WHERE Game_ID = (SELECT Game_ID FROM Games WHERE Game_Name = 'GTA');

SELECT * FROM Arcade_Machines
WHERE Game_ID = (SELECT Game_ID FROM Games WHERE Game_Name = 'GTA');
