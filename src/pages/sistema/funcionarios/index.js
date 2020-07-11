import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu/index';
import '../styleGlobalSistema.css';
import Select from 'react-select'
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import Helmet from 'react-helmet';

class Funcionario extends Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitServices = this.handleSubmitServices.bind(this);
        this.handleSubmitAlterar = this.handleSubmitAlterar.bind(this);
        this.state = {
            logged: false,
            servicos: [],
            servicosSelection: [],
            idServicos: [],
            nome: undefined,
            sobrenome: undefined,
            email: undefined,
            telefone: undefined,
            horaInicioTrabalho: undefined,
            horaAlmocoInicio: undefined,
            horaAlmocoFim: undefined,
            horaFimTrabalho: undefined,
            funcionarios: [],
            editarFuncionarios: []
        }
    };

    componentDidMount = async () => {
        this.verifyToken();
        this.loadServicos();
        this.loadFuncionarios();
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nome: this.refs.nome.value,
                sobrenome: this.refs.sobrenome.value,
                email: this.refs.email.value,
                telefone: this.refs.telefone.value,
                idEmpresa: localStorage.getItem('Key_Id_Empresa'),
                horaInicioTrabalho: this.refs.horaInicioTrabalho.value,
                horaAlmocoInicio: this.refs.horaAlmocoInicio.value,
                horaAlmocoFim: this.refs.horaAlmocoFim.value,
                horaFimTrabalho: this.refs.horaFimTrabalho.value,
                idServicos: this.state.idServicos,
                servicosSelection: this.state.servicosSelection
            }
            if (!data.nome || !data.sobrenome || !data.email || !data.horaInicioTrabalho || !data.horaAlmocoInicio || !data.horaAlmocoFim || !data.horaFimTrabalho || !data.servicosSelection) {
                this.setState({
                    error: 'Favor preencher todos os campos.'
                })
            } else {
                await api.post('/createEmp', data).then(response => {
                    const carregaFuncao = this;
                    if (response.data.status === 200) {
                        this.setState({
                            success: response.data.mensagem
                        })
                        setTimeout(function () {
                            carregaFuncao.limpaCadastroFuncionario();
                        }, 1)
                        window.location.reload();
                        this.loadFuncionarios();
                    } else {
                        this.setState({
                            error: response.data.mensagem
                        });
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleSubmitAlterar = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nome: this.refs.nome.value,
                sobrenome: this.refs.sobrenome.value,
                email: this.refs.email.value,
                telefone: this.refs.telefone.value,
                idEmpresa: localStorage.getItem('Key_Id_Empresa'),
                horaInicioTrabalho: this.refs.horaInicioTrabalho.value,
                horaAlmocoInicio: this.refs.horaAlmocoInicio.value,
                horaAlmocoFim: this.refs.horaAlmocoFim.value,
                horaFimTrabalho: this.refs.horaFimTrabalho.value,
                idServicos: this.state.idServicos,
                servicosSelection: this.state.servicosSelection
            }
            if (!data.nome || !data.sobrenome || !data.email || !data.horaInicioTrabalho || !data.horaAlmocoInicio || !data.horaAlmocoFim || !data.horaFimTrabalho || !data.servicosSelection) {
                this.setState({
                    error: 'Favor preencher todos os campos.'
                })
            } else {
                await api.put(`/updateEmp/${this.state.editarFuncionarios._id}`, data).then(response => {
                    const carregaFuncao = this;
                    if (response.data.status === 200) {
                        setTimeout(function () {
                            carregaFuncao.limpaCadastroFuncionario();
                        }, 1)
                        window.location.reload();
                        this.loadFuncionarios();
                    } else {
                        this.setState({
                            error: response.data.mensagem
                        });
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    limpaCadastroFuncionario = async () => {
        this.refs.nome.value = '';
        this.refs.sobrenome.value = '';
        this.refs.email.value = '';
        this.refs.telefone.value = '';
        this.refs.horaInicioTrabalho.value = '';
        this.refs.horaAlmocoInicio.value = '';
        this.refs.horaAlmocoFim.value = '';
        this.refs.horaFimTrabalho.value = '';
    }

    handleSubmitServices = async (itens) => {
        let idServicosSelection = [];
        for (let i in itens) {
            idServicosSelection.push(itens[i].value);
        }
        this.setState({
            servicosSelection: itens,
            idServicos: idServicosSelection
        })
    }

    loadServicos = async () => {
        const idEmpresa = localStorage.getItem('Key_Id_Empresa');
        const response = await api.get(`/showServices/${idEmpresa}`);
        let optionsServices = [];
        for (let i in response.data.servicos) {
            optionsServices.push({
                value: response.data.servicos[i]._id,
                label: response.data.servicos[i].nome
            })
        }
        this.setState({ servicos: optionsServices });
    }

    loadFuncionarios = async () => {
        const idEmpresa = localStorage.getItem('Key_Id_Empresa');
        const response = await api.get(`/showEmps/${idEmpresa}`);
        this.setState({ funcionarios: response.data.funcionarios });
    }

    excluirFuncionarios = async (id) => {
        await api.delete(`/deleteEmp/${id}`);
        this.loadFuncionarios();
    }

    editarFuncionarios = async (id) => {
        const response = await api.get(`/showEmp/${id}`);
        this.setState({ editarFuncionarios: response.data.func })
    }

    verifyToken = async () => {
        const token = localStorage.getItem('Key_Andy');
        const id = localStorage.getItem('Key_Id_Usuario');

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
                    localStorage.removeItem('Key_Id_Usuario');
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
        const funcionarios = this.state.funcionarios;
        const alterarFuncionarios = this.state.editarFuncionarios;
        return (
            <div className="row">
                <Helmet title="Andy Services" />
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <div className="corpo">
                        <div className="container">
                            <h3 className="title">Funcionários</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-row align-items-center justify-content-md-center">
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="servico">Nome</label>
                                                <input type="text" className="form-control" id="nome" ref='nome' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.nome} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="descricao">Sobrenome</label>
                                                <input type="text" className="form-control" id="sobrenome" ref='sobrenome' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.sobrenome} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="valor">E-mail</label>
                                                <input type="email" className="form-control" id="email" ref='email' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.email} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Telefone</label>
                                                <input type="tel" className="form-control" id="telefone" ref='telefone' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.telefone} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Hora Inicio Trabalho</label>
                                                <input type="time" className="form-control" id="horaInicioTrabalho" ref='horaInicioTrabalho' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.horaInicioTrabalho} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Hora Inicio Almoço</label>
                                                <input type="time" className="form-control" id="horaAlmocoInicio" ref='horaAlmocoInicio' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.horaAlmocoInicio} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Hora Fim Almoço</label>
                                                <input type="time" className="form-control" id="horaAlmocoFim" ref='horaAlmocoFim' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.horaAlmocoFim} required/>
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Hora Fim Trabalho</label>
                                                <input type="time" className="form-control" id="horaFimTrabalho" ref='horaFimTrabalho' defaultValue={alterarFuncionarios.length === 0 ? '' : alterarFuncionarios.horaFimTrabalho} required/>
                                            </div>
                                            <div className="form-group col-md-12">
                                                <label className="subTitulos" htmlFor="servicos">Serviços</label>
                                                <Select
                                                    isMulti
                                                    onChange={this.handleSubmitServices}
                                                    name="serviços"
                                                    options={this.state.servicos}
                                                    className="basic-multi-select"
                                                    placeholder="Selecione um e/ou mais Serviços."
                                                    isSearchable
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {alterarFuncionarios.length === 0 ?
                                            <button type="submit" className="btn btn-success botao">Cadastrar</button>
                                            :
                                            <button type="submit" className="btn btn-success botao" onClick={(e) => this.handleSubmitAlterar(e)}>Alterar</button>
                                        }
                                        <button type="reset" className="btn btn-danger botao">Limpar</button>
                                    </form>
                                </div>
                            </div>
                            <hr />
                            <div className="table-responsive-md">
                                <table className="table table-sm table-hover text-center align-middle">
                                    <caption>Lista de Funcionários</caption>
                                    <thead className="bgHead">
                                        <tr>
                                            <th className="align-middle">Nome</th>
                                            <th className="align-middle">E-mail</th>
                                            <th className="align-middle">Telefone</th>
                                            <th className="align-middle">Inicio Trab.</th>
                                            <th className="align-middle">Inicio Almoço.</th>
                                            <th className="align-middle">Fim Almoço.</th>
                                            <th className="align-middle">Fim Trab.</th>
                                            <th className="align-middle">Serviços</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {funcionarios.length === 0 ?
                                            (
                                                <tr>
                                                    <th>Não existe funcionários cadastrado.</th>
                                                </tr>
                                            )
                                            :
                                            (
                                                funcionarios.map(funcionarios => (
                                                    <tr key={funcionarios._id}>
                                                        <td className="align-middle">{funcionarios.nome + " " + funcionarios.sobrenome}</td>
                                                        <td className="align-middle">{funcionarios.email}</td>
                                                        <td className="align-middle">{funcionarios.telefone}</td>
                                                        <td className="align-middle">{funcionarios.horaInicioTrabalho}</td>
                                                        <td className="align-middle">{funcionarios.horaAlmocoInicio}</td>
                                                        <td className="align-middle">{funcionarios.horaAlmocoFim}</td>
                                                        <td className="align-middle">{funcionarios.horaFimTrabalho}</td>
                                                        <td className="align-middle">{funcionarios.servicosSelection.map((servicos) => servicos.label).join(', ')}</td>
                                                        <td className="text-primary pencilTrash align-middle" onClick={() => this.editarFuncionarios(funcionarios._id)}><FaPencilAlt /></td>
                                                        <td className="text-danger pencilTrash align-middle" onClick={() => this.excluirFuncionarios(funcionarios._id)}><FaTrash /></td>
                                                    </tr>
                                                ))
                                            )
                                        }
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

export default Funcionario;


