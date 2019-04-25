import React from 'react';
import PropTypes from 'prop-types';
import {CssBaseline, AppBar, withStyles, Grid} from '@material-ui/core';
import styles from '../../styles/footer';

const Footer = props => {
	const {classes} = props;
	const btmLinks = [
		{label: 'The National Library of Finland'},
		{label: 'Kansalliskirjasto'},
		{label: ' Nationalbiblioteket'}
	];
	return (
		<>
			<CssBaseline/>
			<AppBar position="fixed" color="primary" className={classes.appBar}>
				<Grid container className={classes.toolbar}>
					{btmLinks.map(item => (
						<Grid key={item.label} className={classes.bottomNavItem} item>
							{item.label}
						</Grid>
					))}
				</Grid>
			</AppBar>
		</>
	);
};

Footer.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(Footer);
