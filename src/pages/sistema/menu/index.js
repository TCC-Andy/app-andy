import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { MdViewAgenda } from 'react-icons/md';
import { FaTools, FaUsers, FaPowerOff } from 'react-icons/fa';
import './styleMenu.css';

export default function Menu() {
    const history = useHistory();

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }
    return (
        <div className="sidebar">
            <div className="perfil">
                <Link to="/meuPerfil" className="boas-vindas">Bem vindo(a), Alexsandro</Link>
                <FaPowerOff className="power" onClick={handleLogout} />
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link className="nav-link" to="/agenda"><MdViewAgenda className="icons" /> Agenda</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/servicos"><FaTools className="icons" /> Serviços</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/funcionarios"><FaUsers className="icons" /> Funcionários</Link>
                </li>
            </ul>
        </div>
    );
}