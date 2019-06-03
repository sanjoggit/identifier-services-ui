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
import React, {useState} from 'react';
import {AppBar, Toolbar, Typography, Grid, Select, FormControl, NativeSelect, Button, Menu, MenuItem} from '@material-ui/core';
import useStyles from '../../styles/topNav';
import Logo from '../../../assets/logo/logo.png';
import PersonIcon from '@material-ui/icons/Person';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

export default function () {
	const [state, setState] = useState({
		lang: 'EN'
	});
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	const handleChange = e => {
		setState({
			...state,
			lang: e.target.value
		});
	};

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const val = [{value: 'EN', label: 'English'}, {value: 'FI', label: 'Suomi'}, {value: 'SV', label: 'Swedish'}];

	return (
		<Grid container className={classes.topBarContainer}>
			<Grid item xs={12} className={classes.topBar}>
				<AppBar position="static">
					<Toolbar className={classes.navbarContainer}>
						<Typography variant="h6" color="inherit">
							<img src={Logo} alt="" className={classes.mainLogo}/>
						</Typography>
						<div className={classes.rightMenu}>
							<Button
								aria-owns={anchorEl ? 'simple-menu' : undefined}
								aria-haspopup="true"
								onClick={handleClick}
							>
								<PersonIcon className={classes.personIcon}/>
							</Button>
							<Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
								<MenuItem onClick={handleClose}>Login</MenuItem>
							</Menu>
							<LanguageIcon/>
							{/* <FormControl className={classes.formControl}>
								<NativeSelect
									value={state.lang}
									className={classes.selectEmpty}
									onChange={handleChange}
								>
									<option>{state.lang}</option>
									{val.map(item => (
										<option key={item.value} value={item.value}>{item.label}</option>
									))}
								</NativeSelect>
							</FormControl> */}
							<span className={classes.languageSelect}>EN</span>
							<ArrowDropDown/>
						</div>
					</Toolbar>
				</AppBar>
			</Grid>
		</Grid>
	);
}
