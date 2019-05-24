import React from 'react';
import {Typography, Grid} from '@material-ui/core';

import useStyles from '../../../styles/formList';
import ModalLayout from '../../ModalLayout';
import UserRequestForm from '../../form/UserRequestForm';
import PublisherRegistrationForm from '../../form/PublisherRegistrationForm';

const formListsArray = [
	{label: 'Publisher Registration', name: 'publisherRegistration', component: <UserRequestForm/>},
	{label: 'Publication', name: 'publication', component: <PublisherRegistrationForm/>},
	{label: 'Contact Form', name: 'contactForm', component: <UserRequestForm/>}

];

const FormList = () => {
	const classes = useStyles();
	return (
		<div className={classes.formListContainer}>
			<Grid container spacing={2} className={classes.formContainer}>
				<Grid item xs={12}>
					<Typography variant="h4" align="center">Forms</Typography>
				</Grid>

				{formListsArray.map(item => (
					<ModalLayout key={item.label} label={item.label} name={item.name}>
						{item.component}
					</ModalLayout>
				))}
			</Grid>
		</div>
	);
};

export default FormList;
