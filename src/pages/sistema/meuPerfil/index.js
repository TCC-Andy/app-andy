import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu';
import '../styleGlobalSistema.css';

class MeuPerfil extends Component {
    constructor () {
        super();
        this.handleSubmitAlterarEmpresa = this.handleSubmitAlterarEmpresa.bind(this);
        this.handleSubmitAlterarUsuario = this.handleSubmitAlterarUsuario.bind(this);
        this.state = {
            logged: false,
            empresa: [],
            usuario: [],
            mensagemEmpresa: undefined,
            mensagemUsuario: undefined,
        }
    };

    componentDidMount() {
        this.verifyToken();
        this.carregarEmpresa();
        this.carregarUsuario();
    };

    handleSubmitAlterarUsuario = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nome: this.refs.nome.value,
                sobrenome: this.refs.sobreNome.value,
                email: this.refs.email.value,
                senha: this.refs.senha.value
            }
            await api.put(`/updateUser/${this.state.usuario._id}`, data).then(response => {
                if (response.data.status === 200) {
                    this.setState({
                        mensagemUsuario: response.data.mensagem
                    })
                    setTimeout(() => {
                        this.carregarUsuario()
                        this.setState({
                            mensagemUsuario: undefined,
                        });
                        window.location.reload();
                    }, 1500)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmitAlterarEmpresa = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nome: this.refs.nomeEmpresa.value,
                nomeFantasia: this.refs.nomeFantasia.value,
                cep: this.refs.cep.value,
                rua: this.refs.rua.value,
                numero: this.refs.numero.value,
                complemento: this.refs.complemento.value,
                bairro: this.refs.bairro.value,
                telefone: this.refs.telefone.value,
                cidade: this.refs.cidade.value,
                descricao: this.refs.descricao.value
            }
            await api.put(`updateCompany/${this.state.empresa._id}`, data).then(response => {
                if (response.data.status === 200) {
                    this.setState({
                        mensagemEmpresa: response.data.mensagem
                    })
                    setTimeout(() => {
                        this.carregarEmpresa()
                        this.setState({
                            mensagemEmpresa: undefined,
                        });
                        window.location.reload();
                    }, 1500)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    carregarEmpresa = async () => {
        const idUsuario = localStorage.getItem('Key_Id_Usuario');
        if (idUsuario) {
            const empresa = await api.get(`/showCompanyUser/${idUsuario}`);
            this.setState({
                empresa: empresa.data.emp
            })
        }

    }

    carregarUsuario = async () => {
        const idUsuario = localStorage.getItem('Key_Id_Usuario');
        if (idUsuario) {
            const usuario = await api.get(`/retrieveUser/${idUsuario}`);
            this.setState({
                usuario: usuario.data.usuario
            })
        }
    }

    async verifyToken() {
        const token = localStorage.getItem('Key_Andy');
        const id = localStorage.getItem('Key_Id');

        if (token !== null) {
            await api.get(`/verifyToken/${id}`, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            }).then((response) => {
                if (response.data.status === 200) {
                    this.setState({
                        logged: true
                    })
                } else {
                    localStorage.removeItem('Key_Andy');
                    localStorage.removeItem('Key_Id');
                    this.setState({
                        logged: false
                    });
                    history.push('/');
                }
            }).catch((err) => {
                console.log(err);
            });
        } else {
            history.push('/');
        }
    }

    render() {
        const empresa = this.state.empresa;
        const usuario = this.state.usuario;
        const mensagemEmpresa = this.state.mensagemEmpresa;
        const mensagemUsuario = this.state.mensagemUsuario;
        console.log(empresa);
        return (
            <div className="row">
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <div className="corpo">
                        <div className="container">
                            <div className="row">
                                <div className="usuarioProfile">
                                    <form onSubmit={this.handleSubmitAlterarUsuario}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {mensagemUsuario === undefined ?
                                                    <h4 className="text-center">Usuário</h4>
                                                    :
                                                    <div class="alert alert-success" role="alert">
                                                        {mensagemUsuario}
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="nome">Nome:</label>
                                                <input type="text" className="form-control" id="nome" ref="nome" defaultValue={usuario.nome} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="sobreNome">Sobrenome:</label>
                                                <input type="text" className="form-control" id="sobreNome" ref="sobreNome" defaultValue={usuario.sobrenome} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="email">E-mail:</label>
                                                <input type="email" className="form-control" id="email" ref="email" defaultValue={usuario.email} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="email">Senha: <em className="mensage">Digite sua senha para confirmar a alteração.</em> </label>
                                                <input type="password" className="form-control" id="senha" ref="senha" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <button type="submit" className="btn btn-primary">Alterar</button>
                                            </div>
                                        </div>
                                    </form>
                                    <form onSubmit={this.handleSubmitAlterarEmpresa}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                {mensagemEmpresa === undefined ?
                                                    <h4 className="text-center">Empresa</h4>
                                                    :
                                                    <div class="alert alert-success" role="alert">
                                                        {mensagemEmpresa}
                                                    </div>
                                                }
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="nome">Nome:</label>
                                                <input type="text" className="form-control" id="nomeEmpresa" ref="nomeEmpresa" defaultValue={empresa.nome} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="nomeFantasia">Nome Fantasia:</label>
                                                <input type="text" className="form-control" id="nomeFantasia" ref="nomeFantasia" defaultValue={empresa.nomeFantasia} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="subTitulos" htmlFor="cep">CEP:</label>
                                                <input type="text" className="form-control" id="cep" ref="cep" defaultValue={empresa.cep} />
                                            </div>
                                            <div className="form-group col-md-7">
                                                <label className="subTitulos" htmlFor="rua">Rua:</label>
                                                <input type="text" className="form-control" id="rua" ref="rua" defaultValue={empresa.rua} />
                                            </div>
                                            <div className="form-group col-md-2">
                                                <label className="subTitulos" htmlFor="numero">Número:</label>
                                                <input type="number" className="form-control" id="numero" ref="numero" defaultValue={empresa.numero} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="complento">Complemento:</label>
                                                <input type="text" className="form-control" id="complemento" ref="complemento" defaultValue={empresa.complemento} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="subTitulos" htmlFor="bairro">Bairro:</label>
                                                <input type="text" className="form-control" id="bairro" ref="bairro" defaultValue={empresa.bairro} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="subTitulos" htmlFor="telefone">Telefone:</label>
                                                <input type="text" className="form-control" id="telefone" ref="telefone" defaultValue={empresa.telefone} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="subTitulos" htmlFor="bairro">Cidade:</label>
                                                <input type="text" className="form-control" id="cidade" ref="cidade" defaultValue={empresa.cidade} />
                                            </div>
                                            <div className="form-group col-md-9">
                                                <label className="subTitulos" htmlFor="descricao">Descrição:</label>
                                                <input type="text" className="form-control" id="descricao" ref="descricao" defaultValue={empresa.descricao} />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Alterar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeuPerfil;


