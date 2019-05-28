/* eslint-disable react/jsx-indent */
/* eslint-disable no-mixed-spaces-and-tabs */
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
import {Field, FieldArray, reduxForm, isPristine, getFormSyncErrors} from 'redux-form';
import {Button, Grid, Stepper, Step, StepButton} from '@material-ui/core';
import PropTypes from 'prop-types';
// Import {validate} from '@natlibfi/identifier-services-commons';

import renderTextField from './render/renderTextField';
import renderTextArea from './render/renderTextArea';
import RenderChipsField from './render/renderChipsField';
import useStyles from '../../styles/form';
import * as actions from '../../store/actions';

const fieldArray = [
	{
		basicInformation: [
			{
				name: 'name',
				type: 'text',
				label: 'Name',
				width: 'half'
			},
			{
				name: 'publisherEmail',
				type: 'email',
				label: 'Publisher Email',
				width: 'half'
			},
			{
				name: 'publicationEstimate',
				type: 'number',
				label: 'Publication Estimate',
				width: 'half'
			},
			{
				name: 'website',
				type: 'text',
				label: 'Website',
				width: 'half'
			},
			{
				name: 'aliases',
				type: 'chips',
				label: 'Aliases',
				width: 'full'
			}
		]
	},
	{
		contactDetails: [
			{
				name: 'givenName',
				type: 'text',
				label: 'Given Name',
				width: 'full'
			},
			{
				name: 'familyName',
				type: 'text',
				label: 'Family Name',
				width: 'full'
			},
			{
				name: 'email',
				type: 'email',
				label: 'Email',
				width: 'full'
			}

		]
	},
	{
		address: [
			{
				name: 'streetAddress',
				type: 'text',
				label: 'Street Address',
				width: 'full'
			},
			{
				name: 'city',
				type: 'text',
				label: 'City',
				width: 'full'
			},
			{
				name: 'zip',
				type: 'number',
				label: 'Zip',
				width: 'full'
			}

		]
	}
];

function getSteps() {
	return fieldArray.map(item => Object.keys(item));
}

const PublisherRegistrationForm = props => {
	const {handleSubmit, registration, pristine, valid} = props;
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();

	function getStepContent(step) {
		switch (step) {
			case 0:
				return element(fieldArray[0].basicInformation);
			case 1:
				return element(fieldArray[1].contactDetails);
			case 2:
				return element(fieldArray[2].address);
			default:
				return 'Unknown step';
		}
	}

	function element(array) {
		return array.map(list =>
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
					((list.type === 'chips') ?
						<Grid key={list.name} item xs={12}>
							<FieldArray
								component={RenderChipsField}
								className={`${classes.chipField} ${list.width}`}
								label={list.label}
								name={list.name}
								type={list.type}
							/>
						</Grid>						:
						<Grid key={list.name} item xs={12}>
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

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	}

	return (
		<form className={classes.container} onSubmit={handleSubmit(registration)}>
			<Stepper alternativeLabel activeStep={activeStep}>
				{steps.map(label => (
					<Step key={label}>
						<StepButton className={classes.stepLabel}>
							{label}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<div className={classes.subContainer}>
				<Grid container spacing={3} direction="row">
					{(getStepContent(activeStep))}
				</Grid>
				<div className={classes.btnContainer}>
					<Button disabled={activeStep === 0} onClick={handleBack}>
							Back
					</Button>
					{
						activeStep === steps.length - 1 ?
							<Button disabled={pristine} variant="contained" color="primary" onClick={handleSubmit(registration)}>
						Submit
							</Button> :
							<Button disabled={pristine || !valid} variant="contained" color="primary" onClick={handleNext}>
						Next
							</Button>
					}
				</div>
			</div>
		</form>
	);
};

const mapStateToProps = state => ({
	pristine: isPristine('publisherRegistrationForm')(state),
	formSyncErrors: getFormSyncErrors('publisherRegistrationForm')(state)
});

export default connect(mapStateToProps, actions)(reduxForm({form: 'publisherRegistrationForm', validate, destroyOnUnmount: true})(PublisherRegistrationForm));

PublisherRegistrationForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	registration: PropTypes.func.isRequired,
	pristine: PropTypes.bool.isRequired,
	formSyncErrors: PropTypes.shape({}),
	valid: PropTypes.bool.isRequired
};

PublisherRegistrationForm.defaultProps = {
	formSyncErrors: null
};

export function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = 'Name is Required!!';
	  } else if (values.length < 2 && values.length > 20) {
		errors.name = 'Name length must be between 2-20';
	  } else if (/[0-9]/i.test(values.name)) {
		errors.name = 'Name should not have numbers';
	  }

	if (!values.email) {
		errors.email = 'Email is Required!!!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid e-mail address';
	}

	if (!values.publisherEmail) {
		errors.publisherEmail = 'Publisher\'s Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.publisherEmail)) {
		errors.email = 'Invalid e-mail address';
	}

	if (!values.publicationEstimate) {
		errors.publicationEstimate = 'This Field cannot be left empty!!';
	} else if (!/[0-9]/i.test(values.publicationEstimate)) {
		errors.publicationEstimate = 'Numbers only!!!';
	}

	if (!values.website) {
		errors.website = 'The Field cannot be left empty';
	}

	console.log(values);
	if (values.aliases === {}) {
		errors.aliases = 'Aliases cannot be empty';
	}

	return errors;
}
