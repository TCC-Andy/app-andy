import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../service/history';
import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Cadastro from '../pages/cadastro/index';
import ForgoutPassword from '../pages/forgoutPassword/index';
import ResetPassword from '../pages/resetPassword/index';
import HomeSistema from '../pages/sistema/index';

class Routes extends Component {
    render(){
        return(
            <Router history={history}>
                <Route path="/" exact component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/cadastro" component={Cadastro}></Route>
                <Route path="/forgoutPassword" component={ForgoutPassword}></Route>
                <Route path="/resetPassword/:token" component={ResetPassword}></Route>
                <Route path="/home" component={HomeSistema}></Route>
            </Router>
        );
    }
}

export default Routes;