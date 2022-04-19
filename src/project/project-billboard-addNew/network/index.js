/**
 * Created on 06/11/2020.
 */
import axios from "axios";
const ENV = process.env.NODE_ENV;
// console.log(ENV)
const pathList = {
  // development:'/apis',
  development: 'https://upcenter.test.upchina.com',
  alibeta: "https://upcenter.test.upchina.com",
  // alibeta: "https://a.upchina.com/vipcenter",
  // production: "https://upcenter.upchina.com",
  production: "https://a.upchina.com/vipcenter",
}
const PREFIX_V1 = pathList[ENV];
// console.log('PREFIX_V1',PREFIX_V1)
// const codeMessage =  {
//   200: "服务器成功返回请求的数据。",
//   201: "新建或修改数据成功。",
//   202: "一个请求已经进入后台排队（异步任务）。",
//   204: "删除数据成功。",
//   400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
//   401: "用户没有权限（令牌、用户名、密码错误）。",
//   403: "用户得到授权，但是访问是被禁止的。",
//   404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
//   406: "请求的格式不可得。",
//   410: "请求的资源被永久删除，且不会再得到的。",
//   422: "当创建一个对象时，发生一个验证错误。",
//   500: "服务器发生错误，请检查服务器。",
//   502: "网关错误。",
//   503: "服务不可用，服务器暂时过载或维护。",
//   504: "网关超时。"
// };
const instance = axios.create({
  withCredentials: false,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Cache-Control": "no-cache"
  },
  responseType: "json",
  timeout: 10000, // 请求超时时间
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  }
});

// 拦截接口request  格式化请求数据
instance.interceptors.request.use(config => {
  if (!config.url.includes("http://") && !config.url.includes("https://")) {
    config.url = PREFIX_V1 + config.url;
  }
  const parmas = {
    hqrights: window.localStorage.getItem('hqrights'),
    uid: window.localStorage.getItem('username'),
  }
  config.params = Object.assign({ ...config.params || {} }, parmas)
  return config;
});

// 拦截接口response  格式化响应数据
instance.interceptors.response.use(
  res => {
    if (res.status === 403 || res.status === 400) {
      return Promise.reject({ res });
    }
    return res;
  },
  err => {
    if (err.response) {
      return Promise.reject({
        url: err.response.config.url,
        status: err.response.status,
        statusText: err.response.statusText,
        message: "请求失败"
      });
    } else {
      return Promise.reject({ err });
    }
  }
);

export default instance;
