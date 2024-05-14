const getStoredItem = (cart) => {
    const valueFromStorage = localStorage.getItem(cart);
    if(valueFromStorage) {
        return JSON.parse(valueFromStorage);
    }
    return [];
}

const saveItemsToStorage = (cart, id) => {
    const valueFromStorage = getStoredItem(cart);
    const exit = valueFromStorage.find(bookId=> bookId === id);
    if(!exit) {
        valueFromStorage.push(id);
        localStorage.setItem(cart, JSON.stringify(valueFromStorage));
        return true;
    }
    return
}

const removeFromStorage = (cart, id) => {
    const valueFromStorage = getStoredItem(cart);
    const updatedStorage = valueFromStorage.filter(itemId => itemId !== id);
    localStorage.setItem(cart, JSON.stringify(updatedStorage));
}

export {getStoredItem, saveItemsToStorage, removeFromStorage}