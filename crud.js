var selectedRow = null;

function onSubmit() {
    if (validate()) {
        let expensedata = readexpensedata();
        if (selectedRow == null)
            insertNewRecord(expensedata);
        else
            updateRecord(expensedata);
        resetExpense();
    }
}
function readexpensedata() {
    let expensedata = {};
    expensedata["amount"] = document.getElementById("amount").value;
    expensedata["description"] = document.getElementById("description").value;
    return expensedata;
}


function insertNewRecord(data) {
    let table = document.getElementById("expenselist").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.rows.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.amount;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<button onClick="onEdit(this)">Edit</button> 
                       <button onClick="onDelete(this)">Delete</button>`;

}

function resetExpense() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("amount").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description").value = selectedRow.cells[1].innerHTML;
}

function updateRecord(expensedata) {
    selectedRow.cells[0].innerHTML = expensedata.amount;
    selectedRow.cells[1].innerHTML = expensedata.description;
}

function onDelete(td) {
    if (confirm("Are you sure want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("expenselist").deleteRow(row.rowIndex);
        resetExpense();
    }
}

function validate() {
    let isValid = true;
    let amountField = document.getElementById("amount");
    let validationError = document.getElementById("fullNameValidationError");

    if (amountField.value == "") {
        isValid = false;
        validationError.classList.remove("hide");
    } else {
        if (!validationError.classList.contains("hide"))
            validationError.classList.add("hide");
    }
    return isValid;
}



