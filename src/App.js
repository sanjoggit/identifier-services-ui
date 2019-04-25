import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from './components/navbar/Navbar';

class App extends Component{
    render(){
        return(
            <Router>
                <Navbar />
            </Router>
        )
    }
}

export default App;