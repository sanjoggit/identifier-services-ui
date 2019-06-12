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
import {Typography, Box, List, ListItem} from '@material-ui/core';
import useStyles from '../../styles/publisher';

import ModalLayout from '../ModalLayout';

export default function () {
	const classes = useStyles();
	return (
		<ModalLayout isTableRow color="primary" label="Publisher Detail">
			<div className={classes.publisher}>
				<Typography variant="h6">
                Ab FM Media Plaza Ltd
				</Typography>
				<Box component="div">
					<List>
						<ListItem>
							Address: Eskilomvägen 294
						</ListItem>
						<ListItem>
                            Postcode :	07880
						</ListItem>
						<ListItem>
                            Postal city :	LILJENDAL
						</ListItem>
						<ListItem>
                            Telephone :	(019) 616 077,040 553 7739
						</ListItem>
					</List>
				</Box>
			</div>
		</ModalLayout>
	);
}
