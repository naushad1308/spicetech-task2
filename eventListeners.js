import { sortProducts } from './sort.js';
import { createProductCard } from './productCard.js';
import { searchProducts } from './api.js';

export function setupEventListeners(products) {
    document.getElementById('sortPriceLowToHigh').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'priceLowToHigh');
        createProductCard(sortedProducts);
    });

    document.getElementById('sortPriceHighToLow').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'priceHighToLow');
        createProductCard(sortedProducts);
    });

    document.getElementById('sortRatingHighToLow').addEventListener('click', () => {
        const sortedProducts = sortProducts(products, 'ratingHighToLow');
        createProductCard(sortedProducts);
    });

    document.getElementById('search').addEventListener('click', async () => {
        const query = document.getElementById('searchInput').value;
        const filteredProducts = await searchProducts(query);
        createProductCard(filteredProducts);
    });

    document.getElementById('clearSearchButton').addEventListener('click', () => {
        document.getElementById('searchInput').value = '';
        createProductCard(products);
    });

    document.getElementById('clearCategoriesButton').addEventListener('click', () => {
        const radios = document.getElementsByName('category');
        radios.forEach(radio => radio.checked = false);
        createProductCard(products);
    });
}



