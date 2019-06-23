
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/assets/css/index.css';

//把axios 提取为组件@/assets/js/myaxios.js
import axios from '@/assets/js/myaxios.js';
Vue.use(axios);


Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
