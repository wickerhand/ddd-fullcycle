import Address from "./adress";

export default class Customer {
    private id: string;
    private name: string;
    private address?: Address;
    private rewardPoints: number = 0;
    private active: boolean = false;

    constructor(id: string, name: string, address?: Address) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.validate();
    }

    getId(): string{
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAddress(): Address | undefined{
        return this.address;
    }

    getRewardPoints(): number {
        return this.rewardPoints;
    }

    changeName(name: string) {
        this.name = name;
        this.validate();
    }

    changeAddress(address: Address): void {
        this.address = address;
        this.validate();
    }

    activate(): void {
        if (!this.address) {
            throw new Error('Address is mandatory to activate a customer.');
        }
        this.active = true;
    }

    deactivate(): void {
        this.active = false;
    }

    isActive(): boolean {
        return this.active;
    }

    addRewardPoints(points: number): void {
        this.rewardPoints += points;
    }

    validate() {
        if (!this.id) {
            throw new Error('Id is required');
        }

        if (!this.name) {
            throw new Error('Name is required');
        }
    }
}