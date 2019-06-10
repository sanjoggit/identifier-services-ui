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
import {AppBar, Button, Menu, MenuItem} from '@material-ui/core';

import useStyles from '../../styles/adminNav';

export default function () {
	const classes = useStyles();
	const obj = [
		{
			label: 'Publishers'
		},
		{
			label: 'requests',
			listItem: [
				{label: 'Publisher'}, {label: 'Publications'}, {label: 'Users'}
			]
		},
		{
			label: 'users'
		},
		{
			label: 'identifier Ranges',
			listItem: [
				{label: 'ISBN'}, {label: 'ISMN'}, {label: 'ISSN'}
			]
		},
		{
			label: 'message templates'
		}
	];
	const nav = (
		<AppBar position="static" color="secondary">
			<div className={classes.adminNav}>
				{obj.map(list => (
					<div key={list.label} className={classes.btnHolder}>
						{CustomizedMenus(list)}
					</div>
				))}
			</div>
		</AppBar>
	);
	return {
		...nav
	};
}

function CustomizedMenus(list) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	return (
		<>
			<Button onClick={handleClick}>
				{list.label}
			</Button>
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
					{list.listItem.map(item =>
						<MenuItem key={item.label}>{item.label}</MenuItem>
					)}
				</Menu>
			}
		</>
	);
}
