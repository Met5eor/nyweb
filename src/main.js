import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $tools from '@u/tools'
import './assets/css/u-common.less'
import './assets/css/u-flex.css'
import './assets/css/codeFun.less'
import '@u/filter'
import Vconsole from 'vconsole'
import '@ass/js/total.js'
import '@ass/js/loadjs.js'

new Vconsole()
import 'swiper/dist/css/swiper.min.css'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
Vue.prototype.$tools = $tools
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

