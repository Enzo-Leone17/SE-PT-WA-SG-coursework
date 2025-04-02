//create table and insert data into it
// Default data values
const products = [
  { name: "Laptop", price: 999.99, inStock: true },
  { name: "Smartphone", price: 599.49, inStock: false },
  { name: "Keyboard", price: 49.99, inStock: true },
];

// Get div to display table
const productTable = document.getElementById("product-table");
// Get div to display client edits
const clientEdits = document.getElementById("client-edits");
// Assign global variables + caption
const tableCaption = document.createElement("caption");
const table = document.createElement("table");
tableCaption.innerText = "Products";

//New request add filter
const filterInput = document.createElement("select");
filterInput.setAttribute("name", "filter-input");
filterInput.setAttribute("value", "All");
filterInput.setAttribute("id", "filter-input");
const filterLabel = document.createElement("label");
filterLabel.setAttribute("for", "filter-input");
const filterOptionsText = ["All", "In Stock", "Out of Stock"];
for (let i = 0; i < filterOptionsText.length; i++) {
  const filterOption = document.createElement("option");
  filterOption.value = filterOptionsText[i];
  filterOption.innerText = filterOptionsText[i];
  filterInput.appendChild(filterOption);
}
filterInput.addEventListener("change", () => {
  updateTable(filterInput.value);
});
productTable.appendChild(filterLabel);
filterLabel.innerText = "Filter by stock status: ";
filterLabel.appendChild(filterInput);

//Client controls "editing" the table
const clientSelectInput = document.createElement("select");
clientSelectInput.setAttribute("name", "client-select-input");
clientSelectInput.setAttribute("value", "Edit Data");
const clientSelectLabel = document.createElement("label");
clientSelectLabel.setAttribute("for", "client-select-input");
clientSelectLabel.innerText = "Select an action: ";
clientSelectLabel.appendChild(clientSelectInput);
const clientEditOptionsText = ["Edit Data", "Add Data", "Delete Data"];
for (let i = 0; i < clientEditOptionsText.length; i++) {
  const clientEditOption = document.createElement("option");
  clientEditOption.value = clientEditOptionsText[i];
  clientEditOption.innerText = clientEditOptionsText[i];
  clientSelectInput.appendChild(clientEditOption);
}
const clientEditingLabels = ["Row", "Column", "Edit Value"];
clientSelectInput.addEventListener("change", () => {
  if (clientSelectInput === "Edit Data") {
  }
});

// Single button to manage creation or update of the table
function tableControl() {
  // create a new table if it doesn't exist or update it if it does
  if (!productTable.contains(table)) {
    createTable(false);
  } else {
    updateTable(filterInput.value);
  }
}

//Save data array
let saveData = [];
let saveHeaderData = [];
let saveRows = 0;
// for (let s = 0; s < Object.keys(products[0])?.length; s++) {
//   saveHeaderData = Object.keys(products[0]);
//   for (let f = 0; f < products.length; f++) {
//     saveData.push(saveHeaderData[s], products[f][saveHeaderData[s]]);
//   }
// }

// Generate table
function createTable(isUpdate = false, filtered = "All") {
  // Create table caption if it doesn't exist
  table.contains(tableCaption) ? null : table.appendChild(tableCaption);
  clientEdits.contains(clientSelectInput)
    ? null
    : table.appendChild(tableCaption);

  // Get the headers from the first product object if existing
  let tableHeadersData = products[0] ? Object.keys(products[0]) : [];

  if (isUpdate) {
    tableHeadersData = [];
    for (let i = 0; i < saveHeaderData.length; i++) {
      let tableHeader = document.createElement("th");
      table.appendChild(tableHeader);
      tableHeader.innerText = saveHeaderData[i];
      tableHeadersData.push(saveHeaderData[i]);
    }
  } else {
    // Create table headers
    for (let i = 0; i < tableHeadersData.length; i++) {
      if (tableHeadersData[i]) {
        let tableHeader = document.createElement("th");
        table.appendChild(tableHeader);
        tableHeader.innerText = tableHeadersData[i];
        saveHeaderData.push(tableHeadersData[i]);
        for (let f = 0; f < products.length; f++) {
          saveData.push(products[f][tableHeadersData[i]]);
        }
      }
    }
    saveRows = products.length;
  }
  console.log("saveHeaderData", saveHeaderData);
  console.log(saveData);
  // Create an array to store filtered products
  let newFilteredProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (filtered === "In Stock" && products[i]?.inStock === true) {
      newFilteredProducts.push(products[i]);
    } else if (filtered === "Out of Stock" && products[i]?.inStock === false) {
      newFilteredProducts.push(products[i]);
    } else if (filtered === "All") {
      newFilteredProducts.push(products[i]);
    }
  }
  // Create table rows and cells
  for (let i = 0; i < newFilteredProducts.length; i++) {
    //rows
    let row = document.createElement("tr");
    table.appendChild(row);
    for (let j = 0; j < tableHeadersData.length; j++) {
      //columns
      let cell = document.createElement("td");
      row.appendChild(cell);
      if (
        newFilteredProducts[i][tableHeadersData[j]] === true ||
        newFilteredProducts[i][tableHeadersData[j]] === false
      ) {
        // console.log("boolean check", products[i][tableHeadersData[j]]);
        newFilteredProducts[i][tableHeadersData[j]]
          ? (cell.innerText = "Yes")
          : (cell.innerText = "No");
      } else {
        cell.innerText = newFilteredProducts[i][tableHeadersData[j]];
      }
    }
  }
  // Add table to the div
  productTable.appendChild(table);
}

// Update table with new values
//wip only recreates current table no values input
function updateTable(editValues = "") {
  productTable.removeChild(table); //remove the table from the div
  table.innerHTML = ""; // Clear the table content
  createTable(true, editValues); // Recreate the table with updated values
}
