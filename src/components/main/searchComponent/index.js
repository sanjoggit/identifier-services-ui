import React from 'react';
import {Grid, Typography, TextField, InputAdornment} from '@material-ui/core';
import useStyles from '../../../styles/searchComponent';
import SearchIcon from '@material-ui/icons/Search';

const SearchComponent = () => {
	const classes = useStyles();
	return (
		<Grid container>
			<Grid item xs={12} className={classes.searchContianer}>
				<Typography variant="h4" align="center">Explore Finnish Publisher</Typography>
				<form>
					<TextField
						id="outlined-bare"
						placeholder="Search..."
						margin="normal"
						variant="outlined"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon/>
								</InputAdornment>
							)
						}}
						className={classes.searchBox}
					/>
				</form>
			</Grid>
		</Grid>
	);
};

export default SearchComponent;
