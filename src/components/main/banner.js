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
import {Container, Typography} from '@material-ui/core';

import useStyles from '../../styles/banner';

export default function () {
	const classes = useStyles();
	return (
		<div className={classes.bannerContainer}>
			<Container className={classes.textContainer}>
				<Typography variant="h2" align="center">Identifier Services</Typography>
				<Typography variant="h5" align="center">
                    ISBN identifies books, ISMN notated music publications and ISSN serial publications. In Finland, these identifiers are applied for from the Finnish ISBN and ISSN Agencies operating at the National Library of Finland. The identifiers are free of charge.
				</Typography>
			</Container>
		</div>
	);
}
