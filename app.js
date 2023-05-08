'use strict';

/* SETUP */

// express
const express = require('express');
const app = express();
const PORT = 9036;

// database
//const db = require('./db-connector');

// serve static homepage
// note: modify step number (3>4>5>6) for each project phase
app.use(express.static('step3'));

/* LISTENER */
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`)
});