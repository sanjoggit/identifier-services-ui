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
import {Field, getFormValues} from 'redux-form';
import {Fab, Grid, Chip} from '@material-ui/core';
import {PropTypes} from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';

import renderTextField from './renderTextField';

export default connect(state => ({
	values: getFormValues('publisherRegistrationForm')(state)

}))(props => {
	const [errors, setErrors] = React.useState();
	const {fields, values, className, clearFields} = props;

	const handleAliasesClick = () => {
		setErrors();
		if (values) {
			if (values.alias) {
				if (values.aliases) {
					if (values.aliases.includes(values.alias)) {
						setErrors('Alias already exist');
					} else {
						fields.push(values.alias);
						clearFields(undefined, false, false, 'alias');
					}
				} else {
					fields.push(values.alias);
					clearFields(undefined, false, false, 'alias');
				}
			} else {
				setErrors('Required');
			}
		} else {
			setErrors('Required');
		}
	};

	const component = (
		<>
			<Grid>
				<Grid item xs={6}>
					<Field
						className={className}
						name="alias"
						type="text"
						component={renderTextField}
						label="Aliases"
						props={{errors}}
					/>
					<Fab
						color="primary"
						aria-label="Add"
						size="small"
						onClick={handleAliasesClick}
					>
						<AddIcon/>
					</Fab>
				</Grid>
			</Grid>
			{values && values.aliases && values.aliases.map((item, index) => (
				<Chip
					key={item}
					label={item}
					onDelete={() => fields.remove(index)}
				/>
			))}
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
});
