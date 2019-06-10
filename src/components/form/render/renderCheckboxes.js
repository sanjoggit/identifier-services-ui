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
import {PropTypes} from 'prop-types';
import {Checkbox, FormControlLabel, FormLabel, FormGroup} from '@material-ui/core';

export default function ({label, options, className, input, meta: {touched, error}}) {
	const component = (
		<>
			<FormLabel component="legend">{label}</FormLabel>
			<FormGroup>
				{options.map(item => (
					console.log(input) ||
					<FormControlLabel
						{...input}
						key={item.label}
						label={item.label}
						className={className}
						control={
							<Checkbox
								error={touched && error}
								value={item.value}
								onChange={input.onChange(`${item.name}`)}
							/>
						}
					/>
				))
				}
			</FormGroup>
		</>
	);

	return {
		...component,
		defaultProps: {
			meta: {},
			input: {}
		},
		propTypes: {
			input: PropTypes.shape({}),
			options: PropTypes.shape({
				name: PropTypes.string.isRequired,
				label: PropTypes.string.isRequired,
				value: PropTypes.string.isRequired
			}).isRequired,
			label: PropTypes.string.isRequired,
			className: PropTypes.string.isRequired,
			meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.bool})
		}
	};
}
