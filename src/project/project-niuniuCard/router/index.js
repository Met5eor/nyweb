import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'niuniuCard',
    meta: {
      title: '霸气牛牛卡'
    },
    component: () => import('../views/index')
  },
  {
    path: '/cb',
    name: 'niuniuCardCb',
    meta: {
      title: '支付成功'
    },
    component: () => import('../views/cb')
  },
  {
    path: '/cbTuan',
    name: 'niuniuCardCbTuan',
    meta: {
      title: '拼团成功'
    },
    component: () => import('../views/cbTuan')
  },
]

const router = new VueRouter({
  // mode: 'history',
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
