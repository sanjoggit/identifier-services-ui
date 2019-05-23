import React from 'react';
import {Grid, Typography, Box} from '@material-ui/core';
import useStyles from '../../../styles/isbnismn';

const IsbnIsmn = () => {
	const classes = useStyles();
	return (
		<div className={classes.IsbnIsmnContainer}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h4" gutterBottom>ISBN and ISMN </Typography>
					<hr/>
					<Typography paragraph>
                    ISBN identifies books and ISMN notated music publications intended for public use. The Finnish national ISBN Agency is responsible for handing out ISBNs and ISMNs in Finland. The Agency maintains a national publisher register and provides information about Finnish publishers for national and international use.
					</Typography>
					<Typography paragraph>
                    Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications. The identifiers are used, for example, in publishing industry&apos;s ordering and distribution systems to speed up the recognition of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval.
					</Typography>
					<Typography>
                    Each book or sheet music publication and publication form (printed, audio-visual, digital) and each edition containing changes are rewarded a separate ISBN or ISMN. This promotes the identification of publications in the publishing industry&apos;s distribution chain and ensures that customers get the desired publication at their disposal. Publication format may be a printed book or an audiovisual or electronic recording.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default IsbnIsmn;
