const proxyDev = {
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
    // target: `http://192.168.8.212:4002`,
    changeOrigin: true,
    pathRewrite: {
      "^/activitysqx": "",
    },
  },
  "/vipcenter": {
    // target: `https://a.upchina.com`,
    // target: `https://a.upchina.com/vipcenter`,
    target: `http://upcenter.test.upchina.com`,
    changeOrigin: true,
    pathRewrite: {
      "^/vipcenter": "",
    },
  },
}
module.exports = proxyDev
