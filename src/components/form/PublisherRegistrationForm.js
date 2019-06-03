/* eslint-disable complexity */
/* eslint-disable no-negated-condition */
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
import {Button, Grid, Stepper, Step, StepLabel} from '@material-ui/core';
import PropTypes from 'prop-types';
// Import {validate} from '@natlibfi/identifier-services-commons';

import renderTextField from './render/renderTextField';
import renderAliases from './render/renderAliases';
import useStyles from '../../styles/form';
import {registerPublisher} from '../../store/actions/publisherRegistration';
import renderContactDetail from './render/renderContactDetail';

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
				type: 'arrayString',
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

export default connect(null, {registerPublisher})(reduxForm({
	form: 'publisherRegistrationForm',
	validate
})(
	props => {
		const {handleSubmit, pristine, valid, registerPublisher} = props;
		const classes = useStyles();
		const [activeStep, setActiveStep] = React.useState(0);
		const steps = getSteps();

		function getStepContent(step) {
			switch (step) {
				case 0:
					return element(fieldArray[0].basicInformation, classes);
				case 1:
					return fieldArrayElement(fieldArray[1]);
				case 2:
					return element(fieldArray[2].address, classes);
				default:
					return 'Unknown step';
			}
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
				<Stepper alternativeLabel activeStep={activeStep}>
					{steps.map(label => (
						<Step key={label}>
							<StepLabel className={classes.stepLabel}>
								{label}
							</StepLabel>
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

function element(array, classes, field) {
	return array.map(list =>

		// eslint-disable-next-line no-negated-condition
		((list.width !== 'full') ?
			<Grid key={list.name} item xs={6}>
				<Field
					className={`${classes.textField} ${list.width}`}
					component={renderTextField}
					label={list.label}
					name={field ? `${field}.${list.name}` : list.name}
					type={list.type}
				/>
			</Grid> :
			((list.type === 'arrayString') ?
				<Grid key={list.name} item xs={12}>
					<FieldArray
						component={renderAliases}
						name={list.name}
					/>
				</Grid> :
				<Grid key={list.name} item xs={12}>
					<Field
						className={`${classes.textField} ${list.width}`}
						component={renderTextField}
						label={list.label}
						name={list.name}
						type={list.type}
					/>
				</Grid>))
	);
}

function fieldArrayElement(array) {
	return (
		<FieldArray
			component={renderContactDetail}
			className="full"
			name="contactDetails"
			props={array}
		/>
	);
}

export function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = 'Name is Required!!';
	} else if (values.length < 2 && values.length > 20) {
		errors.name = 'Name length must be between 2-20';
	} else if (/[0-9]/i.test(values.name)) {
		errors.name = 'Name should not have numbers';
	}

	if (!values.publisherEmail) {
		errors.publisherEmail = 'Publisher\'s Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.publisherEmail)) {
		errors.publisherEmail = 'Invalid e-mail address';
	}

	if (!values.publicationEstimate) {
		errors.publicationEstimate = 'This Field cannot be left empty!!';
	} else if (!/[0-9]/i.test(values.publicationEstimate)) {
		errors.publicationEstimate = 'Numbers only!!!';
	}

	if (!values.website) {
		errors.website = 'The Field cannot be left empty';
	}

	if (!values.aliases || !values.aliases.length) {
		errors.aliases = {_error: 'At least one member must be entered'};
	} else {
		const aliasesArrayErrors = [];
		values.aliases.forEach((item, index) => {
			if (!item) {
				aliasesArrayErrors[index] = 'Aliases Required';
			}
		});
		if (aliasesArrayErrors.length) {
			errors.aliases = aliasesArrayErrors;
		}
	}

	if (!values.contactDetails || !values.contactDetails.length) {
		errors.contactDetails = {_error: 'Contact Details need to be provided'};
	} else {
		const contactDetailsErrors = [];
		values.contactDetails.forEach((item, index) => {
			const contactFieldsErrors = {};
			if (!item || !item.givenName) {
				contactFieldsErrors.givenName = 'Required';
				contactDetailsErrors[index] = contactFieldsErrors;
			} else if (item.givenName.length < 2 || item.givenName.length > 20) {
				contactFieldsErrors.givenName = 'Given Name length must be between 2-20';
				contactDetailsErrors[index] = contactFieldsErrors;
			} else if (/[0-9]/i.test(item.givenName)) {
				contactFieldsErrors.givenName = 'Given Name should not have numbers';
				contactDetailsErrors[index] = contactFieldsErrors;
			}

			if (!item || !item.familyName) {
				contactFieldsErrors.familyName = 'Required';
				contactDetailsErrors[index] = contactFieldsErrors;
			} else if (item.familyName.length < 2 || item.familyName.length > 20) {
				contactFieldsErrors.familyName = 'Family Name length must be between 2-20';
				contactDetailsErrors[index] = contactFieldsErrors;
			} else if (/[0-9]/i.test(item.familyName)) {
				contactFieldsErrors.familyName = 'Family Name should not have numbers';
				contactDetailsErrors[index] = contactFieldsErrors;
			}

			if (!item || !item.email) {
				contactFieldsErrors.email = 'Required';
				contactDetailsErrors[index] = contactFieldsErrors;
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(item.email)) {
				contactFieldsErrors.email = 'Invalid e-mail address';
				contactDetailsErrors[index] = contactFieldsErrors;
			}
		});
		if (contactDetailsErrors.length) {
			errors.contactDetails = contactDetailsErrors;
		}
	}

	if (!values.streetAddress) {
		errors.streetAddress = 'Street Address cannot be empty.';
	} else if (values.streetAddress.length < 2) {
		errors.streetAddress = 'Value must be between more than 2 characters';
	}

	if (!values.city) {
		errors.city = 'Please specify a city';
	} else if (values.city.length < 2) {
		errors.city = 'Value must be between more than 2 characters';
	}

	if (!values.zip) {
		errors.zip = 'Zip code cannot be empty';
	} else if (!/[0-9]/i.test(values.zip)) {
		errors.zip = 'Value must be numbers';
	}

	return errors;
}
