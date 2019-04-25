import React from 'react';
import { CssBaseline, AppBar, withStyles, Toolbar, Typography, BottomNavigation, BottomNavigationAction, Divider, List, ListItem } from '@material-ui/core';
import styles from '../../styles/footer';


const Footer = (props) => {
	const { classes } = props;
	return (<>
		<CssBaseline />
		<AppBar position="fixed" color="primary" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<BottomNavigation className={classes.bottomNav}>
					<List className={classes.list}>
						<BottomNavigationAction label='The National Library of Finland' showLabel className={classes.bottomNavAction} />
						<BottomNavigationAction label='Kansalliskirjasto' showLabel className={classes.bottomNavAction} />
						<BottomNavigationAction label=' Nationalbiblioteket' showLabel className={classes.bottomNavAction} />
					</List>
				</BottomNavigation>

			</Toolbar>
		</AppBar>
	</>)
}

export default withStyles(styles)(Footer);