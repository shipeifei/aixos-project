import {
    Message,
    Loading
} from 'element-ui'
import axios from 'axios'
import { checkStatus, checkErrStatus } from './utils'
import removePending from './duplicate'
const CcancelToken = axios.CancelToken;
let loadinginstace = null;
// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();
// 配置会以一个优先顺序进行合并。这个顺序是：
// 在 lib/defaults.js 找到的库的默认值，然后是实例的 defaults 属性，最后是请求的 config 参数。
// 后者将优先于前者

// -----------vue-cli2.0方式
// let baseURL = 'http://testapi.yueqizhixiang.com/api/'
// console.log('process.env.NODE_ENV:' + process.env.NODE_ENV)
// if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'develoment') {
//     baseURL = 'http://testapi.yueqizhixiang.com/api/'
// } else if (process.env.NODE_ENV === 'uat') {
//     baseURL = 'http://uatapi.yueqizhixiang.com/api/'
// } else if (process.env.NODE_ENV === 'gray') {
//     baseURL = 'http://grayapi.yueqizhixiang.com/api/'
// } else if (process.env.NODE_ENV === 'proc' || process.env.NODE_ENV === 'production') {
//     baseURL = 'http://api.yueqizhixiang.com/api/'
// }
/**
 * 响应拦截器成功回调函数
 */
export function responseInterceptorSuccess(response) {
    removePending(response.config)
    loadinginstace.close()
    return checkStatus(response)
}

/**
 * 响应拦截器失败回调函数
 */
export function responseInterceptorError(error) {
    return checkErrStatus(loadinginstace, error)
}


/**
 * 请求拦截器成功回调函数
 */
export function requestInterceptorSuccess(config) {
    // if (config.method === 'post') {
    config.cancelToken = new CcancelToken((c) => {
        // ajax发送请求执行执行一个取消操作
        removePending(config, c)
    })
    // }

    // 路由跳转
    // 增加loading动画
    loadinginstace = Loading.service({
        fullscreen: true
    });
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // 1、store
    // 2、cookie
    config.headers['x-access-token'] = 'username'
    return config;
}

/**
 * 请求拦截器失败回调函数
 */
export function requestInterceptorError(error) {
    Message.error('接口请求错误');
    return Promise.reject(error)
}


