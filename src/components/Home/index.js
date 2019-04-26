import React from 'react';
import PropTypes from 'prop-types';
import {
	Grid,
	withStyles,
	Typography,
	List,
	ListItem,
	ListItemText,
	Link,
	ListItemIcon
} from '@material-ui/core';
import {Lens} from '@material-ui/icons';
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
		<div>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h3" className={classes.heading}>
						Identifier Services
					</Typography>
					<Typography variant="body1">
						ISBN identifies books, ISMN notated music publications and ISSN
						serial publications. In Finland, these identifiers are applied for
						from the Finnish ISBN and ISSN Agencies operating at the National
						Library of Finland. The identifiers are free of charge.
					</Typography>
					<List>
						{list.map(item => (
							<ListItem key={item.name} className={classes.listItem}>
								<ListItemIcon>
									<Lens/>
								</ListItemIcon>
								<Link href={item.href} target="_blank">
									<ListItemText
										primary={
											<Typography type="body2" style={{color: '#0077bb'}}>
												{item.name}
											</Typography>
										}
									/>
								</Link>
							</ListItem>
						))}
					</List>
				</Grid>
			</Grid>
		</div>
	);
};

Home.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};
export default withStyles(styles)(Home);
