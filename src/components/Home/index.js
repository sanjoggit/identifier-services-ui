import React from 'react'
import { Grid, withStyles, Typography, List, ListItem, ListItemText, Link } from '@material-ui/core';
import styles from '../../styles/home'

const Home = (props) => {
	const { classes } = props;
	return (
		<>
			<Grid container >
				<Typography variant="h3" className={classes.heading}>
					Identifier Services
				</Typography>
				<Typography variant="body1" className={classes.body}>
					ISBN identifies books, ISMN notated music publications and ISSN serial publications. In Finland, these identifiers are applied for from the Finnish ISBN and ISSN Agencies operating at the National Library of Finland. The identifiers are free of charge.
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
			</Grid>
		</>
	)
}

export default withStyles(styles)(Home)