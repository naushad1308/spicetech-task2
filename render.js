import { fetchProductsByCategory } from './api.js';
import { createProductCard } from './productCard.js';

export function renderCategories(categories) {
    // console.log(categories)
    const container = document.querySelector('#categoriesContainer');
    container.innerHTML = '';

    categories.forEach(category => {
        const label = document.createElement('label');
        label.textContent = category.name;
        label.classList.add("radioLabel");

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'category';
        radio.value = category;
        radio.addEventListener('change', async () => {
            const products = await fetchProductsByCategory(category.name);
            // console.log(products)
            createProductCard(products);
        });

        label.appendChild(radio);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}
