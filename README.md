# CRUD-Operation

🚀 What Does This Code Do?
This code helps users add, edit, and delete expenses using an HTML form and a table. When a user enters an amount and description, it gets added to a table. The user can also edit or delete an expense from the table.

📌 Understanding the Functions One by One
1️⃣ onSubmit() - The Main Function
📌 When you click the "Submit" button, this function is called.

js
Copy
Edit
function onSubmit() {
    if (validate()) {  // Checks if the input is valid
        let expensedata = readexpensedata(); // Reads the input values
        if (selectedRow == null)  
            insertNewRecord(expensedata); // Adds a new row if no row is selected
        else
            updateRecord(expensedata);  // Updates an existing row
        resetExpense();  // Clears the input fields
    }
}
🔹 What happens here?
If input fields are empty, it won't proceed.
It reads the data (readexpensedata()).
If the user is adding a new record, it calls insertNewRecord().
If the user is editing a record, it calls updateRecord().
Finally, it clears the form using resetExpense().
2️⃣ readexpensedata() - Read Input Data
📌 This function collects the data entered in the form.

js
Copy
Edit
function readexpensedata() {
    let expensedata = {};
    expensedata["amount"] = document.getElementById("amount").value;
    expensedata["description"] = document.getElementById("description").value;
    return expensedata;
}
🔹 What happens here?
It creates an empty object {}.
Stores the amount and description entered by the user.
Returns this object so that other functions can use it.
3️⃣ insertNewRecord() - Add a New Row to the Table
📌 This function adds a new expense to the table.

js
Copy
Edit
function insertNewRecord(data) {
    let table = document.getElementById("expenselist").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.rows.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.amount;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a> 
                       <a onClick="onDelete(this)">Delete</a>`;
}
🔹 What happens here?
It finds the table (expenselist).
Creates a new row at the end of the table.
Adds Amount and Description in two cells.
Adds Edit and Delete buttons in the third cell.
4️⃣ resetExpense() - Clear Input Fields
📌 This function clears the input boxes after submission.

js
Copy
Edit
function resetExpense() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    selectedRow = null;
}
🔹 What happens here?
It clears the Amount and Description fields.
It resets selectedRow to null, meaning no row is selected.
5️⃣ onEdit(td) - Edit an Existing Expense
📌 When the "Edit" button is clicked, this function fills the form with the selected row's data.

js
Copy
Edit
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("amount").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description").value = selectedRow.cells[1].innerHTML;
}
🔹 What happens here?
It finds which row was clicked.
Fills the form with that row's data.
Sets selectedRow to the selected row.
6️⃣ updateRecord(expensedata) - Update an Existing Record
📌 This function updates a row if the user edits and submits the form.

js
Copy
Edit
function updateRecord(expensedata) {
    selectedRow.cells[0].innerHTML = expensedata.amount;
    selectedRow.cells[1].innerHTML = expensedata.description;
}
🔹 What happens here?
Updates the amount and description in the selected row.
7️⃣ onDelete(td) - Delete a Record
📌 When the "Delete" button is clicked, this function removes the row.

js
Copy
Edit
function onDelete(td) {
    if (confirm("Are you sure want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("expenselist").deleteRow(row.rowIndex);
        resetExpense();
    }
}
🔹 What happens here?
Shows a confirmation box before deleting.
If the user confirms, it removes the row from the table.
Calls resetExpense() to clear the form.
8️⃣ validate() - Validate Input Fields
📌 This function checks if the "Amount" field is empty before submitting.

js
Copy
Edit
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
🔹 What happens here?
If the amount field is empty, it shows an error message.
If filled, it hides the error message.
