import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import logIn from '@/components/login/login';
import yhList from '@/components/yhList/yh-list';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', redirect: '/home'
    },
    {
      path: '/login',
      name: 'login',
      component: logIn
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/home/yhList',
          name: 'home-yhList',
          component: yhList
        }
      ]
    }

  ],
});
