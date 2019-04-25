import React, { useState } from 'react'
import styles from '../styles/identifierApplication';
import { withStyles, FormControl, InputLabel, Select, OutlinedInput, Button } from '@material-ui/core';

const RenderSelectInput = (props) => {
	const { data, classes } = props;

	const initialState = { value: "", labelWidth: 0 };
	const [state, setState] = useState(initialState);

	const handleChange = (event) => {
		setState({ ...state, value: event.value })
	}

	return (
		<form className={classes.form} autoComplete="off">
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel
					htmlFor="outlined-age-native-simple"
				> Publication</InputLabel>
				<Select
					native
					value={state.value}
					onChange={handleChange}
					input={<OutlinedInput
						name="publication"
						id="publication"
						labelWidth={state.labelWidth}
					/>
					}
				>
					<option value="" />
					{
						data.map(item => item.select.options.map(menuList =>
							<option value={menuList.id} key={menuList.id}>{menuList.name}</option>
						))
					}
				</Select>
			</FormControl>
			<Button variant="outlined" color="primary" className={classes.formButton}>Continue</Button>

		</form>
	)
}

export default withStyles(styles)(RenderSelectInput);