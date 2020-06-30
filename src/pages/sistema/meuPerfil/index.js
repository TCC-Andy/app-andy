import React, { Component } from 'react';
import api from '../../../service/api';
import history from '../../../service/history';
import Menu from '../menu';
import '../styleGlobalSistema.css';
import avatar from '../../../assets/images/avatar.png';


class MeuPerfil extends Component {
    constructor () {
        super();
        this.state = {
            logged: false,
            empresa: [],
            usuario: []
        }
    };

    componentDidMount() {
        this.verifyToken();
        this.carregarEmpresa();
        this.carregarUsuario();
    };

    carregarEmpresa = async () => {
        //const idUsuario = localStorage.getItem('Key_Id');
        const idUsuario = '1';
        if (idUsuario) {
            const empresa = await api.get(`/showCompanyUser/${idUsuario}`);
            console.log(empresa);
            this.setState({
                empresa: empresa.data.emp
            })
        }

    }
    carregarUsuario = async () => {
        const idUsuario = localStorage.getItem('Key_Id');
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
                                    <div className="col-md-3">
                                        <div className="imgUsuario">
                                            <img className="imagemUsuario" src={avatar} alt="imagem do usuario" />
                                        </div>
                                        <span className="nomeSobrenome">{usuario.nome + ' ' + usuario.sobrenome}</span>
                                    </div>
                                    <div className="col-md-6"></div>
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


