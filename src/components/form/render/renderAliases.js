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
import {Field} from 'redux-form';
import {Button, Grid, IconButton} from '@material-ui/core';
import {PropTypes} from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import renderTextField from './renderTextField';

export default function ({fields, meta: {touched, error}}) {
	const component = (
		<>
			<Grid>
				{fields.map((item, index) => (
					<Grid key={index} item xs={6}>
						<Field
							name={item}
							type="text"
							component={renderTextField}
							label={`Aliases ${index + 1}`}
						/>
						<IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
							<ClearIcon/>
						</IconButton>
					</Grid>
				))}
			</Grid>
			{touched && error && <span>{error}</span>}
			<Button
				variant="outlined"
				size="medium"
				color="primary"
				aria-label="Add"
				style={{marginTop: '10px'}}
				onClick={() => fields.push()}
			>
				<AddIcon/>
				Add Aliases
			</Button>
		</>
	);

	return {
		...component,
		defaultProps: {
			meta: {}
		},
		propTypes: {
			fields: PropTypes.arrayOf(PropTypes.shape({})),
			meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.bool})
		}
	};
}
