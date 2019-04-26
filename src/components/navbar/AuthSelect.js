import React, {useState} from 'react';
import PersonIcon from '@material-ui/icons/Person';
import {Menu, MenuItem} from '@material-ui/core';

const AuthSelect = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<PersonIcon
				aria-owns={anchorEl ? 'auth-menu' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			/>
			<Menu
				id="auth-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Login</MenuItem>
				<MenuItem onClick={handleClose}>Register</MenuItem>
			</Menu>
		</div>
	);
};

export default AuthSelect;
