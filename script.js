const list = document.querySelector('.cart__items');
const rmBtn = document.querySelector('.empty-cart');

const getCartItems = () => {
  const items = document.querySelectorAll('.cart__item');
  return items;
};

const saveToCart = () => {
  const saving = JSON.stringify(list.innerHTML);
  saveCartItems(saving);
};

const total = () => {
  let sum = 0;
  const products = getCartItems();
  products.forEach((element) => {
    const result = element.innerHTML.split('$');
    sum += parseFloat(result[1]);
  });
  document.querySelector('.total-price').innerText = `TOTAL: R$${(Math.round(sum * 100) / 100)
  .toFixed(2)}`; 
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const product = event.target.parentElement;
  product.removeChild(event.target);
  saveToCart();
  total();
};

const createCartItemElement = ({ name, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `${name} | R$ ${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const createItem = async () => {
  const results = await fetchProducts('computador');
  results.forEach((obj) => {
    const item = {
      sku: obj.id,
      name: obj.title,
      image: obj.thumbnail,
      price: obj.price,
    };
    const objs = createProductItemElement(item);
    const page = document.querySelector('.items');
    page.appendChild(objs);
  });
};

const createItemCart = async (event) => {
  let product = event.target.parentElement;
  product = getSkuFromProductItem(product);
  const result = await fetchItem(product);
  const item = {
    sku: result.id,
    name: result.title,
    price: result.price,
  };

  const cart = createCartItemElement(item);
  list.appendChild(cart);
  saveToCart();
  total();
};

const addToCart = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', createItemCart);
  });
};

const addEventToLoadedCart = () => {
  const items = getCartItems();
  items.forEach((obj) => {
    obj.addEventListener('click', cartItemClickListener);
  });
};

const emptyCart = () => {
  const items = getCartItems();
  items.forEach((item) => {
    item.parentElement.removeChild(item);
  });
  saveToCart();
  total();
};

const loading = () => {
  const page = document.querySelector('.items');
  page.appendChild(createCustomElement('h1', 'loading', 'carregando...'));
  return page;
};

const loaded = () => {
  const element = document.querySelector('.loading');
  element.remove();
};

window.onload = async () => {
  loading();
  await createItem();
  await loaded();
  await addToCart();
  list.innerHTML = JSON.parse(getSavedCartItems());
  await addEventToLoadedCart();
  rmBtn.addEventListener('click', emptyCart);
  await total();
};
