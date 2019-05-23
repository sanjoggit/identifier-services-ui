import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import styles from '../../../styles/mainNav';

const MainNav = props => {
	const {classes} = props;
	return (
		<div>
			<AppBar position="static" color="default">
				<Toolbar className={classes.mainNav}>
					<Typography variant="h6" color="primary">
                        Home
					</Typography>
					<Typography variant="h6" color="primary" className={classes.isbnIsmn}>
                        Isbn&amp;Ismn
					</Typography>
					<Typography variant="h6" color="primary">
                        Issn
					</Typography>
				</Toolbar>
			</AppBar>
		</div>

	);
};

MainNav.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(MainNav);
