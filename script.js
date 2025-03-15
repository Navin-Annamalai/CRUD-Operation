document.addEventListener("DOMContentLoaded", loadEntries);

let editIndex = null; 
function addEntry(type) {
  let description = document.getElementById("description").value;
  let amount = parseFloat(document.getElementById("amount").value);
  
  if (!description || isNaN(amount) || amount <= 0) return;

  let entries = JSON.parse(localStorage.getItem("entries")) || [];

  if (editIndex !== null) {
    // If editing an entry, update the existing one
    entries[editIndex] = { description, amount, type };
    editIndex = null;
    document.getElementById("add-btn").textContent = "Add Entry"; // Reset button text
  } else {
    // Otherwise, add a new entry
    entries.push({ description, amount, type });
  }

  localStorage.setItem("entries", JSON.stringify(entries));

  // Clear input fields
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  loadEntries();
}

function loadEntries() {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  let tbody = document.getElementById("entries");
  tbody.innerHTML = "";

  entries.forEach((entry, index) => {
    let row = `<tr class="border-b">
                    <td class="p-2">${entry.description}</td>
                    <td class="p-2">${entry.amount}</td>
                    <td class="p-2">${entry.type}</td>
                    <td class="p-2">
                        <button onclick="editEntry(${index})" class="text-blue-500 mr-2">Edit</button>
                        <button onclick="deleteEntry(${index})" class="text-red-500">Delete</button>
                    </td>
                </tr>`;
    tbody.innerHTML += row;
  });

  updateSummary();
}

function editEntry(index) {
  let entries = JSON.parse(localStorage.getItem("entries"));
  let entry = entries[index];

  document.getElementById("description").value = entry.description;
  document.getElementById("amount").value = entry.amount;

  document.querySelector(`input[name='entryType'][value='${entry.type}']`).checked = true;

  editIndex = index;
  document.getElementById("add-btn").textContent = "Update Entry"; 
}

function deleteEntry(index) {
  let entries = JSON.parse(localStorage.getItem("entries"));
  entries.splice(index, 1);
  localStorage.setItem("entries", JSON.stringify(entries));
  loadEntries();
}

function updateSummary() {
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  let totalIncome = entries
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  let totalExpense = entries
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);
  let balance = totalIncome - totalExpense;

  document.getElementById("totalincome").textContent = totalIncome.toFixed(2);
  document.getElementById("totalspent").textContent = totalExpense.toFixed(2);
  document.getElementById("balance").textContent = balance.toFixed(2);
}

function filterEntries() {
  let filter = document.querySelector("input[name='filter']:checked").value;
  let entries = JSON.parse(localStorage.getItem("entries")) || [];
  let tbody = document.getElementById("entries");
  tbody.innerHTML = "";

  entries
    .filter((e) => filter === "all" || e.type === filter)
    .forEach((entry, index) => {
      let row = `<tr class="border-b">
                    <td class="p-2">${entry.description}</td>
                    <td class="p-2">${entry.amount}</td>
                    <td class="p-2">${entry.type}</td>
                    <td class="p-2">
                        <button onclick="editEntry(${index})" class="text-blue-500 mr-2">Edit</button>
                        <button onclick="deleteEntry(${index})" class="text-red-500">Delete</button>
                    </td>
                </tr>`;
      tbody.innerHTML += row;
    });
}

function resetTracker() {
  if (confirm("Are you sure you want to reset everything?")) {
    localStorage.removeItem("entries");
    loadEntries();
  }
}
