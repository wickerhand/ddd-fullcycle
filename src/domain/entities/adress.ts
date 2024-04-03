export default class Address {
    private street: string;
    private number: number;
    private zipCode: string;
    private city: string;

    constructor(street: string, number: number, zipCode: string, city: string) {
        this.street = street;
        this.number = number;
        this.zipCode = zipCode;
        this.city = city;
        this.validate();
    }

    getStreet() {
        return this.street;
    }

    getNumber() {
        return this.number;
    }

    getZipCode() {
        return this.zipCode;
    }

    getCity() {
        return this.city;
    }

    changeStreet(street: string) {
        this.street = street;
        this.validate();
    }

    changeNumber(number: number) {
        this.number = number;
        this.validate();
    }

    changeZipCode(zipCode: string) {
        this.zipCode = zipCode;
        this.validate();
    }

    changeCity(city: string) {
        this.city = city;
        this.validate();
    }

    validate() {

        if (!this.street) {
            throw new Error('Street is required');
        }

        if (!this.number) {
            throw new Error('Number is required');
        }

        if (!this.zipCode) {
            throw new Error('Zip code is required');
        }

        if (!this.city) {
            throw new Error('City is required');
        }
    }

    toString() {
        return `${this.street}, ${this.number} - ${this.city} - ${this.zipCode}`;
    }
}