import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import IsbnAndIsmn from './components/Issn';
import Issn from './components/Issn';
import { withStyles } from '@material-ui/core';
import styles from './styles/app';
import IdentifierApplication from './components/IsbnAndIsmn/IdentifierApplication';


const App = (props) => {
    const { classes } = props;
    return (
        <Router>
            <Navbar />
            <main className={classes.mainlayout}>
                {/* <IsbnAndIsmn /> */}
                {/* <Home /> */}
                {/* <Issn/> */}
                <IdentifierApplication/>
                <Footer />
            </main>
        </Router>
    )
}

export default withStyles(styles)(App);
