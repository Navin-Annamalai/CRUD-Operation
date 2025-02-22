function currentbalance() {
    let incomeField = document.getElementById("totalincome").innerHTML;
    let expenseField = document.getElementById("totalspent").innerHTML;

    // Convert to numbers, handling empty values properly
    let totalIncome = incomeField ? parseFloat(incomeField) : 0;
    let totalExpense = expenseField ? parseFloat(expenseField) : 0;

    // Calculate balance
    let balance = totalIncome - totalExpense;  

    // Update balance display
    document.getElementById("balance").innerHTML = balance.toFixed(2); // Show 2 decimal places
}

function calculatetotalincome() {
    let amountcol = document.getElementById("incomelist").getElementsByTagName("tbody")[0];
    let total1 = 0;

    for (let i = 0; i < amountcol.rows.length; i++) {
        total1 += parseFloat(amountcol.rows[i].cells[0].innerHTML) || 0;
    }
    document.getElementById("totalincome").innerHTML = total1;
    currentbalance();
}

function calculatetotalexpense() {
    let amountcol = document.getElementById("expenselist").getElementsByTagName("tbody")[0];
    let total = 0;

    for (let i = 0; i < amountcol.rows.length; i++) {
        total += parseFloat(amountcol.rows[i].cells[0].innerHTML) || 0;
    }
    document.getElementById("totalspent").innerHTML = total;
    currentbalance();
}

var selectedRow = null;

function onSubmitincome() {
    if (validate1()) {
        let incomedata = readincomedata();
        if (selectedRow == null)
            insertNewRecord1(incomedata);
        else
            updateRecord1(incomedata);
        resetIncome1();
    }
    currentbalance();
}

function readincomedata() {
    let incomedata = {};
    incomedata["incomeamount"] = parseFloat(document.getElementById("incomeamount").value) || 0;
    incomedata["description1"] = document.getElementById("description1").value;
    return incomedata;
}

function insertNewRecord1(data) {
    let table = document.getElementById("incomelist").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.rows.length);
    let cell11 = newRow.insertCell(0);
    cell11.innerHTML = data.incomeamount;
    let cell21 = newRow.insertCell(1);
    cell21.innerHTML = data.description1;
    let cell31 = newRow.insertCell(2);
    cell31.innerHTML = `<button onClick="onEdit1(this)">Edit</button> 
                       <button onClick="onDelete1(this)">Delete</button>`;
calculatetotalincome();
    currentbalance();
}

function resetIncome1() {
    document.getElementById("incomeamount").value = "";
    document.getElementById("description1").value = "";
    selectedRow = null;
}

function onEdit1(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("incomeamount").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description1").value = selectedRow.cells[1].innerHTML;

}

function updateRecord1(expensedata) {
    selectedRow.cells[0].innerHTML = expensedata.incomeamount;
    selectedRow.cells[1].innerHTML = expensedata.description1;
    calculatetotalincome();
    currentbalance();
}

function onDelete1(td) {
    if (confirm("Are you sure want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("incomelist").deleteRow(row.rowIndex);
        resetIncome1();
    }
    calculatetotalincome();
    currentbalance();
}

function validate1() {
    let isValid = true;
    let amountField = document.getElementById("incomeamount");
    let validationError = document.getElementById("fullNameValidationError1");

    if (amountField.value == "") {
        isValid = false;
        validationError.classList.remove("hide");
    } else {
        if (!validationError.classList.contains("hide"))
            validationError.classList.add("hide");
    }
    calculatetotalincome();
    currentbalance();
    return isValid;

}

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
    currentbalance();
}

function readexpensedata() {
    let expensedata = {};
    expensedata["amount"] = parseFloat(document.getElementById("amount").value) || 0;
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
    calculatetotalexpense();
    currentbalance();
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
    calculatetotalexpense();
    currentbalance();
}

function onDelete(td) {
    if (confirm("Are you sure want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("expenselist").deleteRow(row.rowIndex);
        resetExpense();
    }
    calculatetotalexpense();
    currentbalance();
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
    calculatetotalexpense();
    currentbalance();
    return isValid;

}

function resetAll() {

    confirm("Are you sure want to reset your Expense Tracker?");

    document.getElementById("incomeamount").value = "";
    document.getElementById("totalincome").innerHTML = "0";

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";

    let expenseTable = document.getElementById("expenselist").getElementsByTagName("tbody")[0];
    expenseTable.innerHTML = ""; 

    document.getElementById("totalspent").innerHTML = "0";
    document.getElementById("balance").innerHTML = "0";

  
}
