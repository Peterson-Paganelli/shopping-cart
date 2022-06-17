const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {

  it(`Call the func "getSavedCartItem" and test if the "localStorage.getItem" was called`, () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it(`Call the func "getSavedCartItem" and test if the 
  "localStorage.getItem" was called with "cartItems" as parameter`, () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
 });
});
