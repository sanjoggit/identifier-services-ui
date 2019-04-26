import React from 'react';
import PropTypes from 'prop-types';
import {
	Grid,
	withStyles,
	Typography,
	List,
	ListItem,
	ListItemText,
	Link
} from '@material-ui/core';
import styles from '../../styles/home';

const Home = props => {
	const {classes} = props;
	const list = [
		{
			href: 'https://www.kiwi.fi/display/ISBNjaISMN/In+English+-+ISBN+and+ISMN',
			name: 'ISBN'
		},
		{
			href: 'https://www.kiwi.fi/display/ISBNjaISMN/In+English+-+ISBN+and+ISMN',
			name: 'ISMN'
		},
		{
			href: 'https://www.kiwi.fi/display/ISSN/In+English+-+ISSN',
			name: 'ISSN'
		}
	];
	return (
		<>
			<Grid container>
				<Typography variant="h3" className={classes.heading}>
					Identifier Services
				</Typography>
				<Typography variant="body1" className={classes.body}>
					ISBN identifies books, ISMN notated music publications and ISSN serial
					publications. In Finland, these identifiers are applied for from the
					Finnish ISBN and ISSN Agencies operating at the National Library of
					Finland. The identifiers are free of charge.
				</Typography>
				<List>
					{list.map(item => (
						<ListItem key={item.name}>
							<Link href={item.href} className={classes.link}>
								<ListItemText primary={item.name}/>
							</Link>
						</ListItem>
					))}
				</List>
			</Grid>
		</>
	);
};

Home.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};
export default withStyles(styles)(Home);
