import React, { Component } from 'react';
//import Helmet from 'react-helmet';
//import { Link } from 'react-router-dom';
import api from '../../service/api';
//import './style.css';

class HomeSistema extends Component {
    constructor(){
        super();
        this.state ={
            logged: false
        }
    };

    componentDidMount(){
        this.verifyToken();
    };

    async verifyToken(){
        const token = localStorage.getItem('Key_Andy');
        const id = localStorage.getItem('Key_Id');
    
        await api.get(`/verifyToken/${id}`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
        }).then((response) => {
            if(response.data.status === 200) {
                this.setState({
                    logged: true
                })
            } else {
                localStorage.removeItem('Key_Andy');
                localStorage.removeItem('Key_Id');
                this.setState({
                    logged: false
                });
            }
        }).catch ((err) => {
            console.log(err);
        });
    }

    render() {
        return (
            <h1>Ola</h1>
        )
    }
}

export default HomeSistema;


