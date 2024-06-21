export async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=15");
    const data = await response.json();
    return data.products;
}

export async function searchProducts(query) {
    const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await response.json();
    return data.products;
}

export async function fetchCategories() {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
}

export async function fetchProductsByCategory(categoryName) {
    const response = await fetch(`https://dummyjson.com/products/category/${categoryName}`);
    const data = await response.json();
    return data.products;
}
