import React from 'react';
import {Typography, Grid, Button} from '@material-ui/core';

import useStyles from '../../../styles/formList';

const FormList = () => {
	const classes = useStyles();
	return (
		<div className={classes.formListContainer}>
			<Grid container spacing={2} className={classes.formContainer}>
				<Grid item xs={12}>
					<Typography variant="h4" align="center">Forms</Typography>
				</Grid>
				<Grid item>
					<Button variant="outlined" color="primary" className={classes.button}>
                                Publisher Registration
					</Button>
				</Grid>
				<Grid item>
					<Button variant="outlined" color="primary" className={classes.button}>
                                Publication
					</Button>
				</Grid>
				<Grid item>
					<Button variant="outlined" color="primary" className={classes.button}>
                                Contact Form
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default FormList;
