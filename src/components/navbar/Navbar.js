import React from 'react';
import PropTypes from 'prop-types';
import {AppBar, Toolbar, Typography, withStyles} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import navStyles from '../../styles/nav';
import LangSelect from './LangSelect';
import AuthSelect from './AuthSelect';

const Navbar = props => {
	const {classes} = props;
	return (
		<div>
			<AppBar position="static" className={classes.navbar}>
				<Toolbar className={classes.navbarContainer}>
					<div className={classes.navLeft}>
						<Typography variant="h6">
							<NavLink to="/" className={classes.navHeader}>
								IDENTIFIER SERVICES
							</NavLink>
						</Typography>
						<Typography variant="subtitle1">
							<NavLink
								exact
								to="/"
								activeStyle={{background: '#0067a2', padding: '23px'}}
								className={classes.navItem}
							>
								HOME
							</NavLink>
						</Typography>
						<Typography variant="subtitle1">
							<NavLink
								to="/isbn-and-ismn"
								className={classes.navItem}
								activeStyle={{background: '#0067a2', padding: '23px'}}
							>
								ISBN AND ISMN
							</NavLink>
						</Typography>
						<Typography variant="subtitle1" className={classes.navItem}>
							<NavLink
								to="/issn"
								className={classes.navItem}
								activeStyle={{background: '#0067a2', padding: '23px'}}
							>
								ISSN
							</NavLink>
						</Typography>
					</div>
					<div className={classes.navRight}>
						<AuthSelect/>
						<LangSelect/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

Navbar.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(navStyles)(Navbar);
