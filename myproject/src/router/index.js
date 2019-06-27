import Vue from 'vue';
import Router from 'vue-router';
// 单独引入 Message
import { Message } from 'element-ui';
import Home from '@/components/home/home';
import logIn from '@/components/login/login';
import yhList from '@/components/yhList/yh-list';
import roleList from '@/components/roleList/roleList';
import permissionsList from '@/components/permissionsList/permissionsList';
import Classification from '@/components/Classification/Classification';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/', redirect: '/home',
    },
    {
      path: '/login',
      name: 'login',
      component: logIn,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        { path: '/users', name: 'home-yhList', component: yhList }, // 用户列表
        { path: '/roles', name: 'roleList', component: roleList }, // 角色列表
        { path: '/rights', name: 'permissionsList', component: permissionsList }, // 权限列表
        { path: '/categories', name: 'Classification', component: Classification }, // 商品分类
      ],
    },
  ],
});

// 配置路由的拦截器
router.beforeEach((to, from, next) => {
  // 如果访问登录的路由地址，放过
  if (to.name === 'login') {
    next();
  } else {
    // 如果请求的不是登录页面，验证token
    // 1. 获取本地存储中的token
    const token = localStorage.getItem('token');
    if (!token) {
      // 2. 如果没有token，跳转到登录
      router.push({ name: 'login' });
      Message({
        message: '请先登录!',
        type: 'warning',
      });
    } else {
      // 3. 如果有token，继续往下执行
      next();
    }
  }
});

export default router;

