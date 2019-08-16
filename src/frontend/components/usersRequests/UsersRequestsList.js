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
import {Grid, Typography, Tabs, Tab} from '@material-ui/core';
import {useCookies} from 'react-cookie';

import SearchComponent from '../SearchComponent';
import useStyles from '../../styles/publisherLists';
import TableComponent from '../TableComponent';
import * as actions from '../../store/actions';
import Spinner from '../Spinner';

export default connect(mapStateToProps, actions)(props => {
	const classes = useStyles();
	const {loading, fetchUsersRequestsList, usersRequestsList, totalUsersRequests, totalDoc, offset} = props;
	const [cookie] = useCookies('login-cookie');
	const [inputVal, setSearchInputVal] = useState('');
	const [sortStateBy, setSortStateBy] = useState('');
	const [cursors] = useState([]);
	const [lastCursor, setLastCursor] = useState(cursors.length === 0 ? null : cursors[cursors.length - 1]);

	useEffect(() => {
		fetchUsersRequestsList({inputVal: inputVal, sortStateBy: sortStateBy, token: cookie['login-cookie'], offset: lastCursor});
	}, [lastCursor, cursors, inputVal, sortStateBy]);

	const handleTableRowClick = id => {
		props.history.push(`/requests/users/${id}`, {modal: true});
	};

	const handleChange = (event, newValue) => {
		setSortStateBy(newValue);
	};

	const headRows = [
		{id: 'state', label: 'State'},
		{id: 'publisher', label: 'Publisher'},
		{id: 'email', label: 'email'}

	];
	let usersData;
	if ((usersRequestsList === undefined) || (loading)) {
		usersData = <Spinner/>;
	} else if (usersRequestsList.length === 0) {
		usersData = <p>No Requests Available</p>;
	} else {
		usersData = (
			<TableComponent
				data={usersRequestsList.map(item => usersDataRender(item.id, item.state, item.publisher, item.email))}
				handleTableRowClick={handleTableRowClick}
				headRows={headRows}
				totalDataCount={totalUsersRequests}
				offset={offset}
				totalDoc={totalDoc}
				cursors={cursors}
				setLastCursor={setLastCursor}
			/>
		);
	}

	function usersDataRender(id, state, publisher, email) {
		return {
			id: id,
			state: state,
			publisher: publisher,
			email: email
		};
	}

	const component = (
		<Grid>
			<Grid item xs={12} className={classes.publisherListSearch}>
				<Typography variant="h5">List of Users Creation Requests</Typography>
				<SearchComponent offset={offset} searchFunction={fetchUsersRequestsList} setSearchInputVal={setSearchInputVal}/>
				<Tabs
					className={classes.tabs}
					value={sortStateBy}
					indicatorColor="primary"
					textColor="primary"
					variant="outlined"
					onChange={handleChange}
				>
					<Typography variant="overline">Sort State By :</Typography>
					<Tab className={classes.tab} value="new" label="New"/>
					<Tab className={classes.tab} value="inProgress" label="InProgress"/>
					<Tab className={classes.tab} value="accepted" label="Accepted"/>
					<Tab className={classes.tab} value="rejected" label="Rejected"/>
					<Tab className={classes.tab} value="" label="ShowAll"/>
				</Tabs>

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
		usersRequestsList: state.users.usersRequestsList,
		offset: state.users.offset,
		totalDoc: state.users.totalUsersRequests
	});
}
