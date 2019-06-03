/* eslint-disable no-unused-expressions */
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
import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, Grid} from '@material-ui/core';
import {PropTypes} from 'prop-types';
import renderTextField from './render/renderTextField';
import renderTextArea from './render/renderTextArea';
import useStyles from '../../styles/form';

export default reduxForm({form: 'userRequestForm'})(({handleSubmit}) => {
	const classes = useStyles();
	const initialState = {};
	const [state, setState] = useState(initialState);

	const handleClick = values => {
		setState({...state, values});
	};

	const fieldArray = [
		{
			name: 'userId',
			type: 'text',
			label: 'UserId',
			width: 'half'
		},
		{
			name: 'email',
			type: 'text',
			label: 'Email',
			width: 'half'
		},
		{
			name: 'publishers',
			type: 'text',
			label: 'Publishers',
			width: 'full'
		},
		{
			name: 'givenName',
			type: 'text',
			label: 'Given Name',
			width: 'half'
		},
		{
			name: 'familyName',
			type: 'text',
			label: 'Family Name',
			width: 'half'
		},
		{
			name: 'notes',
			type: 'multiline',
			label: 'Notes',
			width: 'full'
		}
	];

	const component = (
		<form className={classes.container} onSubmit={handleSubmit(handleClick)}>

			<Grid container spacing={3} direction="row">
				{
					fieldArray.map(list =>
						// eslint-disable-next-line no-negated-condition
						((list.width !== 'full') ?
							<Grid key={list.name} item xs={6}>
								<Field
									className={`${classes.textField} ${list.width}`}
									component={renderTextField}
									label={list.label}
									name={list.name}
									type={list.type}
								/>
							</Grid>		:
							((list.type === 'multiline') ?
								<Grid key={list.name} item xs={12}>
									<Field
										className={`${classes.textArea} ${list.width}`}
										component={renderTextArea}
										label={list.label}
										name={list.name}
										type={list.type}
									/>
								</Grid>	:
								<Grid key={list.name} item xs={12}>
									<Field
										className={`${classes.textField} ${list.width}`}
										component={renderTextField}
										label={list.label}
										name={list.name}
										type={list.type}
									/>
								</Grid>))
					)
				}
				<Grid item xs={6} className={classes.btnContainer}>
					<Button
						variant="outlined"
						color="primary"
						type="submit"
						size="small"
						fullWidth={false}
					>
				Back
					</Button>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						size="small"
						fullWidth={false}
					>
				Submit
					</Button>
				</Grid>
			</Grid>
		</form>
	);

	return {
		...component,
		defaultProps: {
			classes: null
		},
		propTypes: {
			handleSubmit: PropTypes.func.isRequired,
			classes: PropTypes.shape({})
		}
	};
});
