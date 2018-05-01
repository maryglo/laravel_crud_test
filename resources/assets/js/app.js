
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
require('jquery-toast-plugin');
window.Vue = require('vue');
window.$ = window.jQuery = require('jquery');


import VueRouter from 'vue-router';
Vue.use(VueRouter);
Vue.use(require('vue-resource'));

import { ServerTable, ClientTable, Event } from 'vue-tables-2'
Vue.use(ClientTable);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
import App from './components/App.vue';
import UserAdmin from './components/UserAdmin.vue';


const routes = [
    {
        name: 'UserAdmin',
        path: '/admin',
        component: UserAdmin
    }
];
const router = new VueRouter({ mode: 'history', routes});
const app = new Vue({
    router,
}).$mount('#app');

window.bus   = new Vue();
