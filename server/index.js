const express = require("express");
const bodyParser = require("body-parser");
const Customer = require("./api/customer");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const jsvat = require("jsvat");

app.use(cors());
app.use(bodyParser.json());
const jsonParser = bodyParser.json()
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

//console.log(jsvat.checkVAT('', jsvat.countries));

const customers = [];

const testCustomersData = [
    { name: "Jan Kowalski", vatNumber: "pl4545454601", countryCode: 'PL', address: "Mokotów 15", city: 'Warsaw' },
    { name: "Sheila Dorman", vatNumber: "cn546738292", countryCode: 'CN', address: "Xin Zhen Lu 973", city: 'Shanghai' },
    { name: "John Smith", vatNumber: "gb1234567890", countryCode: 'GB', address: "Petticoat Lane 707", city: 'London' },
    { name: "Dave Jenkins", vatNumber: "pl847882100", countryCode: 'FR', address: "Wielopole 1", city: 'Kraków' },
]
for (const customerData of testCustomersData) {
    customers.push(new Customer(customerData));
}

function getCustomerIndex(id) {
    return customers.findIndex(customer => customer.id === id);
}
app.param("id", function (req, res, next, id) {
    req.id = parseInt(id);
    next();
});

app.get("/customer/:id", (req, res) => {
    res.send(customers[getCustomerIndex(req.id)]);
});
app.get("/delete-customer/:id", (req, res) => {
    customers.splice(getCustomerIndex(req.id), 1);
    res.send('Deleted customer');
});
app.get("/customers", (req, res) => {
    console.log('Number of customers:' + customers.length);
    res.send(customers);
});

app.post("/add-customer", (req, res) => {
    console.log("Adding a new customer");
    const customerData = req.body;
    console.log(customerData);
    const customer = new Customer(customerData);
    customers.push(customer);
    res.send(customers);
});

app.post("/edit-customer", (req, res) => {
    console.log('Editing customer');
    const newCustomerData = req.body;
    const customer = customers[getCustomerIndex(newCustomerData.id)]
    Object.keys(newCustomerData)
        .forEach(key => {
            customer[key] = newCustomerData[key];
        });
    res.send(customer);
});

app.get("/", (req, res) => {
    res.send("Express server for customer manager.");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
