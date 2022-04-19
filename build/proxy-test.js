const proxyTest = {
  "/activity_wup": {
    target: "https://httpproxy.uptougu.com/json/activity_wup", //
    changeOrigin: true,
    pathRewrite: {
      "^/activity_wup": "",
    },
  },
  "/fortune": {
    target: `http://upcenter.test.upchina.com/fortune`,
    changeOrigin: true,
    pathRewrite: {
      "^/fortune": "",
    },
  },
  "/activitysqx": {
    target: `https://adrms.test.upchina.com`,
    changeOrigin: true,
    pathRewrite: {
      "^/activitysqx": "",
    },
  },
  "/vipcenter": {
    target: `http://upcenter.test.upchina.com`,
    changeOrigin: true,
    pathRewrite: {
      "^/vipcenter": "",
    },
  },
};

module.exports = proxyTest;
