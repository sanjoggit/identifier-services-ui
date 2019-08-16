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
import {connect} from 'react-redux';
import {NavLink as Link} from 'react-router-dom';
import {Button, Menu, MenuItem} from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

import useStyles from '../../styles/adminNav';
import * as actions from '../../store/actions';

export default connect(null, actions)(props => {
	const {list, role} = props;
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}

	const component = (
		<>
			<div className={classes.publicMenu} onMouseOver={handleClick}>
				<Link exact to={`/${list.path}`} activeClassName={classes.active}><Button>{list.label}</Button></Link>
				{list.listItem && <ArrowDropDown/>}
			</div>

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
				{list.listItem.map(item => item.roleView && role.some(item => list.roleView.includes(item)) &&
				<Link exact to={`/${item.path}`} activeClassName={classes.active}>
					<MenuItem key={item.label}>{item.label}</MenuItem>
				</Link>
				)}
			</Menu>
			}
		</>
	);
	return {
		...component
	};
});
