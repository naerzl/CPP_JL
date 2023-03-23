import axios from 'axios'
import store from '@/store';
import { getOAuthToken } from './AES';
const request = axios.create({
    baseURL: 'https://dev-api.taiduoshi.net/',
})

//请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.getState()
    if (user.authorization.access_token) {
        config.headers.Authorization = `Bearer ${user.authorization.access_token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
request.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    console.dir(error)
    if (error.response.status === 401) {
        await getOAuthToken()
        return Promise.reject(error.response.status)
    }
    return Promise.reject(error);
});

export default request