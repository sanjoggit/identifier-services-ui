import React from 'react';
import {Grid, Box} from '@material-ui/core';
import useStyles from '../../styles/footer';

const Footer = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.footer}>
			<Grid item xs={12} className={classes.footerContainer}>
				<Box component="span">
                        The National Library of Finland <br/> P.O.Box 15(Unioninkatu 36) <br/> 00014 University of Helsinki
				</Box>
				<Box component="span">
                        Telephone: <br/> +358294123196
				</Box>
				<Box component="span">
                        &copy;University of Helsinki <br/> 2015
				</Box>
			</Grid>
		</Grid>
	);
};

export default Footer;
