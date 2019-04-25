import React from 'react'
import { Grid, withStyles, Typography, List, ListItem, ListItemText, Link } from '@material-ui/core';
import styles from '../../styles/home'

const Home = (props) => {
	const { classes } = props;
	const list = [
		{
			href: "ISBN",
			name: "ISBN",
		},
		{
			href: "ISMN",
			name: "ISMN",
		},
		{
			href: "ISSN",
			name: "ISSN",
		},
	]
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
					{list.map(item =>
						<ListItem key={item.href}>
							<Link href={item.href} className={classes.link}>
								<ListItemText primary={item.name} />
							</Link>
						</ListItem>
					)}

				</List>
			</Grid>
		</>
	)
}

export default withStyles(styles)(Home)