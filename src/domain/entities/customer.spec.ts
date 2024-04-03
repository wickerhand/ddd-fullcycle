import Address from "./adress";
import Customer from "./customer";

describe('Customer unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => new Customer('', 'name')).toThrow(new Error('Id is required'));
    });

    it('should throw error when name is empty', () => {
        expect(() => new Customer('id', '')).toThrow(new Error('Name is required'));
    });

    it('should throw error when address is empty when activate customer', () => {
        expect(() => new Customer('id', 'name').activate()).toThrow(new Error('Address is mandatory to activate a customer.'));
    });

    it('should return customer id', () => {
        const customer = new Customer('id', 'name');
        expect(customer.getId()).toBe('id');
    });

    it('should return customer name', () => {
        const customer = new Customer('id', 'name');
        expect(customer.getName()).toBe('name');
    });

    it('should not return customer address', () => {
        const customer = new Customer('id', 'name');
        expect(customer.getAddress()).toBeUndefined();
    });

    it('should return customer address', () => {
        const address = new Address('street', 10, 'zipCode', 'city');
        const customer = new Customer('id', 'name', address);
        expect(customer.getAddress()).toBe(address);
    });

    it('should change customer name', () => {
        const customer = new Customer('id', 'name');
        customer.changeName('new name');
        expect(customer.getName()).toBe('new name');
    });

    it('should change customer address', () => {
        const customer = new Customer('id', 'name');
        const address = new Address('street', 10, 'zipCode', 'city');
        customer.changeAddress(address);
        expect(customer.getAddress()).toBe(address);
    });

    it('should activate customer', () => {
        const customer = new Customer('id', 'name', new Address('street', 10, 'zipCode', 'city'));
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it('should deactivate customer', () => {
        const customer = new Customer('id', 'name');
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it('should return customer reward points', () => {
        const customer = new Customer('id', 'name');
        expect(customer.getRewardPoints()).toBe(0);
    });

    it('should add reward points to customer', () => {
        const customer = new Customer('id', 'name');
        customer.addRewardPoints(10);
        expect(customer.getRewardPoints()).toBe(10);

        customer.addRewardPoints(20);
        expect(customer.getRewardPoints()).toBe(30);
    });
});