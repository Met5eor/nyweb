const wxApp = [
  // {
  //   path: '/',
  //   name: 'wxVipShare',
  //   meta: {
  //     title: '尊享会员升级首发'
  //   },
  //   component: () => import('../../views/shareVip/wxApp/index'),
  // },
  {
    path: '/',
    name: 'inviteFriends',
    meta: {
      title: '送好友尊享会员'
    },
    component: () => import('../../views/shareVip/wxApp/inviteFriends'),
  },
  // {
  //   path: '/cbWx',
  //   name: 'cb',
  //   meta: {
  //     title: '支付成功'
  //   },
  //   component: () => import('../../views/shareVip/wxApp/cb'),
  // },
]

export default wxApp