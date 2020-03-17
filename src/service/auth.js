import api from '../service/api';

export const isAuthenticated = () => {

    const token = localStorage.getItem('Key_Andy');
    const id = localStorage.getItem('Key_Id');

    const response = api.get(`/verifyToken/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    
    if(response){
        return true;
    } else {
        return false;
    }
}
