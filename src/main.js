import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import { Message } from 'element-ui'
Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter);


import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/icon/iconfont.css'
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

import echarts from 'echarts'
import vueEcharts from 'vue-echarts'
Vue.component('v-chart', vueEcharts)
Vue.prototype.$echarts = echarts

import moment from 'moment'
Vue.prototype.moment = moment;
import router from "./router/router.js";
import store from "./store/main.js";

axios.defaults.headers.common['Authorization'] = store.state.token


new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')


//  REQUEST 请求异常拦截
axios.interceptors.request.use(config => {
    //判断是否存在token，如果存在将每个页面的header都添加token
    if (store.state.token) {
        if (store.state.token.token) {
            config.headers.common['Authorization'] = store.state.token.token;
        } else if (store.state.token) {
            config.headers.common['Authorization'] = store.state.token;
        }
    }
    return config;
}, err => {
    Message.error({ message: '请求超时!' });
    return Promise.resolve(err);
})

//  RESPONSE 响应异常拦截
axios.interceptors.response.use(data => {
    if (!data.data.success) {
        Message.error({ message: data.data.reason });
    }
    if (data.data.status == 403) {
        store.commit('delToken');
        router.push('/login');
        return new Promise(() => {});
    } else {
        return data;
    }
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误(400)';
                break;
            case 401:
                err.message = '未授权，请重新登录(401)';
                break;
            case 403:
                err.message = '登录已过期,请重新登录';
                break;
            case 404:
                err.message = '请求出错(404)';
                break;
            case 408:
                err.message = '请求超时(408)';
                break;
            case 500:
                err.message = '服务器错误(500)';
                break;
            case 501:
                err.message = '服务未实现(501)';
                break;
            case 502:
                err.message = '网络错误(502)';
                break;
            case 503:
                err.message = '服务不可用(503)';
                break;
            case 504:
                err.message = '网络超时(504)';
                break;
            case 505:
                err.message = 'HTTP版本不受支持(505)';
                break;
            default:
                err.message = `连接出错(${err.response.status})!`;
        }
    } else {
        err.message = '连接服务器失败!'
    }
    Message.error({ message: err.message })
    return Promise.resolve(err);
})