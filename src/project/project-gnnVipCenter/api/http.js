/**
 * Created on 06/11/2020.
 */
import axios from "axios";
import qs from 'qs'
import hostEnv from '@build/host-env'
const NODE_ENV = process.env.NODE_ENV
const instance = axios.create({
  withCredentials: false,
  // headers: {
  //   "Content-Type": "application/json;charset=utf-8",
  //   "Cache-Control": "no-cache"
  // },
  responseType: "json",
  timeout: 10000, // 请求超时时间
  validateStatus: function (status) {
    return status >= 200 && status < 500;
  }
});
const baseURL = process.env.url
// 拦截接口request  格式化请求数据
instance.interceptors.request.use((config) => {
  let [, proxy, ,] = config.url.split('/')
  if (NODE_ENV === 'production') {
    config.url = `${hostEnv[proxy]}${config.url}`
  }
  return config;
}), (err) => {
  return Promise.reject(err)
}

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



const $http = {
  async post(url, params, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await instance({
        url: url,
        method: 'post',
        data: params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return responseRes(res.data, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async get(url, params, tag = true, isTip = true) {
    try {
      let res = await instance.get(url, {
        params: params || ''
      })
      return responseRes(res.data, isTip)
    } catch (err) {
      console.log(err)
      return errorTip(err)
    }
  },
  async getUrl(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await instance.get(obj.url, {})
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async getQuery(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await instance.get(url, qs.stringify({}))
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async postForm(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await instance.post(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },

  async postJsonQuery(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await instance({
        url: url,
        method: 'post',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async postQuery(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await instance.post(url, qs.stringify({}))
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async del(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await axios.delete(obj.url, {
        params: obj.params || ''
      })
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async delQuery(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    let url = obj.url + '?'
    for (const key in obj.params) {
      url += key + '=' + obj.params[key] + '&'
    }
    try {
      let res = await axios.delete(url, {})
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async delete(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await axios({
        url: obj.url,
        method: 'delete',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async put(obj, tag = true, isTip = true) {
    // if (tag) showToast()
    try {
      let res = await axios.put(obj.url, qs.stringify(obj.params))
      res = res.data
      return responseRes(res, isTip)
    } catch (err) {
      return errorTip(err)
    }
  },
  async export(obj, tag = true) {
    // if (tag) showToast()
    try {
      axios
        .request({
          url: obj.url,
          method: 'post',
          data: obj.params,
          responseType: 'blob'
        })
        .then(res => {
          // Blob 对象表示一个不可变、原始数据的类文件对象（File 接口都是基于Blob）
          console.log(res)
          const BLOB = res.data
          // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件的内容
          const fileReader = new FileReader()
          // 开始读取指定的Blob中的内容。读取完成result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
          fileReader.readAsDataURL(BLOB)
          // 处理load事件，该事件在读取操作完成时触发
          fileReader.onload = event => {
            const a = document.createElement('a')
            a.download = `${obj.params.name || '文件'}.xls`
            a.href = event.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            // responseRes(res, obj)
          }
        })
    } catch (err) {
      // return errorTip(err)
    }
  },
  async exportWithQuery(obj, tag = true) {
    // if (tag) showToast()
    try {
      let url = obj.url + '?'
      for (const key in obj.params) {
        url += key + '=' + obj.params[key] + '&'
      }
      axios
        .request({
          url: url,
          method: 'post',
          responseType: 'blob',
          timeout: 400000
        })
        .then(res => {
          const BLOB = res.data
          const fileReader = new FileReader()
          fileReader.readAsDataURL(BLOB)
          fileReader.onload = event => {
            const a = document.createElement('a')
            a.download = `${obj.params.name || '课程表'}.xlsx`
            a.href = event.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            responseRes(res, obj)
          }
          // vm.$message.success('导出成功')
        })
    } catch (err) {
      // return errorTip(err)
    }
  },
  async zipExport(obj, tag = true) {
    // if (tag) showToast()
    try {
      let url = obj.url + '?'
      for (const key in obj.params) {
        url += key + '=' + obj.params[key] + '&'
      }
      axios
        .request({
          url: url,
          method: 'post',
          data: obj.params,
          responseType: 'arraybuffer'
        })
        .then(res => {
          const [, title] = res.headers['content-disposition'].split('=')
          const name = decodeURI(title)
          const data = res.data
          const blob = new Blob([data], {
            type: 'application/zip;charset=UTF-8'
          })
          const url = window.URL.createObjectURL(blob)
          const link = document.createElement('a')
          link.style.display = 'none'
          link.href = url
          link.setAttribute('download', name)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          // responseRes(res, obj)
        })
    } catch (err) {
      // return errorTip(err)
    }
  },
  async putJson(obj, tag = true) {
    // if (tag) showToast()
    try {
      let res = await axios({
        url: obj.url,
        method: 'put',
        data: obj.params,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      // return responseRes(res, obj)
    } catch (err) {
      // return errorTip(err)
    }
  },
  async postWithQueryAndBody(obj, tag = true) {
    // if (tag) showToast()
    try {
      const url = obj.url + '/' + obj.params.query
      let res = await axios({
        url: url,
        method: 'post',
        data: obj.params.data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      res = res.data
      // return responseRes(res, obj)
    } catch (err) {
      // return responseRes(err.response.data, obj)
    }
  }
}

// 处理响应结果
function responseRes(res, isTip) {
  // 清除加载
  // setTimeout(loading, 0)
  return new Promise((resolve, reject) => {
    if (res.ret === 0) {
      resolve(res.data)
    } else if (res.rsp && (res.rsp.iRet === 0 || res.rsp.iRet === 1)) {
      resolve(res.rsp)
    } else if (res.rsp.iRet === -1) {
      console.log('err', res.rsp.sMsg)
    } else {
      if (isTip) {
        // vm.$message.warning(res.message || res.msg || '数据请求失败, 请联系管理员')
      }
      try {
        reject(res.message)
      } catch (err) { }
    }
  })
}

/**
 * 服务器返回异常处理
 */
const errorTip = (err) => {
  let msg = '服务异常'
  return new Promise((resolve, reject) => {
    if (err.response) {

      msg = err.response.data.message || '服务异常，请重新尝试'
    } else {
      msg = '服务异常，请重新尝试'
    }
    alert(msg)
    // eslint-disable-next-line prefer-promise-reject-errors
    reject('error')
  })
}
export default $http;
