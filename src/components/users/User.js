/* eslint-disable react-hooks/exhaustive-deps */

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
import {
	Typography,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	Fab,
	Chip,
	Paper,
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {reduxForm, Field, FieldArray} from 'redux-form';
import {useCookies} from 'react-cookie';

import useStyles from '../../styles/publisher';
import useFormStyles from '../../styles/form';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {validate} from '@natlibfi/identifier-services-commons';
import ModalLayout from '../ModalLayout';
import Spinner from '../Spinner';
import renderTextField from '../form/render/renderTextField';
import renderAliases from '../form/render/renderAliases';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'userCreation',
	validate,
	enableReinitialize: true
})(props => {
	const {handleSubmit, clearFields, match, user, userInfo, loading, fetchUser} = props;
	console.log(user)
	const classes = useStyles();
	const formClasses = useFormStyles();
	const {role} = userInfo;
	const [isEdit, setIsEdit] = useState(false);
	const [cookie] = useCookies('login-cookie');

	useEffect(() => {
		console.log(props);
		fetchUser(match.params.id);
	}, [fetchUser=== undefined]);

	const handleEditClick = () => {
		setIsEdit(true);
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	let userDetail;
	if (user === undefined || loading) {
		userDetail = <Spinner/>;
	} else {
		userDetail = (
			<>
				<Grid item xs={12} md={6}>
					<Typography variant="h6">
						User's Detail
					</Typography>
					<List>
						<ListItem>
							<ListItemText>
								<Grid container>
									<Grid item xs={4}>Name:</Grid>
									{isEdit ?
										<Grid item xs={8}><Field name="name" className={formClasses.editForm} component={renderTextField}/></Grid> :
										<Grid item xs={8}>{user.name}</Grid>
									}
								</Grid>
							</ListItemText>
						</ListItem>
						<ListItem>
							<ListItemText>
								{isEdit ?
									null :
									<Grid container>
										<Grid item xs={4}>Notes:</Grid>
										{/* <Grid item xs={8}>{publisher.notes.map((item, i) => {
											return (
												<ExpansionPanel key={i}>
													<ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
														<Typography className={classes.heading}>Expansion Panel 1</Typography>
													</ExpansionPanelSummary>
													<ExpansionPanelDetails>
														<Paper className={classes.notesContainer}>
															{item}
														</Paper>
													</ExpansionPanelDetails>
												</ExpansionPanel>
											);
										})}
										</Grid> */}
									</Grid>}
							</ListItemText>
						</ListItem>
					</List>
				</Grid>
			</>
		);
	}

	const component = (
		<ModalLayout isTableRow color="primary" label="User Detail">
			{isEdit ?
				<div className={classes.publisher}>
					<form>
						<Grid container spacing={3} className={classes.publisherSpinner}>
							{userDetail}
						</Grid>
						<div className={classes.btnContainer}>
							<Button onClick={handleCancel}>Cancel</Button>
							<Button variant="contained" color="primary">
								UPDATE
							</Button>
						</div>
					</form>
				</div> :
				<div className={classes.publisher}>
					<Grid container spacing={3} className={classes.publisherSpinner}>
						{userDetail}
					</Grid>
					{role.some(item => item === 'admin') &&
						<div className={classes.btnContainer}>
							<Fab
								color="primary"
								size="small"
								title="Edit User Detail"
								onClick={handleEditClick}
							>
								<EditIcon/>
							</Fab>
						</div>}
				</div>
			}
		</ModalLayout>
	);
	return {
		...component
	};
}));

function mapStateToProps(state) {
	return ({
		user: state.users.user,
		loading: state.publisher.loading,
		initialValues: state.users.user,
		userInfo: state.login.userInfo
	});
}
