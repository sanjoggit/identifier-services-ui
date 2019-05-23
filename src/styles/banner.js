import bgImage from '../assets/img/bg.jpg';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles({
	bannerContainer: {
		backgroundImage: `url(${bgImage})`,
		height: '500px',
		width: '100%',
		backgroundSize: 'cover',
		backgroundColor: '#48474775',
		backgroundBlendMode: 'color',
		'& h1': {
			color: '#ffffff',
			margin: '0'
		},
		display: 'flex'
	},
	textContainer: {
		maxWidth: '1200px',
		color: '#ffffff',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		'& h5': {
			padding: '20px 0'
		}
	},
	inputContainer: {
		'& input': {
			width: '50rem',
			padding: '20px 10px'
		}
	}

});

export default useStyles;
