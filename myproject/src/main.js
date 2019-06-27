
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// element-tree-grid 插件
import ElTreeGrid from 'element-tree-grid';
import '@/assets/css/index.css';

// 把axios 提取为组件@/assets/js/myaxios.js
import axios from '@/assets/js/myaxios.js';

Vue.use(axios);

Vue.use(ElementUI);

// 把插件注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
