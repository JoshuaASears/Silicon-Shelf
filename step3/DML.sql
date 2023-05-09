-- Readers
-- Display info for all readers (Read)
SELECT readerID, name, email FROM Readers;
-- Add a reader (Create)
INSERT INTO Readers (name, email) VALUES (:nameinput, :emailinput);

-- ClubMembers/ReadingClubs
-- Display all club member info (Read)
SELECT clubMemberID, readers.name, readingclubs.clubName, isCoordinator
FROM ClubMembers
JOIN Readers ON clubmembers.readerID = readers.readerID
JOIN ReadingClubs ON clubmembers.clubID = readingclubs.clubID;
-- Add a member to a club based on dropdown selections (Create)
INSERT INTO ClubMembers (readerID, clubID, isCoordinator) VALUES (:readerID_from_dropdown, :clubID_from_dropdown, :isCoordinator_from_dropdown);

-- Display individual reading clubs (Read)
SELECT clubID, clubName FROM ReadingClubs;
-- Add a club (Create)
INSERT INTO ReadingClubs (clubName) VALUES (:clubName);


-- ReadingLogs
-- Display all reading log info (Read)
SELECT logID, readers.name, books.title, readingclubs.clubName, readingstatus.status
FROM ReadingLogs
JOIN Readers ON readinglogs.readerID = readers.readerID
JOIN Books ON readinglogs.bookID = books.bookID
JOIN ReadingClubs ON readinglogs.readingclubID = readingclubs.clubID
JOIN ReadingStatus ON readinglogs.statusID = readingstatus.statusID;
-- Add item to reading log based on dropdown selections (Create)
INSERT INTO ReadingLogs (readerID, bookID, readingClubID, statusID) VALUES (:readerID_from_dropdown, :bookID_from_dropdown, :readingClubID_from_dropdown, :statusID_from_dropdown);

-- Books
-- Display info for all books (Read)
SELECT bookID, title, author, year FROM Books;
-- Add a book (Create)
INSERT INTO Books (title, author, year) VALUES (:title, :author, :year);

-- ReadingStatus
-- Display all reading statuses (Read)
SELECT statusID, status FROM ReadingStatus;
-- Add a status (Create)
INSERT INTO ReadingStatus (status) VALUES (:status);