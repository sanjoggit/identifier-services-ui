import React, {useState} from 'react';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {Menu, MenuItem} from '@material-ui/core';

const LangSelect = () => {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<LanguageIcon
				aria-owns={anchorEl ? 'language-menu' : undefined}
				aria-haspopup="true"
				style={{marginLeft: 20}}
				onClick={handleClick}
			/>
			&nbsp;<span>EN</span>
			<ArrowDropDown onClick={handleClick}/>
			<Menu
				id="language-menu"
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Sv</MenuItem>
				<MenuItem onClick={handleClose}>En</MenuItem>
			</Menu>
		</>
	);
};

export default LangSelect;
