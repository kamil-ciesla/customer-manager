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
import SaveIcon from '@mui/icons-material/Save';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { addCustomer, editCustomer } from '../customer'

function CustomerForm(props) {

    const initialFormValues = {
        name: '',
        vatNumber: '',
        countryCode: '',
        address: '',
        city: '',
        zipOrPostalCode: ''
    }
    const [formValues, setFormValues] = useState(initialFormValues);

    // If there's a customer provided, switch to edit mode.
    useEffect(() => {
        if (props.customer) {
            setFormValues(props.customer);
        } else {
            setFormValues(initialFormValues);
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
                        props.customer ? editCustomer(formValues) : addCustomer(formValues);
                        event.preventDefault();
                        props.onSubmit();
                    }} >
                        <Typography variant="h6" gutterBottom component="div">
                            {props.customer ? 'Edit customer' : 'Add customer'}
                        </Typography>
                        <FormControl fullWidth>
                            <TextField label="Customer name"
                                variant='standard'
                                required
                                margin="normal"
                                name="name" onChange={handleInputChange}
                                value={formValues.name}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <TextField label="VAT identification number"
                                margin="normal"
                                required
                                variant='standard'
                                name="vatNumber" value={formValues.vatNumber}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <FormControl fullWidth>
                                <InputLabel
                                    shrink variant='standard'
                                    required
                                    htmlFor="country-code-label"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" />,
                                    }}>
                                    Country
                                </InputLabel>
                                <Select
                                    required
                                    value={formValues.countryCode}
                                    name="countryCode"
                                    variant='standard'
                                    labelId='country-code-label'
                                    defaultValue='Poland'
                                    onChange={handleInputChange}
                                    InputProps={{
                                        id: 'country-code-label'
                                    }}
                                >
                                    {htmlCountries}
                                </Select>
                            </FormControl>
                            <TextField label="Address" variant="standard"
                                margin="normal"
                                required
                                name="address" value={formValues.address}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <TextField label="City" variant="standard"
                                margin="normal"

                                name="city" value={formValues.city}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            <TextField label="ZIP/Postal Code" variant="standard"
                                margin="normal"

                                name="zipOrPostalCode" value={formValues.zipOrPostalCode}
                                onChange={handleInputChange}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start" />,
                                }} />
                            {props.customer &&
                                <TextField label="Creation Date"
                                    variant='standard'
                                    disabled
                                    margin="normal"
                                    name="creationDate"
                                    value={(new Date(props.customer.creationDate)).toDateString()}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" />,
                                    }} />
                            }

                            {props.customer ?
                                <ButtonGroup disableElevation >
                                    <Button
                                        color="primary"
                                        startIcon={<ArrowBackIcon />}
                                        variant="outlined"
                                        onClick={props.onClickBackButton}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        color="secondary"
                                        startIcon={<SaveIcon />}
                                        variant="contained"
                                        type="submit"
                                    >
                                        Save
                                    </Button>
                                </ButtonGroup>

                                :
                                <Button variant="contained" type="submit"
                                    endIcon={<AddCircleOutlineIcon />}>
                                    Add
                                </Button>
                            }


                        </FormControl>
                    </form>
                </Box >
            </CardContent>
        </Card >
    )
}
export default CustomerForm

