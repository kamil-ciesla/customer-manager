module.exports = class Customer {
    static idCounter = 1;

    constructor(args) {
        this.id = Customer.idCounter;
        Customer.idCounter++;
        this.name = args.name;
        this.vatNumber = args.vatNumber || '';
        this.countryCode = args.countryCode || '';
        this.address = args.address || '';
        this.city = args.city || '';
        this.zipOrPostalCode = args.zipOrPostalCode || '';
        this.creationDate = new Date();
    }
}