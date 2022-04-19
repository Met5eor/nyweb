const theme = [
  {
    path: '/themeDetail',
    name: 'themeDetail',
    meta: {
      title: '特色题材'
    },
    component: () => import('../../views/theme/themeDetail/index.vue')
  },
  {
    path: '/themeSingle/:scode/:market',
    name: 'themeSingle',
    meta: {
      title: '题材个股'
    },
    component: () => import('../../views/theme/themeSingle/index.vue')
  },
  {
    path: '/noauth',
    name: 'noauth',
    meta: {
      title: '分享解锁'
    },
    component: () => import('../../views/theme/themeDetail/noauth.vue')
  },
]

export default theme