import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu/index';
import '../styleGlobalSistema.css';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

class Servico extends Component {
    constructor() {
        super();
        this.state = {
            logged: false
        }
    };

    componentDidMount() {
        this.verifyToken();
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
                                    <form>
                                        <div className="form-row align-items-center justify-content-md-center">
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="servico">Serviço</label>
                                                <input type="text" className="form-control" id="servico" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="descricao">Descrição</label>
                                                <input type="text" className="form-control" id="descricao" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="valor">Valor</label>
                                                <input type="number" className="form-control" id="valor" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label className="subTitulos" htmlFor="tempoEstimado">Tempo Estimado</label>
                                                <input type="time" className="form-control" id="tempoEstimado" />
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-success botao">Cadastrar</button>
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
                                        <tr>
                                            <td>Corte Masc</td>
                                            <td>Corte de cabelo Masculino</td>
                                            <td>R$ 30,00</td>
                                            <td>00:30</td>
                                            <td className="text-primary pencilTrash"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash"><FaTrash /></td>
                                        </tr>
                                        <tr>
                                            <td>Corte Fem Médio</td>
                                            <td>Corte de cabelo Femino Médio</td>
                                            <td>R$ 60,00</td>
                                            <td>00:40</td>
                                            <td className="text-primary pencilTrash"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash"><FaTrash /></td>
                                        </tr>
                                        <tr>
                                            <td>Corte Fem Curto</td>
                                            <td>Corte de cabelo Feminino Curto</td>
                                            <td>R$ 50,00</td>
                                            <td>00:45</td>
                                            <td className="text-primary pencilTrash"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash"><FaTrash /></td>
                                        </tr>
                                        <tr>
                                            <td>Corte Fem Long</td>
                                            <td>Corte de cabelo Feminino Longo</td>
                                            <td>R$ 70,00</td>
                                            <td>00:45</td>
                                            <td className="text-primary pencilTrash"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash"><FaTrash /></td>
                                        </tr>
                                        <tr>
                                            <td>Escova</td>
                                            <td>Escova cabelo Feminino</td>
                                            <td>R$ 100,00</td>
                                            <td>01:00</td>
                                            <td className="text-primary pencilTrash"><FaPencilAlt /></td>
                                            <td className="text-danger pencilTrash"><FaTrash /></td>
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

export default Servico;


