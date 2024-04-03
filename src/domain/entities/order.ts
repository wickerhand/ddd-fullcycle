import OrderItem from "./order-item";

export default class Order {
    private id: string;
    private customerId: string;
    private items: OrderItem[];
    private total: number;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this.id = id;
        this.customerId = customerId;
        this.items = items;
        this.total = this.sum();
        this.validate();
    }

    getId(): string {
        return this.id;
    }

    getCustomerId(): string {
        return this.customerId;
    }

    getTotal(): number {
        return this.total;
    }

    getItems(): OrderItem[] {
        return this.items;
    }

    sum(): number {
        return this.items.reduce((acc, item) => acc + item.getPrice() * item.getQuantity(), 0);
    }

    validate() {
        if (!this.id) {
            throw new Error('id is required');
        }

        if (!this.customerId) {
            throw new Error('customerId is required');
        }

        if (!this.items.length) {
            throw new Error('Items are required');
        }

        if (this.items.some(item => item.getQuantity() <= 0)) {
            throw new Error('Items quantity must be greater than 0');
        }
    }
}