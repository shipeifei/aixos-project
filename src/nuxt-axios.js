import {
    Message,
    Loading
} from 'element-ui';

export default function ({ $axios, redirect }) {
    // 接口是否请求成功
    function isSuccess(response) {
        return response.status >= 200 && response.status < 300
    }
    function parseBody(json) {
        if (json && json.data.status === 'success') {
            return json.data.body;
        }
        return json;
    }

    // 接口状态检测
    function checkStatus(response) {
        // 用户登录超时
        if (isSuccess(response)) {
            return parseBody(response);
        } else {
            clientMessage(response.statusText || '接口错误');
            return Promise.reject(new Error(response.statusText || '接口错误'));
        }
    }

    // 处理响应拦截器error
    function checkErrStatus(loadinginstace, err) {
        // 接口已经请求成功，只是不在2**状态码
        if (err && err.response) {
            loadinginstace.close()
            switch (err.response.status) {
                case 400:
                    err.message = '错误请求'
                    break
                case 401:
                    err.message = '未授权，请重新登录'
                    // 使用router进行页面跳转
                    break
                case 403:
                    err.message = 'URL拒绝访问'
                    break
                case 404:
                    err.message = 'URL路径错误'
                    break
                case 405:
                    err.message = '请求方法未允许'
                    break
                case 408:
                    err.message = '请求超时'
                    break
                case 500:
                    err.message = '服务器端出错'
                    break
                case 501:
                    err.message = '网络未实现'
                    break
                case 502:
                    err.message = '网络错误'
                    break
                case 503:
                    err.message = '服务不可用'
                    break
                case 504:
                    err.message = '网络超时'
                    break
                case 505:
                    err.message = 'http版本不支持该请求'
                    break
                default:
                    err.message = `连接错误${err.response.status}`
            }
            const errData = {
                code: err.response.status,
                message: err.message
            }
            clientMessage(errData.message + ',错误编码为:' + errData.code);
            return Promise.reject(errData)
        } else {
            // 请求超时或者断网
            if (err.message !== 'cancelToken') {
                loadinginstace.close()
                clientMessage('请求超时或者断网');
            }
            return Promise.reject(err)
        }
    }

    function clientMessage(error) {
        if (process.client) {
            clientMessage(error);
        }
    }
    let loadinginstace = null;
    // $axios.setBaseURL('http://api.example.com')
    // Change URL only for client
    if (process.client) {
        $axios.setBaseURL('http://testapi.yueqizhixiang.com/api/')
    }

    // Change URL only for server
    if (process.server) {
        $axios.setBaseURL('http://api.example.com')
    }
     $axios.defaults.timeout=7000;

    // Adds header: `Content-Type: application/x-www-form-urlencoded` to only post requests
    $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
        'post'
    ])

    // 请求拦截器
    $axios.onRequest(config => {
        if (process.client) {
            loadinginstace = Loading.service({
                fullscreen: true
            });
        }
        // 可以从cookie或者store获取token
        // $axios.setHeader('Authorization', '456')
        config.headers.common['Authorization'] = '456'
        config.headers.common['X-Access-Token'] = 'asdfasfd'
    })
    $axios.onResponse(response => {
        if (process.client) {
            loadinginstace && loadinginstace.close()
        }
        console.log(response)
        return  Promise.resolve( checkStatus(response))
    })
    $axios.onResponseError(err => {
        if (process.client) {
            loadinginstace && loadinginstace.close()
        }
        return Promise.reject(checkErrStatus(loadinginstace, err))
    })
    $axios.onRequestError(err => {
        clientMessage('接口请求错误');
        return Promise.reject(err)
    })

}
