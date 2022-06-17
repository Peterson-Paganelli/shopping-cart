const fetchItem = async (item) => {
  try {
    const product = `https://api.mercadolibre.com/items/${item}`;
    const response = await fetch(product);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
