import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import useStyles from '../../../styles/topNav';
import Logo from '../../../assets/logo/logo.png';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const TopNav = () => {
	const classes = useStyles();
	return (
		<div>
			<AppBar position="static" className={classes.topNav}>
				<Toolbar className={classes.navbarContainer}>
					<Typography variant="h6" color="inherit">
						<img src={Logo} alt="" className={classes.mainLogo}/>
					</Typography>
					<div className={classes.rightMenu}>
						<PersonIcon className={classes.personIcon}/>
						<LanguageIcon/> <span className={classes.languageSelect}>EN</span>
						<ArrowDropDown/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default TopNav;
