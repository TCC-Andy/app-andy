import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import history from '../../service/history';
import api from '../../service/api';
import './style.css';

class Login extends Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: undefined,
      senha: undefined,
      mensagem: undefined,
      mensagemError: undefined
    };
  };

  async handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.refs.email.value,
      senha: this.refs.senha.value,
    };
    await api.post('/authenticateUser', data).then(async (response) => {
      if (response.data.status === 200) {
        const token = response.data.token;
        const idUsuario = response.data.usuario._id;
        const perfilUsuario = response.data.usuario.perfil;
        await localStorage.setItem('Key_Andy', token);
        await localStorage.setItem('Key_Id_Usuario', idUsuario);
        await localStorage.setItem('Key_Perfil_Usuario', perfilUsuario);
        if (perfilUsuario === 'administrador') {
          this.setState({
            mensagem: 'Usuário logado com sucesso.'
          })
          setTimeout(() => {
            this.setState({
              mensagem: undefined
            })
            history.push('/administrador/cadastroEmpresa');
          }, 1000)
        } else {
          api.get(`/showCompanyUser/${idUsuario}`).then(resp => {
            const idEmpresa = resp.data.emp._id;
            localStorage.setItem('Key_Id_Empresa', idEmpresa);
            this.setState({
              mensagem: 'Usuário logado com sucesso.'
            })
            setTimeout(() => {
              this.setState({
                mensagem: undefined
              })
              history.push('/agenda');
            }, 1500)
          })
        }
      } else if (response.data.status === 400) {
        this.setState({
          mensagemError: 'E-mail ou Senha incorreto(s).'
        })
        setTimeout(() => {
          this.setState({
            mensagemError: undefined
          })
        }, 1500)
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    const mensagem = this.state.mensagem;
    const mensagemError = this.state.mensagemError;
    return (
      <div className="login">
        <Helmet title="Andy Services" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 teste">
              <div className="card bg-andy">
                <div className="card-body">
                  {mensagem === undefined ? '' :
                    <div className="alert alert-success" role="alert">
                      {mensagem}
                    </div>
                  }
                  {mensagemError === undefined ? '' :
                      <div className="alert alert-danger" role="alert">
                        {mensagemError}
                      </div>
                    }
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="email">E-mail</label>
                      <input type="email" className="form-control" id="email" ref="email" required/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="senha">Password</label>
                      <input type="password" className="form-control" id="senha" ref="senha" required/>
                    </div>
                    <button type="submit" className="btn btn-success">Logar </button>
                    <Link className="txt2" to="../forgoutPassword">Esqueceu sua Senha?</Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;


