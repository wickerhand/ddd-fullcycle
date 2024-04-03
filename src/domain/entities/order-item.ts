export default class OrderItem {
    private id: string;
    private productId: string;
    private name: string;
    private price: number;
    private quantity: number;
    //private total: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        //this.total = this.getTotal();
    }

    getProductId() {
        return this.productId;
    }

    getProductName() {
        return this.name;
    }

    getPrice() {
        return this.price;
    }
    
    getQuantity() {
        return this.quantity;
    }

    getId() {
        return this.id;
    }

    getTotal() {
        return 
    }
}