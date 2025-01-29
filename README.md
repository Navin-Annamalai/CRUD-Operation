# CRUD Operation - Expense Tracker

## 🚀 Overview
This project allows users to **Create, Read, Update, and Delete (CRUD)** expenses using an HTML form and a table. Users can add an expense, edit existing records, and delete them as needed.

---

## 📌 Features
- ✅ Add new expenses (amount & description)
- ✏️ Edit an existing expense
- 🗑️ Delete an expense
- 🛡️ Validate input before submitting

---

## 🏗️ Project Structure
```
📂 CRUD-Expense-Tracker
│-- index.html        # UI Structure
│-- internalcss        # Styling
│-- crud.js         # Functionality
│-- README.md         # Documentation
```

---

## 🎯 Functions Breakdown

### 1️⃣ `onSubmit()` - The Main Function
Handles form submission by validating input, reading data, and either adding a new record or updating an existing one.

```js
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
```

### 2️⃣ `readexpensedata()` - Read Input Data
Fetches values from the input fields and returns them as an object.

```js
function readexpensedata() {
    let expensedata = {};
    expensedata["amount"] = document.getElementById("amount").value;
    expensedata["description"] = document.getElementById("description").value;
    return expensedata;
}
```

### 3️⃣ `insertNewRecord(data)` - Add a New Row to the Table
Adds a new expense to the table dynamically.

```js
function insertNewRecord(data) {
    let table = document.getElementById("expenselist").getElementsByTagName("tbody")[0];
    let newRow = table.insertRow(table.rows.length);
    let cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.amount;
    let cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    let cell3 = newRow.insertCell(2);
    cell3.innerHTML = `<a onClick="onEdit(this)">Edit</a> <a onClick="onDelete(this)">Delete</a>`;
}
```

### 4️⃣ `resetExpense()` - Clear Input Fields
Clears the form fields after submission.

```js
function resetExpense() {
    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
    selectedRow = null;
}
```

### 5️⃣ `onEdit(td)` - Edit an Existing Expense
Allows the user to edit an expense entry.

```js
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("amount").value = selectedRow.cells[0].innerHTML;
    document.getElementById("description").value = selectedRow.cells[1].innerHTML;
}
```

### 6️⃣ `updateRecord(expensedata)` - Update an Existing Record
Modifies an existing row with new values.

```js
function updateRecord(expensedata) {
    selectedRow.cells[0].innerHTML = expensedata.amount;
    selectedRow.cells[1].innerHTML = expensedata.description;
}
```

### 7️⃣ `onDelete(td)` - Delete a Record
Removes an expense entry after confirmation.

```js
function onDelete(td) {
    if (confirm("Are you sure you want to delete this record?")) {
        let row = td.parentElement.parentElement;
        document.getElementById("expenselist").deleteRow(row.rowIndex);
        resetExpense();
    }
}
```

### 8️⃣ `validate()` - Validate Input Fields
Ensures the amount field is filled before submission.

```js
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
```

---

## 🛠️ Technologies Used
- HTML5
- CSS3
- JavaScript

---

## 🚀 How to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/CRUD-Expense-Tracker.git
   ```
2. Open `index.html` in your browser.

---

## 📝 Future Enhancements
- ✅ Store expenses in Local Storage
- ✅ Add filtering options (date range, category)
- ✅ Improve UI with Bootstrap

---

## 📞 Contact
For any issues, contact me at **your-email@example.com**.

