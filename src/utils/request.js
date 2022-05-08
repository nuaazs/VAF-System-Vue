/* eslint-disable no-unused-vars */
//import db from './localstorage'
import axios from "axios";
import cookie from "js-cookie"
// 统一配置,
// let baseURL =  'http://www.lyxxkj.com.cn'//服务器运行
// let baseURL =  'http://47.96.140.249:8070'//本地运行
   let baseURL =  'http://192.168.0.85:8070'//本地运行
// let baseURL =  'https://www.lyxxkj.com.cn'
let Axios = axios.create({
    baseURL: baseURL, // api 的 base_url
    responseType: 'json',
    validateStatus(status) {
        // 200 外的状态码都认定为失败
        return status === 200
    }
})
// let token = 'Bearer '+ cookie.get("XXX")


// // http request 拦截器
Axios.interceptors.request.use(
    config => {
        // 判断是否存在token，如果存在的话，则每个http header都加上tokendb("HEADER_AUTHORIZATION")
        // config.headers.Authorization = token;
        
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
Axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            if (response.data.code == 200) {
                return response.data;
            } else if (response.data.code == 10018003) {
                return window.location.href = ''
            } else {
                return response.data;
            }
        } else {
        }
    },
    error => {
        let code = 0;
        try {
            code = error.response.code;
        } catch (e) {
            if (error.toString().indexOf("Error: timeout") !== -1) {
                return Promise.reject(error);
            }
            if (error.toString().indexOf("Error: Network Error") !== -1) {
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
export default Axios
