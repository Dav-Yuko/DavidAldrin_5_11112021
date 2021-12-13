// récupère l'id du produit sur le quel on a cliqué
const urlParams = new URL(document.location).searchParams;
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
  ).innerHTML = `<img src="${sofa.imageUrl}" alt="${sofa.altTxt}">`;
  document.querySelector("#title").textContent = sofa.name;
  document.querySelector("#price").textContent = sofa.price;
  document.querySelector("#description").textContent = sofa.description;
  document.getElementById("quantity").setAttribute("value", 1);

  // on s'assure qu'une valeur est entrée
  if (sofa.colors != null && sofa.colors.length > 0) {
    const defaultColor = document.querySelector(
      "#colors > option:nth-child(1)"
    );
    defaultColor.remove();
  }
  //  fait une boucle pour parcourir les couleurs et les affiche dans la valeur et dans le texte de la liste déroulante
  for (let color of sofa.colors) {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    document.querySelector("#colors").appendChild(option);
  }

  // save le panier dans localstorage
  const button = document.querySelector("#addToCart");
  button.addEventListener("click", () => {
    const color = document.querySelector("#colors")?.value;
    const quantity = Number(document.querySelector("#quantity")?.value);
    const price = Number(document.querySelector("#price")?.textContent);
    const key = `${idProduct}${color}`;
    const image = sofa.imageUrl;
    const altImage = sofa.altTxt;
    const payLoad = {
      idProduct,
      color,
      price,
      quantity,
      image,
      altImage,
    };

    localStorage.setItem(key, JSON.stringify(payLoad));
  });
}
