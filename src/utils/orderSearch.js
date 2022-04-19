//查询权限
export const queryUserPermission = (uid = "", moduleid = "6188") => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://a.upchina.com/activitysqx/module?uid=${uid}&moduleid=${moduleid}`
    )
      .then((response) => response.json())
      .then((data) => {
        // data就是我们请求的repos
        console.log(data);
        if (!data) return;
        let { ret, msg, endtime } = data;
        if (ret !== 0) return;
        if (endtime > new Date().getTime()) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => reject(error));
  });
};
//是否购买过产品
export const getOrderInfo = (uid, productId) => {
  return new Promise((resolve, reject) => {
    fetch(
      `https://a.upchina.com/activitysqx/neworderfilter?uid=${uid}&bussid=${encodeURIComponent(
        "202110/test"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.ret == 0) {
          let Obj = data.data.find((el) => el.productId === productId);
          if (Obj && Obj.isBuy === 1) {
            //已购买
            resolve(true);
          } else {
            //未购买
            resolve(false);
          }
        }
      })
      .catch((error) => reject(error));
  });
};


export const getChUrl = (orderUrl) => {
  /*
   * orderUrl  订单地址
   * type      1:代表h5 2代表pc
   */
  //获取URL问号后面的参数值，最后以对象键值对的方式存储
  ~(function (pro) {
    function QueryURLParameter() {
      var reg = /([^?&#=]+)=([^?&#=]+)/g;
      var obj = {};
      this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
      });
      return obj;
    }

    pro.QueryURLParameter = QueryURLParameter;
  })(String.prototype);
  var urlQuery = window.location.href.QueryURLParameter();
  var chString = "",
    ch = urlQuery["orderch"] || "";
  if (ch) {
    if (orderUrl.indexOf("?") == -1) {
      chString = "?ch=" + ch;
    } else {
      chString = "&ch=" + ch;
    }
  }
  return (orderUrl += chString);
};

//增加渠道统计调整,回调页 调整
export const orderSplice = (orderUrl, type,cbUrl) => {
  /*
   * orderUrl  订单地址
   * type      1:代表h5 2代表pc
   */
  //获取URL问号后面的参数值，最后以对象键值对的方式存储
  ~(function (pro) {
    function QueryURLParameter() {
      var reg = /([^?&#=]+)=([^?&#=]+)/g;
      var obj = {};
      this.replace(reg, function () {
        obj[arguments[1]] = arguments[2];
      });
      return obj;
    }
    pro.QueryURLParameter = QueryURLParameter;
  })(String.prototype);
  var urlQuery = window.location.href.QueryURLParameter();
  var chString = "",
    ch = urlQuery["orderch"] || "";
  if (ch && cbUrl) {
    //渠道号存在,支付回调存在
    if (orderUrl.indexOf("?") == -1) {
      chString = "?ch=" + ch + "&callback=" + cbUrl;
    } else {
      chString = "&ch=" + ch + "&callback=" + cbUrl;
    }
  } else if (ch) {
    //渠道号存在
    if (orderUrl.indexOf("?") == -1) {
      chString = "?ch=" + ch;
    } else {
      chString = "&ch=" + ch;
    }
  } else if (cbUrl) {
    //支付回调
    if (orderUrl.indexOf("?") == -1) {
      chString = "?callback=" + cbUrl;
    } else {
      chString = "&callback=" + cbUrl;
    }
  }


  if (type === 1) {
    window.open(orderUrl + chString);
    // upNativeComm.exec("WebView.open", {
    //     'url': orderUrl + chString
    // });
  } else {
    upNativeComm.exec("open.webview", {
      url: orderUrl + chString,
    });
  }
};
