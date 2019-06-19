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
import {Grid, Button, Link, Typography} from '@material-ui/core';
import {validate} from '@natlibfi/identifier-services-commons';
import {Field, reduxForm} from 'redux-form';
import renderTextField from '../form/render/renderTextField';
import useStyles from '../../styles/login';
import useFormStyles from '../../styles/form';
import PersonIcon from '@material-ui/icons/Person';
import Visibility from '@material-ui/icons/Visibility';

export default reduxForm({
	form: 'login', validate})(props => {
	console.log(props);
	const {pristine, valid, fakeLogin, handleSubmit} = props;
	const classes = useStyles();
	const formClasses = useFormStyles();

	const component = (
		<form className={classes.loginForm} onSubmit={handleSubmit(fakeLogin)}>
			<section>
				<Grid container className={classes.inputGap} spacing={4} alignItems="flex-end">
					<Grid item xs={1}>
						<PersonIcon className={classes.personIcon}/>
					</Grid>

					<Grid item xs={11}>
						<Field
							className={formClasses.textField}
							name="username"
							label="UserName"
							component={renderTextField}
						/>
					</Grid>
				</Grid>
				<Grid container className={classes.inputGap} spacing={4} alignItems="flex-end">
					<Grid item xs={1}>
						<Visibility className={classes.personIcon}/>
					</Grid>

					<Grid item xs={11}>
						<Field
							className={formClasses.textField}
							name="password"
							label="Password"
							component={renderTextField}
						/>
					</Grid>
				</Grid>
				<Button
					color="primary"
					variant="contained"
					type="submit"
					size="large"
					disabled={pristine || !valid}
				>
					Login
				</Button>
				<div>
					<Link
						component="button"
						variant="body2"
						onClick={() => {
							alert('I\'m a button.');
						}}
					>
						Forgot your Password?
					</Link>
				</div>
			</section>
			<div className={classes.notes}>
				<Typography>Read about management of personal information on the
					<Link> Data protection page.</Link>
				</Typography>
			</div>
		</form>
	);
	return {
		...component
	};
}
);
