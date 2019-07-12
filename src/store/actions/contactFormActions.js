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

// import axios from 'axios';
import {CONTACT} from './types';
import fetch from 'node-fetch';
import {setLoader} from './commonAction';

export const sendMessage = values => async dispatch => {
	dispatch(setLoader());
	const response = await fetch('http://localhost:8080/message', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(values)
	});
	if (response.status === 200) {
		dispatch({
			type: CONTACT,
			payload: 'Message Sent'
		});
	}
};

export const createMessageTemplate = values => async dispatch => {
	dispatch(setLoader());
	const response = await fetch('http://localhost:8081/templates', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(values)
	});
	console.log(await response.json());
}
