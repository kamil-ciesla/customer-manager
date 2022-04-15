import * as constants from '../constants'
import { useState } from 'react'

function CustomerForm(props) {
    const initialFormValues = {
        name: '',
        vatNumber: '',
        countryCode: '',
        address: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    function addCustomer(event) {
        fetch(constants.SERVER_BASE_LINK + '/add-customer', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(formValues)
        }).then(function (response) {
            return response.json();
        });
        event.preventDefault();
    }
    return (
        <form className="customer-form" onSubmit={addCustomer} method="POST">
            Name:
            <input type="text" value={formValues.name} name="name" onChange={handleInputChange} />
            VAT number:
            <input type="text" value={formValues.vatNumber} name="vatNumber" onChange={handleInputChange} />
            Country code:
            <input type="text" value={formValues.countryCode} name="countryCode" onChange={handleInputChange} />
            Address:
            <input type="text" value={formValues.address} name="address" onChange={handleInputChange} />
            <button type="submit">
                Add
            </button>
        </form>
    )
}
export default CustomerForm

