import Product from "../entities/product";
import ProductService from "./product.service";

describe('OrderService unit tests', () => {
    it('should change the price off all products', () => {
        const product1 = new Product('1', 'Product 1', 100);
        const product2 = new Product('2', 'Product 2', 200);

        const products = [product1, product2];

        ProductService.increasePrice(products, 10);

        expect(product1.getPrice()).toBe(110);
        expect(product2.getPrice()).toBe(220);
    });
});