require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {

  it('Test if it is a function', () => {
    const entry = typeof fetchProducts;
    expect(entry).toBe('function');
  });

  it(`Calls the function fetchProducts with the 
"Computador" argument and test if fetch was called`, async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  })

  it(`test if the fetchProducts with the "computador" argument, 
  the fetch uses an endpoint from MELI`, async () => {
    const result = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    await expect(fetch).toHaveBeenCalledWith(result);
  })

  it(`test if the func fetchProducts with the "computador" argument is a 
  structure equals to the object computadorSearch`, async () => {
    const entry = await fetchProducts('computador');
    await expect(entry).toEqual(computadorSearch.results);
  })

  it(`expect the func fetchProducts without arguments to return an Error`, async () => {
    expect(await fetchProducts()).toEqual(Error('You must provide an url'));
  })
});
