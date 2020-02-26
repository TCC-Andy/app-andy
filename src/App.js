import React, { Component } from 'react';
import api from './service/api';
import './App.css';

class App extends Component {
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
   await api.post('/usuarios', data).then((response) => {
      if(response.data){
        this.refs.nome.value = "";
        this.refs.sobrenome.value = "";
        return alert('usuario cadastrado com sucesso');
      } else {
        console.log('erro ao cadastrar usuario');
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  render(){
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome</label>
            <input type="text" className="form-control" id="nome" ref="nome" placeholder="Nome"/>
          </div>
          <div className="form-group">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input type="text" className="form-control" id="sobrenome" ref="sobrenome" placeholder="Sobrenome"/>
          </div>
          <button type="submit" className="btn btn-primary">Salvar</button>
        </form>
      </div>
      )
  }
}

export default App;
