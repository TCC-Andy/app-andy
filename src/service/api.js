import axios from 'axios';
require('dotenv').config();

export default axios.create({
    baseURL: 'http://localhost:3001',
    responseType: "json",
});