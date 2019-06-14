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
	Fab
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {reduxForm, Field} from 'redux-form';
import useStyles from '../../styles/publisher';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import {validate} from '@natlibfi/identifier-services-commons';
import ModalLayout from '../ModalLayout';
import Spinner from '../Spinner';
import renderTextField from '../form/render/renderTextField';

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'publisherDetailForm',
	validate,
	enableReinitialize: true
})(props => {
	const {fetchPublisher, updatePublisher, match, publisher, loading, handleSubmit} = props;
	const classes = useStyles();
	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		fetchPublisher(match.params.id);
	}, [publisher === undefined]);

	const handleEditClick = () => {
		setIsEdit(true);
	};

	const handleCancel = () => {
		setIsEdit(false);
	};

	let publisherDetail;
	if (publisher === undefined || loading) {
		publisherDetail = <Spinner/>;
	} else {
		publisherDetail = (
			<List>
				<ListItem>
					<ListItemText>
						<Grid container>
							<Grid item xs={6}>Name:</Grid>
							{isEdit ? <Grid item xs={6}><Field name="name" component={renderTextField}/></Grid> :
								<Grid item xs={6}>{publisher.name}</Grid>}
						</Grid>
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Grid container>
							<Grid item xs={6}>Language:</Grid>
							{isEdit ? <Grid item xs={6}><Field name="language" component={renderTextField}/></Grid> :
								<Grid item xs={6}>{publisher.language}</Grid>}
						</Grid>
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Grid container>
							<Grid item xs={6}>Email:</Grid>
							{isEdit ? <Grid item xs={6}><Field name="email" component={renderTextField}/></Grid> :
								<Grid item xs={6}>{publisher.email}</Grid>}
						</Grid>
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Grid container>
							<Grid item xs={6}>Phone:</Grid>
							{isEdit ? <Grid item xs={6}><Field name="phone" component={renderTextField}/></Grid> :
								<Grid item xs={6}>{publisher.phone}</Grid>}
						</Grid>
					</ListItemText>
				</ListItem>
				<ListItem>
					<ListItemText>
						<Grid container>
							<Grid item xs={6}>Website:</Grid>
							{isEdit ? <Grid item xs={6}><Field name="website" component={renderTextField}/></Grid> :
								<Grid item xs={6}>{publisher.website}</Grid>}
						</Grid>
					</ListItemText>
				</ListItem>
			</List>
		);
	}

	const handlePublisherUpdate = values => {
		const {_id, ...updateValues} = values;
		updatePublisher(match.params.id, updateValues);
		setIsEdit(false);
	};

	const component = (
		<ModalLayout isTableRow color="primary" label="Publisher Detail">
			{isEdit ?
				<div className={classes.publisher}>
					<form>
						<Grid container spacing={3}>
							<Grid item xs={12} md={6}>
								<Typography variant="h6">
								Publisher Detail
								</Typography>
								{publisherDetail}
							</Grid>
						</Grid>
						<div className={classes.btnContainer}>
							<Button onClick={handleCancel}>Cancel</Button>
							<Button variant="contained" color="primary" onClick={handleSubmit(handlePublisherUpdate)}>
                            UPDATE
							</Button>
						</div>
					</form>
				</div> :
				<div className={classes.publisher}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Typography variant="h6">
                            Publisher Detail
							</Typography>
							{publisherDetail}
						</Grid>
					</Grid>
					<div className={classes.btnContainer}>
						<Fab
							color="primary"
							size="small"
							title="Edit Publisher Detail"
							onClick={handleEditClick}
						>
							<EditIcon/>
						</Fab>
					</div>
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
		publisher: state.publisher.publisher.Publisher,
		loading: state.publisher.loading,
		initialValues: state.publisher.publisher.Publisher
	});
}
