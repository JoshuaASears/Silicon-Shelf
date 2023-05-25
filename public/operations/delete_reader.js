function deleteReader(readerID) {
    let data = {
	id: readerID
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-reader", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
	    deleteRow(readerID);
	}
	else if (xhttp.readyState == 4 && xhttp.status != 204) {
	    console.log("There was an error with the input.");
	}
    }
    xhttp.send(JSON.stringify(data));
}

function deleteRow(readerID) {
    let table = document.getElementById("display-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
	if (table.rows[i].getAttribute("data-value") == readerID) {
	    table.deleteRow(i);
	    break;
	}
    }
}
