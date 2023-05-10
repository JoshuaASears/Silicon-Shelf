/*
    GROUP 36 - Nicholas Critchfield, Joshua Sears
    PROJECT STEP 3 DRAFT: DML.sql
    - Contains CRUD queries for all tables
*/

-- Readers
-- Display info for all readers (Read)
SELECT readerID, name, email FROM Readers;
-- Add a reader (Create)
INSERT INTO Readers (name, email) VALUES (:nameinput, :emailinput);
-- Update Reader
UPDATE Readers SET name=:nampeinput, email=:emailinput WHERE readerID=:readerID_from_update_form;
-- Delete Reader
DELETE FROM Readers WHERE readerID=:readerID_selected_from_table;

-- ClubMembers/ReadingClubs
-- Display all club member info (Read)
SELECT clubMemberID, readers.name, readingclubs.clubName
FROM ClubMembers
JOIN Readers ON clubmembers.readerID = readers.readerID
JOIN ReadingClubs ON clubmembers.clubID = readingclubs.clubID;
-- Add a member to a club based on dropdown selections (Create)
INSERT INTO ClubMembers (readerID, clubID) VALUES (:readerID_from_dropdown, :clubID_from_dropdown);
-- Update ClubMembers
UPDATE ClubMembers SET readerID=:readerID_from_update_form, clubID=:clubID_from_update_form WHERE clubMemberID=:clubMemberID_from_update_form;
-- Delete4 ClubMembers
DELETE FROM ClubMembers WHERE clubMemberID=:clubMemberID_selected_from_table;

-- Display individual reading clubs (Read)
SELECT clubID, clubName FROM ReadingClubs;
-- Add a club (Create)
INSERT INTO ReadingClubs (clubName) VALUES (:clubName);
-- Update ReadingClubs
UPDATE ReadingClubs SET clubName=:clubNameinput WHERE clubID=:clubID_from_update_form;
-- Delete Reading Club
DELETE FROM ReadingClubs WHERE clubID=:clubID_selected_from_table;

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
-- Update Reading Logs
UPDATE ReadingLogs SET readerID=:readerID_from_update_form, bookID=:bookID_from_update_form, readingClubID=:readingClubID_from_update_form, statusID=:statusID_from_update_form WHERE logID=:logID_from_update_form
-- Delete Reading Log
DELETE FROM ReadingLogs WHERE logID=:logID_selected_from_table;

-- Books
-- Display info for all books (Read)
SELECT bookID, title, author, year FROM Books;
-- Add a book (Create)
INSERT INTO Books (title, author, year) VALUES (:title, :author, :year);
-- Update books 
UPDATE Books SET title=:titleinput, author=:authorinput, year=:yearinput WHERE bookID=:bookID_from_update_form;
-- Delete book
DELETE FROM Books WHERE bookID=:bookID_selected_from_table;

-- ReadingStatus
-- Display all reading statuses (Read)
SELECT statusID, status FROM ReadingStatus;
-- Add a status (Create)
INSERT INTO ReadingStatus (status) VALUES (:status);
-- Update reading status
UPDATE ReadingStatus SET status=:categoryinput WHERE statusID=:statusID_from_update_form;
-- Delete reading status
DELETE FROM ReadingStatus WHERE statusID=:statusID_selected_from_table;