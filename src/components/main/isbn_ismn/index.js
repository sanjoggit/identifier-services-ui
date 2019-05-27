import React from 'react';
import {Grid, Typography, Fab} from '@material-ui/core';
import RightIcon from '@material-ui/icons/ChevronRight';
import useStyles from '../../../styles/isbnismn';
import {para1, para2, para3} from './text';

const IsbnIsmn = () => {
	const classes = useStyles();
	return (
		<div className={classes.IsbnIsmnContainer}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h4">ISBN and ISMN </Typography>
					<hr/>
					<Typography paragraph>
						{para1}
					</Typography>
					<Typography paragraph>
						{para2}
					</Typography>
					<Typography paragraph>
						{para3}
					</Typography>
					<Fab
						variant="extended"
						size="medium"
						color="primary"
						href="https://www.kansalliskirjasto.fi/en/services/expert-services-of-data-description/isbn"
						target="_blank"
					>
                        More in details
						<RightIcon/>
					</Fab>
				</Grid>
			</Grid>
		</div>
	);
};

export default IsbnIsmn;
