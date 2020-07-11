import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './style.css';
import barbearia from '../../assets/images/barbearia.jpg';
import salao from '../../assets/images/salao.jpg';
import lavaCar from '../../assets/images/lavacar.png';
import mecanica from '../../assets/images/mecanica.jpeg';
import logo from '../../assets/images/logo_andy.png';
import { IoMdLogIn } from 'react-icons/io';
import { MdEmail } from 'react-icons/md';
import {
    FaUserFriends,
    FaAndroid,
    FaApple,
    FaPlus,
    FaBook,
    FaRegCopyright,
    FaPhone
} from 'react-icons/fa';
import {
    Container,
    Row,
    Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Button
} from 'reactstrap';

const Home = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div className="site">
            <Helmet title="Andy Services" />
            <div className="header">
                <Container className="themed-container" fluid={true} >
                    <Row>
                        <Col>
                            <Navbar light expand="md" className="fixed-top navBarSite">
                                <NavbarBrand href="/"><img className="logo" src={logo} alt="logo" /></NavbarBrand>
                                <NavbarToggler onClick={toggle} />
                                <Collapse isOpen={isOpen} navbar>
                                    <div className="associados">
                                        <Button className="btLogin" color="success" href="../login"><IoMdLogIn /> Login</Button>
                                    </div>
                                </Collapse>
                            </Navbar>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h3 className="mensagem">
                                Organize a agenda da sua
                                <br />empresa e mantenha
                                <br />sempre o foco em seus
                                <br />clientes para melhor
                                <br />atende-lo.
                            </h3>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <h6 className="frase">Esqueça os softwares
                                <br />complexos e o acúmulo de
                                <br /> fichas de papel. A Andy Service
                                <br />é a ferramenta mais simples
                                <br />para controlar sua agenda de qualquer
                                <br /> lugar.
                            </h6>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="service">
                <Container className="service-container" fluid={true}>
                    <h1 className="titulo">Perfeito para todos os ramos de atividades com agendamentos....</h1>
                    <Row xs="1" sm="2" md="4">
                        <Col xs="3">
                            <div className="services">
                                <img className="imagem" src={barbearia} alt="Barbearia." />
                                <div className="fundo_card">
                                    <div className="texto">
                                        <span className="titulo_card">Barbearia</span><br />
                                        <span className="mensagem_card">Comodidade, Excelência transmitido por mais de 6k profissionais qualificados.</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="3">
                            <div className="services">
                                <img className="imagem" src={lavaCar} alt="Barbearia." />
                                <div className="fundo_card">
                                    <div className="texto">
                                        <span className="titulo_card">Lava-Car</span><br />
                                        <span className="mensagem_card">Polimento, Epelhamento, Vitrificação, Estética automotiva em geral. Agendamos para você.</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="3">
                            <div className="services">
                                <img className="imagem" src={salao} alt="Barbearia." />
                                <div className="fundo_card">
                                    <div className="texto">
                                        <span className="titulo_card">Salão de Beleza</span><br />
                                        <span className="mensagem_card">Agendamento de Beleza, Estética, Quimica a Andy Service realiza pra você.</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="3">
                            <div className="services">
                                <img className="imagem" src={mecanica} alt="Barbearia." />
                                <div className="fundo_card">
                                    <div className="texto">
                                        <span className="titulo_card">Mecanica</span><br />
                                        <span className="mensagem_card">Não se preocupe, realizamos todos seus agendamentos para que sua empresa nao pare.</span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="info">
                <Container className="info-container" fluid={true}>
                    <h1 className="titulo">+ Agendamento - Trabalho....</h1>
                    <Row xs="1" sm="2" md="4" >
                        <Col md="4">
                            <div className="infos">
                                <i className="icone"><FaBook /></i><br />
                                <span className="titulo_infor">Agendamento Online.</span><br />
                                <span className="mensagem_info">Seus clientes com mais facilidade para agendar um horario seus agendamento em um único lugar.</span>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="infos">
                                <i className="icone"><FaUserFriends /></i><br />
                                <span className="titulo_infor">Gerenciamento de Clientes.</span><br />
                                <span className="mensagem_info">Tenha controle total de seus clientes em um único click.</span>
                            </div>
                        </Col>
                        <Col md="4">
                            <div className="infos">
                                <i className="icone"><FaAndroid /><FaApple /></i><br />
                                <span className="titulo_infor"><FaPlus /> comodidade.</span><br />
                                <span className="mensagem_info">Fornecemos seus horarios disponiveis na palma da mão dos usúarios.</span>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="rodape">
                <Container className="rodape-container" fluid={true}>
                    <Row>
                        <Col md="4">
                            <div className="contato">
                                <i className="telefone"><FaPhone /> +55 41-3333-3333</i><br />
                                <i className="email"><MdEmail /> contato@andyservices.com.br</i>
                            </div>
                        </Col>
                        <Col md="4"></Col>
                        <Col md="4">
                            <div className="direitos">
                                <i className="direitos-autorais"><FaRegCopyright /> Andy Services 2020</i>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Home;