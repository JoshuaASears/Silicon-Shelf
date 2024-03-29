'use strict';

/* APP SETUP */

// express
const express = require('express');
const app = express();
const PORT = 9036;

app.use(express.json());
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: true
}));

/* LISTENER */
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`)
});

// database
const db = require('./database/db-connector');

/* ***                       *** */
/* *** DATA MODEL OPERATIONS *** */
/* ***                       *** */

/* operations for: Readers entity */
// CREATE
app.post('/add-readers', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO Readers (name, email) VALUES ('${data.name}', '${data.email}')`;
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});
// RETRIEVE
app.get('/retrieve-readers', (req, res) => {
    let sql = 'SELECT * FROM Readers ORDER BY name;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});
// UPDATE
app.put('/update-readers', (req, res) => {
    let data = req.body;
    let readerID = data.readerID;
    let name = data.name;
    let email = data.email;
    let sql = `UPDATE Readers SET name = "${name}", email = "${email}" WHERE readerID = ${readerID};`
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});
// DELETE
app.delete('/delete-readers', (req, res) => {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM Readers WHERE readerID = ${dataID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});

/* operations for: ReadingClubs entity */
// CREATE
app.post('/add-readingclubs', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO ReadingClubs (clubName) VALUES ('${data.clubName}')`;
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});
// RETRIEVE
app.get('/retrieve-readingclubs', (req, res) => {
    let sql = 'SELECT * FROM ReadingClubs ORDER BY clubName;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});
// UPDATE
app.put('/update-readingclubs', (req, res) => {
    let data = req.body;
    let clubID = data.clubID;
    let clubName = data.clubName;
    let sql = `UPDATE ReadingClubs SET clubName = "${clubName}" WHERE clubID = ${clubID};`
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});
// DELETE
app.delete('/delete-readingclubs', (req, res) => {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM ReadingClubs WHERE clubID = ${dataID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});

/* operations for: Books entity */
// CREATE
app.post('/add-books', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO Books (title, author, year) VALUES ('${data.title}', '${data.author}', '${data.year}')`;
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});
// RETRIEVE
app.get('/retrieve-books', (req, res) => {
    let sql = 'SELECT * FROM Books ORDER BY title;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});
// UPDATE
app.put('/update-books', (req, res) => {
    let data = req.body;
    let bookID = data.bookID;
    let title = data.title;
    let author = data.author;
    let year = data.year;
    let sql = `UPDATE Books SET title = "${title}", author = "${author}", year="${year}" WHERE bookID = ${bookID};`
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});
// DELETE
app.delete('/delete-books', (req, res) => {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM Books WHERE bookID = ${dataID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});

/* operations for: ReadingLogs entity */
// CREATE
app.post('/add-readinglogs', (req, res) => {
    let data = req.body;
    let sql;
    if (data.readingClubID === "") {
        sql = `INSERT INTO ReadingLogs (readerID, bookID, statusID) VALUES ('${data.readerID}', '${data.bookID}', '${data.statusID}')`;
    } else {
        sql = `INSERT INTO ReadingLogs (readerID, bookID, readingClubID, statusID) VALUES ('${data.readerID}', '${data.bookID}', '${data.readingClubID}', '${data.statusID}')`;
    };
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});

app.get('/retrieve-readernames', (req, res) => {
    let sql = 'SELECT readerID, name FROM Readers ORDER BY name;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});

app.get('/retrieve-booktitles', (req, res) => {
    let sql = 'SELECT bookID, title FROM Books ORDER BY title;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});

app.get('/retrieve-clubnames', (req, res) => {
    let sql = 'SELECT clubID, clubName FROM ReadingClubs ORDER BY clubName;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});

app.get('/retrieve-readingstatuses', (req, res) => {
    let sql = 'SELECT statusID, status FROM ReadingStatus ORDER BY status;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});


// RETRIEVE
app.get('/retrieve-readinglogs', (req, res) => {
    let sql = 'SELECT logID, Readers.name AS name, Books.title AS title, ReadingClubs.clubName AS clubName, ReadingStatus.status AS status, timeStamp \
    FROM ReadingLogs \
    LEFT OUTER JOIN Readers ON ReadingLogs.readerID = Readers.readerID \
    LEFT OUTER JOIN Books ON ReadingLogs.bookID = Books.bookID \
    LEFT OUTER JOIN ReadingClubs ON ReadingLogs.readingClubID = ReadingClubs.clubID \
    LEFT OUTER JOIN ReadingStatus ON ReadingLogs.statusID = ReadingStatus.statusID;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});


/* operations for: ClubMembers entity */
// CREATE
app.post('/add-clubmembers', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO ClubMembers (readerID, clubID) VALUES ('${data.readerID}', '${data.readingClubID}')`;
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});

// RETRIEVE
app.get('/retrieve-clubmembers', (req, res) => {
    let sql = 'SELECT clubMemberID, Readers.name AS name, ReadingClubs.clubName as clubName \
    FROM ClubMembers \
    LEFT OUTER JOIN Readers ON ClubMembers.readerID = Readers.readerID \
    LEFT OUTER JOIN ReadingClubs on ClubMembers.clubID = ReadingClubs.clubID \
    ORDER BY ReadingClubs.clubName;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});

// DELETE
app.delete('/delete-clubmembers', (req, res) => {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM ClubMembers WHERE clubMemberID = ${dataID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});

/* operations for: ReadingStatus entity */
// CREATE
app.post('/add-readingstatus', (req, res) => {
    let data = req.body;
    let sql = `INSERT INTO ReadingStatus (status) VALUES ('${data.status}')`;
    db.pool.query(sql, (error, rows, field) => {
	if (error) {
	    console.log(error);
	    res.sendStatus(400);
	} else {
	    res.sendStatus(200);
	}});
});
// RETRIEVE
app.get('/retrieve-readingstatus', (req, res) => {
    let sql = 'SELECT * FROM ReadingStatus ORDER BY status;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});
// UPDATE
app.put('/update-readingstatus', (req, res) => {
    let data = req.body;
    let statusID = data.statusID;
    let status = data.status;
    let sql = `UPDATE ReadingStatus SET status = "${status}" WHERE statusID= ${statusID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});
// DELETE
app.delete('/delete-readingstatus', (req, res) => {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM ReadingStatus WHERE statusID = ${dataID};`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});
