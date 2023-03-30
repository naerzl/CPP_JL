import axios from 'axios'
import store from '@/store';
import { getOAuthToken } from './AES';
import { message } from 'antd';
import { logout } from '@/store/modules/login';
const request = axios.create({
    baseURL: 'https://dev-api.taiduoshi.net/',
})

//请求拦截器
request.interceptors.request.use(function (config) {
    const { user } = store.getState()
    if (user.authorization.access_token) {
        config.headers.Authorization = `Bearer ${user.authorization.access_token}`
    }
    if (user.token) {
        config.headers.Token = user.token
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// 响应拦截器
request.interceptors.response.use(function (response) {
    if (response.data.code === 600) {
        message.destroy()
        message.warning(response.data.message)
        store.dispatch(logout(''))
        window.location.href = '/login'
    }
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