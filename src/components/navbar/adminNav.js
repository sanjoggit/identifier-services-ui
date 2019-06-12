/* eslint-disable new-cap */
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
import {AppBar, Button, Menu, MenuItem, Link} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import SvgIcon from '@material-ui/core/SvgIcon';

import useStyles from '../../styles/adminNav';

export default function ({role}) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const classes = useStyles();

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	function HomeIcon(props) {
		return (
			<SvgIcon {...props}>
				<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
			</SvgIcon>
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
			roleView: ['publisher'],
			listItem: [
				{label: 'ISBN', roleView: ['publisher']},
				{label: 'ISMN', roleView: ['publisher']},
				{label: 'ISSN', roleView: ['publisher']}
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
			<div className={classes.adminNav}>
				<HomeIcon className={classes.homeIcon} fontSize="large"/>
				<div className={classes.adminNavTabs}>

					{obj.map(list => list.roleView.includes(role) && (
						<div key={list.label} className={classes.btnHolder}>
							<>
								<Button className={list.selected && classes.selected} onClick={handleClick}>
									{list.label}
									{list.listItem && <ArrowDropDown/>}
								</Button>
							</>

							{list.listItem &&
							<Menu
								keepMounted
								elevation={0}
								getContentAnchorEl={null}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'center'
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'center'
								}}
								id="customized-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{list.listItem.map(item => item.roleView && item.roleView.includes(role) &&
									<MenuItem key={item.label}>{item.label}</MenuItem>
								)}
							</Menu>
							}
						</div>
					))}
				</div>

			</div>
		</AppBar>
	);

	return {
		...nav
	};
}

