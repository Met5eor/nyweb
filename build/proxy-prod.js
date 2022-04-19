const proxyProd = {
  '/activity_wup': {
    target: 'https://httpproxy.uptougu.com/json/activity_wup', // 
    changeOrigin: true,
    pathRewrite: {
      '^/activity_wup': ''
    }
  },
  "/fortune": {
    target: `http://upcenter.test.upchina.com/fortune`,
    changeOrigin: true,
    pathRewrite: {
      "^/fortune": "",
    },
  },
  "/activitysqx": {
    target: `https://a.upchina.com/activitysqx`,
    changeOrigin: true,
    pathRewrite: {
      "^/activitysqx": "",
    },
  },
  "/vipcenter": {
    target: `https://a.upchina.com/vipcenter`,
    changeOrigin: true,
    pathRewrite: {
      "^/vipcenter": "",
    },
  },
}

module.exports = proxyProd
