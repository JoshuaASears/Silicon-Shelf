'use strict';

/* ***                   *** */
/* *** DOM MANIPULATIONS *** */
/* ***                   *** */

// TABLE
function display_table (data) {
    let rows = data[0];
    let num_rows = rows.length;
    let fields = data[1];
    let total_columns = fields.length;
    
    // add tr & th(s) to thead
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    thead.appendChild(tr);
    for (let column = 0; column < total_columns; column++) {
        let th = document.createElement('th');
        tr.appendChild(th);
        if (column < fields.length) {
            th.textContent = fields[column].name;
        };
    };
    
    // add tr(s) and td(s) to tbody
    let tbody = document.createElement('tbody')
    for (let row = 0; row < num_rows; row++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let column = 0; column < total_columns; column++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            if (column < fields.length) {
                let field = fields[column].name
                td.textContent = rows[row][field]
		if (column == 0) {
		    td.parentElement.setAttribute("data-value", rows[row][field]);
		    }
            }
        };
    };
    
    // drop and replace table elements with new
    let table = document.getElementById('display-table');
    table.replaceChildren(thead, tbody);
};

/* ***               *** */
/* *** ROUTE CALLERS *** */
/* ***               *** */
// CREATE
async function add_data (event) {
    event.preventDefault();
    let inputNameID = document.getElementById("create-fk-Readers-name");
    let inputTitleID = document.getElementById("create-fk-Books-title");
    let inputClubNameID = document.getElementById("create-fk-ReadingClubs-clubName");
    let inputStatusID = document.getElementById("create-fk-ReadingStatus-status");

    let data = {
        readerID: inputNameID.value,
        bookID: inputTitleID.value,
        readingClubID: inputClubNameID.value,
        statusID: inputStatusID.value
    }

   var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-readinglogs", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            retrieve_data();
            // inputName.value = '';
            // inputEmail.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
};

async function populate_dropdown() {
    const url = '/retrieve-readernames';
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            let name_field = document.getElementById('create-fk-Readers-name');
            let rows = data[0];
            let num_rows = rows.length;
            let fields = data[1];
            let field = fields[1].name;
            for (let row = 0; row < num_rows; row++) {
                let option = document.createElement("option");
                let name = rows[row][field];
                let id = fields[0].name;
                option.value = rows[row][id];
                option.textContent = name;
                name_field.appendChild(option);
            }
        }
    } catch (error) {
        console.error(error)
    };

    const url2 = '/retrieve-booktitles';
    try{
        const response = await fetch(url2);
        const data = await response.json();
        if (response.status === 200) {
            let name_field = document.getElementById('create-fk-Books-title');
            let rows = data[0];
            let num_rows = rows.length;
            let fields = data[1];
            let field = fields[1].name;
            for (let row = 0; row < num_rows; row++) {
                let option = document.createElement("option");
                let name = rows[row][field];
                let id = fields[0].name;
                option.value = rows[row][id];
                option.textContent = name;
                name_field.appendChild(option);
            }
        }
    } catch (error) {
        console.error(error)
    };
    
    const url3 = '/retrieve-clubnames';
    try{
        const response = await fetch(url3);
        const data = await response.json();
        if (response.status === 200) {
            let name_field = document.getElementById('create-fk-ReadingClubs-clubName');
            let rows = data[0];
            let num_rows = rows.length;
            let fields = data[1];
            let field = fields[1].name;
            for (let row = 0; row < num_rows; row++) {
                let option = document.createElement("option");
                let name = rows[row][field];
                let id = fields[0].name;
                option.value = rows[row][id];
                option.textContent = name;
                name_field.appendChild(option);
            }
        }
    } catch (error) {
        console.error(error)
    };

    const url4 = '/retrieve-readingstatuses';
    try{
        const response = await fetch(url4);
        const data = await response.json();
        if (response.status === 200) {
            let name_field = document.getElementById('create-fk-ReadingStatus-status');
            let rows = data[0];
            let num_rows = rows.length;
            let fields = data[1];
            let field = fields[1].name;
            for (let row = 0; row < num_rows; row++) {
                let option = document.createElement("option");
                let name = rows[row][field];
                let id = fields[0].name;
                option.value = rows[row][id];
                option.textContent = name;
                name_field.appendChild(option);
            }
        }
    } catch (error) {
        console.error(error)
    };
}

// RETRIEVE
async function retrieve_data(event) {
    if (event) {
    event.preventDefault();
    };
    const url = '/retrieve-readinglogs';
    try{
        const response = await fetch(url);
        const data = await response.json();
        if (response.status === 200) {
            display_table(data);
        }
    } catch (error) {
        console.error(error)
    };
};

/* ***         *** */
/* *** ON LOAD *** */
/* ***         *** */
document.addEventListener('DOMContentLoaded', () => {
    const addData = document.getElementById('add-form');
    addData.addEventListener('submit', add_data);
    
    populate_dropdown();
    retrieve_data();
});
