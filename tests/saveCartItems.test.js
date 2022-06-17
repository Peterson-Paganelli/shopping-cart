const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {

  it(`test if the func "saveCartItems" with the "<ol><li>Item</li></ol>" argument, 
  the method localStorage.setItem was called`, () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it(`test if the func "saveCartItems" with the "<ol><li>Item</li></ol>" argument,
  the method localStorage.setItem is called with two parameters, the first being "cartItems" and the
  second being the value passed as an argument to saveCartItems`, () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });
});
