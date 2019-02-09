import createTable from '../functions/create-table.js';

const filterSection = document.getElementById('filter-section');
const tableSection = document.getElementById('table-section');

let inventoryArray = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventoryArray = JSON.parse(jsonArray);
    
    const filterP = document.createElement('p');
    filterP.textContent = 'Filter by: ';
    const filterSelect = document.createElement('select');
    filterSelect.name = 'filterBy';
            
    const objectKeys = Object.keys(inventoryArray[0]);
    for(let i = 0; i < objectKeys.length - 1; i++) {
        const filterOption = document.createElement('option');
        filterOption.value = objectKeys[i];
        filterOption.textContent = objectKeys[i];
        filterSelect.appendChild(filterOption);
    }

    filterSelect.addEventListener('change', function() {
        switch(filterSelect.value) {
            case 'category': {
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
                console.log(categoryArray);
            }
                break;
        
            default:
                console.log('other');
                break;
        }
    });

    filterP.appendChild(filterSelect);
    filterSection.appendChild(filterP);
}

createTable(tableSection, inventoryArray);