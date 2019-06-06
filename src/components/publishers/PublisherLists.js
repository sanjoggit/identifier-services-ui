import React from 'react';
import {Grid, Typography, Checkbox, FormControlLabel} from '@material-ui/core';
import SearchComponent from '../SearchComponent';
import useStyles from '../../styles/publisherLists';

export default function () {
	const [state, setState] = React.useState({
		checked: false
	});
	const handleChange = name => event => {
		setState({...state, [name]: event.target.checked});
	};

	const classes = useStyles();
	return (
		<Grid container>
			<Grid item xs={12} className={classes.publisherListSearch}>
				<Typography variant="h5">Search Publisher By Name or Aliases</Typography>
				<SearchComponent/>
				<FormControlLabel
					control={
						<Checkbox
							checked={state.checked}
							value="checked"
							color="primary"
							onChange={handleChange('checked')}
						/>
					}
					label="Show only active publishers"
				/>
			</Grid>
		</Grid>
	);
}
