import React from 'react'
import {
	Grid, withStyles, Typography, ListItem, ListItemText, Divider, InputLabel, FormControl, MenuItem, OutlinedInput, Button, NativeSelect
} from '@material-ui/core';
import styles from '../styles/renderTwoColComponent'

const renderTwoColComponent = (props) => {
	const { classes, data } = props;
	return (
		<>
			<Grid container spacing={24}>
				<Grid item xs={9}>
					{data.map(item =>
						<div key={item.title}>
							<Typography variant="h3" className={classes.heading}>
								{item.title}
							</Typography>
							{item.paragraph.map(text => (
								<Typography variant="body1" className={classes.body} key={text} >
									{text}
								</Typography>))
							}
						</div>
					)}
				</Grid>
				<Grid item xs={3}>
					{data.map(item =>
						<div key={item.sideTitle}>
							<Typography variant="h6" className={classes.heading}>
								{item.sideTitle}
							</Typography>
							{item.linkLists.map(item =>
								<div key={item.label}>
									<ListItem button >
										<ListItemText primary={item.label} className={classes.sideLink} />
									</ListItem>
									<Divider />
								</div>
							)}
						</div>
					)}
				</Grid>
			</Grid >
		</>
	)
}

export default withStyles(styles)(renderTwoColComponent)
