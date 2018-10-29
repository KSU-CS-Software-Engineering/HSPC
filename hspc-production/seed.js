const sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.sqlite3');

//
db.run(`DROP TABLE IF EXISTS PERSON`);

// RUN() CREATES A DATABASE TABLE INSIDE THE DATABASE CREATED ABOVE
db.run(
`
CREATE TABLE PERSON (PersonId INT PRIMARY KEY);
`
);
