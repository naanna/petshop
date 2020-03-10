import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const router = new Router({
    mode: 'history', //去掉#号,
    routes: [{
            path: '/login',
            name: 'Login',
            component: resolve => require(['../components/login/login.vue'], resolve)
        }, {
            path: '/forgetpsd',
            name: 'forgetpsd',
            component: resolve => require(['../components/login/forgetpsd.vue'], resolve)
        }, {
            path: '/register',
            name: 'register',
            component: resolve => require(['../components/login/register.vue'], resolve)
        },
        {
            path: '/',
            component: resolve => require(['../components/index.vue'], resolve),
            children: [{
                    path: '/',
                    name: 'main',
                    component: resolve => require(['../components/main.vue'], resolve)
                }, {
                    path: '/pet/index',
                    name: 'allPet',
                    component: resolve => require(['../components/pet/index.vue'], resolve)
                },
                {
                    path: '/pet/cat',
                    name: 'cat',
                    component: resolve => require(['../components/pet/cat.vue'], resolve)
                },
                {
                    path: '/pet/dog',
                    name: 'dog',
                    component: resolve => require(['../components/pet/dog.vue'], resolve)
                },
                {
                    path: '/pet/pig',
                    name: 'pig',
                    component: resolve => require(['../components/pet/pig.vue'], resolve)
                }, {
                    path: '/pet/goods',
                    name: 'goods',
                    component: resolve => require(['../components/pet/goods.vue'], resolve)
                },
                {
                    path: '/customer/index',
                    name: 'allCustomer',
                    component: resolve => require(['../components/customer/index.vue'], resolve)
                },
                {
                    path: '/customer/vip',
                    name: 'vip',
                    component: resolve => require(['../components/customer/vip.vue'], resolve)
                },
                {
                    path: '/customer/admin',
                    name: 'admin',
                    component: resolve => require(['../components/customer/admin.vue'], resolve)
                },
                {
                    path: '/fosterCare/index',
                    name: 'allFosterCare',
                    component: resolve => require(['../components/fostercare/index.vue'], resolve)
                }, {
                    path: '/fosterCare/historyCare',
                    name: 'historyCare',
                    component: resolve => require(['../components/fostercare/historycare.vue'], resolve)
                },
                {
                    path: '/fosterCare/my',
                    name: 'myFosterCare',
                    component: resolve => require(['../components/fostercare/my.vue'], resolve)
                },
                {
                    path: '/fosterCare/rule',
                    name: 'ruleFosterCare',
                    component: resolve => require(['../components/fostercare/rule.vue'], resolve)
                },
                {
                    path: '/leaveMessage/look',
                    name: 'lookLeaveMessage',
                    component: resolve => require(['../components/leavemessage/look.vue'], resolve)
                },
                {
                    path: '/leaveMessage/my',
                    name: 'myLeaveMessage',
                    component: resolve => require(['../components/leavemessage/my.vue'], resolve)
                },
                {
                    path: '/manual/look',
                    name: 'manualLook',
                    component: resolve => require(['../components/manual/look.vue'], resolve)
                },
                {
                    path: '/manual/dog',
                    name: 'manualDog',
                    component: resolve => require(['../components/manual/dog.vue'], resolve)
                },
                {
                    path: '/manual/cat',
                    name: 'manualCat',
                    component: resolve => require(['../components/manual/cat.vue'], resolve)
                },
                {
                    path: '/manual/pig',
                    name: 'manualPig',
                    component: resolve => require(['../components/manual/pig.vue'], resolve)
                },
                {
                    path: '/count/life',
                    name: 'life',
                    component: resolve => require(['../components/count/life.vue'], resolve)
                },
                {
                    path: '/count/distribution',
                    name: 'distribution',
                    component: resolve => require(['../components/count/distribution.vue'], resolve)
                },
                {
                    path: '/manage/approval',
                    name: 'approval',
                    component: resolve => require(['../components/manage/approval.vue'], resolve)
                },
                {
                    path: '/manage/order',
                    name: 'costOrder',
                    component: resolve => require(['../components/manage/order.vue'], resolve)
                },
                {
                    path: '/manage/careManage',
                    name: 'careManage',
                    component: resolve => require(['../components/manage/caremanage.vue'], resolve)
                },
                {
                    path: '/manage/petManage',
                    name: 'petManage',
                    component: resolve => require(['../components/manage/petmanage.vue'], resolve)
                },
                {
                    path: '/manage/goodsManage',
                    name: 'goodsManage',
                    component: resolve => require(['../components/manage/goodsmanage.vue'], resolve)
                },
                {
                    path: '/manage/leaveMessageManage',
                    name: 'leaveMessageManage',
                    component: resolve => require(['../components/manage/leavemessagemanage.vue'], resolve)
                },
                {
                    path: '/manage/scheduleManage',
                    name: 'scheduleManage',
                    component: resolve => require(['../components/manage/ScheduleManage.vue'], resolve)
                },
                {
                    path: '/manage/videoManage',
                    name: 'videoManage',
                    component: resolve => require(['../components/manage/VideoManage.vue'], resolve)
                },
                {
                    path: '/help/help',
                    name: 'help',
                    component: resolve => require(['../components/help/help.vue'], resolve)
                },
                {
                    path: '/help/about',
                    name: 'about',
                    component: resolve => require(['../components/help/about.vue'], resolve)
                },
                {
                    path: '/shpping/order',
                    name: 'order',
                    component: resolve => require(['../components/shpping/order.vue'], resolve)
                },
                {
                    path: '/shpping/shopcar',
                    name: 'shopCar',
                    component: resolve => require(['../components/shpping/shopcar.vue'], resolve)
                },
                {
                    path: '/shpping/favorites',
                    name: 'favorites',
                    component: resolve => require(['../components/shpping/favorites.vue'], resolve)
                },
                {
                    path: '/shpping/cost',
                    name: 'shppingCost',
                    component: resolve => require(['../components/shpping/cost.vue'], resolve)
                },
                {
                    path: '/shpping/historycost',
                    name: 'historyCost',
                    component: resolve => require(['../components/shpping/historycost.vue'], resolve)
                },
                {
                    path: '/shpping/person',
                    name: 'person',
                    component: resolve => require(['../components/shpping/person.vue'], resolve)
                },
                {
                    path: '/shpping/changepic',
                    name: 'changePic',
                    component: resolve => require(['../components/shpping/changepic.vue'], resolve)
                },
                {
                    path: '/video/index',
                    name: 'showIndex',
                    component: resolve => require(['../components/video/index.vue'], resolve)
                },
                {
                    path: '/video/uploadManage',
                    name: 'uploadManage',
                    component: resolve => require(['../components/video/MyManage.vue'], resolve)
                },
                {
                    path: '/video/myUpload',
                    name: 'myUpload',
                    component: resolve => require(['../components/video/MyUpload.vue'], resolve)
                },
                {
                    path: '/video/:id',
                    name: 'Watch',
                    component: resolve => require(['../components/video/Watch.vue'], resolve)
                },
                {
                    path: '/chat/index',
                    name: 'chat',
                    component: resolve => require(['../components/chat/index.vue'], resolve)
                }
            ]
        }
    ],
})

router.beforeEach((to, from, next) => {
    if (to.path === '/login' || to.path === '/forgetpsd' || to.path === '/register') {
        next();
    } else {
        let token = localStorage.getItem('token');
        if (token === null || token === '') {
            next('/login');
        } else {
            next();
        }
    }
});

export default router