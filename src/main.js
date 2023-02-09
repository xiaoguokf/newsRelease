import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Global from './Global';
Vue.use(Global);
import axios from 'axios'
// import VueAxios from 'vue-axios'
Vue.prototype.axios = axios;
Vue.config.productionTip = false
// Vue.use(axios)

// 添加axios拦截器
axios.interceptors.request.use(function (config) { 
  // console.log('token'+window.sessionStorage.getItem('token'));
  config.headers['token'] = window.sessionStorage.getItem('token')
  return config
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router:router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})