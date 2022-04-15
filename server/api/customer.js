module.exports = class Customer {
    static idCounter = 1;
    constructor(name, vatNumber, countryCode, address) {
        this.id = Customer.idCounter;
        Customer.idCounter++;
        this.name = name;
        this.vatNumber = vatNumber;
        this.countryCode = countryCode;
        this.address = address;
        this.creationDate = new Date();
    }
    get data() {
        return {
            id: this.id,
            name: this.name,
            countryCode: this.countryCode,
            vatNumber: this.vatNumber,
            creationDate: this.creationDate,
            address: this.address
        }
    }
}