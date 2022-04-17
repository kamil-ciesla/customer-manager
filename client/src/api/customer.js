import * as constants from '../constants'
import axios from 'axios';

async function getCustomers() {
    const result = await axios(constants.SERVER_BASE_LINK + '/customers');
    return result.data;
}

async function deleteCustomer(id) {
    const result = await axios.get(constants.SERVER_BASE_LINK + '/delete-customer/' + id);
    //console.log(result.data);
}
async function getCustomerData(id) {
    const result = await axios(constants.SERVER_BASE_LINK + '/customer/id');
    return result.data;
}

async function addCustomer(customerData) {
    const result = await axios.post(constants.SERVER_BASE_LINK + '/add-customer', customerData);
    return result.data;
}
async function editCustomer(customer) {
    const result = await axios.post(constants.SERVER_BASE_LINK + '/edit-customer', customer);
    console.log(result.data);
    return result.data;
}
export { getCustomers, deleteCustomer, getCustomerData, addCustomer, editCustomer }