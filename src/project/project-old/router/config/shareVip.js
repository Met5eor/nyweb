const shareVip = [
  {
    path: '/',
    name: 'marketingPage1203',
    meta: {
      title: '年终钜惠'
    },
    component: () => import('../../views/shareVip/app')
  },

  {
    path: '/appVipShare',
    name: 'appVipShare',
    meta: {
      title: '年终钜惠'
    },
    component: () => import('../../views/shareVip/app')
  },

  {
    path: '/cb',
    name: 'cdsucc',
    meta: {
      title: '支付成功'
    },
    component: () => import('../../views/shareVip/app/cb')
  },

  {
    path: '/inviteFriends',
    name: 'inviteFriends',
    meta: {
      title: '送好友尊享会员'
    },
    component: () => import('../../views/shareVip/app/inviteFriends')
  },
  {
    path: '/wxVipShare',
    name: 'wxVipShare',
    meta: {
      title: '微信分享'
    },
    component: () => import('../../views/shareVip/wx')
  },
  {
    // path: '/',
    path: '/pcVipShare',
    name: 'pcVipShare',
    meta: {
      title: '年终钜惠'
    },
    component: () => import('../../views/shareVip/pc')
  },
  {
    path: '/cbPc',
    name: 'cdPcsucc',
    meta: {
      title: '支付成功'
    },
    component: () => import('../../views/shareVip/pc/cbPc')
  },
  {
    path: '/inviteFriendsPc',
    name: 'inviteFriends',
    meta: {
      title: '送好友尊享会员'
    },
    component: () => import('../../views/shareVip/pc/inviteFriendsPc')
  },
]

export default shareVip