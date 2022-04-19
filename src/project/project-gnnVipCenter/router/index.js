import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
Vue.use(VueRouter)
import gnnVipCenter from './config/gnnVipCenter'
const routes = [
  // ...newYearPc,
  // ...shareVip,
  ...gnnVipCenter,
  // ...theme
  // ...wxRouter,
  // ...routerList,
]

const router = new VueRouter({
  mode: 'hash',
  // base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, form, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

export default router
