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

import React, {useState, useEffect} from 'react';
import {Field, reduxForm} from 'redux-form';
import {PropTypes} from 'prop-types';
import {Grid, Button} from '@material-ui/core';
import Recaptcha from 'react-recaptcha';
import {validate} from '@natlibfi/identifier-services-commons';
import {connect} from 'react-redux';

import renderTextField from './render/renderTextField';
import renderTextArea from './render/renderTextArea';
import useStyles from '../../styles/form';
import * as actions from '../../store/actions';

export default connect(mapToProps, actions)(reduxForm({
	form: 'contactForm', validate
})(
	props => {
		const {handleSubmit, pristine, valid, contact, loading, history, handleClose} = props;
		const initialState = {};
		const [state, setState] = useState(initialState);
		console.log(props);

		useEffect(() => {
			return () => {
				// LoadReCaptcha(RECAPTCHA_SITE_KEY);
			};
		}, []);

		function recaptchaloaded() {
			console.log('dddd');
		}

		function verifyCallback(response) {
			console.log(response);
		}

		const handleClick = values => {
			setState({...state, values});
			contact(values); // Need to build inorder for this function to work
			handleClose();
			history.push('/');
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
				<Recaptcha
					sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
					render="explicit"
					onloadCallback={recaptchaloaded}
					verifyCallback={verifyCallback}
				/>
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
							disabled={pristine || !valid}
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

function mapToProps(state) {
	return ({
		responseMessage: state.contact.responseMessage,
		loading: state.contact.loading
	});
}
