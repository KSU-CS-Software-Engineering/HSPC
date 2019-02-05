DROP DATABASE IF EXISTS hspc_database

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS School;
DROP TABLE IF EXISTS Submissions;
DROP TABLE IF EXISTS Competition;
DROP TABLE IF EXISTS Team;
DROP TABLE IF EXISTS Questions;
DROP TABLE IF EXISTS Round;
DROP TABLE IF EXISTS Difficulty;

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

CREATE TABLE Team(
	TeamID INTEGER PRIMARY KEY IDENTITY(1, 1),
	AdvisorID INTEGER FOREIGN KEY REFERENCES Users(UserID),
	TeamName NVARCHAR(64),
	QuestionLevel NVARCHAR(2),
	SchoolID INTEGER FOREIGN KEY REFERENCES School(SchoolID)
)

/* Level on the schema */
CREATE TABLE Difficulty(
	DifficultyID INTEGER PRIMARY KEY IDENTITY(1,1),
	Description NVARCHAR(256)
)

CREATE TABLE Questions(
	QuestionID INTEGER PRIMARY KEY IDENTITY(1,1),
	QuestionDescription NOT NULL NVARCHAR(256),
	QuestionDifficulty FOREIGN KEY REFERENCES QuestionDifficulty(DifficultyID)
)

CREATE TABLE School(
	SchoolID INTEGER PRIMARY KEY IDENTITY(1,1),
	SchoolName NVARCHAR(64),
	LocalAddress NVARCHAR(128),
	StateCode NVARCHAR(32),
	PostalCode INTEGER
)

/* Event on the Schema */
CREATE TABLE Competition(
	CompetitionID INTEGER PRIMARY KEY IDENTITY(1,1),
	TeamID INTEGER FOREIGN KEY REFERENCES Team(TeamID),
	EventLocation NVARCHAR(64),
	EventDate DATETIMEOFFSET NOT NULL DEFAULT(SYSDATETIMEOFFSET())
)
	
CREATE TABLE Round(
	RoundID INTEGER PRIMARY KEY IDENTITY(1,1),
	DifficultID INTEGER FOREIGN KEY REFERENCES Difficulty(DifficultyID),
	ComptetitionID INTEGER FOREIGN KEY REFERENCES Competition(CompetitionID)
)

/* Added a reference to Round; Submissions have a Round. We could swap them though. */
CREATE TABLE Submissions(
	CompetitionID INTEGER PRIMARY KEY REFERENCES Competition(CompetitionID),
	TeamID INTEGER FOREIGN KEY REFERENCES Team(TeamID),
	Location NOT NULL NVARCHAR(256),
	SubmissionDate DATETIMEOFFSET NOT NULL DEFAULT(SYSDATETIMEOFFSET()),
	RoundID INTEGER FOREIGN KEY REFERENCES Round(RoundID)					       
)

/*
-- Functions for Manipulating Data.
use hspc_database;
select * from Users

-- Update Accesslevel
update Users
set AccessLevel = 2
where
	Email = 'volunteer@gmail.com'
	
-- Delete Values;
TRUNCATE TABLE Users
*/          
