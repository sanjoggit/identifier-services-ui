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
import {Grid, Box} from '@material-ui/core';
import useStyles from '../styles/footer';

export default function () {
	const classes = useStyles();
	return (
		<Grid container className={classes.footer}>
			<Grid item xs={12} className={classes.footerContainer}>
				<Box component="span">
                        The National Library of Finland <br/> P.O.Box 15(Unioninkatu 36) <br/> 00014 University of Helsinki
				</Box>
				<Box component="span">
                        Telephone: <br/> +358294123196
				</Box>
				<Box component="span">
                        &copy;University of Helsinki 2019
				</Box>
			</Grid>
		</Grid>
	);
}

