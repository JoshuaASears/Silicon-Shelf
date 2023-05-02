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


CREATE OR REPLACE TABLE Books (
    -- attributes
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    author varchar(50) NOT NULL,
    year date,
    -- constraints
    PRIMARY KEY (bookID)
);

CREATE OR REPLACE TABLE Readers (
    -- attributes
    readerID int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (readerID)
);

CREATE OR REPLACE TABLE ReadingClubs(
    -- attributes
    clubID int NOT NULL AUTO_INCREMENT,
    clubName varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (clubID)
);

CREATE OR REPLACE TABLE ReadingStatus (
    -- attributes
    statusID int NOT NULL AUTO_INCREMENT,
    status varchar(50) NOT NULL,
    -- constraints
    PRIMARY KEY (statusID)
);

CREATE OR REPLACE TABLE ClubMembers (
    -- attributes
    clubMemberID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    clubID int NOT NULL,
    isCoordinator boolean DEFAULT 0,
    isActive boolean DEFAULT 1,
    -- constraints
    PRIMARY KEY (clubMemberID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID),
    FOREIGN KEY (clubID) REFERENCES ReadingClubs(clubID)
);

CREATE OR REPLACE TABLE ReadingLogs (
    -- attributes
    logID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    bookID int NOT NULL,
    statusID int NOT NULL,
    dateStarted date,
    dateCompleted date,
    readingClubID int DEFAULT NULL,
    -- constraints
    PRIMARY KEY (logID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID),
    FOREIGN KEY (bookID) REFERENCES Books (bookID),
    FOREIGN KEY (statusID) REFERENCES ReadingStatus (statusID),
    FOREIGN KEY (readingClubID) REFERENCES ReadingClubs (clubID)
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
    clubID,
    isCoordinator,
    isActive
) VALUES (
    (SELECT readerID FROM Readers WHERE name = "Joseph McReading"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird"),
    DEFAULT,
    DEFAULT
), (
    (SELECT readerID FROM Readers WHERE name = "Jeroshi Yoshi"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird"),
    DEFAULT,
    DEFAULT
), (
    (SELECT readerID FROM Readers WHERE name = "Mr. Adultman"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Tequila Mockingbird"),
    DEFAULT,
    DEFAULT
), (
    (SELECT readerID FROM Readers WHERE name = "Daniel Abraham"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Nihilists Anonymous"),
    1,
    DEFAULT
), (
    (SELECT readerID FROM Readers WHERE name = "Ro Himbo"),
    (SELECT clubID FROM ReadingClubs WHERE clubName = "Nihilists Anonymous"),
    DEFAULT,
    DEFAULT
);

/* populate ReadingLogs */
INSERT INTO ReadingLogs (
    readerID,
    bookID,
    statusID,
    dateStarted,
    dateCompleted,
    readingClubID
) VALUES (
    (SELECT readerID FROM Readers WHERE name = "Joseph McReading"),
    (SELECT bookID FROM Books WHERE title = "Gray's Anatomy"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Enqueued"),
    NULL,
    NULL,
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Tequila Mockingbird")
), (
    (SELECT readerID FROM Readers WHERE name = "Jeroshi Yoshi"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Finished"),
    NULL,
    CURDATE(),
    NULL
), (
    (SELECT readerID FROM Readers WHERE name = "Daniel Abraham"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Reading"),
    DATE_SUB(CURDATE(), INTERVAL 5 MONTH),
    NULL,
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Nihilists Anonymous")
), (
    (SELECT readerID FROM Readers WHERE name = "Sarah Jessica Booker"),
    (SELECT bookID FROM Books WHERE title = "The Bell Jar"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Enqueued"),
    NULL,
    NULL,
    NULL
), (
    (SELECT readerID FROM Readers WHERE name = "Ro Himbo"),
    (SELECT bookID FROM Books WHERE title = "Leviathan Wakes"),
    (SELECT statusID FROM ReadingStatus WHERE status = "Reading"),
    DATE_SUB(CURDATE(), INTERVAL 3 WEEK),
    NULL,
    (SELECT clubID FROM ReadingClubs WHERE clubName ="Nihilists Anonymous")
);

/* 
    VIEW ALL 
    OPTIONAL: REMOVE COMMENTS BELOW
*/

-- \! echo "Sample data for Readers:";
-- SELECT * FROM Readers;
-- \! echo "Sample data for Books:";
-- SELECT * FROM Books;
-- \! echo "Sample data for ReadingClubs:";
-- SELECT * FROM ReadingClubs;
-- \! echo "Sample data for ReadingStatus:";
-- SELECT * FROM ReadingStatus;
-- \! echo "Sample data for ClubMembers:";
-- SELECT * FROM ClubMembers;
-- \! echo "Sample data for ReadingLogs:";
-- SELECT * FROM ReadingLogs;

/* EXIT CONFIG */
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
