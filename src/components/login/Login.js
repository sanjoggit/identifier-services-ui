/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
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
import {Typography, Tabs, Tab, Fab} from '@material-ui/core';
import PropTypes from 'prop-types';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import {connect} from 'react-redux';

import ModalLayout from '../ModalLayout';
import LoginForm from './LoginForm';
import HakaLogin from './HakaLogin';
import useStyles from '../../styles/login';
import * as actions from '../../store/actions';

export default connect(mspStateToProps, actions)(props => {
	const [value, setValue] = React.useState(0);
	const classes = useStyles();
	const component = (
		<ModalLayout icon {...props}>
			<div className={classes.main}>
				{(props.loggedIn) ?
					<Fab variant="extended" className={classes.logout} color="secondary" onClick={props.logOut}>
						<LogOutIcon fontSize="large"/>
						<span>Click Here to Logout...</span>
					</Fab> :
					<div>
						<Tabs
							value={value}
							variant="scrollable"
							scrollButtons="on"
							indicatorColor="primary"
							textColor="primary"
							onChange={handleChange}
						>
							<Tab label="Normal Login"/>
							<Tab label="HAKA Login"/>
						</Tabs>
						{value === 0 && <TabContainer><LoginForm {...props}/></TabContainer>}
						{value === 1 && <TabContainer><HakaLogin/></TabContainer>}
					</div>
				}
			</div>
		</ModalLayout>
	);

	function handleChange(event, newValue) {
		setValue(newValue);
	}

	return {
		...component
	};
});

function TabContainer(props) {
	const component = (
		<Typography component="div">
			{props.children}
		</Typography>
	);
	return {
		...component,
		children: PropTypes.node.isRequired
	};
}

function mspStateToProps(state) {
	return ({
		user: state
	});
}

