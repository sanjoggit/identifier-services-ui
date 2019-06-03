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
import {connect} from 'react-redux';
import {Field, reduxForm, isPristine} from 'redux-form';
import {PropTypes} from 'prop-types';
import {Grid, Button} from '@material-ui/core';

import renderTextField from './render/renderTextField';
import renderTextArea from './render/renderTextArea';
import useStyles from '../../styles/form';
import {validate} from '@natlibfi/identifier-services-commons';

export default connect(mapStateToProps)(reduxForm({
	form: 'contactForm'}, validate)(
	({handleSubmit, pristine}) => {
		const initialState = {};
		const [state, setState] = useState(initialState);

		const handleClick = values => {
			setState({...state, values});
		};

		const fieldArray = [
			{
				name: 'name',
				type: 'text',
				label: 'Name',
				width: 'full'
			},
			{
				name: 'email',
				type: 'text',
				label: 'Email',
				width: 'full'
			},
			{
				name: 'description',
				type: 'multiline',
				label: 'Description',
				width: 'full'
			}
		];
		const classes = useStyles();

		const component = (
			<form className={classes.container} onSubmit={handleSubmit(handleClick)}>
				<Grid container className={classes.subContainer} spacing={3} direction="row">
					{
						fieldArray.map(list => (
							(list.type === 'text') ?
								<Grid key={list.name} item xs={12}>
									<Field
										className={`${classes.textField} ${list.width}`}
										component={renderTextField}
										label={list.label}
										name={list.name}
										type={list.type}
									/>
								</Grid> :
								<Grid key={list.name} item xs={12}>
									<Field
										className={`${classes.textArea} ${list.width}`}
										component={renderTextArea}
										label={list.label}
										name={list.name}
										type={list.type}
									/>
								</Grid>
						))
					}
					<Grid item xs={6} className={classes.btnContainer}>
						<Button
							disabled={pristine}
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
			propTypes: {
				handleSubmit: PropTypes.func.isRequired,
				pristine: PropTypes.bool.isRequired
			}
		};
	}));

function mapStateToProps(state) {
	return {pristine: isPristine('contactForm')(state)};
}
