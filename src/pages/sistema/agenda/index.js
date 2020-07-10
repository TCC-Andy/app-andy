import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu';
import '../styleGlobalSistema.css';
import moment from 'moment';

class Agenda extends Component {
    constructor () {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            logged: false,
            funcionarios: [],
            agendasAll: [],
            carregando: false,
            selected: undefined,
            mensagem: undefined,
            dataAtual: undefined
        }
    };

    componentDidMount() {
        this.verifyToken();
        this.dataAtual();
        setTimeout(() => {
            this.loadAgendas();
            this.loadFuncionarios();
        }, 1000)
    };

    verifyToken = async () => {
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

    loadFuncionarios = async () => {
        const idEmpresa = localStorage.getItem('Key_Id_Empresa');
        const response = await api.get(`/showEmps/${idEmpresa}`);
        this.setState({ funcionarios: response.data.funcionarios });
    }

    loadAgendaAll = async () => {
        this.dataAtual();
        setTimeout(() => {
            this.loadAgendas();
        }, 1500)
    }

    dataAtual = async () => {
        this.setState({
            carregando: true,
        })
        const now = new Date();
        let dia = now.getDate();
        if (dia.toString().length === 1) {
            dia = "0" + dia;
        }
        let mes = now.getMonth() + 1;
        if (mes.toString().length === 1) {
            mes = "0" + mes;
        }
        const ano = now.getFullYear();
        this.setState({
            dataAtual: (ano + "/" + mes + "/" + dia).toString(),
        })
    }

    loadAgendas = async () => {
        const idEmpresa = localStorage.getItem('Key_Id_Empresa');
        const dataAtual = this.state.dataAtual;
        const data = {
            dataAgenda: dataAtual
        }
        await api.post(`/showScheduleByCompany/${idEmpresa}`, data).then(response => {
            if (response.data.status === 200) {
                this.setState({
                    agendasAll: response.data.agenda,
                    carregando: false
                });
            }
        })
    }

    concluirAgendamento = async (id) => {
        const data = {
            status: 2,
            idAgenda: id
        }
        await api.post('/changeScheduleStatus', data).then(response => {
            if (response.data.status === 200) {
                this.loadAgendas();
            }
        })
    }

    limparForm = async () => {
        this.setState({
            selected: true
        })
        this.refs.data.value = '';
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            idFuncionario: this.refs.funcionario.value,
            dataAgenda: moment(this.refs.data.value).format('YYYY/MM/DD')
        }
        await api.post('/showScheduleByDateEmp', data).then(response => {
            if (response.data.status === 200) {
                this.setState({
                    carregando: true,
                    agendasAll: []
                });
                setTimeout(() => {
                    this.setState({
                        carregando: false,
                        agendasAll: response.data.agenda,
                    });
                    this.limparForm()
                }, 1500)
            } else if(response.data.status === 400) {
                this.setState({
                    agendasAll: []
                });
            }
        })
    }
    render() {
        const funcionarios = this.state.funcionarios;
        const agenda = this.state.agendasAll;
        const carregando = this.state.carregando;
        const selected = this.state.selected;
        const dataAtual = this.state.dataAtual;
        return (
            <div className="row">
                <div className="col-md-2">
                    <Menu />
                </div>
                <div className="col-md-10">
                    <div className="corpo">
                        <div className="container">
                            <h3 className="title">Agenda</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-row align-items-center justify-content-md-center">
                                            <div className="form-group col-md-4">
                                                <select className="form-control" ref="funcionario" id="funcionario">
                                                    <option selected={selected === true ? 'selected' : ''}>Selecione um Funcionário.</option>
                                                    {funcionarios.map(funcionario => (
                                                        <option value={funcionario._id}>{funcionario.nome + ' ' + funcionario.sobrenome}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4">
                                                <input type="date" className="form-control" id="data" ref='data' />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <button className="btn btn-success"> Pesquisar </button> &nbsp;
                                                <button className="btn btn-primary" onClick={this.loadAgendaAll}> Todas Agendas </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                {carregando === true ?
                                    <div className="col-md-12">
                                        <span>Aguarde que estamos buscando a agenda.</span>
                                    </div>
                                    :
                                    agenda.length === 0 ?
                                        (
                                            <span>Não existe agenda para esta data.</span>
                                        )
                                        :
                                        (
                                            agenda.map(agendas => (
                                                <div className="col-md-4">
                                                    <div className="card">
                                                        {agendas.status === 1 ?
                                                            <div className="card-header bg-secondary text-white">{agendas.nomeFuncionario + ' ' + agendas.sobrenomeFuncionario}
                                                                <span className="valorServico">
                                                                    {!agendas.valorServico ? "" :
                                                                        agendas.valorServico.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                                                    }
                                                                </span>
                                                            </div>
                                                            :
                                                            agendas.status === 2 ?
                                                                <div className="card-header bg-success text-white">{agendas.nomeFuncionario + ' ' + agendas.sobrenomeFuncionario}
                                                                    <span className="valorServico">
                                                                        {!agendas.valorServico ? "" :
                                                                            agendas.valorServico.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                                                        }                                                                    </span>
                                                                </div>
                                                                :
                                                                agendas.status === 0 ?
                                                                    <div className="card-header bg-danger text-white">{agendas.nomeFuncionario + ' ' + agendas.sobrenomeFuncionario}
                                                                        <span className="valorServico">
                                                                            {!agendas.valorServico ? "" :
                                                                                agendas.valorServico.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                                                                            }                                                                        </span>
                                                                    </div>
                                                                    :
                                                                    ""
                                                        }
                                                        <div className="card-body text-secondary">
                                                            <h5 className="card-title text-dark">{agendas.nomeCliente + ' ' + agendas.sobrenomeCliente}</h5>
                                                            <p className="card-text">Serviço: {agendas.nomeServico}</p>
                                                            <p className="card-text">Horário: {agendas.inicioServico + ' - ' + agendas.fimServico}</p>
                                                        </div>
                                                        {agendas.status === 1 && agendas.dataAgenda === dataAtual || agendas.status === 1 && agendas.dataAgenda < dataAtual ? 
                                                                <div className="card-footer text-right">
                                                                    <button type="submit" className="btn btn-sm btn-outline-success" onClick={() => this.concluirAgendamento(agendas._id)}> Concluir </button>
                                                                </div>
                                                                :
                                                                agendas.status === 2 ?
                                                                    <div className="card-footer text-center">
                                                                        <span className="text-success">Atendimento concluido com sucesso.</span>
                                                                    </div>
                                                                    :
                                                                    agendas.status === 0 ?
                                                                        <div className="card-footer text-center">
                                                                            <span className="text-danger">Atendimento cancelado.</span>
                                                                        </div> :
                                                                        ""
                                                        }
                                                    </div>
                                                    <br />
                                                </div>
                                            ))
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Agenda;


