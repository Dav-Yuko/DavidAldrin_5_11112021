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

// AFFICHE L'ITEM GLOBAL
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

// AFFICHE LE CONTENU D'UN ITEM
function setCartItemContent(item) {
  const divItemContent = document.createElement("div");
  divItemContent.classList.add("cart__item__content");
  const itemDescription = setItemDescription(item);
  divItemContent.appendChild(itemDescription);
  const itemSetting = setItemSettings(item);
  divItemContent.appendChild(itemSetting);
  return divItemContent;
}

// INTEGRE LA DESCRIPTION DE L'ITEM
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

// INTEGRE LA DIV SETTING QUANTITE ET SUPPRIME DEL'ITEM
function setItemSettings(item) {
  const itemSetting = document.createElement("div");
  itemSetting.classList.add("cart__item__content__settings");
  const itemQuantity = setItemQuantity(item);
  itemSetting.appendChild(itemQuantity);
  const itemDelete = setItemDelete(item);
  itemSetting.appendChild(itemDelete);
  return itemSetting;
}

// INTEGRE UN INPUT QUANTITE SUR UN ITEM
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

  //ECOUTE INPUT DE LA QUANTITE
  input.addEventListener("change", (event) => {
    updateQuantity(item, event.target.value);
    updateTotal(cart);
  });
  return itemQuantity;
}

//CREE LE BOUTON SUPPRIMER
function setItemDelete(item) {
  const divItemDelete = document.createElement("div");
  divItemDelete.classList.add("cart__item__content__settings__delete");
  const p = document.createElement("p");
  p.classList.add("getItemToDelete");
  p.textContent = "Supprimer";
  divItemDelete.appendChild(p);

  //ECOUTE ACTION SUR SUR DIV SUPPRIMER
  divItemDelete.addEventListener("click", () => {
    getItemToDelete(item);
  });
  return divItemDelete;
}

// IDENTIFIE L'ITEM A SUPPRIMER
function getItemToDelete(item) {
  const itemToDelete = cart.findIndex(
    (product) => product.id === item.idProduct && product.color === item.color
  );
  cart.splice(itemToDelete, 1);
  deleteDataFromCache(item);
  deleteArticleFromCart(item);
  updateTotal(cart);
}

// SUPPRIME L'ARTICLE DU LOCALSTORAE
function deleteDataFromCache(item) {
  const key = `${item.idProduct}/${item.color}`;
  localStorage.removeItem(key);
}

// SUPPRIME L'ARTICLE SU PANIER
function deleteArticleFromCart(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.idProduct}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

// AFFICHE UN ARTICLE
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

// FORMULAIRE
const orderButton = document.querySelector("#order");
orderButton.addEventListener("click", (e) => submitForm(e));

// VERIFIE SI PANIER NON VIDE ET RENVOI VERS UN CHECK INPUT DE CHAQUE CHAMPS DU FORM
function submitForm(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("merci de sélectionner un produit");
    return;
  }
  if (checkInputFirstName()) return;
  if (checkInputLastName()) return;
  if (checkInputAddress()) return;
  if (checkInputCity()) return;
  if (checkInputEmail()) return;
  postOrder();
}

// VERIFIE SI INPUT FIRSTNAME EST NON VIDE ET CORRECT
function checkInputFirstName() {
  const firstName = document.querySelector("#firstName");
  if (firstName.value === "") {
    firstNameErrorMsg.textContent = errorEmptyField;
    return;
  }
  if (stringRegex.test(firstName.value)) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent = errorInputField;
    return true;
  }
}

// VERIFIE SI INPUT LASTNAME EST NON VIDE ET CORRECT
function checkInputLastName() {
  const lastName = document.querySelector("#lastName");
  if (lastName.value === "") {
    lastNameErrorMsg.textContent = errorEmptyField;
    return;
  }
  if (stringRegex.test(lastName.value)) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = errorInputField;
    return true;
  }
}

// VERIFIE SI INPUT ADDRESS EST NON VIDE ET CORRECT
function checkInputAddress() {
  const address = document.querySelector("#address");
  if (address.value === "") {
    addressErrorMsg.textContent = errorEmptyField;
    return;
  }
  if (addressRegex.test(address.value)) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent = errorInputField;
    return true;
  }
}

// VERIFIE SI INPUT CITY EST NON VIDE ET CORRECT
function checkInputCity() {
  const city = document.querySelector("#city");
  if (city.value === "") {
    cityErrorMsg.textContent = errorEmptyField;
    return;
  }
  if (stringRegex.test(city.value)) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = errorInputField;
    return true;
  }
}

// VERIFIE SI INPUT EMAIL EST NON VIDE ET CORRECT
function checkInputEmail() {
  const email = document.querySelector("#email");
  if (email.value === "") {
    emailErrorMsg.textContent = errorEmptyField;
    return true;
  }
  if (emailRegex.test(email.value)) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent = errorInputField;
    return true;
  }
}

//VA CHERCHER LE ID DE CHAQUE ITEMS DANS LE LOCALSTORAGE ET LES PLACE DANS UN ARRAY
const idProducts = [];
for (let i = 0; i < cart.length; i++) {
  idProducts.push(cart[i].idProduct);
}

// ENVOIE LE CONTENU DU PANIER ET LES DATA USER AU BACKEND
function postOrder() {
  const bodyDatasUser = makeRequestBody();
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify(bodyDatasUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const orderId = data.orderId;
      window.location.href = "/html/confirmation.html?orderId=" + orderId;
      return console.log(orderId);
    })
    .catch((err) => console.log(err));
}

// CONSTRUIT L'OBJET CONTACT ET PRODUCTS
function makeRequestBody() {
  const form = document.querySelector(".cart__order__form");
  const firstName = form.elements.firstName.value;
  const lastName = form.elements.lastName.value;
  const address = form.elements.address.value;
  const city = form.elements.city.value;
  const email = form.elements.email.value;

  const bodyDatasUser = {
    contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
    products: idProducts,
  };
  return bodyDatasUser;
}

// REGEX POUR CONTROLE LES INPUTS FORMULAIRE ET MESSAGES ERROR
const emailRegex = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;
const stringRegex = /^[a-zA-Z,.'-]+$/;
const addressRegex = /^[0-9]{1,3}(?:(?:[,. ]){1,2}[-a-zA-Zàâäéèêëïîôöùûüç]+)+$/;
const errorEmptyField = "Merci de renseigner ce champ";
const errorInputField = "Ce champ contient une erreur";
