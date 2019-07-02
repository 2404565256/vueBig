import Vue from 'vue';
import Router from 'vue-router';
// 单独引入 Message
import { Message } from 'element-ui';

const Home = () => import('@/components/home/home');
const logIn = () => import('@/components/login/login');
const yhList = () => import('@/components/yhList/yh-list');
const roleList = () => import('@/components/roleList/roleList');
const permissionsList = () => import('@/components/permissionsList/permissionsList');
const Classification = () => import('@/components/Classification/Classification');
const Goods = () => import('@/components/goods/goods');
const GoodsAdd = () => import('@/components/goodsAdd/goodsAdd');
const params = () => import('@/components/params/params');
const reports = () => import('@/components/reports/reports');
const orders = () => import('@/components/orders/orders');


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
        { path: '/goods', name: 'goods', component: Goods }, // 商品分类  
        { path: '/goodsAdd', name: 'goodsAdd', component: GoodsAdd }, // 商品分类 >添加用户
        { path: '/params', name: 'params', component: params }, // 商品管理 >分类参数
        { path: '/reports', name: 'reports', component: reports }, // 商品管理 >分类参数
        { path: '/orders', name: 'orders', component: orders }, // 地图
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

