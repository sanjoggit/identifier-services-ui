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
import {Typography, Grid} from '@material-ui/core';

import useStyles from '../../styles/formList';
import ModalLayout from '../ModalLayout';
import UserRequestForm from '../form/UserRequestForm';
import PublisherRegistrationForm from '../form/PublisherRegistrationForm';
import ContactForm from '../form/ContactForm';

const formListsArray = [
	{label: 'Publisher Registration', name: 'publisherRegistration', component: <PublisherRegistrationForm/>},
	{label: 'Publication', name: 'publication', component: <UserRequestForm/>},
	{label: 'Contact Form', name: 'contactForm', component: <ContactForm/>}

];

export default function () {
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
}
