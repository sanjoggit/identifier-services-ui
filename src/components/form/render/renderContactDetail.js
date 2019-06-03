import React from 'react';
import {Grid, Fab} from '@material-ui/core';
import {Field} from 'redux-form';
import renderTextField from './renderTextField';
import useStyles from '../../../styles/form';

const renderContactDetail = ({fields, contactDetails, meta}) => {
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
			<Fab
				variant="extended"
				size="medium"
				color="primary"
				onClick={() => fields.push({})}
			>
                Add More Contact Details
			</Fab>
		</>

	);
};

export default renderContactDetail;
