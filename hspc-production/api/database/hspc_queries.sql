DROP TABLE IF EXISTS Users
DROP DATABASE IF EXISTS hspc_database

CREATE DATABASE hspc_database
GO

USE hspc_database;
CREATE TABLE Users(
	UserID INTEGER PRIMARY KEY IDENTITY(1, 1),
	TeamID INTEGER,
	Phone NVARCHAR(12),
	FirstName NVARCHAR(45) NOT NULL,
	LastName NVARCHAR(45) NOT NULL,
	EncryptedPassword NVARCHAR(100) NOT NULL,
	AccessLevel NVARCHAR(2)
	Email NVARCHAR(45) UNIQUE NOT NULL,
)


-- Change to Account Admin
USE hspc_database;
UPDATE Users
SET AccessLevel = 4
WHERE LastName = 'Bell' --varies by account