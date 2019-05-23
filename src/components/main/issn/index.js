import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import useStyles from '../../../styles/issn';

const Issn = () => {
	const classes = useStyles();
	return (
		<div className={classes.IssnContainer}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h4" gutterBottom>ISSN</Typography>
					<hr/>
					<Typography paragraph>
                    ISSN identifies continuously published publications, as journals and series. The Finnish national ISSN Agency is responsible for providing the identifiers in Finland and sends the information about publications that have received an ISSN to the ISSN Portal database.
					</Typography>
					<Typography paragraph>
                    Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications.
					</Typography>
					<Typography>
                    The identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the identification of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval. ISSN is inseparable with the title of the publication; if the title of the publication changes, the identifier must also be changed. A separate ISSN is given to various forms of publication.
					</Typography>
				</Grid>
			</Grid>
		</div>
	);
};

export default Issn;
