import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './style.css';
import barbearia from '../../assets/images/barbearia.jpg';
import salao from '../../assets/images/salao.jpg';
import lavaCar from '../../assets/images/lavacar.png';
import mecanica from '../../assets/images/mecanica.jpeg';
import { IoMdLogIn } from 'react-icons/io';
import { Container, 
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
    return(
        <div className="site">
            <Helmet title="Andy Services" />
            <div className="header">
                <Container className="themed-container" fluid={true} >
                    <Row>
                        <Col>
                            <Navbar light expand="md">
                                <NavbarBrand href="/">Andy Services</NavbarBrand>
                                <NavbarToggler onClick={toggle} />
                                <Collapse isOpen={isOpen} navbar>
                                <div className="associados">
                                    <Button color="success"><IoMdLogIn /> Login</Button>
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
            <Container className="service-container" fluid={true} >
                <Row xs="1" sm="2" md="4">
                    <Col xs="3">
                        <div className="services">
                            <img className="imagem" src={barbearia} alt="Barbearia." />
                            <div className="fundo_card">
                                <div className="texto">
                                    <span className="titulo_card">Barbearia</span><br />
                                    <span className="mensagem_card">Com mais de 628.110 profissionais de beleza, ter relacionamento com o seu cliente é fundamental.</span>
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
                                    <span className="mensagem_card">Com mais de 628.110 profissionais de beleza, ter relacionamento com o seu cliente é fundamental.</span>
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
                                    <span className="mensagem_card">Com mais de 628.110 profissionais de beleza, ter relacionamento com o seu cliente é fundamental.</span>
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
                                    <span className="mensagem_card">Com mais de 628.110 profissionais de beleza, ter relacionamento com o seu cliente é fundamental.</span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default Home;