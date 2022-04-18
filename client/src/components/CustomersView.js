import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
/*
const checkBoxTheme = getMuiTheme({
    checkbox: { checkedColor: 'red' }
});
*/

export default function CustomersView(props) {
    const [checked, setChecked] = React.useState([1]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    function stringToColor(string) {
        let hash = 0;
        let i;
        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */
        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            //children: `${name.split(' ')[0][0]} ${name.split(' ')[1][0]}`,
            children: `${name.split(' ')[0][0].toUpperCase()}`,
        };
    }


    return (
        <Card>
            <CardContent>
                <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {props.customers.map((customer) => {
                        const labelId = `checkbox-list-secondary-label-${customer.id}`;
                        return (
                            <ListItem
                                key={customer.id}
                                disablePadding
                            >
                                <ListItemButton onClick={() => {
                                    props.onCustomerEdit(customer)
                                }} >
                                    <ListItemAvatar >
                                        <Avatar {...stringAvatar(customer.name)}
                                            alt={`Avatar n°${customer.id + 1}`}
                                            src={`/static/images/avatar/${customer.id + 1}.jpg`}
                                        >
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        sx={{ overflow: 'hidden', textOverflow: "ellipsis", minWidth: 250, maxWidth: 250 }} id={labelId} primary={customer.name} />
                                    <ListItemText sx={{ overflow: 'hidden', textOverflow: "ellipsis", minWidth: 150, maxWidth: 150 }}>
                                        VAT: {customer.vatNumber}
                                    </ListItemText>

                                    <ListItemText sx={{ overflow: 'hidden', textOverflow: "ellipsis", minWidth: 400, maxWidth: 400 }}>
                                        {customer.city + ' ' + customer.address}
                                    </ListItemText>
                                </ListItemButton>

                                <IconButton aria-label="delete" onClick={
                                    () => {
                                        props.onCustomerDelete(customer.id);
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                                <Checkbox
                                    edge="end"
                                    sx={{ color: '#00695c', checkedColor: '#00695c' }}
                                    onChange={handleToggle(customer.id)}
                                    checked={checked.indexOf(customer.id) !== -1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />

                            </ListItem>
                        );
                    })}
                </List>
            </CardContent>
        </Card >

    );
}