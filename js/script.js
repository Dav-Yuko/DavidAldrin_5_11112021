//  récupère les données du catalogue sur url API
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => displayProducts(data))
  .catch((error) => alert(error));

//  construit un objet à partir des éléments récupérés dans le tableau
function displayProducts(data) {
  for (let element of data) {
    makeArticles(element);
  }
}
// affiche l'objet sur la page d'accueil index.html
function makeArticles(sofa) {
  const article = `
    <a href="./product.html?id=${sofa._id}">
        <article>
        <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
        <h3 class="productName">${sofa.name}</h3>
        <p class="productDescription">${sofa.description}</p>
        </article>
    </a>`;
  document.getElementById("items").innerHTML += article;
}
// altTxt: "Photo d'un canapé bleu, deux places"
// colors: (3) ['Blue', 'White', 'Black']
// description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// _id: "107fb5b75607497b96722bda5b504926"
