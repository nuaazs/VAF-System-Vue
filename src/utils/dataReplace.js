
export function dataReplace(value) {
    if (value) {
        if (value.length == 11) {
            // 手机号
            return value.toString().replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        } else if (value.length == 12) {
            // 12位座机
            return value.toString().replace(/(\d{4})\d{4}(\d{4})/, '$1****$2');
        } else if (value.length == 18) {
            // 18位身份证号
            return value.toString().replace(/(\d{6})\d{6}(\d{6})/, '$1****$2');
        } else {
            // 15位身份证号
            return value.toString().replace(/(\d{6})\d{5}(\d{4})/, '$1****$2');
        }
    } else {
        return null;
    }
}
