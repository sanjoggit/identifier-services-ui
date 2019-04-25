import React from 'react';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import IsbnAndIsmn from './components/IsbnAndIsmn';
import IdentifierApplication from './components/IsbnAndIsmn/IdentifierApplication';
import Issn from './components/Issn';
import {withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles/app';

const App = props => {
	const {classes} = props;
	return (
		<Router>
			<Navbar/>
			<main className={classes.mainlayout}>
				<Switch>
					<Route exact path="/" component={Home}/>
					<Route path="/isbn-and-ismn" component={IsbnAndIsmn}/>
					<Route path="/issn" component={Issn}/>
					<Route
						path="/isbn-and-ismn-identifier-application-form"
						component={IdentifierApplication}
					/>
				</Switch>
			</main>
			<Footer/>
		</Router>
	);
};

App.propTypes = {
	classes: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(App);
