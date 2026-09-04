async function getData() {
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

const productsList = document.querySelector('.products-list');


async function logData() {
    const data = await getData();

    const cardsHTML = data.map((item, index) => `
        <div class="product-card">
            <div class='img-wrapper'>
                <img src='${item.image.desktop}' alt='${item.name}'>
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
        </div>`
    ).join('');

    productsList.innerHTML = cardsHTML;

    const addToCartBtn = document.querySelectorAll('.add-to-cart-btn');

    addToCartBtn.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('aria-controls');
            const infoContainer = document.getElementById(targetId);
            const name = infoContainer.querySelector('.product-name').textContent;
            const price = infoContainer.querySelector('.price').textContent;

            console.log({name, price});
        })
    })
}

logData()




