
class ProductsCache {
    products = [];
    constructor(products = []) {
        this.products = products;
    }
    add(product) {
        this.products.push(product);
    }
    clear() {
        this.products = [];
    }
}

class Product {
    id;
    title;
    price;
    description;
    image;
    category;
    constructor(id, title, price, description, image, category) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
        this.image = image;
        this.category = category;
    }
}

module.exports = { Product, ProductsCache };