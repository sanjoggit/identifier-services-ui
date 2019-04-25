const styles = theme => ({

	heading: {
		font: `"Helvetica Neue", Helvetica, Arial, sans-serif`,
		fontWeight: 500,
		lineHeight: '1.42857143',
		margin: '20px 0',
	},
	body: {
		margin: '20px 0'
	},
	link: {
		margin: theme.spacing.unit,
	},
	sideLink: {
		color: 'blue'
	},
	form: {
		marginTop: 40,
		display: 'flex',
		flexWrap: 'wrap',
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
	},
	formButton: {
		margin: theme.spacing.unit,
		minWidth: 120,
	}

})

export default styles;