/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
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

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Grid, Typography, Checkbox, FormControlLabel} from '@material-ui/core';

import useStyles from '../../styles/publisherLists';
import TableComponent from '../TableComponent';
import * as actions from '../../store/actions';
import Spinner from '../Spinner';
import {useCookies} from 'react-cookie';

export default connect(mapStateToProps, actions)(props => {
	const classes = useStyles();
	const {loading, fetchUsersList, usersList} = props;
	const [token, setToken] = useState(null);
	const [cookie] = useCookies('login-cookie');

	useEffect(() => {
		setToken(cookie['login-cookie']);
		token !== null && fetchUsersList(token);
	}, [token]);

	const handleTableRowClick = id => {
		props.history.push({
			pathname: `/users/${id}`,
			state: {modal: true}
		});
	};

	const headRows = [
		{id: 'name', label: 'Name'},
		{id: 'publisher', label: 'Publisher'},
		{id: 'defaultLanguage', label: 'Language'}
	];
	let usersData;
	if (loading) {
		usersData = <Spinner/>;
	} else if (usersList.Users === undefined) {
		usersData = <p>No Users Available</p>;
	} else {
		usersData = 
			<TableComponent
				data={usersList.Users.map(item => usersDataRender(item))}
				handleTableRowClick={handleTableRowClick}
				headRows={headRows}
			/>
		}

		function usersDataRender(item){
			const {_id, givenName, publisher, preferences}= item;
		return{
			id: _id,
			name: givenName,
			publisher : publisher,
			defaultLanguage : preferences.defaultLanguage
		};
	}

	const component = (
		<Grid>
			<Grid item xs={12} className={classes.publisherListSearch}>
				<Typography variant="h5">List of Avaiable users</Typography>
				{usersData}
			</Grid>
		</Grid>
	);
	return {
		...component
	};
});

function mapStateToProps(state) {
	return ({
		loading: state.users.loading,
		usersList: state.users.usersList
	});
}
