import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'memberSPrivilege',
    meta: {
      title: '会员特权'
    },
    component: () => import('../views/index')
  },
  {
    path: '/wx',
    name: 'memberSPrivilege',
    meta: {
      title: '会员特权'
    },
    component: () => import('../views/index-wx')
  },
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
