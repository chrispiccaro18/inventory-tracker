function createTable(section, array) {
    // empty array
    if(array.length === 0) {
        const emptyInventoyP = document.createElement('p');
        emptyInventoyP.textContent = 'Inventory Empty';
        section.appendChild(emptyInventoyP);
        return;
    }

    const tableElement = document.createElement('table');
    const tableHeaderElement = document.createElement('thead');
    const tableBodyElement = document.createElement('tbody');

    // heading row
    const headerRowElement = document.createElement('tr');
    const inventoryKeys = Object.keys(array[0]);
    
    // make headers for all except id (last index)
    for(let i = 0; i < inventoryKeys.length - 1; i++) {
        const headerCellElement = document.createElement('th');
        headerCellElement.textContent = inventoryKeys[i];
        headerRowElement.appendChild(headerCellElement);
    }
    tableHeaderElement.appendChild(headerRowElement);
    tableElement.appendChild(tableHeaderElement);

    // inventory item rows
    for(let i = 0; i < array.length; i++) {
        const itemRowElement = document.createElement('tr');
        // don't want to list out id
        for(let j = 0; j < inventoryKeys.length - 1; j++) {            
            const itemCellElement = document.createElement('td');
            itemCellElement.textContent = array[i][inventoryKeys[j]];
            itemRowElement.appendChild(itemCellElement);
        }
        tableBodyElement.appendChild(itemRowElement);
    }
    tableElement.appendChild(tableBodyElement);

    section.appendChild(tableElement);

    return tableElement;
}

export default createTable;