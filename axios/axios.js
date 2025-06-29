import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.122:4000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials:true,
    timeout: 10000,
});

export default axiosInstance;
