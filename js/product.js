// récupère l'id du produit sur le quel on a cliqué
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const idProduct = urlParams.get("id");

// ajoute l'id récupéré au bout de l'url
fetch(`http://localhost:3000/api/products/${idProduct}`)
  .then((res) => res.json())
  .then((data) => makeArticle(data))
  .catch((error) => alert(error));

// affiche l'objet sur la page produit
function makeArticle(sofa) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${sofa.imageUrl}">`;
  document.querySelector("#title").textContent = sofa.name;
  document.querySelector("#price").textContent = sofa.price;
  document.querySelector("#description").textContent = sofa.description;

  //  fait une boucle pour parcourir les couleurs et les affiche dans la valeur et dans le texte de la liste déroulante
  for (let color of sofa.colors) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    document.querySelector("#colors").appendChild(option);
  }
}
