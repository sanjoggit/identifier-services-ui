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

import renderTextField from './render/renderTextField';
import renderAliases from './render/renderAliases';
import useStyles from '../../styles/form';
import {registerPublisher} from '../../store/actions/publisherRegistration';
import renderCheckboxes from './render/renderCheckboxes';

const roleOption = [
	{label: 'system', value: 'system'},
	{label: 'admin', value: 'admin'},
	{label: 'publisher-admin', value: 'publisherAdmin'},
	{label: 'publisher', value: 'publisher'}
];

const fieldArray = [
	{
		name: 'displayName',
		type: 'text',
		label: 'Display Name',
		width: 'half'
	},
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
		name: 'organizations',
		subName: 'organization',
		type: 'arrayString',
		label: 'Organization',
		width: 'half'
	},
	{
		name: 'emails',
		subName: 'email',
		type: 'arrayString',
		label: 'Emails',
		width: 'half'
	}
];

export default connect(null, {registerPublisher})(reduxForm({
	form: 'userCreation',
	validate
})(
	props => {
		const {handleSubmit, clearFields, pristine, valid, registerPublisher} = props;
		const classes = useStyles();
		const [activeStep, setActiveStep] = React.useState(0);
		const steps = getSteps();
		function getStepContent() {
			return element(fieldArray, classes, clearFields);
		}

		function handleNext() {
			setActiveStep(activeStep + 1);
		}

		function handleBack() {
			setActiveStep(activeStep - 1);
		}

		const handlePublisherRegistration = values => {
			const newPublisher = {
				...values
			};
			registerPublisher(newPublisher);
		};

		const component = (
			<form className={classes.container} onSubmit={handleSubmit(handlePublisherRegistration)}>
				<div className={classes.subContainer}>
					<Grid container spacing={3} direction="row">
						{(getStepContent(activeStep))}
					</Grid>
					<div className={classes.btnContainer}>
						<Button disabled={activeStep === 0} onClick={handleBack}>
							Back
						</Button>
						{activeStep !== steps.length - 1 ?
							<Button type="button" disabled={(pristine || !valid) || activeStep === steps.length - 1} variant="contained" color="primary" onClick={handleNext}>
								Next
							</Button> : null
						}
						{
							activeStep === steps.length - 1 &&
							<Button type="submit" disabled={pristine || !valid} variant="contained" color="primary">
								Submit
							</Button>
						}
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

function getSteps() {
	return fieldArray.map(item => Object.keys(item));
}

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
