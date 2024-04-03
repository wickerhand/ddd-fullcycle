import Product from "./product";

describe('Product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => new Product('', 'Product 1', 100)).toThrowError('id is required');
    });

    it('should throw error when name is empty', () => {
        expect(() => new Product('id', '', 100)).toThrowError('name is required');
    });

    it('should throw error when price is empty', () => {
        expect(() => new Product('id', 'Product 1', 0)).toThrowError('price is required');
    });

    it('should change price', () => {
        const product = new Product('id', 'Product 1', 100);
        product.changePrice(200);
        expect(product.getPrice()).toBe(200);
    });

    it('should change name', () => {
        const product = new Product('id', 'Product 1', 100);
        product.changeName('Product 2');
        expect(product.getName()).toBe('Product 2');
    });
});