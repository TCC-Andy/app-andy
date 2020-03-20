import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import history from '../service/history';
import Home from '../pages/home/index';
import IsAuth from '../service/auth';
import Login from '../pages/login/index';
import Cadastro from '../pages/cadastro/index';
import ForgoutPassword from '../pages/forgoutPassword/index';
import ResetPassword from '../pages/resetPassword/index';
import HomeSistema from '../pages/sistema/index';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <IsAuth /> ?
                (
                    <Component {...props} />
                )
                :
                (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        )
        }
    />
)

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
/*
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path='/' exact component={Principal} />
            <PrivateRoute path='/nfe/:token' component={Nfe} />
        </Switch>
    </BrowserRouter>
);*/
export default Routes;