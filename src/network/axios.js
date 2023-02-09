import Vue from 'vue'
import axios from 'axios'
import config from '../config'

let instance = {
    timeout: 60 * 1000 
}

const _axios = axios.create([instance])

// 添加请求拦截器
_axios.interceptors.request.use(function (instance) {
    // 在发送请求之前做些什么
    return instance;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
_axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

Plugin.install = function (Vue, options) {
    Vue.axios = _axios
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get () {
                return _axios
            }
        },
        $axios: {
            get () {
                return _axios
            }
        }
    })
}

Vue.use(Plugin)

export default Plugin
