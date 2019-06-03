import React from 'react';
import renderTextField from './renderTextField';
import {Field} from 'redux-form';
import {Button, Grid, IconButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';

const renderAliases = ({fields, meta: {touched, error}}) => (
	<>
		<Grid>
			{fields.map((item, index) => (
				<Grid key={index} item xs={6}>
					<Field
						name={item}
						type="text"
						component={renderTextField}
						label={`Aliases ${index + 1}`}
        			/>
					<IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
						<ClearIcon/>
					</IconButton>
				</Grid>
        	))}
		</Grid>
		{touched && error && <span>{error}</span>}
		<Button
			variant="outlined"
			size="medium"
			color="primary"
			aria-label="Add"
			style={{marginTop: '10px'}}
			onClick={() => fields.push()}
		>
			<AddIcon/>
            Add Aliases
		</Button>
	</>
);

export default renderAliases;
