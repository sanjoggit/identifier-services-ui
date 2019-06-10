/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * UI microservice of Identifier Services
 *
 * Copyright (C) 2019 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui
 *
 * identifier-services-ui program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * identifier-services-ui is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */
import React from 'react';
import {AppBar, Toolbar, Typography, Grid} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import useStyles from '../../styles/topNav';
import Logo from '../../assets/logo/logo.png';
import Login from '../login/Login';

export default function () {
	const classes = useStyles();
	return (
		<Grid container className={classes.topBarContainer}>
			<Grid item xs={12} className={classes.topBar}>
				<AppBar position="static">
					<Toolbar className={classes.navbarContainer}>
						<Typography variant="h6" color="inherit">
							<img src={Logo} alt="" className={classes.mainLogo}/>
						</Typography>
						<div className={classes.rightMenu}>
							<Login name="login" label="login" variant="outlined" color="secondary" classed={classes.loginButton}/>
							<LanguageIcon/>
							<span className={classes.languageSelect}>EN</span>
							<ArrowDropDown/>
						</div>
					</Toolbar>
				</AppBar>
			</Grid>
		</Grid>
	);
}
