import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	searchContianer: {
		maxWidth: '1200px',
		margin: '0 auto',
		padding: '30px 0',
		'& form': {
			display: 'flex',
			justifyContent: 'center'
		}
	},
	searchBox: {
		width: '75%'
	}
});

export default useStyles;
