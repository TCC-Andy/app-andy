import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from '../service/history';
import Home from '../pages/home/index';
import Login from '../pages/login/index';
import ForgoutPassword from '../pages/forgoutPassword/index';
import ResetPassword from '../pages/resetPassword/index';
import Agenda from '../pages/sistema/agenda';
import Funcionarios from '../pages/sistema/funcionarios';
import Servicos from '../pages/sistema/servicos';
import MeuPerfil from '../pages/sistema/meuPerfil';
import CadastroEmpresa from '../pages/sistema/administrador';

const Routes = () => {
    return (
        <Router history={history}>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/forgoutPassword" component={ForgoutPassword} />
            <Route path="/resetPassword/:token" component={ResetPassword} />
            <Route path="/agenda" component={Agenda} />
            <Route path="/funcionarios" component={Funcionarios} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/meuPerfil" component={MeuPerfil} />
            <Route path="/administrador/cadastroEmpresa" component={CadastroEmpresa} />
        </Router>
    );
}

export default Routes;