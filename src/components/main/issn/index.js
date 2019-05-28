import React from 'react';
import {Grid, Typography, Button} from '@material-ui/core';
import RightIcon from '@material-ui/icons/ChevronRight';
import useStyles from '../../../styles/issn';
import {para1, para2, para3} from './text';

const Issn = () => {
	const classes = useStyles();
	return (
		<div className={classes.IssnContainer}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h4">ISSN</Typography>
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
					<Button
						color="primary"
						href="https://www.kansalliskirjasto.fi/en/services/expert-services-of-data-description/issn"
						target="_blank"
					>
						More in details
						<RightIcon/>
					</Button>
				</Grid>
			</Grid>
		</div>
	);
};

export default Issn;
