import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({

	main: {
		width: 800,
		margin: '100px auto',
		padding: 20,
		borderRadius: 5,
		backgroundColor: '#fff',
		outline: 'none'

	},
	button: {
		marginBottom: '20px'
	},
	badge: {
		'& span': {
			width: '30px',
			height: '30px',
			fontSize: '1rem',
			borderRadius: '50%'
		},
		cursor: 'pointer',
		left: '777px',
		top: '-30px'
	}
});

export default useStyles;
