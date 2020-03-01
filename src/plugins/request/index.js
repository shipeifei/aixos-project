import Vue from 'vue'
import axios from 'axios'
import { responseInterceptorSuccess, responseInterceptorError, requestInterceptorSuccess, requestInterceptorError } from './interceptors'

Vue.prototype.$$http = axios

// 创建一个实例
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : 'http://testapi.yueqizhixiang.com/api/',
    timeout: process.env.AXIOS_TIMEOUT ? process.env.AXIOS_TIMEOUT : 7000
})
instance.defaults.headers.common.Authorization = '68kejian_instance';
// post请求头部
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
instance.interceptors.request.use((config) => requestInterceptorSuccess(config), error => requestInterceptorError(error));

// 响应拦截器
instance.interceptors.response.use(response => responseInterceptorSuccess(response), err => responseInterceptorError(err));

export function get(url, options = {}) {
    return instance.get(url, {
        params: options
    });
}
export function post(url, options = {}) {
    return instance.post(url, options);
}
export function put(url, options = {}) {
    return instance.put(url, options);
}
export function deletefn(url, options = {}) {
    return instance.delete(url, options);
}

export function patch(url, options = {}) {
    return instance.patch(url, options);
}
export default instance
