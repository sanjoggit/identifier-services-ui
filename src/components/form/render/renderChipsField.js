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
import {PropTypes} from 'prop-types';
import {TextField, InputAdornment, Chip, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import useStyles from '../../../styles/form';

const RenderChipsField = ({fields, input, value, label, className, meta: {touched, error}}) => {
	const classes = useStyles();
	const [chipData, setChipData] = useState([]);
	const [temp, setTemp] = useState({});

	function handleChange(e) {
		setTemp({label: e.target.value});
	}

	function handleDelete(value) {
		const chipToDelete = chipData.indexOf(value);
		fields.remove(chipToDelete);
		chipData.splice(chipToDelete, 1);
	}

	function handleOnclick() {
		if (temp.label !== undefined) {
			if (!chipData.some(item => (item.label === temp.label))) {
				fields.push(temp);
				setChipData([...chipData, temp]);
			}

			setTemp({});
		}
	}

	return (
		<div>
			<TextField
				{...input}
				label={label}
				className={className}
				error={touched && error}
				InputProps={{endAdornment:
	<InputAdornment position="start">
		<IconButton onClick={handleOnclick}>
			<AddIcon/>
		</IconButton>
	</InputAdornment>
				}}
				value={value}
				onChange={handleChange}
			/>
			{chipData.map(data => (
				<Chip
					key={data.label}
					className={classes.chip}
					label={data.label}
					onDelete={() => handleDelete(data)}
				/>
			))}
		</div>
	);
};

export default RenderChipsField;

RenderChipsField.propTypes = {
	input: PropTypes.shape({}),
	label: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	meta: PropTypes.shape({touched: PropTypes.bool, error: PropTypes.bool}),
	children: PropTypes.node,
	value: PropTypes.shape({}),
	fields: PropTypes.arrayOf(PropTypes.shape({}))
};

RenderChipsField.defaultProps = {
	input: null,
	value: null,
	meta: {},
	children: undefined,
	fields: [{}]
};
