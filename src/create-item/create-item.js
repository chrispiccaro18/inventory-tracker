const formSection = document.getElementById('form-section');

// create form
const formElement = document.createElement('form');

// create p and item name input
const itemNameP = document.createElement('p');
itemNameP.textContent = 'Item Name: ';
const nameInputElement = document.createElement('input');
nameInputElement.type = 'text';
nameInputElement.name = 'item-name';

// append item name input to p
itemNameP.appendChild(nameInputElement);

// append p to form
formElement.appendChild(itemNameP);

// create p and item category select
const categoryP = document.createElement('p');
categoryP.textContent = 'Item Category: ';
const categorySelectElement = document.createElement('select');
categorySelectElement.name = 'item-category';

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

// create p and submit button
const submitP = document.createElement('p');
const submitButton = document.createElement('input');
submitButton.type = 'submit';
submitButton.value = 'Create';
// event listener
submitButton.addEventListener('click', function(event) {
    //prevent reloading page
    event.preventDefault();

    

    // const newItem {
    //     name: 
    // };
});

// append button to p
submitP.appendChild(submitButton);

// append p to form
formElement.appendChild(submitP);

// append form into section
formSection.appendChild(formElement);