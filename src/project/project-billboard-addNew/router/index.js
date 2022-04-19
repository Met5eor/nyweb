import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'dragonTigerList',
    meta: {
      title: '龙虎榜'
    },
    component: () => import('../views/index')
  },
  {
    path: '/wx',
    name: 'dragonTigerList',
    meta: {
      title: '龙虎榜'
    },
    component: () => import('../views/wx')
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
