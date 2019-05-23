import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

	mainNav: {
		display: 'flex',
		width: '1200px',
		margin: '0 auto',
		justifyContent: 'space-between'

	},
	menu: {
		display: 'flex'
	},
	isbnIsmn: {
		padding: '0 20px'
	},
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: 400
	},
	input: {
		marginLeft: 8,
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	divider: {
		width: 1,
		height: 28,
		margin: 4
	}

});

export default useStyles;
