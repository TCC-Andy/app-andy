import React, { useState } from 'react';
import Helmet from 'react-helmet';
import './style.css';
import { IoMdLogIn } from 'react-icons/io';
import { FiPhoneCall } from 'react-icons/fi';
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
                    <br />
                    <Button className="contato" color="primary"><FiPhoneCall /> Entre em contato com nossa equipe de Vendas.</Button>
                    <br />
                    <br />
                    <br />
                    <br />
                </Container>
            </div>
           {/* <div className="services">
            <Container className="themed-container" fluid={true} >
                <Row xs="1" sm="2" md="4">
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                </Row>
            </Container>
            </div> */}
        </div>
    );
}

export default Home;