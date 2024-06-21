import { fetchProducts, fetchCategories, searchProducts, fetchProductsByCategory } from './api.js';
import { createProductCard } from './productCard.js';
import { renderCategories } from './render.js';
import { sortProducts } from './sort.js';
import { setupEventListeners } from './eventListeners.js';

async function init() {
    const products = await fetchProducts();
    const categories = await fetchCategories();
    // Initial render
    createProductCard(products);
    renderCategories(categories);

    setupEventListeners(products);
}

// Initialize the app
init();
