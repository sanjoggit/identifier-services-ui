import React from 'react';
import {Container, Typography} from '@material-ui/core';

import useStyles from '../../../styles/banner';

const Banner = () => {
	const classes = useStyles();
	return (
		<div className={classes.bannerContainer}>
			<Container className={classes.textContainer}>
				<Typography variant="h2" align="center">Identifier Services</Typography>
				<Typography variant="h5" align="center">
                    ISBN identifies books, ISMN notated music publications and ISSN serial publications. In Finland, these identifiers are applied for from the Finnish ISBN and ISSN Agencies operating at the National Library of Finland. The identifiers are free of charge.
				</Typography>
			</Container>
		</div>
	);
};

export default Banner;
