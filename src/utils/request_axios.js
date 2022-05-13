/*
# ██╗██╗███╗   ██╗████████╗
# ██║██║████╗  ██║╚══██╔══╝
# ██║██║██╔██╗ ██║   ██║
# ██║██║██║╚██╗██║   ██║
# ██║██║██║ ╚████║   ██║
# ╚═╝╚═╝╚═╝  ╚═══╝   ╚═╝
# @Time    : 2022-05-10 19:56:36.000-05:00
# @Author  : 𝕫𝕙𝕒𝕠𝕤𝕙𝕖𝕟𝕘
# @email   : zhaosheng@nuaa.edu.cn
# @Blog    : http://iint.icu/
# @File    : 
# @Describe: None
*/

import request from '../utils/request_axios'

export function sendRequest(url, method, params, responseType) {
    var requestData = { url: url, method: method }
    if (!params) {
        return request(requestData)
    }
    if (method.toLowerCase() === 'post') {
        requestData.params = params
    } else {
        requestData.data = params
        if (responseType) {
            requestData.responseType = responseType
        }
    }
    return request(requestData)
}
