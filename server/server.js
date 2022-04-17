const express = require("express");
const bodyParser = require("body-parser");
const Customer = require("./api/customer");
const app = express();
const cors = require("cors");
const port = 5000;
const jsvat = require("jsvat");


const whitelist = ["http://localhost:3000"];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
const jsonParser = bodyParser.json()
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

//console.log(jsvat.checkVAT('', jsvat.countries));

const customers = [];

const testCustomersData = [
    { name: "Joe", vatNumber: "123456789", countryCode: 'pl', address: "Cracow 12" },
    { name: "Kayle", vatNumber: "987654321", countryCode: 'gb', address: "London 12" },
    { name: "Sheila", vatNumber: "546738292", countryCode: 'fr', address: "Paris 12" },
    { name: "Dave", vatNumber: "847882100", countryCode: 'pl', address: "Warsaw 12" },
]
for (const customerData of testCustomersData) {
    customers.push(new Customer(customerData));
}

app.param("id", function (req, res, next, id) {
    req.id = parseInt(id);
    next();
});

app.get("/customer/:id", (req, res) => {
    const customerIndex = customers.findIndex(customer => customer.id === req.id);
    res.send(customers[customerIndex]);
});
app.get("/delete-customer/:id", (req, res) => {
    const customerIndex = customers.findIndex(customer => customer.id === req.id);
    customers.splice(customerIndex, 1);
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
    res.send("Hello World!");
});

app.get("/", (req, res) => {
    res.send("Express server for customer manager.");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
