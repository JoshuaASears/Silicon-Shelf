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
                td.textContent = 'edit';
            } else if (column === total_columns - 1) {
                let deleteButton = document.createElement('button');
                td.append(deleteButton);
                deleteButton.textContent = 'Delete';
                let dataID = td.parentElement.getAttribute("data-value");
                deleteButton.addEventListener("click", function () {
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
    let inputName = document.getElementById("create-Readers-name");
    let inputEmail = document.getElementById("create-Readers-email");

    let nameValue = inputName.value;
    let emailValue = inputEmail.value;

    let data = {
        name: nameValue,
        email: emailValue
    }

   var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-readers", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            retrieve_data();
            inputName.value = '';
            inputEmail.value = '';
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
    }
    
    const url = '/retrieve-readers';
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

// DELETE
function delete_data(dataID) {
    let data = {
	    id: dataID
    };
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-readers", true);
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
    const retrieveData = document.getElementById('retrieve-data');
    retrieveData.addEventListener('click', retrieve_data);

    const addData = document.getElementById('add-reader-form');
    addData.addEventListener('submit', add_data);
});
