const productGrid = document.getElementById("productGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let products = [];
let cart = [];

fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    products = data;
    showProducts();
  });
function showProducts() {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}">
      <h4>${product.title}</h4>
      <p> $ ${product.price} </p>
      <button onclick= "addToCart(${product.id})">Add to Cart</button>

      `;
    productGrid.appendChild(card);
  }
}

// add to cart

function addToCart(id) {
  let selectedProduct = null;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      selectedProduct = products[i];
    }
  }
  cart.push(selectedProduct);
  updateCart();
  cartDrawer.classList.add("active");
}
// updaate cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    total = total + item.price;
    let div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
       <img src="${item.image}" class="cart-img">
       <div class="cart-data">
          <p>${item.title}</p>
          <span>$ ${item.price}</span>
       </div>
       `;

    cartItems.appendChild(div);
  }
  cartCount.innerText = cart.length;
  cartTotal.innerText = total.toFixed(2);
}

document.getElementById("cartBtn").onclick = function () {
  cartDrawer.classList.add("active");
};
document.getElementById("close-cart-btn").onclick = function () {
  cartDrawer.classList.remove("active");
};
