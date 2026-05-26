import axios from 'axios';

axios.defaults.timeout = 30000;

axios.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token');
        return config;
    } else {
        return config;
    }
});

export { axios };
