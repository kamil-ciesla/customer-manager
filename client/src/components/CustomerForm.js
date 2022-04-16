import * as constants from '../constants'
import { useState, useMemo } from 'react'
import countryList from 'react-select-country-list'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';


function CustomerForm(props) {
    const initialFormValues = {
        name: '',
        vatNumber: '',
        countryCode: '',
        address: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    const countries = useMemo(() => countryList().getData(), [])
    const htmlCountries = countries.map(country => {
        return <MenuItem key={country.value} value={country.value}>{country.label}</MenuItem>
    })
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
        <Box className="customer-form"
            sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <form onSubmit={addCustomer} method="POST">

                <TextField label="Customer name" variant="outlined"
                    name="name" onChange={handleInputChange}
                    value={formValues.name}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                    }} />
                <TextField label="VAT identification number" variant="outlined"
                    name="vatNumber" value={formValues.vatNumber}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                    }} />
                <FormControl fullWidth>
                    <InputLabel shrink id="country-code-label">Country</InputLabel>
                    <Select
                        labelId="country-code-label"
                        value={formValues.countryCode}
                        name="countryCode"
                        label="CountryCode"
                        onChange={handleInputChange}
                    >
                        {htmlCountries}
                    </Select>
                </FormControl>

                <TextField label="Customer address" variant="outlined"
                    name="address" value={formValues.address}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" />,
                    }} />
                <Button variant="contained" type="submit" onClick={() => { props.action() }}>Add</Button>
            </form>
        </Box >
    )
}
export default CustomerForm

