import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import api from '../../service/api';
import './style.css';

class ForgoutPassword extends Component {
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      nome: undefined,
      sobrenome: undefined,
    };
  };

  async handleSubmit(e){
    e.preventDefault();
    const data = {
      nome: this.refs.nome.value,
      sobrenome: this.refs.sobrenome.value,
      status: 1
    };    
   await api.post('/createUser', data).then((response) => {
      if(response.data.status === 401){
        this.refs.nome.value = "";
        this.refs.sobrenome.value = "";
        return alert(response.data.menssagem);
      } else {
        console.log('erro ao cadastrar usuario');
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  render(){
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
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" className="form-control" id="email" ref="email"/>
                    </div>
                    <button type="submit" className="btn btn-success">Enviar </button>
                    <Link className="txt1" to="../login"> Login </Link>
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

export default ForgoutPassword;


