import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter);

import axios from './api/axios.js'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
Vue.prototype.$axios = axios

import moment from 'moment'
Vue.prototype.moment = moment;
import router from "./router/router.js";
import store from "./store/main.js";
import 'default-passive-events'
import './assets/icon/iconfont.css'

import echarts from 'echarts'
import vueEcharts from 'vue-echarts'
Vue.component('v-chart', vueEcharts)
Vue.prototype.$echarts = echarts

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')