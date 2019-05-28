import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
	topBarContainer: {
		backgroundColor: '#00224f'
	},
	topBar: {
		maxWidth: '1200px',
		margin: '0 auto'
	},
	navbarContainer: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	mainLogo: {
		height: '75px',
		width: '75px',
		paddingTop: '8px'
	},
	personIcon: {
		height: '35px',
		width: '35px',
		paddingRight: '10px'
	},
	rightMenu: {
		display: 'flex',
		alignItems: 'center'
	},
	languageSelect: {
		fontSize: '20px',
		paddingLeft: '5px'
	}
});

export default useStyles;
