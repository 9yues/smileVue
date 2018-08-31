const BASEURL = 'https://easy-mock.com/mock/5b20c976bf99c32d68c0b880/smileVue/';
const LOCALURL = 'http://localhost:3000/'
const URL = {
    // 获取首页列表数据
    getShoppingMallInfo: `${BASEURL}index`,
    getGoodsInfo: `${BASEURL}getGoodsInfo`,

    // 注册
    registerUser: `${LOCALURL}user/register`
}

module.exports = URL