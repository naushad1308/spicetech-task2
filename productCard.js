export function createProductCard(products) {
    const productContainer = document.querySelector("#productContainer");
    productContainer.innerHTML = '';

    products.forEach(product => {
        const price = product.price;
        const discountPercentage = product.discountPercentage;
        const priceAfterDiscount = (price - (price * (discountPercentage / 100))).toFixed(2);

        const productCard = document.createElement("div");
        productCard.className = "col-lg-4 col-md-6 col-sm-12 mt-3 product-card d-flex justify-content-center";
        productCard.innerHTML = `
            <div class="card text-center" style="width: 18rem;">
                <div class="card-body">
                    <img style="height: 200px; width: 200px;" src="${product.images}" alt="${product.title}">
                    <h5 class="card-title product-title">${product.title}</h5>
                    <p class="card-text text-muted product-price"><del>Rs. ${product.price}</del></p>
                    <p class="card-text text-dark product-price"><strong>Rs. ${priceAfterDiscount}</strong></p>
                    <p class="card-text text-white product-discount"><span class="bg-danger px-3 py-1 text-white rounded">Save ${discountPercentage}%</span></p>
                </div>
                <div>
                    <img src="${product.thumbnail}" width="50" height="50" alt="">
                </div>
                <p class="card-text text-warning fw-bold product-rating">Rating: ${product.rating}</p>
                <button class="btn btn-secondary show" id="show">Show Description</button>
                <div class="container product-description" id="product-description">
                    <div class="row">
                        <div class="col">
                            <p class="text-truncate text-muted">${product.description}</p>
                            <span role="button" class="btn btn-outline-secondary less" id="less">Show Less</span>
                        </div>
                    </div>
                </div>
                <button class="btn btn-primary mt-2">Add to Cart</button>
            </div>
        `;

        productContainer.appendChild(productCard);
        setupDescriptionToggle(productCard);
    });
}

function setupDescriptionToggle(card) {
    const showButton = card.querySelector(".show");
    const lessButton = card.querySelector(".less");
    const productDescription = card.querySelector('.product-description');

    showButton.addEventListener('click', () => {
        productDescription.style.display = 'block';
    });

    lessButton.addEventListener('click', () => {
        productDescription.style.display = 'none';
    });
}
