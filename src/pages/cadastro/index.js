import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import history from '../../service/history';
import api from '../../service/api';
import './style.css';

class Cadastro extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      nome: undefined,
      sobrenome: undefined,
      email: undefined,
      senha: undefined, 
      sucesso: undefined,
      error: undefined
    };
  };

  async handleSubmit(e) {
    e.preventDefault();
    const data = {
      nome: this.refs.nome.value,
      sobrenome: this.refs.sobrenome.value,
      email: this.refs.email.value,
      senha: this.refs.senha.value,
      perfil: 'empresa'
    };
    await api.post('/createUser', data).then((response) => {
      if (response.data.status === 200) {
        this.setState({
          sucesso: response.data.menssagem
        });
        setTimeout(function () {
          history.push('/login');
        }, 1500);
      } else {
        this.setState({
          error: response.data.menssagem
        });
        this.refs.nome.value = '';
        this.refs.sobrenome.value = '';
        this.refs.email.value = '';
        this.refs.senha.value = '';
      }
    }).catch((error) => {
      console.log(error);
      this.refs.nome.value = '';
      this.refs.sobrenome.value = '';
      this.refs.email.value = '';
      this.refs.senha.value = '';
    });
  };

  render() {
    return (
      <div className="login">
        <Helmet title="Andy Services" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 card-cadastro">
              <div className="card bg-andy">
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="nome">Nome</label>
                      <input type="text" className="form-control" id="nome" ref="nome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sobrenome">Sobrenome</label>
                      <input type="text" className="form-control" id="sobrenome" ref="sobrenome" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" ref="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="senha">Password</label>
                      <input type="password" className="form-control" id="senha" ref="senha" />
                    </div>
                    <button type="submit" className="btn btn-success">Cadastrar </button>
                    <Link className="txt1" to="../login"> Login </Link>
                  </form>
                  {!this.state.sucesso ?
                    ""
                    :
                    (
                      <div className="menssagem">
                        {this.state.sucesso ?
                          (
                            <div className="alert alert-success" role="alert">
                              <strong>{this.state.sucesso}</strong>
                            </div>
                          ) 
                          :
                          (
                            <div className="alert alert-danger" role="alert">
                              < strong>{this.state.error}</strong>
                            </div>
                          )
                        }
                      </div>
                    )
                  }
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

export default Cadastro;


