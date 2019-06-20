import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home.vue'
import logIn from '@/components/login/login.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: logIn
    },
  ],
});
