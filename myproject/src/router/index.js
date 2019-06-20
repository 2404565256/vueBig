import Vue from 'vue';
import Router from 'vue-router';
import logIn from '@/components/login/login.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      component: logIn,
    },
  ],
});
