export default class Product { 
    private id: string; 
    private name: string; 
    private price: number; 
    constructor(id: string, name: string, price: number) { 
        this.id = id; 
        this.name = name; 
        this.price = price; 
        this.validate(); 
    } 

    validate() { 
        if (!this.id) { 
            throw new Error('id is required'); 
        } 
        if (!this.name) { 
            throw new Error('name is required'); 
        } 
        if (!this.price) { 
            throw new Error('price is required'); 
        } 
    } 

    getId() { 
        return this.id; 
    } 

    getName() { 
        return this.name; 
    } 

    getPrice() { 
        return this.price; 
    } 

    changePrice(price: number) { 
        this.price = price;
        this.validate();
    } 

    changeName(name: string) { 
        this.name = name;
        this.validate();
    }
}