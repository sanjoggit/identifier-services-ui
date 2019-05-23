import React from 'react';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles/app';
import TopNav from './components/navbar/topNav/index';
import MainNav from './components/navbar/mainNav';
import CssBaseline from '@material-ui/core/CssBaseline';
import Banner from './components/main/banner';
const App = props => {
	const {classes} = props;
	return (
		<>
			<TopNav/>
			<CssBaseline/>
			<MainNav/>
			<Banner/>
		</>
	);
};

App.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(App);
