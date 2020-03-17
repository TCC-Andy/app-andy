import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../service/history';
import PrivateRoute from '../service/privateRoute';
import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Cadastro from '../pages/cadastro/index';
import ForgoutPassword from '../pages/forgoutPassword/index';
import ResetPassword from '../pages/resetPassword/index';
import HomeSistema from '../pages/sistema/index';

const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/cadastro" component={Cadastro}></Route>
            <Route path="/forgoutPassword" component={ForgoutPassword}></Route>
            <Route path="/resetPassword/:token" component={ResetPassword}></Route>
            <PrivateRoute path="/home" component={HomeSistema} />
        </Router>
    );
}

export default Routes;