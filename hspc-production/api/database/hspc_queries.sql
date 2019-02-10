DROP DATABASE IF EXISTS hspc_database

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Competition;

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
	AccessLevel NVARCHAR(2),
	Email NVARCHAR(45) UNIQUE NOT NULL
)

CREATE TABLE Teams(
	TeamID INTEGER PRIMARY KEY IDENTITY(1, 1),
	TeamName NVARCHAR(64),
	SchoolAddress NVARCHAR(64),
	StateCode NVARCHAR(64),
	QuestionLevel NVARCHAR(2),
	AdvisorID INTEGER FOREIGN KEY REFERENCES Users(UserID),
	SchoolID INTEGER FOREIGN KEY REFERENCES School(SchoolID)
)

CREATE TABLE Questions(
	QuestionID INTEGER PRIMARY KEY IDENTITY(1,1),
	QuestionDescription NOT NULL NVARCHAR(256)
)

CREATE TABLE School(
	SchoolID INTEGER PRIMARY KEY IDENTITY(1,1),
	Address NVARCHAR(128),
	State NVARCHAR(32),
	PostalCode INTEGER
)

--EventDate and EventTime will be DateTimeOffsets. NVARCHAR is temporarily being used for API testing.
CREATE TABLE Competition(
	CompetitionID INTEGER PRIMARY KEY IDENTITY(1,1),
	TeamID INTEGER FOREIGN KEY REFERENCES Teams(TeamID),
	EventLocation NVARCHAR(64),
	EventDate NVARCHAR(64),
	EventTime NVARCHAR(64)
)

/*
-- Functions for Manipulating Data.
use hspc_database;
select * from Users

use hspc_database;
select * from Teams

use hspc_database;
select * from Competition

-- Update Accesslevel
update Users
set AccessLevel = 2
where
	Email = 'volunteer@gmail.com'
	
-- Delete All Values Except Base Cases
DELETE FROM Users WHERE FirstName != 'John';

-- Delete Everything From Table
TRUNCATE TABLE Teams
*/          
