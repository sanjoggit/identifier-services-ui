import React from 'react';
import {Button, Grid} from '@material-ui/core';
import {Field} from 'redux-form';
import renderTextField from './renderTextField';
import useStyles from '../../../styles/form';

const renderFieldArray = ({fields, contactDetails, meta}) => {
    const classes = useStyles();
	fields.getAll() === undefined && fields.push({});
	return (
		<>
			{fields.map(field => contactDetails.map(list =>
				(
					<Grid key={list.name} item xs={12}>
						<Field
							className={`${classes.textField} ${list.width}`}
							component={renderTextField}
							label={list.label}
							name={field ? `${field}.${list.name}` : list.name}
							type={list.type}
						/>
					</Grid>
				)))}
			{meta.touched && meta.error && <span>{meta.error}</span>}
			<Button onClick={() => fields.push({})}>Plus</Button>
		</>

	);
};

export default renderFieldArray;
