/*
    GROUP 36 - Nicholas Critchfield, Joshua Sears
    PROJECT STEP 3 DRAFT: DML.sql
    - Contains CRUD queries for all tables
*/

/* Readers */
-- Display info for all readers (Read)
SELECT readerID, name, email FROM Readers;
-- Add a reader (Create)
INSERT INTO Readers (name, email) VALUES (:nameinput, :emailinput);
-- Display info for reader selected to be edited
SELECT name, email FROM Readers WHERE readerID=:readerID_selected_from_table;
-- Update Reader
UPDATE Readers SET name=:nampeinput, email=:emailinput WHERE readerID=:readerID_from_update_form;
-- Delete Reader
DELETE FROM Readers WHERE readerID=:readerID_selected_from_table;

/* ClubMembers */
-- Display all club member info (Read)
SELECT clubMemberID, readers.name, readingclubs.clubName
FROM ClubMembers
JOIN Readers ON clubmembers.readerID = readers.readerID
JOIN ReadingClubs ON clubmembers.clubID = readingclubs.clubID;
-- Display reader names for create selection
SELECT name FROM Readers;
-- Display club names for create selection
SELECT clubName FROM ReadingClubs;
-- Add a member to a club based on dropdown selections (Create)
INSERT INTO ClubMembers (readerID, clubID) VALUES (SELECT readerID FROM Readers WHERE name=:name_from_dropdown, SELECT clubID FROM ReadingClubs WHERE clubName=:clubName_from_dropdown);
-- Delete ClubMembers
DELETE FROM ClubMembers WHERE clubMemberID=:clubMemberID_selected_from_table;

/* ReadingClubs */
-- Display individual reading clubs (Read)
SELECT clubID, clubName FROM ReadingClubs;
-- Add a club (Create)
INSERT INTO ReadingClubs (clubName) VALUES (:clubName);
-- Display info for club selected to be edited
SELECT clubName FROM ReadingClubs WHERE clubID=:clubID_selected_from_table;
-- Update ReadingClubs
UPDATE ReadingClubs SET clubName=:clubNameinput WHERE clubID=:clubID_from_update_form;
-- Delete Reading Club
DELETE FROM ReadingClubs WHERE clubID=:clubID_selected_from_table;

/* ReadingLogs */
-- Display all reading log info (Read)
SELECT logID, readers.name, books.title, readingclubs.clubName, readingstatus.status
FROM ReadingLogs
JOIN Readers ON readinglogs.readerID = readers.readerID
JOIN Books ON readinglogs.bookID = books.bookID
JOIN ReadingClubs ON readinglogs.readingclubID = readingclubs.clubID
JOIN ReadingStatus ON readinglogs.statusID = readingstatus.statusID;
-- Select reader names, book titles, club names, statuses for dropdown
SELECT name FROM Readers;
SELECT title FROM Books;
SELECT clubName FROM ReadingClubs;
SELECt status FROM ReadingStatus;
-- Add item to reading log based on dropdown selections (Create)
INSERT INTO ReadingLogs (readerID, bookID, readingClubID, statusID) VALUES (SELECT readerID FROM Readers WHERE name=:readername_from_dropdown, 
SELECT bookID FROM Books WHERE title=:title_from_dropdown, 
SELECT readingClubID FROM readingClubs WHERE clubName=:clubName_from_dropdown, 
SELECT statusID FROM readingStatus WHERE status=:status_from_dropdown);

/* Books */
-- Display info for all books (Read)
SELECT bookID, title, author, year FROM Books;
-- Add a book (Create)
INSERT INTO Books (title, author, year) VALUES (:title, :author, :year);
-- Display info for book to update
SELECT title, author, year FROM Books WHERE bookID=:bookID_selected_from_table;
-- Update books 
UPDATE Books SET title=:titleinput, author=:authorinput, year=:yearinput WHERE bookID=:bookID_from_update_form;
-- Delete book
DELETE FROM Books WHERE bookID=:bookID_selected_from_table;

/* ReadingStatus */
-- Display all reading statuses (Read)
SELECT * FROM ReadingStatus;
-- Add a status (Create)
INSERT INTO ReadingStatus (status) VALUES (:status);
-- Display status to be edited
SELECT status FROM ReadingStatus WHERE statusID=:statusID_selected_from_table;
-- Update reading status
UPDATE ReadingStatus SET status=:categoryinput WHERE statusID=:statusID_from_update_form;
-- Delete reading status
DELETE FROM ReadingStatus WHERE statusID=:statusID_selected_from_table;