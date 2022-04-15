const express = require('express')
const bodyParser = require('body-parser')
const Customer = require('./api/customer')
const app = express()
const port = 5000

const validate = require('validate-vat');
//const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

validate('pl', '1234567890', function (err, validationInfo) {
    console.log(validationInfo);
});

const customers = {};

console.log('Testing customer');
const c1 = new Customer('joe', '123456789', 'cracow 12');
//const c2 = new Customer('Stephen', '123456789', 'berlin 12');
customers[c1.id] = c1;
//customers[c2.id] = c2;

app.param('id', function (req, res, next, id) {
    req.id = parseInt(id);
    next();
});

app.get('/customer/:id', (req, res) => {
    res.send(customers[req.id]);
})
app.get('/customers', (req, res) => {
    res.send(customers);
})

app.post('/add-customer', urlencodedParser, (req, res) => {
    console.log('trying to add customer');
    const newCustomerData = req.body;
    console.log(req.body);
    const newCustomer = new Customer(
        newCustomerData.name,
        newCustomerData.vatNumber,
        newCustomerData.countryCode,
        newCustomerData.address,
    )
    customers[newCustomer.id] = newCustomer;
    res.send(customers);
})
app.post('/e    dit-customer', (req, res) => {
    res.send('Hello World!')
})

app.get('/', (req, res) => {
    res.send('Express server for customer manager.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})