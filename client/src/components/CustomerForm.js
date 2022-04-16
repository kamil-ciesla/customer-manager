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
        <form className="CustomerForm" onSubmit={addCustomer} method="POST">
            <label htmlFor="name">
                Name:
            </label>
            <input type="text" id="name" value={formValues.name} name="name" onChange={handleInputChange} />
            <label htmlFor="vatNumber">
                VAT number:
            </label>
            <input type="text" id="vatNumber" value={formValues.vatNumber} name="vatNumber" onChange={handleInputChange} />
            <label htmlFor="countryCode">
                Country code:
            </label>
            <input type="text" id="countryCode" value={formValues.countryCode} name="countryCode" onChange={handleInputChange} />
            <label htmlFor="address">
                Address:
            </label>
            <input type="text" id="address" value={formValues.address} name="address" onChange={handleInputChange} />
            <button type="submit">
                Add
            </button>
        </form>
    )
}
export default CustomerForm

