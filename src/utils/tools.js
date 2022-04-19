import moment from "moment";
const tools = {
  /**
   * @description 根据时间戳格式化时间
   * @param { number || string } t 时间戳
   * @param { number } type 需要的时间类型
   * @param { string } dataType 时间戳类型(单位)
   * @returns { string } 返回时间字符串
   */
  getDate(t, type, dataType = "ms") {
    if (dataType === "s") {
      t = t * 1000;
    }
    let d;
    if (t === 0) {
      d = new Date(t);
    } else {
      d = new Date(t || new Date().getTime());
    }
    const time =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1)) +
      "-" +
      (d.getDate() > 9 ? d.getDate() : "0" + d.getDate()) +
      " " +
      (d.getHours() > 9 ? d.getHours() : "0" + d.getHours()) +
      ":" +
      (d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes()) +
      ":" +
      (d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds());
    if (type === 1) {
      return time.substring(0, 10);
    } else if (type === 2) {
      return time.substring(11, 19);
    } else if (type === 3) {
      return time.substring(0, 7);
    } else if (type === 4) {
      return time.substr(11, 5);
    } else if (type === 5) {
      return time.substr(0, 19);
    } else if (type === 6) {
      return time.substr(0, 16);
    } else if (type === 7) {
      return time.substring(11, 16);
    } else {
      return time;
    }
  },
  /**
   * @description 延迟处理方法
   * @param { function } fn 待延迟执行的方法
   * @returns { undefined }
   */
  goNext: (fn, time = 1200) => {
    setTimeout(() => {
      fn();
    }, time);
  },
  /**
   * 操作提示
   * @param { string } type  提示类型（success，error，info，warning，warn，loading）
   * @param { string } msg 提示内容
   * @param { number } time 提示关闭时间
   * @returns { undefined }
   */
  message: (type, msg, time) => {
    if ($message.hasOwnProperty(type)) {
      $message[type](msg || "");
    } else {
      $message.info(msg || "");
    }
  },
  lTip(title = "确定删除吗?", fn) {
    vm.$Modal.confirm({
      title,
      okText: "确定",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        fn();
      },
    });
  },
  /**
   * 深拷贝一个值
   * @param value
   */
  cloneDeep(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === "object") {
      // 如果是一个数组的话
      if (Array.isArray(target)) {
        result = []; // 将result赋值为一个数组，并且执行遍历
        for (const i in target) {
          // 递归克隆数组中的每一项
          result.push(tools.cloneDeep(target[i]));
        }
        // 判断如果当前的值是null的话；直接赋值为null
      } else if (target === null) {
        result = null;
        // 判断如果当前的值是一个RegExp对象的话，直接赋值
      } else if (target.constructor === RegExp) {
        result = target;
      } else {
        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
        result = {};
        for (const i in target) {
          result[i] = tools.cloneDeep(target[i]);
        }
      }
      // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
      result = target;
    }
    // 返回最终结果
    return result;
  },
  //判空
  isEmpty(param) {
    if (param) {
      const paramType = typeof param;
      if (paramType === "object") {
        // 要判断的是【对象】或【数组】或【null】等
        if (typeof param.length === "undefined") {
          if (JSON.stringify(param) === "{}") {
            return true; // 空值，空对象
          }
        } else if (param.length === 0) {
          return true; // 空值，空数组
        }
      } else if (paramType === "string") {
        // 如果要过滤空格等字符
        var newParam = param.trim();
        if (newParam.length === 0) {
          // 空值，例如:带有空格的字符串" "。
          return true;
        }
      } else if (paramType === "boolean") {
        if (!param) {
          return true;
        }
      } else if (paramType === "number") {
        if (!param) {
          return true;
        }
      }
      return false; // 非空值
    } else {
      if (param === 0) {
        return false;
      } else {
        return true;
      }
      // 空值,例如：
      // (1)null
      // (2)可能使用了js的内置的名称，例如：var name=[],这个打印类型是字符串类型。
      // (3)空字符串''、""。
      // (4)数字0、00等，如果可以只输入0，则需要另外判断。
    }
  },

  // 生成一个连续数值的数组
  numberArray(start, end) {
    return Array.from(new Array(end + 1).keys()).slice(start);
  },
  // 除对象中的空键值对
  delObjKey(obj) {
    for (var key in obj) {
      if (obj[key] === "" || obj[key] === undefined) {
        delete obj[key];
      }
    }
    return obj;
  },
  // 数组对象去重 根据str属性去重
  getBack(arr, str) {
    const obj = {};
    arr = arr.reduce((cur, next) => {
      obj[next[str]] ? "" : (obj[next[str]] = true && cur.push(next));
      return cur;
    }, []); // 设置cur默认类型为数组，并且初始值为空的数组
    return arr;
  },
  //判断终端
  isTerminal(val = "mobile") {
    var u = navigator.userAgent.toLowerCase();
    if (val === "ios") {
      //ios终端
      return !!/(iPhone|iPad|iPod|iOS)/i.test(u);
    } else if (val === "android") {
      //android终端
      return u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
    } else if (val === "iPad") {
      //是否iPad
      return u.indexOf("iPad") > -1;
    } else if (val === "weixin") {
      //是否微信
      return u.search(/MicroMessenger/i) > -1;
    } else if (val === "isMb") {
      //是否是移动端
      return (
        u.match(
          /(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
        ) != null
      );
    } else if (val === "isPc") {
      return !(
        u.match(
          /(ipod|ipad|iphone|android|coolpad|mmp|smartphone|midp|wap|xoom|symbian|j2me|blackberry|wince)/i
        ) != null
      );
    } else if (val === "isInGPTApp") {
      return !!u.match(/stock/i);
    } else if (val === "isInGNNApp") {
      return !!u.match(/teach/i);
    } else if (val === "isInGPTPC") {
      return !!u.match(/upgpt_pc/i);
    } else if (val === "isInGNNPC") {
      return !!u.match(/_hummer_pc/i);
    }
  },
  //获取url参数 #模式传query
  getQueryVariable(variable, query) {
    var query = query || window.location.search.substring(1);
    var vars = query.split("&");
    console.log(window.location.search);
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
    return false;
  },

  getChUrl(orderUrl) {
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
  },
  //加载脚本的方法 异步的
  loadJsSdk(src) {
    return new Promise((resolve) => {
      var target = document.getElementsByTagName("script")[0];
      var js = document.createElement("script");
      js.src = src;
      target.parentNode.insertBefore(js, target);
      js.onload = () => {
        resolve(true);
      };
    });
  },
  //移动元素
  moveDom(Dom) {
    let pageScrollY;
    let domHeigth = Dom.offsetHeight;
    Dom.addEventListener("touchstart", () => {
      pageScrollY = window.scrollY;
    });
    Dom.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
        let moveY = e.touches[0].pageY;
        Dom.style.top = moveY - pageScrollY - domHeigth / 2 + "px";
      },
      false
    );
  },
  //时间戳转换为月天时分秒 timestamp时间戳
  timestampToTime(timestamp, returnObj) {
    timestamp = timestamp / 1000;
    let obj = {};
    let time = `00天00小时00分${parseInt(timestamp)}秒`;
    if (parseInt(timestamp) > 60) {
      let second = parseInt(timestamp) % 60;
      obj.second = second;
      let min = parseInt(timestamp / 60);
      obj.min = min;
      time = `00天00小时${min}分${second}秒`;
      if (min > 60) {
        min = parseInt(timestamp / 60) % 60;
        obj.min = min;
        var hour = parseInt(parseInt(timestamp / 60) / 60);
        obj.hour = hour;
        time = `00天 ${hour} 小时 ${min} 分 ${second} 秒`;
        if (hour > 24) {
          hour = parseInt(parseInt(timestamp / 60) / 60) % 24;
          obj.hour = hour;
          var day = parseInt(parseInt(parseInt(timestamp / 60) / 60) / 24);
          obj.day = day;
          time = day + "天" + hour + "小时" + min + "分" + second + "秒";
        }
      }
    }
    return returnObj ? obj : time;
  },

  QueryString(val) {
    var url = window.location.search;
    var re = new RegExp("" + val + "=([^&?]*)", "ig");
    return url.match(re) && url.match(re)[0].substr(val.length + 1);
  },

  //增加渠道统计调整,回调页 调整 抓取页面orderch字段拼接到订单
  orderSplice(orderUrl, type, cbUrl) {
    /*
     * orderUrl  订单地址
     * type      1:代表h5 2代表pc 3代表微信
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

    //h5跟pc跳转
    if (type === 1) {
      window.open(orderUrl + chString);
    } else {
      upNativeComm.exec("open.webview", {
        url: orderUrl + chString,
      });
    }
  },
};

export default tools;
