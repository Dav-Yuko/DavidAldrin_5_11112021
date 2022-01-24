const orderId = getOrderId();
displayOrderId(orderId);
console.log(orderId);

// RECUPERE L'ID DE LA PAGE CART.JS
function getOrderId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("orderId");
}

// AFFICHE L'ID DANS SPAN CONFIRMATION.JS
function displayOrderId(orderId) {
  document.getElementById("orderId").textContent = orderId;
  localStorage.clear();
}
