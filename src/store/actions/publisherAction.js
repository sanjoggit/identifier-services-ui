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
import fetch from 'node-fetch';
import {PUBLISHERS_LIST, PUBLISHER, ERROR, SEARCH} from './types';
import {setLoader} from './loaderAction';

function success(type, payload) {
	return ({
		type: type,
		payload: payload
	});
}

export const fetchPublishersList = () => async dispatch => {
	dispatch(setLoader());
	try {
		const response = await fetch('http://localhost:8081/publishers/query', {
			method: 'POST'
		});
		const result = await response.json();
		dispatch(success(PUBLISHERS_LIST, result.data));
	} catch (err) {
		dispatch({
			type: ERROR,
			payload: err
		});
	}
};

export const fetchPublisher = id => dispatch => {
	dispatch(setLoader());
	fetch(`http://localhost:8081/publishers/${id}`, {
		method: 'GET'
	}).then(res => res.json()).then(result =>
		dispatch(success(PUBLISHER, result.data)));
};

export const searchPublisher = value => ({type: SEARCH, payload: value});
