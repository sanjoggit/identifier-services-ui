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
import {AppBar, Toolbar, Typography, Grid, Menu, MenuItem} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import useStyles from '../../styles/topNav';
import Logo from '../../assets/logo/logo.png';
import Login from '../login/Login';
import NotificationBar from '../../components/NotificationBar';
import {setLocale} from '../../store/actions/localeAction';

export default connect(mapStateToProps, {setLocale})(props => {
	const {setLocale} = props;
	const classes = useStyles();
	const [openNotification, setOpenNotification] = React.useState(true);
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const handleCloseNotification = () => {
		setOpenNotification(false);
	};

	const changeLangEn = () => {
		setLocale('en');
		setAnchorEl(null);
	};

	const changeLangFi = () => {
		setLocale('fi');
		setAnchorEl(null);
	};

	const changeLangSv = () => {
		setLocale('sv');
		setAnchorEl(null);
	};

	let lang;
	if (props.lang === 'en') {
		lang = 'EN';
	} else if (props.lang === 'fi') {
		lang = 'FI';
	} else {
		lang = 'SV';
	}

	const component = (
		<>
			{openNotification && <NotificationBar handleClose={handleCloseNotification}/>}
			<Grid container className={classes.topBarContainer}>
				<Grid item xs={12} className={classes.topBar}>
					<AppBar position="static">
						<Toolbar className={classes.navbarContainer}>
							<Typography variant="h6" color="inherit">
								<Link to="/"><img src={Logo} alt="" className={classes.mainLogo}/></Link>
							</Typography>
							<div className={props.loggedIn ? classes.rightMenu : classes.rightMenuLogIn}>
								<Login name="login" label={props.loggedIn ? 'logout' : 'login'} variant="outlined" color="secondary" classed={classes.loginButton} {...props}/>
								<LanguageIcon/>
								<div className={classes.languageSelect} onClick={handleClick}>
									<span>{lang}</span>
									<ArrowDropDown/>
								</div>
								<Menu
									anchorEl={anchorEl}
									open={Boolean(anchorEl)}
									getContentAnchorEl={null}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center'
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center'
									}}
									onClose={handleClose}
								>
									<MenuItem onClick={changeLangEn}>English</MenuItem>
									<MenuItem onClick={changeLangFi}>Suomi</MenuItem>
									<MenuItem onClick={changeLangSv}>Svenska</MenuItem>
								</Menu>
							</div>
						</Toolbar>
					</AppBar>
				</Grid>
			</Grid>
		</>
	);
	return {
		...component,
		propTypes: {
			loggedIn: PropTypes.bool.isRequired
		}
	};
});

function mapStateToProps(state) {
	return ({
		lang: state.locale.lang
	});
}
