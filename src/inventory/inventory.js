import createTable from '../functions/create-table.js';

const tableSection = document.getElementById('table-section');

let inventoryArray = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventoryArray = JSON.parse(jsonArray);
}

createTable(tableSection, inventoryArray);