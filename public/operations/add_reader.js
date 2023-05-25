let addReaderForm = document.getElementById('add-reader-form');

addReaderForm.addEventListener("add-reader-form", function (e) {
    e.preventDefault();
    
    let inputName = document.getElementById("create-Readers-name");
    let inputEmail = document.getElementById("create-Readers-email");

    let nameValue = inputName.value;
    let emailValue = inputEmail.value;

    let data = {
        name: nameValue,
	email: emailValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-reader", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
	    addRowToTable(xhttp.response);

	    inputName.value = '';
	    inputEmail.value = '';
	}
	else if (xhttp.readyState == 4 && xhttp.status != 200) {
	    console.log("There was an error with the input.")
	}
    }
    xhttp.send(JSON.stringify(data));
    });

addRowToTable = (data) => {
    let currentTable = document.getElementById("display-table");
    let newRowIndex = currentTable.rows.length;
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");

    idCell.innerText = newRow.id;
    nameCell.innerText = newRow.name;
    emailCell.innerText = newRow.email;

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(emailCell);

    currentTable.appendChild(row);
}
