import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import Home from '../pages/home/index';
import history from '../service/history';

class Routes extends Component {
    render(){
        return(
            <Router history={history}>
                <Route path="/" exact component={Home}></Route>
            </Router>
        );
    }
}

export default Routes;