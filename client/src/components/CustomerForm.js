import * as constants from '../constants'
import { useState, useMemo, useEffect } from 'react'
import countryList from 'react-select-country-list'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { addCustomer } from '../api/customer'

function CustomerForm(props) {
    const initialFormValues = {
        name: '',
        vatNumber: '',
        countryCode: '',
        address: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    useEffect(() => {
        if (props.customer) {
            setFormValues(props.customer);
        }
    }, [props.customer])

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


    return (
        <Card className="customer-form">
            <CardContent>
                <Box
                    sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <form method="POST" onSubmit={event => {
                        addCustomer(formValues);
                        event.preventDefault();
                        props.onSubmit();
                    }} >
                        <FormControl fullWidth>
                            <TextField label="Customer name" variant="outlined"
                                margin="normal"
                                name="name" onChange={handleInputChange}
                                value={formValues.name}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <TextField label="VAT identification number" variant="outlined"
                                margin="normal"
                                name="vatNumber" value={formValues.vatNumber}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
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

                            <TextField label="Customer address" variant="outlined"
                                margin="normal"
                                name="address" value={formValues.address}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <Button variant="contained" type="submit">
                                {props.customer ? 'Apply changes' : 'Add'}
                            </Button>
                        </FormControl>
                    </form>
                </Box >
            </CardContent>
        </Card>
    )
}
export default CustomerForm

