import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

	main: {
		width: '60vw',
		position: 'relative',
		margin: '100px auto',
		padding: 20,
		borderRadius: 5,
		backgroundColor: '#fff',
		outline: 'none'

	},
	button: {
		marginBottom: '20px'
	},
	closeButton: {
		'& span': {
			width: '30px',
			height: '30px',
			fontSize: '1rem',
			borderRadius: '50%'
		},
		position: 'absolute',
		cursor: 'pointer',
		right: 0,
		top: 0
	}
});

export default useStyles;
