import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdViewAgenda, MdStore } from 'react-icons/md';
import { FaTools, FaUsers, FaPowerOff } from 'react-icons/fa';
import './styleMenu.css';
import api from '../../../service/api';

export default function Menu() {
    const history = useHistory();
    const [usuario, setUsuario] = useState([]);

    useEffect(() => {
        carregarUsuario();
    }, [])

    async function carregarUsuario() {
        const idUsuario = localStorage.getItem('Key_Id_Usuario');
        if (idUsuario) {
            const usuario = await api.get(`/retrieveUser/${idUsuario}`);
            setUsuario(usuario.data.usuario)
        }
    }

    async function handleLogout() {
        localStorage.clear();
        history.push('/');
	}
	
    return (
        <div className="sidebar">
            <div className="perfil">
                <Link to="/meuPerfil" className="boas-vindas">Bem vindo(a), {usuario.perfil === 'administrador' ? 'Adm' : ''} {usuario.nome}</Link>
                <FaPowerOff className="power" onClick={handleLogout} />
            </div>
            <ul className="nav flex-column">
                {usuario.perfil === 'administrador' ?
                    (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/administrador/cadastroEmpresa"><MdStore className="icons" /> Cadastro Empresa </Link>
                            </li>
                        </>
                    )
                    :
                    (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/agenda"><MdViewAgenda className="icons" /> Agenda </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/servicos"><FaTools className="icons" /> Serviços </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/funcionarios"><FaUsers className="icons" /> Funcionários </Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </div>
    );
}
