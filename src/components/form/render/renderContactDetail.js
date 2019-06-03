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
import {Grid, Fab} from '@material-ui/core';
import {Field} from 'redux-form';
import renderTextField from './renderTextField';
import {PropTypes} from 'prop-types';
import useStyles from '../../../styles/form';

export default function ({fields, contactDetails, meta}) {
	const classes = useStyles();
	if (fields.getAll() === undefined) {
		fields.push({});
	}

	const component = (
		<>
			{fields.map(field => contactDetails.map(list =>
				(
					<Grid key={list.name} item xs={12}>
						<Field
							className={`${classes.textField} ${list.width}`}
							component={renderTextField}
							label={list.label}
							name={field ? `${field}.${list.name}` : list.name}
							type={list.type}
						/>
					</Grid>
				)))}
			{meta.touched && meta.error && <span>{meta.error}</span>}
			<Fab
				variant="extended"
				size="medium"
				color="primary"
				onClick={() => fields.push({})}
			>
                Add More Contact Details
			</Fab>
		</>
	);

	return {
		...component,
		defaultProps: {
			meta: {}
		},
		propTypes: {
			fields: PropTypes.arrayOf(PropTypes.shape({})),
			contactDetails: PropTypes.arrayOf(PropTypes.shape({})),
			meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.bool})
		}
	};
}

