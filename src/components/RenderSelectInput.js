import React, { useState } from 'react'
import styles from '../styles/identifierApplication';
import { withStyles, FormControl, InputLabel, Select, OutlinedInput, Button } from '@material-ui/core';

const RenderSelectInput = (props) => {
	const { data, classes, value, labelWidth, handleChange, handleSubmit } = props;
	return (
		<form className={classes.form} onSubmit={e => handleSubmit(e)} autoComplete="off">
			{data.map(item =>
				<FormControl variant="outlined" key={item.label} className={classes.formControl}>
					<InputLabel htmlFor="outlined-age-native-simple">{item.label}</InputLabel>
					<Select
						native
						value={value.label}
						onChange={handleChange}
						input={
							<OutlinedInput
								name={item.label}
								id={item.id}
								labelWidth={labelWidth}
							/>
						}
					>
						<option value="" />
						{
							item.options.map(menuList =>
								<option value={menuList.id} key={menuList.id}>{menuList.name}</option>
							)
						}
					</Select>
				</FormControl>
			)}
			<Button type="submit" variant="outlined" color="primary" className={classes.formButton}>Continue</Button>
		</form>
	)
}

export default withStyles(styles)(RenderSelectInput);