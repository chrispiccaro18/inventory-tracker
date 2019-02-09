import createTable from '../functions/create-table.js';
import createFilter from '../functions/create-filter.js';

const filterSection = document.getElementById('filter-section');
const tableSection = document.getElementById('table-section');

let inventoryArray = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventoryArray = JSON.parse(jsonArray);

    let completeInventoryTable = createTable(tableSection, inventoryArray);

    createFilter(filterSection, inventoryArray, completeInventoryTable);

}