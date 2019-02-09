function createUniqueMsg(itemObj) {
    let unique = '';
    if(itemObj.amount > 1) {
        unique = 'are';
    } else {
        unique = 'is';
    }
    if(itemObj.unique === 'no') {
        unique += ' not';        
    }
    return unique;
}

export default createUniqueMsg;