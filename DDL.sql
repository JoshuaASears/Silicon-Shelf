SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

CREATE OR REPLACE TABLE Readers (
    readerID int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    PRIMARY KEY (readerID)
);

CREATE OR REPLACE TABLE ClubMembers (
    clubMemberID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    clubID int NOT NULL,
    isCoordinator tinyint DEFAULT 0,
    isActive tinyint DEFAULT 1,
    PRIMARY KEY (clubMemberID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID),
    FOREIGN KEY (clubID) REFERENCES ReadingClubs(clubID)
);

CREATE OR REPLACE TABLE ReadingLogs (
    logID int NOT NULL AUTO_INCREMENT,
    readerID int NOT NULL,
    bookID int NOT NULL,
    statusID int NOT NULL,
    dateStarted date,
    dateCompleted date,
    readingClubID int DEFAULT NULL,
    PRIMARY KEY (logID),
    FOREIGN KEY (readerID) REFERENCES Readers (readerID),
    FOREIGN KEY (bookID) REFERENCES Books (bookID),
    FOREIGN KEY (statusID) REFERENCES ReadingStatus (statusID)
);

CREATE OR REPLACE TABLE Books (
    bookID int NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    author varchar(50) NOT NULL,
    year date,
    PRIMARY KEY (bookID)
);

CREATE OR REPLACE TABLE ReadingClubs(
    clubID int NOT NULL AUTO_INCREMENT,
    clubName varchar(50) NOT NULL,
    PRIMARY KEY (clubID)
);

CREATE OR REPLACE TABLE ReadingStatus (
    statusID int NOT NULL AUTO_INCREMENT,
    status varchar(50), NOT NULL,
    PRIMARY KEY (statusID)
);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;