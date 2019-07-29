import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
Vue.use(VueRouter);



import router from "./router/router.js";

new Vue({
    render: h => h(App),
    router
}).$mount('#app')