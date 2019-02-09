import createUniqueMsg from '../functions/create-unique-msg.js';

const confirmSection = document.getElementById('confirm');
const confirmMessageP = document.createElement('p');

const jsonObject = window.sessionStorage.getItem('newItem');
if(jsonObject) {
    const newItem = JSON.parse(jsonObject);

    const uniqueMsg = createUniqueMsg(newItem);
    confirmMessageP.textContent = `Please confirm you would like to add ${newItem.name} x ${newItem.amount} that ${uniqueMsg} unique to the ${newItem.category} category.`;
    confirmSection.appendChild(confirmMessageP);

    // CONFIRM: save to localstorage and clear session storage
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
        let inventoryArray = [];
        const jsonArray = window.localStorage.getItem('inventory');
        if(jsonArray) {
            inventoryArray = JSON.parse(jsonArray);
            // check to see if new item is not unique
            if(newItem.unique === 'yes') {
                inventoryArray.push(newItem);
            } else {
                // check in the array to see if there's an object with the same name
                // check to see if they are the same category too
                for(let i = 0; i < inventoryArray.length; i++) {
                    const newItemName = newItem.name.toLowerCase();
                    const arrayItemName = inventoryArray[i].name.toLowerCase();
                    const newItemCategory = newItem.category;
                    const arrayItemCategory = inventoryArray[i].category;
                    // if so, only update the object in the array's amount
                    if(newItemName === arrayItemName && newItemCategory === arrayItemCategory) {
                        console.log('array', typeof inventoryArray[i].amount, 'new', typeof newItem.amount);                        
                        let oldItemAmount = parseInt(inventoryArray[i].amount, 10);
                        const newItemAmount = parseInt(newItem.amount, 10);
                        const updatedItemAmount = oldItemAmount + newItemAmount;
                        inventoryArray[i].amount = updatedItemAmount;
                    } else {
                        inventoryArray.push(newItem);
                    }
                }
            }        
        } else {
            // first item
            inventoryArray.push(newItem);
        }

        const stringInventoryArray = JSON.stringify(inventoryArray);
        window.localStorage.setItem('inventory', stringInventoryArray);

        window.sessionStorage.removeItem('newItem');

        window.location = 'index.html';
    });
    
    // EDIT: use session storage to repopulate create-item page
    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Edit';
    goBackButton.addEventListener('click', function() {
        window.location = 'create-item.html';
    });

    confirmSection.appendChild(confirmButton);
    confirmSection.appendChild(goBackButton);
} else {
    confirmMessageP.textContent = 'Ooops! Something went wrong';
}