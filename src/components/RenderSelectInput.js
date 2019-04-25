import React from 'react';
import styles from '../styles/identifierApplication';
import {
	withStyles,
	FormControl,
	InputLabel,
	Select,
	OutlinedInput,
	Button
} from '@material-ui/core';

const RenderSelectInput = props => {
	const {data, classes, value, labelWidth, handleChange, handleSubmit} = props;
	return (
		<form
			className={classes.form}
			autoComplete="off"
			onSubmit={e => handleSubmit(e)}
		>
			{data.map(item => (
				<FormControl
					key={item.label}
					className={classes.formControl}
					variant="outlined"
				>
					<InputLabel htmlFor="outlined-age-native-simple">
						{item.label}
					</InputLabel>
					<Select
						native
						value={value.label}
						input={
							<OutlinedInput
								name={item.label}
								id={item.id}
								labelWidth={labelWidth}
							/>
						}
						onChange={handleChange}
					>
						<option value=""/>
						{item.options.map(menuList => (
							<option key={menuList.id} value={menuList.id}>
								{menuList.name}
							</option>
						))}
					</Select>
				</FormControl>
			))}
			<Button
				type="submit"
				variant="outlined"
				color="primary"
				className={classes.formButton}
			>
				Continue
			</Button>
		</form>
	);
};

export default withStyles(styles)(RenderSelectInput);
