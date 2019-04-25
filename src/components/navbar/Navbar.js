import React from 'react';
import {AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import navStyles from '../../styles/nav';
import LangSelect from './LangSelect';
import AuthSelect from './AuthSelect';


const Navbar = props=> {
    

    const {classes} = props;
    return(
        <div>
            <AppBar className={classes.navbar}>
                <Toolbar className={classes.navbarContainer}>
                    <div className={classes.navLeft}>
                        <Typography variant="h6">
                            <NavLink to="/" className={classes.navHeader}>IDENTIFIER SERVICES</NavLink>
                        </Typography>
                        <Typography variant="subtitle1">
                            <NavLink to="/" className={classes.navItem} exact activeStyle={{ background: '#0067a2', padding: '23px' }}>HOME</NavLink>
                        </Typography>
                        <Typography variant="subtitle1">
                            <NavLink to="/isbn-and-ismn" className={classes.navItem} activeStyle={{ background: '#0067a2', padding: '23px'}}>ISBN AND ISMN</NavLink>
                        </Typography>
                        <Typography variant="subtitle1" className={classes.navItem}>
                            ISSN
                        </Typography>
                    </div>
                    <div className={classes.navRight}>
                        <AuthSelect />
                        <LangSelect />
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(navStyles)(Navbar);