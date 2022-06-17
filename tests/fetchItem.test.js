require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  
  it('Test if fetchItem is a function', () => {
    const entry = typeof fetchItem;
    expect(entry).toBe('function');
  });

  it(`Call the function fetchItem with the item "MLB1615760527" 
  and test if the fetch was called`, async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });

  it(`test if the fetchItem with the "MLB1615760527" argument, 
  the fetch uses an endpoint from MELI`, async () => {
    const result = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem('MLB1615760527');
    await expect(fetch).toHaveBeenCalledWith(result);
  });

  it(`test if the func fetchItem with the "MLB1615760527" argument is a 
  structure equals to the object item`, async () => {
    const entry = await fetchItem('MLB1615760527');
    await expect(entry).toEqual(item);
  })

  it(`expect the func fetchItem without arguments to return an Error`, async () => {
    expect(await fetchItem()).toEqual(Error('You must provide an url'));
  })
});
