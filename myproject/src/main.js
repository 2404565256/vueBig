
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

import moment from 'moment'
// 富文本编辑框
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)

Vue.use(axios);

Vue.use(ElementUI);

// 定义全局过滤器
Vue.filter('timeformate', function (value) {
  // 处理时间：用一个第三方包来处理 moment
  return moment(value).format('YYYY-MM-DD hh:mm:ss a')
})

// 把插件注册为全局组件
Vue.component(ElTreeGrid.name, ElTreeGrid);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
