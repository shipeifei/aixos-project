

// {url:'请求接口的url&请求method',f:cancle}
const pending = [];// 正在请求url
// 相同的接口被请求了多次, 只留第一次, 其他的都取消请求
const removePending = (config, f) => {
    const urlFlag = config.url + '&' + config.method
    if (pending.indexOf(urlFlag) !== -1) {
        if (f) {
            f('cancelToken'); // 执行取消操作
        } else {
            pending.splice(pending.indexOf(urlFlag), 1) // 删除url记录
        }
    }
    if (f) {
        pending.push(urlFlag)
    }
}
export default removePending;
