import React from 'react';
import {Container, Typography} from '@material-ui/core';

import useStyles from '../../../styles/formList';

const FormList = () => {
    const classes = useStyles();
	return (
		<div className={classes.formListContainer}>
			<Typography variant="h4" align="center">Forms</Typography>
		</div>
	);
};

export default FormList;
