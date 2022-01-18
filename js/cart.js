// altImage: "Photo d'un canapé bleu, deux places"
// color: "Blue"
// idProduct: "107fb5b75607497b96722bda5b504926"
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// quantity: 1

const cart = [];
getCartFromCache();
// cart.forEach((item) => displayItem(item));

// RECUPERE LES OBJETS DU DATA STORAGE VIA UNE BOUCLE ET APPELLE LA FONCTION POUR LES AFFICHER
function getCartFromCache() {
  for (let i = 0; i < localStorage.length; ++i) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemParse = JSON.parse(item);
    cart.push(itemParse);
    displayItem(itemParse);
  }
}

function displayItem(item) {
  const article = setArticle(item);
  displayArticle(article);
  const divImage = setImage(item);
  article.appendChild(divImage);
  const cartItemContent = setCartItemContent(item);
  article.appendChild(cartItemContent);
}
// CONSTRUIT L'ARTICLE
function setArticle(item) {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.idProduct;
  article.dataset.color = item.color;
  return article;
}
// CONSTRUIT L'IMAGE
function setImage(item) {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");

  const image = document.createElement("img");
  image.src = item.imageUrl;
  image.alt = item.altImage;
  divImage.appendChild(image);
  return divImage;
}

function setCartItemContent(item) {
  const divItemContent = document.createElement("div");
  divItemContent.classList.add("cart__item__content");
  const itemDescription = setItemDescription(item);
  divItemContent.appendChild(itemDescription);
  const itemSetting = setItemSettings(item);
  divItemContent.appendChild(itemSetting);
  return divItemContent;
}

function setItemDescription(item) {
  const itemDescription = document.createElement("div");
  itemDescription.classList.add("cart__item__content__description");
  const nameItem = document.createElement("h2");
  nameItem.textContent = item.name;
  itemDescription.appendChild(nameItem);
  const p = document.createElement("p");
  p.textContent = item.color;
  itemDescription.appendChild(p);
  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";
  itemDescription.appendChild(p2);
  return itemDescription;
}

function setItemSettings(item) {
  const itemSetting = document.createElement("div");
  itemSetting.classList.add("cart__item__content__settings");
  const itemQuantity = setItemQuantity(item);
  itemSetting.appendChild(itemQuantity);
  const itemDelete = setItemDelete(item);
  itemSetting.appendChild(itemDelete);

  return itemSetting;
}

function setItemQuantity(item) {
  const itemQuantity = document.createElement("div");
  itemQuantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  itemQuantity.appendChild(p);
  const input = document.createElement("input");
  input.type = "number";
  input.classList.add("itemQuantity");
  input.name = "itemQuantity";
  input.min = "1";
  input.max = "100";
  input.value = item.quantity;
  itemQuantity.appendChild(input);

  //LISTENER SUR INPUT DE LA QUANTITE
  input.addEventListener("change", (event) => {
    updateQuantity(item, event.target.value);
    updateTotal(cart);
  });
  return itemQuantity;
}

function setItemDelete(item) {
  const divItemDelete = document.createElement("div");
  divItemDelete.classList.add("cart__item__content__settings__delete");
  const p = document.createElement("p");
  p.classList.add("deleteItem");
  p.textContent = "Supprimer";
  divItemDelete.appendChild(p);

  //LISTENER SUR DIV SUPPRIMER
  divItemDelete.addEventListener("click", () => {
    deleteItem(item);
  });
  return divItemDelete;
}
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.idProduct && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  deleteDataFromCache(item);
  deleteArticleFromCart(item);
  updateTotal(cart);
}
function deleteDataFromCache(item) {
  const key = `${item.idProduct}${item.color}`;
  localStorage.removeItem(key);
}

function deleteArticleFromCart(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.idProduct}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

function displayArticle(article) {
  document.querySelector("#cart__items").appendChild(article);
}
updateTotal(cart);

function updateTotal(cart) {
  updateTotalQuantity(cart); //APELLE LA FONCTION POUR CALCULER LA QUANTITE TOTALE PANIER
  updateTotalPrice(cart); //APELLE LA FONCTION POUR CALCULER LE PRIX TOTAL PANIER
}

// CALCULE ET AFFICHE LA QUANTITE TOTALE DANS LE PANIER
function updateTotalQuantity(cart) {
  const totalQuantity = cart.reduce(
    (total, current) => total + current.quantity,
    0
  );
  document.querySelector("#totalQuantity").textContent = totalQuantity;
}

// PASSE LA NOUVELLE VALEUR QUANTITE SUR LE PANIER
function updateQuantity(item, quantity) {
  item.quantity = Number(quantity);
}

// CALCULE LE PRIX TOTAL PAR TYPE D'ARTICLE PUIS ADDITIONNE ET AFFICHE LE PRIX TOTAL DU PANIER
function updateTotalPrice(cart) {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPriceByArticle = item.price * item.quantity;
    totalPrice += totalPriceByArticle;
  });
  document.querySelector("#totalPrice").textContent =
    mapPriceToString(totalPrice);
}
// AJOUTE UN SEPARATEUR "DOT" MILLIER
function mapPriceToString(str) {
  return str.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    style: "currency",
    currency: "EUR",
  });
}

// CACHE LE FORMULAIRE SI PANIER VIDE
const hideForm = () => {
  if (cart.length == 0) {
    document.querySelector(".cart__order").style.visibility = "hidden";
  }
};
hideForm();
