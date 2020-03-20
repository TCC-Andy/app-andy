import { Component } from 'react';
import api from './api';
import history from './history';

class IsAuth extends Component {
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
    
        if(token !== null){
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
                    history.push('/');
                }
            }).catch ((err) => {
                console.log(err);
            });
        }else{
            history.push('/');
        }
    }

}

export default IsAuth;


