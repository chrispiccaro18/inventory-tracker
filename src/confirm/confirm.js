const confirmSection = document.getElementById('confirm');
const confirmMessageP = document.createElement('p');

const jsonObject = window.sessionStorage.getItem('newItem');
if(jsonObject) {
    const newItem = JSON.parse(jsonObject);

    let unique = '';
    if(newItem.amount > 1) {
        unique = 'are';
    } else {
        unique = 'is';
    }
    if(newItem.unique === 'no') {
        unique += ' not';
    }
    confirmMessageP.textContent = `Please confirm you would like to add ${newItem.name} x ${newItem.amount} that ${unique} unique.`;
    confirmSection.appendChild(confirmMessageP);

    // CONFIRM: save to localstorage and clear session storage
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.addEventListener('click', function() {
        let inventoryArray = [];
        const jsonArray = window.localStorage.getItem('inventory');
        if(jsonArray) {
            inventoryArray = JSON.parse(jsonArray);
        }
        inventoryArray.push(newItem);

        const stringInventoryArray = JSON.stringify(inventoryArray);
        window.localStorage.setItem('inventory', stringInventoryArray);

        window.sessionStorage.removeItem('newItem');

        window.location = 'index.html';
    });
    
    // GO BACK: use session storage to repopulate create-item page
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