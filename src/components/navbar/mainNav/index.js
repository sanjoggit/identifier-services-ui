import React from 'react';
import {AppBar, Toolbar, Typography, Paper, InputBase, Divider} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import useStyles from '../../../styles/mainNav';

const MainNav = props => {
	const classes = useStyles();
	return (
		<div>
			<AppBar position="static" color="default">
				<Toolbar className={classes.mainNav}>
					<div className={classes.menu}>
						<Typography variant="h6" color="primary">
                            Home
						</Typography>
						<Typography variant="h6" color="primary" className={classes.isbnIsmn}>
                            Isbn&amp;Ismn
						</Typography>
						<Typography variant="h6" color="primary">
                            Issn
						</Typography>
					</div>
					<Paper className={classes.root}>
						<InputBase className={classes.input} placeholder="Search..."/>
						<IconButton color="primary" className={classes.iconButton} aria-label="Directions">
							<ArrowDropDown/>
						</IconButton>
						<Divider className={classes.divider}/>
						<IconButton className={classes.iconButton} aria-label="Search">
							<SearchIcon/>
						</IconButton>
					</Paper>
				</Toolbar>
			</AppBar>
		</div>

	);
};

export default MainNav;
