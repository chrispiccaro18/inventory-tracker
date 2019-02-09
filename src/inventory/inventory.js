import createTable from '../functions/create-table.js';

const tableSection = document.getElementById('table-section');

let inventory = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventory = JSON.parse(jsonArray);
}

createTable(tableSection, inventory);