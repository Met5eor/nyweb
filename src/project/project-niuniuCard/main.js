import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import $tools from '@u/tools'
import '@ass/css/u-common.less'
import '@ass/css/u-flex.css'
import '@ass/css/codeFun.less'
import '@u/filter'
import Vconsole from 'vconsole'
import '@ass/js/total.js'
import '@ass/js/loadjs.js'
import "@ass/js/rem.js";
import VantPlugin from '@ass/js/vant-plugin.js'
Vue.use(VantPlugin)
// new Vconsole()
Vue.prototype.$tools = $tools
//引入app终端，分享
$tools.loadJsSdk('https://cdn.upchina.com/activitypage/plugin/uphybrid.min.js')
$tools.loadJsSdk('https://sharecomm.upchina.com/share.js')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

