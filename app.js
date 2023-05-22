'use strict';

/* APP SETUP */

// express
const express = require('express');
const app = express();
const PORT = 9036;

app.use(express.static('public'));

// app.use(express.urlencoded({
//     extended: true
// }));

// database
const db = require('./database/db-connector');

/* ***                       *** */
/* *** DATA MODEL OPERATIONS *** */
/* ***                       *** */
        // fields.length = num of data columns
        // fields[n].name = column header
        // results.length = num of data rows


/* operations for: Readers entity */
// CREATE
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

/* operations for: ReadingClubs entity */
/* operations for: Books entity */
/* operations for: ReadingLogs entity */
/* operations for: ClubMembers entity */
/* operations for: ReadingStatus entity */

/* LISTENER */
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`)
});