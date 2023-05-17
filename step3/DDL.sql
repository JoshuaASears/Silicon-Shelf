/*
    GROUP 36 - Nicholas Critchfield, Joshua Sears
    PROJECT STEP 2 DRAFT: DDL.sql
    - Contains config, 6 create table statements, sample data input
    - Optional print statements at bottom of file
*/

/* STARTUP CONFIG */
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;


/* CREATE TABLES */

DROP TABLE IF EXISTS Books;

CREATE TABLE Books (
    -- attributes
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    author varchar(50) NOT NULL,
    year date,
    -- constraints
    PRIMARY KEY (bookID)
);

DROP TABLE IF EXISTS Readers;

CREATE TABLE Readers (
    -- attributes
    readerID int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (readerID)
);

DROP TABLE IF EXISTS ReadingClubs;

CREATE TABLE ReadingClubs(
    -- attributes
    clubID int NOT NULL AUTO_INCREMENT,
    clubName varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (clubID)
);

DROP TABLE IF EXISTS ReadingStatus;

CREATE TABLE ReadingStatus (
    -- attributes
    statusID int NOT NULL AUTO_INCREMENT,
    status varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (statusID)
);

DROP TABLE IF EXISTS ClubMembers;

CREATE TABLE ClubMembers (
    -- attributes
    clubMemberID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    clubID int NOT NULL,
    -- constraints
    PRIMARY KEY (clubMemberID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID) ON DELETE CASCADE,
    FOREIGN KEY (clubID) REFERENCES ReadingClubs(clubID) ON DELETE SET NULL
);

DROP TABLE IF EXISTS ReadingLogs;

CREATE TABLE ReadingLogs (
    -- attributes
    logID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    bookID int NOT NULL,
    readingClubID int DEFAULT NULL,
    statusID int NOT NULL,
    timeStamp DATETIME DEFAULT (CURRENT_TIMESTAMP),
    -- constraints
    PRIMARY KEY (logID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID),
    FOREIGN KEY (bookID) REFERENCES Books (bookID),
    FOREIGN KEY (readingClubID) REFERENCES ReadingClubs (clubID),
    FOREIGN KEY (statusID) REFERENCES ReadingStatus (statusID)
);


/* POPULATE SAMPLE DATA */

/* populate Books */
INSERT INTO Books (
    title,
    author,
    year
) VALUES (
    "Leviathan Wakes",
    "James S.A. Corey",
    "2011-00-00"
), (
    "Gray's Anatomy",
    "Henry Gray",
    "1858-00-00"
), (
    "The Bell Jar",
    "Sylvia Plath",
    "1963-00-00"
), (
    "Finite and Infinite Games",
    "James P. Carse",
    "1986-00-00"
);

/* populate Books */
INSERT INTO Readers (
    name,
    email
) VALUES (
    "Joseph McReading",
    "j.mcreads@notreal.com"
), (
    "Sarah Jessica Booker",
    "sjb@supercom.net"
), (
    "Mr. Adultman",
    "doing.business@thebusinessfactory.com"
), (
    "Daniel Abraham",
    "daniel.abraham@ghmail.com"
), (
    "Ro Himbo",
    "rohimbo@derpinout.com"
), (
    "Jeroshi Yoshi",
    "jer.yo@jeryo.cnet"
), (
    "Samuel Hackins",
    "samuel.hackins@g.mail.com"
);

/* populate ReadingClubs */
INSERT INTO ReadingClubs (
    clubName
) VALUES (
    "Tequila Mockingbird"
), (
    "Gone with the Gin"
), (
    "Nihilists Anonymous"
);
INSERT INTO ReadingStatus (
    status
) VALUES (
    "Enqueued"
), (
    "Reading"
), (
    "Finished"
);

/* populate ClubMembers*/
INSERT INTO ClubMembers (
    readerID,
    clubID
) VALUES (
    (SELECT readerID FROM Readers WHERE name = "Joseph McReading"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird")
), (
    (SELECT readerID FROM Readers WHERE name = "Jeroshi Yoshi"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird")
), (
    (SELECT readerID FROM Readers WHERE name = "Jeroshi Yoshi"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Nihilists Anonymous")
), (
    (SELECT readerID FROM Readers WHERE name = "Mr. Adultman"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird")
), (
    (SELECT readerID FROM Readers WHERE name = "Daniel Abraham"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Nihilists Anonymous")
), (
    (SELECT readerID FROM Readers WHERE name = "Ro Himbo"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Nihilists Anonymous")
);

/* populate ReadingLogs */
INSERT INTO ReadingLogs (
    readerID,
    bookID,
    readingClubID,
    statusID
) VALUES (
    (SELECT readerID FROM Readers WHERE name = "Joseph McReading"),
    (SELECT bookID FROM Books WHERE title = "Gray's Anatomy"),
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Tequila Mockingbird"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Enqueued")
), (
    (SELECT readerID FROM Readers WHERE name = "Jeroshi Yoshi"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    DEFAULT,
    (SELECT statusID FROM ReadingStatus WHERE status = "Finished")
), (
    (SELECT readerID FROM Readers WHERE name = "Daniel Abraham"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Nihilists Anonymous"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Reading")
), (
    (SELECT readerID FROM Readers WHERE name = "Sarah Jessica Booker"),
    (SELECT bookID FROM Books WHERE title = "The Bell Jar"),
    DEFAULT,
    (SELECT statusID FROM ReadingStatus WHERE status = "Enqueued")
), (
    (SELECT readerID FROM Readers WHERE name = "Ro Himbo"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Nihilists Anonymous"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Reading")
);

/* 
    VIEW ALL 
    OPTIONAL: REMOVE COMMENTS BELOW
*/

\! echo "Sample data for Readers:";
SELECT * FROM Readers;
\! echo "Sample data for Books:";
SELECT * FROM Books;
\! echo "Sample data for ReadingClubs:";
SELECT * FROM ReadingClubs;
\! echo "Sample data for ReadingStatus:";
SELECT * FROM ReadingStatus;
\! echo "Sample data for ClubMembers:";
SELECT * FROM ClubMembers;
\! echo "Sample data for ReadingLogs:";
SELECT * FROM ReadingLogs;

/* EXIT CONFIG */
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
