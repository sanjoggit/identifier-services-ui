import React from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import IsbnAndIsmn from './components/IsbnAndIsmn';
import { withStyles } from '@material-ui/core';
import styles from './styles/app';


const App = (props) => {
    const { classes } = props;
    return (
        <>
            <main className={classes.mainlayout}>
                {/* <IsbnAndIsmn /> */}
                <Home/>
                <Footer />
            </main>
        </>
    )
}

export default withStyles(styles)(App);