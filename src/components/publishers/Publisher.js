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

import React, {useState} from 'react';
import {
	Typography,
	Button,
	Grid,
	List,
	ListItem,
	ListItemText,
	Fab,
	Chip,
	ExpansionPanel,
	ExpansionPanelSummary,
	ExpansionPanelDetails
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Field, reduxForm} from 'redux-form';
import renderTextField from '../form/render/renderTextField';
import useStyles from '../../styles/publisher';
import ModalLayout from '../ModalLayout';

export default (reduxForm({
	form: 'publisherDetail'
})(() => {
	const classes = useStyles();
	const [isEdit, setIsEdit] = useState(false);

	const publisherDetail = {
		name: 'sanjog',
		publicationEstimate: 44,
		publisherEmail: 'sanjog@gmail.com',
		streetAddress: 'Asiakkankatu',
		website: 'something.com',
		zip: 440,
		city: 'Helsinki',
		aliases: ['alias1', 'alias2', 'alias3', 'lonngggggggggggggggggggggg alias'],
		contactDetails: [
			{
				givenName: 'Raj',
				familyName: 'Shrestha',
				email: 'random@gmail.com'
			},
			{
				givenName: 'Rojak',
				familyName: 'Amatya',
				email: 'ra@gmail.com'
			},
			{
				givenName: 'Lassi',
				familyName: 'Amatya',
				email: 'ra@gmail.com'
			}
		]

	};
	const listData = [
		{
			basicInfo: [
				{
					label: 'Name',
					value: publisherDetail.name
				},
				{
					label: 'Publisher Email',
					value: publisherDetail.publisherEmail
				},
				{
					label: 'Publication Estimate',
					value: publisherDetail.publicationEstimate
				},
				{
					label: 'Website',
					value: publisherDetail.website
				},
				{
					label: 'Aliases',
					value: publisherDetail.aliases.map((item, index) => (
						<Chip
							key={index}
							label={item}
						/>
					))
				}
			]
		},
		{
			address: [
				{
					label: 'Street Address',
					value: publisherDetail.streetAddress
				},
				{
					label: 'City',
					value: publisherDetail.city
				},
				{
					label: 'Zip',
					value: publisherDetail.zip
				}
			]
		}
	];
	const handleEditClick = () => {
		setIsEdit(true);
	};

	const handleCancel = () => {
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
                            Basic Information
								</Typography>
								{listData[0].basicInfo.map(item => (
									<List key={item.value}>
										<ListItem>
											<ListItemText>
												<Grid container>
													<Grid item xs={6}>{item.label}:</Grid>
													<Grid item xs={6}>
														<Field
															component={renderTextField}
															name="name"
														/>
													</Grid>
												</Grid>
											</ListItemText>
										</ListItem>
									</List>
								))}
							</Grid>
							<Grid item xs={12} md={6}>
								<Typography variant="h6">
                            Address
								</Typography>
								{listData[1].address.map(item => (
									<List key={item.value}>
										<ListItem>
											<ListItemText>
												<Grid container>
													<Grid item xs={6}>{item.label}:</Grid>
													<Grid item xs={6}>{item.value}</Grid>
												</Grid>
											</ListItemText>
										</ListItem>
									</List>
								))}

							</Grid>
							<Grid item xs={12} md={6}>
								{publisherDetail.contactDetails.map((item, index) => (
									<ExpansionPanel key={index}>
										<ExpansionPanelSummary
											expandIcon={<ExpandMoreIcon/>}
											aria-controls="panel1a-content"
											id="panel1a-header"
										>
											<Typography variant="h6">
                                            Contact Detail {index + 1}
											</Typography>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails>
											<List style={{width: '100%'}}>
												<ListItem>
													<ListItemText>
														<Grid container spacing={2}>
															<Grid item xs={6}>Given Name:</Grid>
															<Grid item xs={6}>{item.givenName}</Grid>
														</Grid>
													</ListItemText>
												</ListItem>
												<ListItem>
													<ListItemText>
														<Grid container>
															<Grid item xs={6}>Family Name:</Grid>
															<Grid item xs={6}>{item.familyName}</Grid>
														</Grid>
													</ListItemText>
												</ListItem>
												<ListItem>
													<ListItemText>
														<Grid container>
															<Grid item xs={6}>Email:</Grid>
															<Grid item xs={6}>{item.email}</Grid>
														</Grid>
													</ListItemText>
												</ListItem>
											</List>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								))}
							</Grid>
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
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Typography variant="h6" className={classes.detailHeading}>
                            Basic Information
							</Typography>
							{listData[0].basicInfo.map(item => (
								<List key={item.value}>
									<ListItem>
										<ListItemText>
											<Grid container>
												<Grid item xs={6}>{item.label}:</Grid>
												<Grid item xs={6}>{item.value}</Grid>
											</Grid>
										</ListItemText>
									</ListItem>
								</List>
							))}
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h6" className={classes.detailHeading}>
                            Address
							</Typography>
							{listData[1].address.map(item => (
								<List key={item.value}>
									<ListItem>
										<ListItemText>
											<Grid container>
												<Grid item xs={6}>{item.label}:</Grid>
												<Grid item xs={6}>{item.value}</Grid>
											</Grid>
										</ListItemText>
									</ListItem>
								</List>
							))}

						</Grid>
						<Grid item xs={12} md={6}>
							{publisherDetail.contactDetails.map((item, index) => (
								<ExpansionPanel key={index}>
									<ExpansionPanelSummary
										expandIcon={<ExpandMoreIcon/>}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<Typography variant="h6">
                                            Contact Detail {index + 1}
										</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<List style={{width: '100%'}}>
											<ListItem>
												<ListItemText>
													<Grid container spacing={2}>
														<Grid item xs={6}>Given Name:</Grid>
														<Grid item xs={6}>{item.givenName}</Grid>
													</Grid>
												</ListItemText>
											</ListItem>
											<ListItem>
												<ListItemText>
													<Grid container>
														<Grid item xs={6}>Family Name:</Grid>
														<Grid item xs={6}>{item.familyName}</Grid>
													</Grid>
												</ListItemText>
											</ListItem>
											<ListItem>
												<ListItemText>
													<Grid container>
														<Grid item xs={6}>Email:</Grid>
														<Grid item xs={6}>{item.email}</Grid>
													</Grid>
												</ListItemText>
											</ListItem>
										</List>
									</ExpansionPanelDetails>
								</ExpansionPanel>
							))}
						</Grid>
					</Grid>
					<Fab
						color="primary"
						size="small"
						className={classes.publisherEditIcon}
						title="Edit Publisher Detail"
						onClick={handleEditClick}
					>
						<EditIcon/>
					</Fab>
				</div>
			}
		</ModalLayout>
	);
	return {
		...component
	};
}))
