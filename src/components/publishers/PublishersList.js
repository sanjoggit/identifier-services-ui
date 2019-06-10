import React from 'react';
import {Grid, Typography, Checkbox, FormControlLabel} from '@material-ui/core';
import SearchComponent from '../SearchComponent';
import useStyles from '../../styles/publisherLists';
import TableComponent from '../TableComponent';
import {withRouter} from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
export default (props => {
	const [state, setState] = React.useState({
		checked: false
	});
	const handleChange = name => event => {
		setState({...state, [name]: event.target.checked});
	};

	const headRows = [
		{id: 'name', label: 'Name'},
		{id: 'age', label: 'Age'}
	];

	const data = [
		{id: 1, name: 'Rojak', age: 22},
		{id: 2, name: 'Sanjog', age: 23},
		{id: 3, name: 'Arturi', age: 25},
		{id: 4, name: 'Lassi', age: 55},
		{id: 5, name: 'Kingsman', age: 22},
		{id: 6, name: 'Spiderman', age: 23},
		{id: 7, name: 'Batman', age: 25},
		{id: 8, name: 'Antman', age: 55}
	];
    const classes = useStyles();
	const component = (
		<Grid>
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
				<TableComponent
					link
					data={data}
					headRows={headRows}/>
			</Grid>
		</Grid>
	);
	return {
		...component
	};
});
