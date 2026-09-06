async function getProducts() {
  const res = await fetch("data.json");
  return res.json();
}

function renderProductCard(item, index) {
  return `
        <div class="product-card">
            <div class="img-wrapper">
                <img src="${item.image.desktop}" alt="${item.name}" class="product-img">
                <button class="add-to-cart-btn" aria-controls='product-info-${index}'>
                    <img src='./assets/images/icon-add-to-cart.svg' alt='add to cart button'>
                    Add to Cart
                </button>
            </div>
            <div class="product-info" id='product-info-${index}'>
                <p class="category">${item.category}</p>
                <p class="product-name">${item.name}</p>
                <p class="price">$ ${Number(item.price).toFixed(2)}</p>
            </div>
        </div>`;
}

function getActiveButtonHTML(quantity) {
  return `
        <svg class="icons decrement" xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2">
        <path d="M0 .375h10v1.25H0V.375Z"/></svg>
        <span class="quantity">${quantity}</span>
        <svg class="icons increment" xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10">
        <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>`;
}

function getDefaultButtonHTML() {
  return `
        <img src='./assets/images/icon-add-to-cart.svg' alt='add to cart button'>
        Add to Cart`;
}

function handleCartInteractions(e) {
  const currentBtn = e.target.closest(".add-to-cart-btn");
  if (!currentBtn) return;

  const productCard = currentBtn.closest(".product-card");

  if (!currentBtn.classList.contains("active")) {
    let quantity = 1;
    productCard.classList.add("selected");
    currentBtn.classList.add("active");
    currentBtn.innerHTML = getActiveButtonHTML(quantity);
    return;
  }

  const quantityEl = currentBtn.querySelector(".quantity");
  let quantity = parseInt(quantityEl.textContent, 10);

  if (e.target.closest(".increment")) {
    quantity++;
    quantityEl.textContent = quantity;
  } else if (e.target.closest(".decrement")) {
    quantity--;
    if (quantity <= 0) {
      currentBtn.classList.remove("active");
      productCard.classList.remove("selected");
      currentBtn.innerHTML = getDefaultButtonHTML();
    } else {
      quantityEl.textContent = quantity;
    }
  }
}

async function initApp() {
  try {
    const productsList = document.querySelector(".products-list");
    const data = await getProducts();

    productsList.innerHTML = data.map(renderProductCard).join("");

    productsList.addEventListener("click", handleCartInteractions);
  } catch (error) {
    console.error("Failed to load products", error);
  }
}

initApp();
