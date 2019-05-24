/* eslint-disable no-unused-expressions */
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
import React, {useState} from 'react';
import {Modal, Typography, Button, Grid, Badge} from '@material-ui/core';
import {PropTypes} from 'prop-types';

import useStyles from '../styles/modalLayout';

const ModalLayout = props => {
	const {label, name, children} = props;
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid item>
				<Button variant="outlined" color="primary" className={classes.button} onClick={handleOpen}>
					{label}
				</Button>
			</Grid>

			<Modal
				aria-labelledby={`modal-${name}`}
				aria-describedby="modal-description"
				open={open}
				onClose={handleClose}
			>
				<div style={modalStyle} className={classes.main}>
					<Badge className={classes.badge} badgeContent="X" color="secondary"/>
					<Typography variant="h6" id={`modal-${name}`}>
						This is a text
					</Typography>
					{children}
				</div>
			</Modal>
		</>
	);
};

export default ModalLayout;

ModalLayout.propTypes = {
	label: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	children: PropTypes.shape({}).isRequired
};

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}
