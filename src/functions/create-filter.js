import createTable from './create-table.js';

function createFilter(section, array, table) {
    // initiate array with first item's category
    const categoryArray = [array[0].category];
    for(let i = 0; i < array.length; i++) {
        const category = array[i].category;                    
        for(let j = 0; j < categoryArray.length; j++) {
            // if it is in the categoryArray, don't add it
            if(category === categoryArray[j]) {
                break;
            }
            categoryArray.push(category);
        }
    }
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get('filter');
    if(search !== null) {
        table.remove();

        const toFindArray = searchParams.get('filter').split(' ');
        
        // create new item array using toFindArray
        // toFindArray[0] = category, toFindArray[1] = food
        const filteredArray = [];
        for(let i = 0; i < array.length; i++) {
            if(array[i][toFindArray[0]] === toFindArray[1]) {
                filteredArray.push(array[i]);
            }
        }    
        createTable(section, filteredArray);
    }
    
    const filterP = document.createElement('p');
    filterP.textContent = 'Filter by: ';
    const filterSelect = document.createElement('select');
    filterSelect.name = 'filterBy';

    // empty option
    const emptyFilterOption = document.createElement('option');
    emptyFilterOption.value = '';
    emptyFilterOption.textContent = 'choose an option';
    filterSelect.appendChild(emptyFilterOption);
            
    const objectKeys = Object.keys(array[0]);
    for(let i = 0; i < objectKeys.length - 1; i++) {
        const filterOption = document.createElement('option');
        filterOption.value = objectKeys[i];
        filterOption.textContent = objectKeys[i];
        filterSelect.appendChild(filterOption);
    }

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

    if(window.location.search !== '') {        
        const resetFilterButton = document.createElement('button');
        resetFilterButton.textContent = 'Reset';
        resetFilterButton.addEventListener('click', function() {
            window.location = 'inventory.html';
        });
        filterP.appendChild(resetFilterButton);
    }
    filterP.appendChild(filterSelect);
    section.appendChild(filterP);
}

export default createFilter;