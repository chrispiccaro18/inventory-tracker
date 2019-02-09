const headerText = document.getElementById('header-text');
const messageSection = document.getElementById('message');
const formSection = document.getElementById('form-section');

// create form
const formElement = document.createElement('form');

// create p and item name input
const itemNameP = document.createElement('p');
itemNameP.textContent = 'Item Name: ';
const nameInputElement = document.createElement('input');
nameInputElement.type = 'text';
nameInputElement.name = 'itemName';
nameInputElement.required = 'required';

// append item name input to p
itemNameP.appendChild(nameInputElement);

// append p to form
formElement.appendChild(itemNameP);

// create p and item category select
const categoryP = document.createElement('p');
categoryP.textContent = 'Item Category: ';
const categorySelectElement = document.createElement('select');
categorySelectElement.name = 'itemCategory';

// create category options
// append options to category select
const arrayOfOptions = ['food', 'weapon', 'medicine', 'magic', 'miscellaneous'];
for(let i = 0; i < arrayOfOptions.length; i++) {
    const categoryOptionElement = document.createElement('option');
    categoryOptionElement.value = arrayOfOptions[i];
    categoryOptionElement.textContent = arrayOfOptions[i];
    categorySelectElement.appendChild(categoryOptionElement);
}

// append category to p
categoryP.appendChild(categorySelectElement);

// append p to form
formElement.appendChild(categoryP);

// create p and item amount input
const itemAmountP = document.createElement('p');
itemAmountP.textContent = 'Amount: ';
const amountInputElement = document.createElement('input');
amountInputElement.type = 'text';
amountInputElement.value = 1;
amountInputElement.name = 'itemAmount';
amountInputElement.required = 'required';
// append item name input to p
itemAmountP.appendChild(amountInputElement);
// append p to form
formElement.appendChild(itemAmountP);

// create pmsg
const uniqueMessageP = document.createElement('p');
uniqueMessageP.textContent = 'Is this item unique?';
// append pmsg to form
formElement.appendChild(uniqueMessageP);
// create p, labels, and unique radios
const uniqueP = document.createElement('p');
const uniqueRadioYes = document.createElement('input');
uniqueRadioYes.type = 'radio';
uniqueRadioYes.name = 'unique';
uniqueRadioYes.value = 'yes';
const labelForYes = document.createElement('label');
labelForYes.for = 'yes';
labelForYes.textContent = ' Yes ';
const uniqueRadioNo = document.createElement('input');
uniqueRadioNo.type = 'radio';
uniqueRadioNo.name = 'unique';
uniqueRadioNo.value = 'no';
uniqueRadioNo.checked = 'checked';
const labelForNo = document.createElement('label');
labelForNo.for = 'no';
labelForNo.textContent = ' No';
// append labels and radios to p
uniqueP.appendChild(uniqueRadioYes);
uniqueP.appendChild(labelForYes);
uniqueP.appendChild(uniqueRadioNo);
uniqueP.appendChild(labelForNo);
// append p to form
formElement.appendChild(uniqueP);

// create p and submit button
const submitP = document.createElement('p');
const submitButton = document.createElement('input');
submitButton.type = 'submit';
submitButton.value = 'Create';
// append button to p
submitP.appendChild(submitButton);
// append p to form
formElement.appendChild(submitP);

// check for item to edit, change header, and replace the form values
const editItemString = window.sessionStorage.getItem('newItem');
if(editItemString) {
    headerText.textContent = 'Edit Item';

    const editItem = JSON.parse(editItemString);
    formElement.itemName.value = editItem.name;
    formElement.itemCategory.value = editItem.category;
    formElement.itemAmount.value = editItem.amount;
    formElement.unique.value = editItem.unique;

    messageSection.textContent = 'Please edit your item:';
} else {
    headerText.textContent = 'Create Item';
}

// event listener on form
formElement.addEventListener('submit', function(event) {
    //prevent reloading page
    event.preventDefault();

    if(isNaN(formElement.itemAmount.value) || formElement.itemAmount.value < 1 || !(Number.isInteger(parseFloat(formElement.itemAmount.value)))) {        
        const invalidNumber = document.createElement('p');
        invalidNumber.textContent = 'Amount must be an integer greater than 0.';
        formSection.appendChild(invalidNumber);
        return;
    }

    const identificationNumber = Date.now();
    const date = new Date();
    const dateCreated = date.toLocaleDateString('en-US');
    
    const newItem = {
        name: formElement.itemName.value,
        category: formElement.itemCategory.value,
        unique: formElement.unique.value,
        amount: formElement.itemAmount.value,
        dateCreated: dateCreated,
        // *** make sure to keep id as last key/value pair ***
        id: identificationNumber
    };

    const jsonObject = window.sessionStorage.getItem('newItem');
    if(jsonObject) {
        window.sessionStorage.removeItem('newItem');
    }
    
    const stringNewItem = JSON.stringify(newItem);
    window.sessionStorage.setItem('newItem', stringNewItem);
    
    window.location = 'confirm.html';
});

// append form into section
formSection.appendChild(formElement);