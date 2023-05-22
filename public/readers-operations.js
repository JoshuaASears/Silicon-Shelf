'use strict';

// create table
function display_table (data) {
    let button_columns = 2;
    let rows = data[0];
    let num_rows = rows.length;
    let fields = data[1];
    let total_columns = fields.length + button_columns;
    
    // append thead with tr & th(s)
    let table = document.getElementById('display-table');
    let thead = document.createElement('thead');
    table.appendChild(thead);
    let tr = document.createElement('tr');
    thead.appendChild(tr);
    for (let column = 0; column < total_columns; column++) {
        let th = document.createElement('th');
        tr.appendChild(th);
        if (column < fields.length) {
            th.textContent = fields[column].name;
        };
    };

    // append tbody with tr(s) and td(s)
    let tbody = document.createElement('tbody')
    table.appendChild(tbody);
    for (let row = 0; row < num_rows; row++) {
        let tr = document.createElement('tr');
        tbody.appendChild(tr);
        for (let column = 0; column < total_columns; column++) {
            let td = document.createElement('td');
            tr.appendChild(td);
            if (column < fields.length) {
                let field = fields[column].name
                td.textContent = rows[row][field]
            } else if (column === total_columns - 2) {
                td.textContent = 'edit';
            } else if (column === total_columns - 1) {
                td.textContent = 'delete';
            };
        };
    };
};

// prevent default events
async function retrieve_data(event) {
    event.preventDefault();
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

// event listeners on load
document.addEventListener('DOMContentLoaded', () => {
    const retrieveData = document.getElementById('retrieve-data');
    retrieveData.addEventListener('click', retrieve_data);
});