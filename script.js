async function getData() {
    const res = await fetch('data.json');
    const data = await res.json();
    return data;
}

const productContainer = document.querySelector('.products-container');

async function logData() {
    const data = await getData();

    data.forEach(item => {
        productContainer.innerHTML += `<div class="product-card">
            <div class='img-wrapper'>
                <img src='${item.image.desktop}' alt='${item.name}'>
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
            <div class="product-info">
                <p class="category">${item.category}</p>
                <p class="product-name">${item.name}</p>
                <p class="price">${item.price}</p>
            </div>
        </div>`;

        console.log(item)
    })

    //console.log(data.length)
}

logData()