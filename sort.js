export function sortProducts(products, criteria) {
    return products.sort((a, b) => {
        if (criteria === 'priceLowToHigh') {
            return (a.price * (1 - a.discountPercentage / 100)) - (b.price * (1 - b.discountPercentage / 100));
        } else if (criteria === 'priceHighToLow') {
            return (b.price * (1 - b.discountPercentage / 100)) - (a.price * (1 - b.discountPercentage / 100));
        } else if (criteria === 'ratingHighToLow') {
            return b.rating - a.rating;
        }
    });
}
