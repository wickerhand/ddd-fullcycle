import Product from "../entities/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number) {

        products.map(product => {
            const price = product.getPrice();
            product.changePrice(price + (price * percentage / 100));
        });
    }
}