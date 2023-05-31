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
/* operations for: Books entity */
/* operations for: ReadingLogs entity */
/* operations for: ClubMembers entity */

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
    let sql = 'SELECT * FROM ReadingStatus;';
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
