'use strict';

/* ***                   *** */
/* *** DOM MANIPULATIONS *** */
/* ***                   *** */

// TABLE
function display_table (data) {
    let button_columns = 2;
    let rows = data[0];
    let num_rows = rows.length;
    let fields = data[1];
    let total_columns = fields.length + button_columns;
    
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
            } else if (column === total_columns - 2) {
                let button = document.createElement('button');
                td.append(button);
                button.textContent = 'Edit';
                button.addEventListener("click", function () {
                    populate_update_form(rows[row])
                });
            } else if (column === total_columns - 1) {
                let button = document.createElement('button');
                td.append(button);
                button.textContent = 'Delete';
                let dataID = td.parentElement.getAttribute("data-value");
                button.addEventListener("click", function () {
                    delete_data(dataID)
                });
            };
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
    let inputTitle = document.getElementById("create-Books-title");
    let inputAuthor = document.getElementById("create-Books-author");
    let inputYear = document.getElementById("create-Books-year");

    let data = {
        title: inputTitle.value,
        author: inputAuthor.value,
        year: inputYear.value
    }

   var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            retrieve_data();
            inputTitle.value = '';
            inputAuthor.value = '';
            inputYear.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
};

// RETRIEVE
async function retrieve_data(event) {
    if (event) {
    event.preventDefault();
    };
    const url = '/retrieve-books';
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
// UPDATE
function populate_update_form(row_object) {
    let id_label = document.getElementById('update-Books-bookID');
    id_label.value = row_object.bookID;
    let title_field = document.getElementById('update-Books-title');
    title_field.value = row_object.title;
    let author_field = document.getElementById('update-Books-author');
    author_field.value = row_object.author;
    let year_field = document.getElementById('update-Books-year');
    year_field.value = row_object.year;
};
function update_data(event) {
    event.preventDefault();
    let inputID = document.getElementById("update-Books-bookID");
    let inputTitle = document.getElementById("update-Books-title");
    let inputAuthor = document.getElementById("update-Books-author");
    let inputYear = document.getElementById("update-Books-year");

    let data = {
        bookID: inputID.value,
        title: inputTitle.value,
        author: inputAuthor.value,
        year: inputYear.value
    }

   var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-books", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            retrieve_data();
            inputID.value = ''
            inputTitle.value = '';
            inputAuthor.value = '';
            inputYear.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));
};
// DELETE
function delete_data(dataID) {
    let data = {
	    id: dataID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-books", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            retrieve_data();
	    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
	        console.log("There was an error with the input.");
	    }
    }
    xhttp.send(JSON.stringify(data));
}
/* ***         *** */
/* *** ON LOAD *** */
/* ***         *** */
document.addEventListener('DOMContentLoaded', () => {
    const addData = document.getElementById('add-form');
    addData.addEventListener('submit', add_data);
    
    const retrieveData = document.getElementById('retrieve-data');
    retrieveData.addEventListener('click', retrieve_data);
    
    const updateData = document.getElementById('update-form');
    updateData.addEventListener('submit', update_data);
});
