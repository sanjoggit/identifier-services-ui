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
import {Link} from 'react-router-dom';
import {AppBar, Button, Grid} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';

import useStyles from '../../styles/adminNav';
import MenuTabs from './menuTabs';

export default function ({userInfo, isAuthenticated}) {
	const classes = useStyles();

	const obj = [
		{
			label: 'Publishers',
			roleView: ['admin', 'publisher'],
			path: 'publishers',
			selected: true
		},
		{
			label: 'Publications',
			roleView: ['admin', 'publisher'],
			listItem: [
				{label: 'ISBN', roleView: ['admin', 'publisher']},
				{label: 'ISMN', roleView: ['admin', 'publisher']},
				{label: 'ISSN', roleView: ['admin', 'publisher']}
			]
		},
		{
			label: 'requests',
			roleView: ['admin', 'publisher'],
			listItem: [
				{label: <Link to="/requests/publishers">Publishers</Link>, roleView: ['admin']},
				{label: 'Publications', roleView: ['admin', 'publisher']},
				{label: 'Users Requests', roleView: ['admin', 'publisher']}
			]
		},
		{
			label: 'users',
			roleView: ['admin', 'publisher'],
			path: userInfo.user !== undefined && `users`
		},
		{
			label: 'identifier Ranges',
			roleView: ['admin'],
			listItem: [
				{label: 'ISBN', roleView: ['admin']},
				{label: 'ISMN', roleView: ['admin']},
				{label: 'ISSN', roleView: ['admin']}
			]
		},
		{
			label: 'message templates',
			roleView: ['admin']
		}
	];
	const nav = (
		<Grid container>
			<Grid item xs={12}>
				<AppBar position="static" color="secondary">
					<div>
						<div className={classes.adminMenu}>
							{isAuthenticated ?
								obj.map(list => userInfo.role.some(item => list.roleView.includes(item)) && (
									<div key={list.label}>
										<MenuTabs role={userInfo.role} list={list}/>
									</div>
								)) :
								<div className={classes.publicMenu}>
									<Link to="/"><HomeIcon fontSize="default" color="primary"/></Link>
									<Link to="/publishers"><Button className={classes.selected}>Publishers</Button></Link>
								</div>
							}
						</div>
					</div>
				</AppBar>
			</Grid>
		</Grid>
	);

	return {
		...nav
	};
}

