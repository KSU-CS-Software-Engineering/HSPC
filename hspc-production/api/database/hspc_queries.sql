DROP DATABASE IF EXISTS hspc_database

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Teams;
DROP TABLE IF EXISTS Competition;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Article;
DROP TABLE IF EXISTS Participants;

CREATE DATABASE hspc_database
GO
USE hspc_database;

CREATE TABLE Teams(
	TeamID INTEGER PRIMARY KEY IDENTITY(1, 1),
	TeamName UNINVARCHAR(64),
	SchoolName NVARCHAR(64),
	SchoolAddress NVARCHAR(64),
	StateCode NVARCHAR(64),
	QuestionLevel NVARCHAR(12),
)

CREATE TABLE Users(
	UserID INTEGER PRIMARY KEY IDENTITY(1, 1),
	TeamID INTEGER FOREIGN KEY REFERENCES Teams(TeamID),
	TeamName NVARCHAR(64),
	Phone NVARCHAR(12),
	FirstName NVARCHAR(45) NOT NULL,
	LastName NVARCHAR(45) NOT NULL,
	EncryptedPassword NVARCHAR(100) NOT NULL,
	AccessLevel NVARCHAR(2),
	RequestLevel NVARCHAR(2),
	Email NVARCHAR(45) UNIQUE NOT NULL
)

CREATE TABLE Participants(
	UserID INTEGER PRIMARY KEY IDENTITY(1, 1),
	TeamID INTEGER FOREIGN KEY REFERENCES Teams(TeamID),
	EventDate NVARCHAR(32) NOT NULL,
	TeamName NVARCHAR(64) NOT NULL,
	QuestionLevel NVARCHAR(32) NOT NULL,
	SchoolName NVARCHAR(64),
	StateCode NVARCHAR(32)
)

CREATE TABLE Competition(
	CompetitionID INTEGER PRIMARY KEY IDENTITY(1,1),
	TeamID INTEGER FOREIGN KEY REFERENCES Teams(TeamID),
	EventLocation NVARCHAR(64),
	EventDate NVARCHAR(64),
	EventTime NVARCHAR(64),
	EventDescription NVARCHAR(512)
)

CREATE TABLE Questions(
	QuestionID INTEGER PRIMARY KEY IDENTITY(1,1),
	QuestionDescription NVARCHAR(256) NOT NULL
)

CREATE TABLE School(
	SchoolID INTEGER PRIMARY KEY IDENTITY(1,1),
	Address NVARCHAR(128),
	State NVARCHAR(32),
	PostalCode INTEGER
)

CREATE TABlE Article (
	ArticleID INTEGER PRIMARY KEY IDENTITY(1,1),
	ArticleTitle NVARCHAR(64) NOT NULL,
	ArticleSubHeading NVARCHAR(256),
	ArticleMessage NVARCHAR(2096) NOT NULL,
	ArticleDate NVARCHAR(54) NOT NULL
)

CREATE TABLE Cards (
	CardID INTEGER PRIMARY KEY IDENTITY(1,1),
	FileName NVARCHAR(256) NOT NULL,
	FileType NVARCHAR(16) NOT NULL
)

/*
-- Functions for Manipulating Data.
use hspc_database;
select * from Users

use hspc_database;
select * from Participants

use hspc_database;
select * from Teams

use hspc_database;
select * from Competition

use hspc_database;
select * from Article

use hspc_database;
select * from Cards

-- Update Accesslevel
update Users
set AccessLevel = 2
where
	Email = 'volunteer@gmail.com'
	
-- Delete All Values Except Base Cases
DELETE FROM Users WHERE FirstName != 'John';

-- Delete Everything From Table
TRUNCATE TABLE Participants

ALTER TABLE dbo.Users ADD RequestLevel NVARCHAR(2);
*/

