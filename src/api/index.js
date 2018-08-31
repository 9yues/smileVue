import axios from 'axios'
import qs from 'qs'
import url from './serviceAPI.config'

// 获取列表数据
export function getIndex(obj) {
    const params = Object.assign({}, {}, obj);
    return axios({
        url: url.getShoppingMallInfo,
        method: 'GET',
        params
    }).then(res => {
        return Promise.resolve(res.data)
    })
}

// 注册
export function registerUser(obj) {
    const params = Object.assign({}, {}, obj);
    const data = qs.stringify(params);
    return axios({
        url: url.registerUser,
        method: 'POST',
        data
    }).then(res => {
        return Promise.resolve(res.data)
    })
}