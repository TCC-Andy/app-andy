import React, { Component } from 'react';
import Helmet from 'react-helmet';
import api from '../../service/api';
import './style.css';

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: undefined,
      token: undefined,
      senha: undefined
    };
  };

  async handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.refs.email.value,
      token: this.refs.token.value,
      senha: this.refs.senha.value
    };
    await api.post('/updatePassword', data).then((response) => {
      console.log(response.data);
      if (response.data.status === 200) {
        return alert(response.data.menssagem);
      } else {
        console.log('erro ao cadastrar usuario');
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    return (

      <div className="login">
        <Helmet title="Andy Services" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 teste">
              <div className="card bg-andy">
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <input type="text" className="form-control" value={this.props.match.params.token} id="token" ref="token" />
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" ref="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="senha">Password</label>
                      <input type="password" className="form-control" id="senha" ref="senha" />
                    </div>
                    <button type="submit" className="btn btn-success">Alterar </button>
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

export default ResetPassword;


