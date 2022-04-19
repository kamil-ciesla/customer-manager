import axios from 'axios';

const SERVER_BASE_LINK = process.env.BACKEND_SERVER_LINK || 'http://localhost:5000'


async function getCustomers() {
    const result = await axios(SERVER_BASE_LINK + '/customers');
    return result.data;
}

async function deleteCustomer(id) {
    const result = await axios.get(SERVER_BASE_LINK + '/delete-customer/' + id);
    return result.data;
}
async function getCustomerData(id) {
    const result = await axios(SERVER_BASE_LINK + '/customer/id');
    return result.data;
}

async function addCustomer(customerData) {
    const result = await axios.post(SERVER_BASE_LINK + '/add-customer', customerData);
    return result.data;
}
async function editCustomer(customer) {
    const result = await axios.post(SERVER_BASE_LINK + '/edit-customer', customer);
    console.log(result.data);
    return result.data;
}
export { getCustomers, deleteCustomer, getCustomerData, addCustomer, editCustomer }