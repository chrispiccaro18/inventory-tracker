import createTable from '../functions/create-table.js';

const filterSection = document.getElementById('filter-section');
const tableSection = document.getElementById('table-section');

let inventoryArray = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventoryArray = JSON.parse(jsonArray);

    
    let completeInventoryTable = createTable(tableSection, inventoryArray);
    
    // TODO create array for all keys
    // for each key i want an array with all values matching that key
    const keysArray = Object.keys(inventoryArray[0]);
    for(let i = 0; i < keysArray.length; i++) {
        for(let j = 0; j < inventoryArray.length; j++) {
            console.log([inventoryArray[i][keysArray[j]]]);
        }
    }

    // initiate category array with first item's category
    const categoryArray = [inventoryArray[0].category];
    for(let i = 0; i < inventoryArray.length; i++) {
        const category = inventoryArray[i].category;                    
        for(let j = 0; j < categoryArray.length; j++) {
            // if it is in the categoryArray, don't add it
            if(category === categoryArray[j]) {
                break;
            }
            categoryArray.push(category);
        }
    }

    // grab search parameters
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('filter');
    if(search !== null) {
        // remove complete table
        completeInventoryTable.remove();

        // create array of key/value pair
        const toFindArray = searchParams.get('filter').split(' ');
        
        // create new item array using toFindArray
        // toFindArray[0] = category, toFindArray[1] = food
        const filteredInventoryArray = [];
        for(let i = 0; i < inventoryArray.length; i++) {
            if(inventoryArray[i][toFindArray[0]] === toFindArray[1]) {
                filteredInventoryArray.push(inventoryArray[i]);
            }
        }
        // create new table based on filter parameters    
        createTable(tableSection, filteredInventoryArray);
    }
    
    // create the filter p
    const filterP = document.createElement('p');
    filterP.textContent = 'Filter by: ';
    const filterSelect = document.createElement('select');
    filterSelect.name = 'filterBy';

    // empty option
    const emptyFilterOption = document.createElement('option');
    emptyFilterOption.value = '';
    emptyFilterOption.textContent = 'choose an option';
    filterSelect.appendChild(emptyFilterOption);
    
    // populate the select options with keys (except id)
    const objectKeys = Object.keys(inventoryArray[0]);
    for(let i = 0; i < objectKeys.length - 1; i++) {
        const filterOption = document.createElement('option');
        filterOption.value = objectKeys[i];
        filterOption.textContent = objectKeys[i];
        filterSelect.appendChild(filterOption);
    }
    // TODO add event listener to each select button
    // creates another select option based on the values of the inventory array
    filterSelect.addEventListener('change', function() {
        switch(filterSelect.value) {
            case 'category': {
                const categoryFilterSelect = document.createElement('select');
                // empty option
                const emptyCategoryOption = document.createElement('option');
                emptyCategoryOption.value = '';
                emptyCategoryOption.textContent = 'choose an option';
                categoryFilterSelect.appendChild(emptyCategoryOption);
                for(let i = 0; i < categoryArray.length; i++) {
                    const categoryOption = document.createElement('option');
                    categoryOption.value = categoryArray[i];
                    categoryOption.textContent = categoryArray[i];
                    categoryFilterSelect.appendChild(categoryOption);
                }
                categoryFilterSelect.addEventListener('change', function() {
                    // filter the table
                    const href = 'inventory.html?filter=' + encodeURIComponent(filterSelect.value) + '+' + encodeURIComponent(categoryFilterSelect.value);
                    // set URL
                    window.location = href;
                });

                filterP.appendChild(categoryFilterSelect);
            }
                break;
        
            default:
                console.log('other');
                break;
        }
    });

    // reset button to populate the table with the complete inventory array
    if(window.location.search !== '') {        
        const resetFilterButton = document.createElement('button');
        resetFilterButton.textContent = 'Reset';
        resetFilterButton.addEventListener('click', function() {
            window.location = 'inventory.html';
        });
        filterP.appendChild(resetFilterButton);
    }
    filterP.appendChild(filterSelect);
    filterSection.appendChild(filterP);

}