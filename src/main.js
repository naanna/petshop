import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/error.js'
import './assets/icon/iconfont.css'
Vue.use(VueAxios, axios)

import echarts from 'echarts'
import vueEcharts from 'vue-echarts'
Vue.component('v-chart', vueEcharts)
Vue.prototype.$echarts = echarts

import moment from 'moment'
Vue.prototype.moment = moment;
import User from "@assets/data.js";
Vue.prototype.User = User;
import router from "./router/router.js";
import store from "./store/main.js";

new Vue({
    render: h => h(App),
    store,
    router,
}).$mount('#app')