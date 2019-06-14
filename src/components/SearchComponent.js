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
import {withRouter} from 'react-router-dom';
import {TextField, InputAdornment, IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import useStyles from '../styles/searchComponent';
import * as actions from '../store/actions';
import {getSearchedData} from '../store/reducers';

export default connect(mapStateToProps, actions)(withRouter(props => {
	const {fetchPublishersList, searchPublisher, searchedData} = props;
	const classes = useStyles();
	const [inputVal, setInputVal] = useState('');
	const [searchResult, setSearchResult] = useState([]);

	useEffect(() => {
		fetchPublishersList();
		searchPublisher(inputVal);
		setSearchResult(searchedData);
	}, [inputVal]);

	const handleInputChange = e => {
		setInputVal(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		props.history.push('/publishers', searchResult);
	};

	const component = (
		<form onSubmit={handleSubmit}>
			<TextField
				id="outlined-bare"
				placeholder="Search..."
				margin="normal"
				variant="outlined"
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={handleSubmit}><SearchIcon/></IconButton>
						</InputAdornment>
					)
				}}
				className={classes.searchBox}
				value={inputVal}
				onChange={handleInputChange}
			/>
		</form>
	);

	return {
		...component
	};
}));
function mapStateToProps(state) {
	return ({
		searchedData: state.publisher.searchedData
	});
}

