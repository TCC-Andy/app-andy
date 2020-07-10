import React, { Component } from 'react';
import Menu from '../menu';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import api from '../../../service/api';

class CadastroEmpresa extends Component {
    constructor () {
        super();
        this.handleSubmitUsuario = this.handleSubmitUsuario.bind(this);
        this.handleSubmitEmpresa = this.handleSubmitEmpresa.bind(this);
        this.state = {
            mensagem: undefined,
            mensagemCadastro: undefined,
            usuario: [],
        }
    };

    handleSubmitUsuario = async (e) => {
        e.preventDefault();
        try {
            const nome = this.refs.nome.value;
            const sobrenome = this.refs.sobrenome.value;
            const email = this.refs.email.value;
            const senha = this.refs.senha.value;
            const perfil = this.refs.perfil.value;
            if (!nome || !sobrenome || !email || !senha || !perfil) {
                this.setState({
                    mensagem: 'Todos os campos deverá ser preenchido.'
                });
                setTimeout(() => {
                    this.setState({
                        mensagem: undefined
                    })
                }, 1000);
            } else {
                const data = {
                    nome: nome,
                    sobrenome: sobrenome,
                    email: email,
                    senha: senha,
                    perfil: perfil
                }
                await api.post('/createUser', data).then(response => {
                    if (response.data.status === 200) {
                        this.refs.nome.value = '';
                        this.refs.sobrenome.value = '';
                        this.refs.email.value = '';
                        this.refs.senha.value = '';
                        this.refs.perfil.value = '';
                        this.setState({
                            mensagemCadastro: response.data.mensagem
                        })
                        setTimeout(() => {
                            this.setState({
                                mensagemCadastro: undefined,
                                usuario: response.data.usuario,
                            })
                        }, 1000)
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleSubmitEmpresa = async (e) => {
        e.preventDefault();
        try {
            const nome = this.refs.razaoSocial.value;
            const nomeFantasia = this.refs.nomeFantasia.value;
            const CNPJ = this.refs.cnpj.value;
            const idEmpresario = this.refs.idUsuario.value;
            const categoria = this.refs.categoria.value;
            const numero = this.refs.numero.value;
            const descricao = this.refs.descricao.value;
            const rua = this.refs.endereco.value;
            const bairro = this.refs.bairro.value;
            const cidade = this.refs.cidade.value;
            const cep = this.refs.cep.value;
            const complemento = this.refs.complemento.value;
            const estado = this.refs.estado.value;
            const telefone = this.refs.telefone.value;
            if (!nome || !nomeFantasia || !CNPJ || !idEmpresario || !categoria || !numero || !descricao || !rua || !bairro || !cidade || !cep || !complemento || !estado || !telefone) {
                this.setState({
                    mensagem: 'Todos os campos deverá ser preenchido.'
                });
                setTimeout(() => {
                    this.setState({
                        mensagem: undefined
                    })
                }, 1000);
            } else {
                const data = {
                    nome: nome,
                    nomeFantasia: nomeFantasia,
                    CNPJ: CNPJ,
                    idEmpresario: idEmpresario,
                    categoria: categoria,
                    numero: numero,
                    descricao: descricao,
                    rua: rua,
                    telefone: telefone,
                    bairro: bairro,
                    cidade: cidade,
                    cep: cep,
                    complemento: complemento,
                    estado: estado
                }
                await api.post('/createCompany', data).then(response => {
                    if (response.data.status === 200) {
                        this.setState({
                            mensagemCadastro: response.data.mensagem
                        })
                        setTimeout(() => {
                            this.setState({
                                mensagemCadastro: undefined,
                            });
                            window.location.reload();
                        }, 1000)
                    } else if(response.data.status === 500) {
                        this.setState({
                            mensagem: response.data.mensagem
                        })
                        setTimeout(() => {
                            this.setState({
                                mensagem: undefined,
                            })
                        }, 1000)
                    } else if(response.data.status === 400) {
                        this.setState({
                            mensagem: response.data.mensagem
                        })
                        setTimeout(() => {
                            this.setState({
                                mensagem: undefined,
                            })
                        }, 1000)
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        const mensagem = this.state.mensagem;
        const mensagemCadastro = this.state.mensagemCadastro;
        const usuario = this.state.usuario;
        return (
            <div className="row">
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <div className="corpo">
                        <div className="container">
                            <h3 className="title">Usuário / Empresa</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    {mensagem === undefined ? '' :
                                        <div className="alert alert-danger" role="alert">
                                            {mensagem}
                                        </div>
                                    }
                                    {mensagemCadastro === undefined ? '' :
                                        <div className="alert alert-success" role="alert">
                                            {mensagemCadastro}
                                        </div>
                                    }
                                    {usuario.length === 0 ?
                                        (
                                            <form onSubmit={this.handleSubmitUsuario}>
                                                <div className="form-row align-items-center justify-content-md-center">
                                                    <div className="form-group col-md-6">
                                                        <label className="subTitulos" htmlFor="nome">Nome</label>
                                                        <input type="text" className="form-control" id="nome" ref='nome' />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="subTitulos" htmlFor="sobrenome">Sobrenome</label>
                                                        <input type="text" className="form-control" id="sobrenome" ref='sobrenome' />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="email">E-mail</label>
                                                        <input type="email" className="form-control" id="email" ref='email' />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="perfil">Perfil</label>
                                                        <select className="form-control" id="perfil" ref='perfil'>
                                                            <option selected>Selecione uma opção abaixo.</option>
                                                            <option value="administrador">Administrador</option>
                                                            <option value="empresa">Empresa</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="email">Senha</label>
                                                        <input type="password" className="form-control" id="senha" ref='senha' />
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-success botao">Cadastrar</button>
                                                <button type="reset" className="btn btn-danger botao">Limpar</button>
                                            </form>
                                        )
                                        :
                                        (
                                            <form onSubmit={this.handleSubmitEmpresa}>
                                                <div className="form-row align-items-center justify-content-md-center">
                                                    <div className="form-group col-md-3">
                                                        <label className="subTitulos" htmlFor="idUsuario">Usuário</label>
                                                        <input type="text" className="form-control" id="idUsuario" ref='idUsuario' value={usuario._id} readOnly />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <label className="subTitulos" htmlFor="cnpj">CNPJ</label>
                                                        <input type="text" className="form-control" id="cnpj" ref='cnpj' />
                                                    </div>
                                                    <div className="form-group col-md-7">
                                                        <label className="subTitulos" htmlFor="razaoSocial">Razão Social</label>
                                                        <input type="text" className="form-control" id="razaoSocial" ref='razaoSocial' />
                                                    </div>
                                                    <div className="form-group col-md-7">
                                                        <label className="subTitulos" htmlFor="nomeFantasia">Nome Fantasia</label>
                                                        <input type="text" className="form-control" id="nomeFantasia" ref='nomeFantasia' />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <label className="subTitulos" htmlFor="telefone">Telefone</label>
                                                        <input type="text" className="form-control" id="telefone" ref='telefone' />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label className="subTitulos" htmlFor="categoria">Categoria</label>
                                                        <select className="form-control" id="categoria" ref='categoria'>
                                                            <option selected>Selecione uma Categoria.</option>
                                                            <option value="barbearia">Barbearia</option>
                                                            <option value="salaoBeleza">Salão Beleza</option>
                                                            <option value="mecanica">Mecanica</option>
                                                            <option value="lavaCar">Lava Car</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="descricao">Descrição</label>
                                                        <input type="text" className="form-control" id="descricao" ref='descricao' />
                                                    </div>
                                                    <div className="form-group col-md-2">
                                                        <label className="subTitulos" htmlFor="cep">CEP</label>
                                                        <input type="text" className="form-control" id="cep" ref='cep' />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="subTitulos" htmlFor="endereco">Endereço</label>
                                                        <input type="text" className="form-control" id="endereco" ref='endereco' />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="numero">Número</label>
                                                        <input type="number" className="form-control" id="numero" ref='numero' />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="complemento">Complemento</label>
                                                        <input type="text" className="form-control" id="complemento" ref='complemento' />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="subTitulos" htmlFor="bairro">Bairro</label>
                                                        <input type="text" className="form-control" id="bairro" ref='bairro' />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="subTitulos" htmlFor="cidade">Cidade</label>
                                                        <input type="text" className="form-control" id="cidade" ref='cidade' />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="subTitulos" htmlFor="estado">Estado</label>
                                                        <select className="form-control" id="estado" ref='estado'>
                                                            <option selected>Selecione um Estado.</option>
                                                            <option value="AC">AC</option>
                                                            <option value="AL">AL</option>
                                                            <option value="AP">AP</option>
                                                            <option value="AM">AM</option>
                                                            <option value="BA">BA</option>
                                                            <option value="CE">CE</option>
                                                            <option value="DF">DF</option>
                                                            <option value="ES">ES</option>
                                                            <option value="GO">GO</option>
                                                            <option value="MA">MA</option>
                                                            <option value="MT">MT</option>
                                                            <option value="MS">MS</option>
                                                            <option value="MG">MG</option>
                                                            <option value="PA">PA</option>
                                                            <option value="PB">PB</option>
                                                            <option value="PR">PR</option>
                                                            <option value="PE">PE</option>
                                                            <option value="PI">PI</option>
                                                            <option value="RJ">RJ</option>
                                                            <option value="RN">RN</option>
                                                            <option value="RS">RS</option>
                                                            <option value="RO">RO</option>
                                                            <option value="RR">RR</option>
                                                            <option value="SC">SC</option>
                                                            <option value="SP">SP</option>
                                                            <option value="SE">SE</option>
                                                            <option value="TO">TO</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-success botao">Cadastrar</button>
                                                <button type="reset" className="btn btn-danger botao">Limpar</button>
                                            </form>
                                        )
                                    }
                                </div>
                            </div>
                            <hr />
                            <div className="table-responsive-md">
                                <table className="table table-sm table-hover text-center align-middle">
                                    <caption>Lista de Usuários</caption>
                                    <thead className="bgHead">
                                        <tr>
                                            <th className="align-middle">Nome</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="align-middle"></td>
                                            <td className="text-primary pencilTrash align-middle"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash align-middle"><FaTrash /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CadastroEmpresa;