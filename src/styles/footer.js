import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	footer: {
		marginTop: '20px',
		paddingTop: '20px',
		height: '150px',
		background: '#00224f'
	},
	footerContainer: {
		maxWidth: '1200px',
		margin: '0 auto',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#ffffff'
	}
});

export default useStyles;
