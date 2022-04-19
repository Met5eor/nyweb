const shareVip = [
  {
    path: '/',
    name: 'gnnVipCenterPc',
    meta: {
      title: '股牛牛会员中心'
    },
    component: () => import('../../views/pc')
  },
  {
    path: '/app',
    name: 'gnnVipCenterPc',
    meta: {
      title: '股牛牛会员中心'
    },
    component: () => import('../../views/app')
  },
]

export default shareVip