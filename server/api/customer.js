module.exports = class Customer {
    static idCounter = 1;

    constructor(args) {
        this.id = Customer.idCounter;
        Customer.idCounter++;
        this.name = args.name;
        this.vatNumber = args.vatNumber;
        this.countryCode = args.countryCode;
        this.address = args.address;
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