// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';

import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
    { name: 'Home', id: 'home' },
    { name: 'Bus Schedule', id: 'schedule' },
    { name: 'Contact Us', id: 'contact' },
];

export const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const list = () => (
        <List>
            {pages.map((page) => (
                <ListItem button key={page.id}>
                    <ListItemText primary={page.name} style={{ fontFamily: 'Montserrat' }} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                {/* Image Icon */}
                <img 
                    src="/bus.png"  
                    alt="Bus Icon" 
                    style={{ width: '40px', height: '40px', marginRight: '10px' }} 
                />
                <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Montserrat' }}>
                    GoBusGo
                </Typography>
                <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {pages.map((page) => (
                        <Button 
                            key={page.id} 
                            color="inherit" 
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#f50057',
                                    color: '#fff',
                                },
                                fontFamily: 'Montserrat',
                            }}
                        >
                            {page.name}
                        </Button>
                    ))}
                </div>
            </Toolbar>
        </AppBar>
    );
};