import React from 'react';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import useStyles from '../../../styles/mainNav';
import HomeIcon from '@material-ui/icons/Home';

const MainNav = props => {
	const classes = useStyles();
	return (
		<div>
			<AppBar position="static" color="default">
				<Toolbar className={classes.mainNav}>
					<div className={classes.menu}>
						<Typography color="primary">
							<HomeIcon/>
						</Typography>
						<Typography variant="h6" color="primary">
                            Isbn&amp;Ismn
						</Typography>
						<Typography variant="h6" color="primary">
                            Issn
						</Typography>
						<Button variant="outlined" color="primary">
                            Finnish Publisher Register
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>

	);
};

export default MainNav;
