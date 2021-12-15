reachDataStorage();

function reachDataStorage() {
  for (let i = 0; i < localStorage.length; ++i) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemParse = JSON.parse(item);
    displayArticle(itemParse);
  }
}

// altImage: "Photo d'un canapé bleu, deux places"
// color: "Blue"
// idProduct: "107fb5b75607497b96722bda5b504926"
// image: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// quantity: 1

// affiche l'objet sur la page d'accueil index.html
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
  const totalItemPrice = sofa.price * sofa.quantity;
  for each
  document.getElementById("totalPrice").textContent += Number(totalItemPrice);
}
