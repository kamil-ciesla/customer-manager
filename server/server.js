const express = require("express");
const bodyParser = require("body-parser");
const Customer = require("./api/customer");
const app = express();
const cors = require("cors");
const port = 5000;

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
const validate = require("validate-vat");
const jsonParser = bodyParser.json()
//const urlencodedParser = bodyParser.urlencoded({ extended: false });

validate("pl", "1234567890", function (err, validationInfo) {
    console.log(validationInfo);
});

const customers = [];

console.log("Testing customer");
const c1 = new Customer({ name: "joe", nip: "123456789", countryCode: 'pl', address: "cracow 12" });
customers.push(c1);

app.param("id", function (req, res, next, id) {
    req.id = parseInt(id);
    next();
});

app.get("/customer/:id", (req, res) => {
    res.send(customers[req.id]);
});
app.get("/customers", (req, res) => {
    console.log('sending customers');
    console.log(customers.length);
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
