DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Events;
DROP TABLE IF EXISTS Teams;

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

// Foreign Keys: Level(LevelID), Shool(SchoolID)
// Tables Referencing Teams: Event(EventID), Submissions(TeamID)
CREATE TABLE Teams(
	TeamID INTEGER PRIMARY KEY IDENTITY(1, 1),
	AdvisorID INTEGER FOREIGN KEY REFERENCES hspc_database.Users(UserID),
	TeamName NVARCHAR(64),
	Level INTEGER FOREIGN KEY REFERENCES hspc_database.Level(LevelID),
	ShoolID INTEGER FOREIGN KEY REFERENCES hspc_database.School(SchoolID)
)

CREATE TABLE Events(
	EventID INTEGER PRIMARY KEY IDENTITY(1,1),
	TeamID INTEGER FOREIGN KEY REFERENCES hspc_database.Teams(TeamID),
	Location NVARCHAR(64),
	Date DATETIMEOFFSET NOT NULL DEFAULT(SYSDATETIMEOFFSET())
)

-- Change to Account Admin
USE hspc_database;
UPDATE Users
SET AccessLevel = 4
WHERE LastName = 'Bell' --varies by account
