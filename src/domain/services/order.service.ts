import Customer from "../entities/customer";
import Order from "../entities/order";
import OrderItem from "../entities/order-item";

export default class OrderService {
    static calculateTotal(order: Order[]) {
        return order.reduce((acc, order) => acc + order.getTotal(), 0);
    }

    static placeOrder(customer: Customer, orderItems: OrderItem[]) {

        if (!orderItems.length) {
            throw new Error('An order must have at least one item.');
        }
        
        const order = new Order('1', customer.getId(), orderItems);
        customer.addRewardPoints(order.getTotal() / 2);
        return order;
    }
}