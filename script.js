// Fetch Product Data 
async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=15")
    const data = await response.json()
    return data.products
}

// // Fetch search results
async function searchProducts(query) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    // console.log(data)
    return data.products;
}

// Fetch product categories from the API
async function fetchCategories() {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    // console.log(data)
    return data;
}

// API URL - 2: https://dummyjson.com/products/category/smartphones
// Fetch products by category from the API
async function fetchProductsByCategory(category) {
    // console.log(category.name)
    const response = await fetch(`https://dummyjson.com/products/category/${category.name}`);
    const data = await response.json();
    // console.log(data.products)
    return data.products;
}

// create Product Card

function createProductCard(product) {

    // console.log(product)

    const productContainer = document.querySelector("#productContainer")
    // console.log(product.price)
    productContainer.innerHTML = ''
    product.forEach(product => {

        const price = product.price;
        const discountPercentage = product.discountPercentage;

        const priceAfterDiscount = (price - (price * (discountPercentage / 100))).toFixed(2)

        // console.log(priceAfterDiscount)


        const productCard = document.createElement("div")
        productCard.className = "col-lg-3 col-md-6 col-sm-12 mt-3 product-card "
        productCard.innerHTML = `   
                
                    <div class="card text-center style=" width: 18rem;">
                    
                        <div class="card-body">
                        <img style="height: 200px; width: 200px;" src="${product.images}"
                                 height="200" width:"200" alt="${product.title}">
                            <h5 class="card-title product-title "> ${product.title}</h5>
                            <p class="card-text text-success product-price">Price: $${priceAfterDiscount}</p>
                        </div>
                        <div>
                            <img src="${product.thumbnail}"
                                width="50" height="50" alt="">
                        </div>
                        <p class="card-text text-warning fw-bold product-rating">Rating: ${product.rating}</p>

                        <button class="btn btn-secondary show" id="show">Show Description</button>
                        <div class="container product-description" id = "product-description">
                            <div class="row">
                                <div class="col">
                                    <p class="text-truncate text-muted">${product.description}</p>
                                       <span role="button" class="btn btn-outline-secondary less" id="less">Show Less..</span>
                                </div>
                             
                            </div>
                        </div>
                    </div>
            
         
    `

        productContainer.appendChild(productCard)

        // show/less description
        const cards = document.querySelectorAll('.product-card');

        //loop over and  get all Cards
        cards.forEach((card) => {
            const showButton = card.querySelector(".show")
            const lessButton = card.querySelector(".less")
            const productDescription = card.querySelector('.product-description')

            // console.log(cards)
            showButton.addEventListener('click', () => {
                productDescription.style.display = 'block';
            })

            lessButton.addEventListener('click', () => {
                productDescription.style.display = 'none';
            })


        })


    });

}


// render Products
async function render(product) {
    createProductCard(product)
}

// Sort products by criteria
function sortProducts(products, criteria) {
    return products.sort((a, b) => {
        if (criteria === 'priceLowToHigh') {
            return (a.price * (1 - a.discountPercentage / 100)) - (b.price * (1 - b.discountPercentage / 100));
        } else if (criteria === 'priceHighToLow') {
            return (b.price * (1 - b.discountPercentage / 100)) - (a.price * (1 - a.discountPercentage / 100));
        } else if (criteria === 'ratingHighToLow') {
            return b.rating - a.rating;
        }
    });
}


// Render categories as radio buttons
function renderCategories(categories) {
    const container = document.querySelector('#categoriesContainer');
    categoriesContainer.innerHTML = '';
    categories.forEach(category => {

        const label = document.createElement('label');
        label.textContent = category.name;
        label.classList.add("radioLabel")

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'category';

        radio.value = category.name;
        radio.addEventListener('change', async () => {
            const products = await fetchProductsByCategory(category);
            render(products);
        });

        label.appendChild(radio);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

// Main function to initialize the app
async function init() {
    const products = await fetchProducts();
    const categories = await fetchCategories();
    // console.log(categories)

    // Initial render
    render(products);
    renderCategories(categories)

    // Add event listeners for sorting buttons
    document.getElementById('sortPriceLowToHigh').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'priceLowToHigh');
        render(sortedProducts);
    });


    document.getElementById('sortPriceHighToLow').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'priceHighToLow');
        render(sortedProducts);
    });

    document.getElementById('sortRatingHighToLow').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'ratingHighToLow');
        render(sortedProducts);
    });

    // Add event listener for the search button
    document.getElementById('search').addEventListener('click', async () => {
        const query = document.getElementById('searchInput').value;
        console.log(query)
        const filteredProducts = await searchProducts(query);
        render(filteredProducts);
    });


    // Add event listener for the clear search button
    document.getElementById('clearSearchButton').addEventListener('click', () => {
        // currentProducts = products;
        document.getElementById('searchInput').value = '';
        render(products);
    });

    // Add event listener for the clear categories button
    document.getElementById('clearCategoriesButton').addEventListener('click', () => {
        const radios = document.getElementsByName('category');
        radios.forEach(radio => radio.checked = false);
        render(products);
    });
}

// initilize the app
init()


