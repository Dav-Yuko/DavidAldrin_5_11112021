const cart = [];

// RECUPERE LES OBJETS DU DATA STORAGE VIA UNE BOUCLE ET APPELLE LA FONCTION POUR LES AFFICHER
function reachDataStorage() {
  for (let i = 0; i < localStorage.length; ++i) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemParse = JSON.parse(item);
    cart.push(itemParse);
    displayArticle(itemParse);
  }
}
reachDataStorage();

// altImage: "Photo d'un canapé bleu, deux places"
// color: "Blue"
// idProduct: "107fb5b75607497b96722bda5b504926"
// image: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// quantity: 1

// AFFICHE LES OBJETS SUR LA PAGE PANIER
function displayArticle(sofa) {
  const article = `
  <article class="cart__item" data-id=${sofa.idProduct} data-color=${sofa.color}>
    <div class="cart__item__img">
      <img src=${sofa.image} alt="${sofa.altImage}">
    </div>
    <div class="cart__item__content">
     <div class="cart__item__content__description">
        <h2>${sofa.name}</h2>
        <p>${sofa.color}</p>
        <p>${sofa.price}</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${sofa.quantity}>
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
  document.getElementById("cart__items").innerHTML += article;
  makeTotalQuantity(); //APELLE LA FONCTION POUR CALCULER LE PRIX TOTAL PANIER
  makeTotalPrice(); //APELLE A FONCTION POUR CALCULER LES PRIX PANIER

  document
    .querySelector(".itemQuantity")
    .addEventListener("click", () => updateQuantity(sofa.idProduct));
}

// CALCULE ET AFFICHE LA QUANTITE TOTALE DANS LE PANIER
function makeTotalQuantity() {
  let totalQuantity = 0;
  cart.forEach((sofa) => {
    totalQuantity += sofa.quantity;
  });
  document.querySelector("#totalQuantity").textContent = totalQuantity;
}

// PASSE LA NOUVELLE VALEUR QUANTITE SUR LE PANIER
function updateQuantity(idProduct) {
  newQuantity = document.querySelector(".itemQuantity").value;
  console.log(idProduct, newQuantity);
}

// CALCULE LE PRIX TOTAL PAR TYPE D'ARTICLE PUIS ADDITIONNE ET AFFICHE LE PRIX TOTAL DU PANIER
function makeTotalPrice() {
  let totalPrice = 0;
  cart.forEach((sofa) => {
    totalPriceByArticle = sofa.price * sofa.quantity;
    totalPrice += totalPriceByArticle;
  });
  document.querySelector("#totalPrice").textContent =
    totalPrice.toLocaleString("de");
}

// CACHE LE FORMULAIRE SI PANIER VIDE
hideForm = () => {
  if (cart.length == 0) {
    document.querySelector(".cart__order").style.visibility = "hidden";
  }
};
hideForm();
