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
import {Typography, Grid, List, ListItem, ListItemText, Fab, Chip, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../../styles/publisher';

import ModalLayout from '../ModalLayout';

export default function () {
	const classes = useStyles();
	const publisherDetail = {
		name: 'Sanjog Shrestha',
		publicationEstimate: 44,
		publisherEmail: 'sanjog@gmail.com',
		streetAddress: 'Asiakkankatu',
		Website: 'something.com',
		zip: 440,
		city: 'Helsinki',
		aliases: ['alias1', 'alias2', 'alias3'],
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
	return (
		<ModalLayout isTableRow color="primary" label="Publisher Detail">
			<div className={classes.publisher}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<Typography variant="h6">
                            Basic Information
						</Typography>
						<List>
							<ListItem>
								<ListItemText>Name: {publisherDetail.name}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Publisher Email :{publisherDetail.publisherEmail}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Publication Estimate :{publisherDetail.publicationEstimate}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Website :{publisherDetail.Website}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Aliases :	{publisherDetail.aliases.map((item, index) => (
									<Chip
										key={index}
										label={item}
									/>
								))}
								</ListItemText>
							</ListItem>
						</List>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="h6">
                            Address
						</Typography>
						<List>
							<ListItem>
								<ListItemText>Street Address: {publisherDetail.streetAddress}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>City: {publisherDetail.city}</ListItemText>
							</ListItem>
							<ListItem>
								<ListItemText>Zip: {publisherDetail.zip}</ListItemText>
							</ListItem>
						</List>

					</Grid>
					<Grid item xs={6}>
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
									<List>

										<ListItem>
											<ListItemText>Given Name: {item.givenName}</ListItemText>
										</ListItem>
										<ListItem>
											<ListItemText>Family Name :	{item.familyName}</ListItemText>
										</ListItem>
										<ListItem>
											<ListItemText>Email : {item.email}</ListItemText>
										</ListItem>
									</List>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))}
					</Grid>
				</Grid>
				<Fab color="primary" aria-label="Add" className={classes.publisherEditIcon} title="Edit Publisher Detail">
					<EditIcon/>
				</Fab>
			</div>
		</ModalLayout>
	);
}
