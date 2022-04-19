import Vue from 'vue'
import VueRouter from 'vue-router'
import shareVip from './config/shareVip'
import theme from './config/theme'
import wx from './config/wx'
import other from './config/other'
import newYearPc from './config/newYear-pc'

// let isprod = process.env.NODE_ENV === 'production'
// let routerList = [];
// (async function aaa() {
//   console.log(isprod)
//   if (isprod) {
//     let res = await import(`./config/${projectName}.js`)
//     let routerArr = res.default
//     routerList = routerArr
//   } else {
//     const requireCom = require.context('./config', false, /\.js$/)
//     requireCom.keys().forEach(key => {
//       const routerArr = requireCom(key).default
//       routerList = [...routerList, ...routerArr]
//     })
//   }
// })()

// console.log('routerList', routerList)
Vue.use(VueRouter)
const routes = [
  // ...newYearPc,
  ...shareVip,
  // ...gnnVipCenter,
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
