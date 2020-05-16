import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../service/history';
import Home from '../pages/home/index';
//import IsAuth from '../service/auth';
import Login from '../pages/login/index';
import Cadastro from '../pages/cadastro/index';
import ForgoutPassword from '../pages/forgoutPassword/index';
import ResetPassword from '../pages/resetPassword/index';
import Dashbords from '../pages/sistema/dashbords';
import Agenda from '../pages/sistema/agenda';
import Funcionarios from '../pages/sistema/funcionarios';
import Servicos from '../pages/sistema/servicos';
import MeuPerfil from '../pages/sistema/meuPerfil';
/*
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
*/
const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" exact component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/cadastro" component={Cadastro}></Route>
            <Route path="/forgoutPassword" component={ForgoutPassword}></Route>
            <Route path="/resetPassword/:token" component={ResetPassword}></Route>
            <Route path="/dashbords" component={Dashbords} />
            <Route path="/agenda" component={Agenda} />
            <Route path="/funcionarios" component={Funcionarios} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/meuPerfil" component={MeuPerfil} />
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