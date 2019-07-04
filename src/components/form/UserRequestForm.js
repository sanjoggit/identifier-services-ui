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
import React from 'react';
import {connect} from 'react-redux';
import {Field, FieldArray, reduxForm} from 'redux-form';
import {Button, Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import {validate} from '@natlibfi/identifier-services-commons';
import {useCookies} from 'react-cookie';

import renderTextField from './render/renderTextField';
import renderAliases from './render/renderAliases';
import useStyles from '../../styles/form';
import * as actions from '../../store/actions/userActions';
import renderCheckboxes from './render/renderCheckboxes';
import renderSelect from './render/renderSelect';

const roleOption = [
	{label: 'system', value: 'system'},
	{label: 'admin', value: 'admin'},
	{label: 'publisher-admin', value: 'publisherAdmin'},
	{label: 'publisher', value: 'publisher'}
];

const fieldArray = [
	{
		name: 'role',
		type: 'check',
		label: 'Role',
		option: roleOption,
		width: 'half'
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
		name: 'email',
		type: 'email',
		label: 'Emails',
		width: 'half'
	},
	{
		name: 'defaultLanguage',
		type: 'select',
		label: 'Default Language',
		width: 'half'
	}
];

export default connect(null, actions)(reduxForm({
	form: 'userCreation',
	validate
})(
	props => {
		const {handleSubmit, clearFields, valid, createUser} = props;
		const classes = useStyles();
		const [cookie] = useCookies('login-cookie');
		const token = cookie['login-cookie'];

		function getStepContent() {
			return element(fieldArray, classes, clearFields);
		}

		function handleCreateUser(values) {
			const newUser = {
				...values,
				role: values.role[0],
				preferences: {defaultLanguage: values.defaultLanguage}
			};
			delete newUser.defaultLanguage;
			createUser(newUser, token);
		}

		const component = (
			<form className={classes.container} onSubmit={handleSubmit(handleCreateUser)}>
				<div className={classes.subContainer}>
					<Grid container spacing={3} direction="row">
						{(getStepContent())}
					</Grid>
					<div className={classes.btnContainer}>
						<Button type="submit" disabled={!valid} variant="contained" color="primary">
							Submit
						</Button>
					</div>
				</div>
			</form>
		);

		return {
			...component,
			defaultProps: {
				formSyncErrors: null
			},
			propTypes: {
				handleSubmit: PropTypes.func.isRequired,
				pristine: PropTypes.bool.isRequired,
				formSyncErrors: PropTypes.shape({}),
				registerPublisher: PropTypes.func.isRequired,
				valid: PropTypes.bool.isRequired
			}
		};
	}));

function element(array, classes, clearFields) {
	return array.map(list =>

		// eslint-disable-next-line no-negated-condition
		((list.width !== 'half') ?
			<Grid key={list.name} item xs={12}>
				<Field
					className={`${classes.textField} ${list.width}`}
					component={renderTextField}
					label={list.label}
					name={list.name}
					type={list.type}
				/>
			</Grid> :
			((list.type === 'arrayString') ?
				<Grid key={list.name} item xs={12}>
					<FieldArray
						className={`${classes.arrayString} ${list.width}`}
						component={renderAliases}
						name={list.name}
						type={list.type}
						label={list.label}
						props={{clearFields, name: list.name, subName: list.subName}}
					/>
				</Grid> :
				((list.type === 'check') ?
					<Grid key={list.name} item xs={6}>
						<FieldArray
							className={`${classes.textField} ${list.width}`}
							component={renderCheckboxes}
							label={list.label}
							name={list.name}
							type={list.type}
							options={list.option}
							props={{name: list.name}}
						/>
					</Grid>	:
					// ((list.type === 'select') ?
					// 	<Grid key={list.name} item xs={6}>
					// 		<FieldArray
					// 			className={`${classes.textField} ${list.width}`}
					// 			component={renderTextField}
					// 			label={list.label}
					// 			name={list.name}
					// 			type={list.type}
					// 			options={list.option}
					// 			props={{name: list.name}}
					// 		/>
					// 	</Grid>	:

						<Grid key={list.name} item xs={6}>
							<Field
								className={`${classes.textField} ${list.width}`}
								component={renderTextField}
								label={list.label}
								name={list.name}
								type={list.type}
							/>
						</Grid>)))
	);
}
