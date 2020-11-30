import axios from 'axios';

const apiService = axios.create({
    baseURL: 'http://192.168.15.11:3333',
    // baseURL: 'http://localhost:3333', pelo emulador
})

export default apiService;