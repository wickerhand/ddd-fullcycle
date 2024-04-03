import Order from "./order";
import Orderitem from "./order-item";

describe('Order unit tests', () => {
    const orderItem = new Orderitem('id', '1234', 'Product 1',100, 10);
    it('should return total of order', () => {
        const order = new Order('id', 'customerId', [orderItem]);
        
        expect(order.getTotal()).toBe(1000);

        const orderItem2 = new Orderitem('id', '1234', 'Product 2',100, 2);
        const order2 = new Order('id', 'customerId', [orderItem, orderItem2]);

        expect(order2.getTotal()).toBe(1200);
    });

    it('should return items of order', () => {
        const order = new Order('id', 'customerId', [orderItem]);
        expect(order.getItems()).toEqual([orderItem]);
    });

    it('should throw error when id is empty', () => {
        expect(() => new Order('', 'customerId', [orderItem])).toThrowError('id is required');
    });
    
    it('should throw error when customerId is empty', () => {
        expect(() => new Order('id', '', [orderItem])).toThrowError('customerId is required');
    });

    it('should throw error when items is empty', () => {
        expect(() => new Order('id', 'customerId', [])).toThrowError('Items are required');
    });

    it('should throw error when items quantity are less than 1', () => {
        const orderItem2 = new Orderitem('id', '1234', 'Product 2',100, 0);
        expect(() => new Order('id', 'customerId', [orderItem2])).toThrowError('Items quantity must be greater than 0');
    });
});