import React from 'react';
import { CssBaseline, AppBar, withStyles, Grid, ListItemText } from '@material-ui/core';
import styles from '../../styles/footer';


const Footer = (props) => {
	const { classes } = props;
	const btmLinks = [
		{ label: 'The National Library of Finland' },
		{ label: 'Kansalliskirjasto' },
		{ label: ' Nationalbiblioteket' }
	]
	return (<>
		<CssBaseline />
		<AppBar position="fixed" color="primary" className={classes.appBar}>
					<Grid container className={classes.toolbar}>
						{btmLinks.map(item =>
							<Grid item className={classes.bottomNavItem} key={item.label}>
								{item.label}
							</Grid>)}
					</Grid>
		</AppBar>
	</>)
}

export default withStyles(styles)(Footer);