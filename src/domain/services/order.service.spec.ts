import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order-item";
import OrderService from "./order.service";

describe('OrderService unit tests', () => {
    it('should get total of all orders', () => {
        const orderItem1 = new OrderItem('i1', '1', 'Product 1', 100, 1);
        const orderItem2 = new OrderItem('i2', '2', 'Product 2', 200, 2);

        const order1 = new Order('1', 'customerId', [orderItem1]);
        const order2 = new Order('2', 'customerId', [orderItem2]);

        const total = OrderService.calculateTotal([order1, order2]);
        expect(total).toBe(500);
    });

    it('should place an order', () => {
        const customer = new Customer('customerId', 'John Doe')
        const orderItem1 = new OrderItem('i1', '1', 'Product 1', 100, 1);
        const orderItem2 = new OrderItem('i2', '2', 'Product 2', 200, 2);

        const order = OrderService.placeOrder(customer, [orderItem1, orderItem2]);

        expect(customer.getRewardPoints()).toBe(250);
        expect(order.getTotal()).toBe(500);
    });

    it('should throw an error when placing an order with no items', () => {
        const customer = new Customer('customerId', 'John Doe')
        expect(() => OrderService.placeOrder(customer, [])).toThrowError('An order must have at least one item.');
    });

});