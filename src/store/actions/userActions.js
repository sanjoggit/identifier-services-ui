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
const BASE_URL = 'http://localhost:8081';

export const createUser = (values, token) => async dispatch => {
	console.log('----- from action', values);
	const response = await fetch(`${BASE_URL}/requests/users`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		credentials: 'same-origin',
		body: JSON.stringify(values)
	});
	console.log(await response.json());
};
