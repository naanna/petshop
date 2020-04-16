import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
        username: localStorage.getItem('username') ? localStorage.getItem('username') : '',
        nickname: localStorage.getItem('nickname') ? localStorage.getItem('nickname') : '',
        picture: localStorage.getItem('picture') ? localStorage.getItem('picture') : '',
        permissions: localStorage.getItem('permissions') ? localStorage.getItem('permissions') : '',
        regday: localStorage.getItem('regday') ? localStorage.getItem('regday') : ''
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            localStorage.setItem("token", token.token);
        },
        setUser(state, user) {
            state.username = user.user.username;
            state.nickname = user.user.nickname;
            state.picture = user.user.picture;
            state.permissions = user.user.permissions;
            state.regday = user.user.regday;
            localStorage.setItem("username", user.user.username);
            localStorage.setItem("nickname", user.user.nickname);
            localStorage.setItem("picture", user.user.picture);
            localStorage.setItem("permissions", user.user.permissions);
            localStorage.setItem("regday", user.user.regday);
        },
        setPicture(state, picture) {
            state.picture = picture;
            localStorage.setItem("picture", picture);
        },
        delToken(state) {
            state.token = '';
            state.username = '';
            state.nickname = '';
            state.picture = '';
            state.permissions = '';
            state.regday = '';
            localStorage.clear();
        }
    }
})

export default store;