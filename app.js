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
    let sql = 'SELECT * FROM Readers;';
    db.pool.query(sql, (error, rows, fields) => {
        if (error) throw error;
        res.send([rows, fields]);
    });
});
// UPDATE


// DELETE
app.delete('/delete-readers', function(req, res, next) {
    let data = req.body;
    let dataID = parseInt(data.id);
    let sql = `DELETE FROM Readers WHERE readerID = ${dataID}`;
    db.pool.query(sql, (error, rows, fields) => {
	    if (error) {
	        console.log(error);
	        res.sendStatus(400);
	    } else {
            res.sendStatus(204);
        }});
});

/* operations for: ReadingClubs entity */
/* operations for: Books entity */
/* operations for: ReadingLogs entity */
/* operations for: ClubMembers entity */
/* operations for: ReadingStatus entity */
