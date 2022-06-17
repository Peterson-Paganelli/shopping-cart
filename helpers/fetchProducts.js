const fetchProducts = async (search) => {
  try {
    const endpoint = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const response = await fetch(endpoint);
    const json = await response.json();
    return json.results;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
