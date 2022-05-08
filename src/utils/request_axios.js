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
