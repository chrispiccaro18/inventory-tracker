const header = document.getElementById('header');

let inventoryArray = [];
const jsonArray = window.localStorage.getItem('inventory');
if(jsonArray) {
    inventoryArray = JSON.parse(jsonArray);
    const lastIndex = inventoryArray.length - 1;
    
    const addMessage = document.createElement('p');
    if(inventoryArray[lastIndex].amount > 1) {
        addMessage.textContent = `${inventoryArray[lastIndex].name} x ${inventoryArray[lastIndex].amount} added to inventory.`;
    } else {        
        addMessage.textContent = `${inventoryArray[lastIndex].name} added to inventory.`;
    }
    header.appendChild(addMessage);
} else {
    const errorMessageP = document.createElement('p');
    errorMessageP.textContent = 'Ooops, looks like it didn\'t make it';
    header.appendChild(errorMessageP);
}
