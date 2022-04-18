import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AppBar from '@material-ui/core/AppBar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GroupIcon from '@mui/icons-material/Group';
import { languages } from '../languages';

export default function SearchAppBar(props) {
    return (
        <Box sx={{ flexGrow: 1, }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: '#00695c' }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <GroupIcon size="large" />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {languages.title[props.language]}
                    </Typography>
                    <ButtonGroup variant="contained" aria-label="contained primary button group">
                        <Button onClick={() => { props.onLanguageChange('polish') }} sx={{ backgroundColor: "white" }}>PL</Button>
                        <Button onClick={() => { props.onLanguageChange('english') }}>EN</Button>
                        <Button onClick={() => { props.onLanguageChange('sweden') }}>SE</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </Box>
    );
}