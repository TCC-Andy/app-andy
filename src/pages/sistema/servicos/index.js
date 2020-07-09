import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu/index';
import '../styleGlobalSistema.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

class Servico extends Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitAlterar = this.handleSubmitAlterar.bind(this);
        this.state = {
            id: undefined,
            logged: false,
            servico: undefined,
            descricao: undefined,
            preco: undefined,
            tempoEstimado: undefined,
            servicos: [],
            edit: [],
            error: undefined,
            success: undefined
        }
    };

    componentDidMount() {
        this.verifyToken();
        this.loadServicos();
    };


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
                    localStorage.removeItem('Key_Id_Empresa');
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

    async handleSubmit(e) {
        e.preventDefault();
        try {
            const data = {
                nome: this.refs.servico.value,
                descricao: this.refs.descricao.value,
                valor: this.refs.valor.value,
                tempo: this.refs.tempoEstimado.value,
                idEmpresa: localStorage.getItem('Key_Id_Empresa')
            }
            if (!data.nome || !data.descricao || !data.valor || !data.tempo) {
                this.setState({
                    error: 'Favor preencher todos os campos.'
                })
            } else {
                await api.post('/createService', data).then(response => {
                    if (response.data.status === 200) {
                        this.setState({
                            success: response.data.mensagem
                        })
                        this.refs.servico.value = '';
                        this.refs.descricao.value = '';
                        this.refs.valor.value = '';
                        this.refs.tempoEstimado.value = '';
                        window.location.reload();
                        this.loadServicos();
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

    loadServicos = async () => {
        const idEmpresa = localStorage.getItem('Key_Id_Empresa');
        const response = await api.get(`/showServices/${idEmpresa}`);
        this.setState({ servicos: response.data.servicos });
    }

    editarServices = async (id) => {
        const response = await api.get(`/showService/${id}`);
        this.setState({ edit: response.data.service })
    }

    excluirServices = async (id) => {
        await api.delete(`/deleteService/${id}`);
        this.loadServicos();
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
    limparTela() {
        this.refs.servico.value = '';
        this.refs.descricao.value = '';
        this.refs.valor.value = '';
        this.refs.tempoEstimado.value = ''
    }
    handleSubmitAlterar = async (e) => {
        e.preventDefault()
        try {
            const data = {
                nome: this.refs.servico.value,
                descricao: this.refs.descricao.value,
                valor: this.refs.valor.value,
                tempo: this.refs.tempoEstimado.value,
            }
            if (!data.nome || !data.descricao || !data.valor || !data.tempo) {
                this.setState({
                    error: 'Favor preencher todos os campos.'
                })
            } else {
                await api.put(`/updateService/${this.state.edit._id}`, data).then(response => {
                    if (response.data.status === 200) {
                        this.limparTela();
                        window.location.reload();
                        this.loadServicos();
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

    render() {
        const servicos = this.state.servicos;
        const editServicos = this.state.edit;
        return (
            <div className="row">
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <div className="corpo">
                        <div className="container">
                            <h3 className="title">Serviços</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-row align-items-center justify-content-md-center">
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="servico">Serviço</label>
                                                <input type="text" className="form-control" id="servico" ref='servico' defaultValue={editServicos.length === 0 ? '' : editServicos.nome} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="descricao">Descrição</label>
                                                <input type="text" className="form-control" id="descricao" ref='descricao' defaultValue={editServicos.length === 0 ? '' : editServicos.descricao} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="valor">Valor</label>
                                                <input type="text" className="form-control" id="valor" ref='valor' defaultValue={editServicos.length === 0 ? '' : editServicos.preco} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Tempo Estimado</label>
                                                <input type="time" className="form-control" id="tempoEstimado" ref='tempoEstimado' defaultValue={editServicos.length === 0 ? '' : editServicos.tempo} />
                                            </div>
                                        </div>
                                        {editServicos.length === 0 ?
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
                                    <caption>Lista de Serviços</caption>
                                    <thead className="bgHead">
                                        <tr>
                                            <th>Serviço</th>
                                            <th>Descrição</th>
                                            <th>Valor</th>
                                            <th>Tempo Estimado</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {servicos.length === 0 ?
                                            (
                                                <tr>
                                                    <th>Não existe serviços cadastrado.</th>
                                                </tr>
                                            )
                                            :
                                            (
                                                servicos.map(servico => (
                                                    <tr key={servico._id}>
                                                        <td>{servico.nome}</td>
                                                        <td>{servico.descricao}</td>
                                                        <td>{servico.preco.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                        <td>{servico.tempo}</td>
                                                        <td className="text-primary pencilTrash" onClick={() => this.editarServices(servico._id)}><FaPencilAlt /></td>
                                                        <td className="text-danger pencilTrash" onClick={() => this.excluirServices(servico._id)}><FaTrash /></td>
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
            </div >
        )
    }
}

export default Servico;


