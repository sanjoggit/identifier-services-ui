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
import {AppBar, Button} from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';

import useStyles from '../../styles/adminNav';
import MenuTabs from './menuTabs';

export default function ({user: {role, isLoggedIn}}) {
	const classes = useStyles();
	function HomeIcon(props) {
		return (
			<Link to="/">
				<SvgIcon {...props}>
					<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
				</SvgIcon>
			</Link>
		);
	}

	const obj = [
		{
			label: 'Publishers',
			roleView: ['admin', 'publisher'],
			path: '/publishers',
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
				{label: 'Publisher', roleView: ['admin']},
				{label: 'Publications', roleView: ['admin', 'publisher']},
				{label: 'Users', roleView: ['admin', 'publisher']}
			]
		},
		{
			label: 'users',
			roleView: ['admin', 'publisher']
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
		<AppBar position="static" color="secondary">
			<div className={isLoggedIn ? classes.adminNavLoggedIn : classes.adminNav}>
				{isLoggedIn ?
					obj.map(list => list.roleView.includes(role) && (
						<div key={list.label} className={classes.btnHolder}>
							<MenuTabs role={role} list={list}/>
						</div>
					)) :
					<>
						<HomeIcon className={classes.homeIcon} fontSize="large"/>
						<Button className={classes.selected}>Publishers</Button>
					</>
				}
			</div>
		</AppBar>
	);

	return {
		...nav
	};
}

