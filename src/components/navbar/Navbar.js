import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, withStyles, Menu, MenuItem} from '@material-ui/core';
import navStyles from '../../styles/nav';
import LanguageIcon from '@material-ui/icons/Language';

const Navbar = props=> {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event =>{
        setAnchorEl(event.currentTarget);
    }
    const handleClose = ()=>{
        setAnchorEl(null);
    }

    const {classes} = props;
    return(
        <div>
            <AppBar className={classes.navbar}>
                <Toolbar className={classes.navbarContainer}>
                    <div className={classes.navLeft}>
                        <Typography variant="h5" className={classes.navHeader}>
                            IDENTIFIER SERVICES
                        </Typography>
                        <Typography variant="subtitle1" className={classes.navItem}>
                            HOME
                        </Typography>
                        <Typography variant="subtitle1" className={classes.navItem}>
                            ISBN AND ISMN 
                        </Typography>
                        <Typography variant="subtitle1" className={classes.navItem}>
                            ISSN
                        </Typography>
                    </div>
                    <div className={classes.navRight}>
                        <LanguageIcon
                            aria-owns={anchorEl ? 'simple-menu': undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                         />&nbsp;<span>EN</span>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Sv</MenuItem>
                            <MenuItem onClick={handleClose}>En</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(navStyles)(Navbar);