import React from 'react'
import { Paper, Grid, withStyles, Typography, List, ListItem, ListItemText, Link } from '@material-ui/core';
import styles from '../../styles/home'

const IsbnAndIsmn = (props) => {
	const { classes } = props;
	return (
		<>
			<Grid container >
				<Typography variant="h3" className={classes.heading}>
					ISBN and ISMN
				</Typography>
				<Typography variant="body1" className={classes.body}>
					ISBN identifies <b>books</b> and <b>ISMN notated music publications</b> intended for public use. The Finnish national ISBN Agency is responsible for handing out ISBNs and ISMNs in Finland. The Agency maintains a national publisher register and provides information about Finnish publishers for national and international use.
				</Typography>
				<Typography variant="body1" className={classes.body}>
					Identifiers as a part of metadata serve the publishing industry and library sector in their entirety and support identification, processing and availability of publications. The identifiers are used, for example, in publishing industry's ordering and distribution systems to speed up the recognition of publications as well as international and domestic joint catalogues, bibliographies, library lending systems and information retrieval.
				</Typography>
				<Typography variant="body1" className={classes.body}>
					Each book or sheet music publication and publication form (printed, audio-visual, digital) and each edition containing changes are rewarded a separate ISBN or ISMN. This promotes the identification of publications in the publishing industry's distribution chain and ensures that customers get the desired publication at their disposal. Publication format may be a printed book or an audiovisual or electronic recording.
				</Typography>
				<List>
					<ListItem>
						<Link href={"ISBN"} className={classes.link}>
							<ListItemText primary="ISBN" />
						</Link>
					</ListItem>
					<ListItem>
						<Link href={"ISBN"} className={classes.link}>
							<ListItemText primary="ISMN" />
						</Link>
					</ListItem>
					<ListItem>
						<Link href={"ISBN"} className={classes.link}>
							<ListItemText primary="ISSN" />
						</Link>
					</ListItem>
				</List>
			</Grid >
		</>
	)
}

export default withStyles(styles)(IsbnAndIsmn)
