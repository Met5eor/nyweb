/**
 * @des 注册全局过滤器
 */

import Vue from 'vue'

const filters = {
  // 获取表格索引
  pageIndex: (val, obj) => {
    if (JSON.stringify(obj) === '{}') {
      return val + 1
    } else {
      return (obj.page - 1) * obj.size + val + 1
    }
  },
  // 日期转化
  gmtToDate(date, type = 'dateTime', test = false) {
    if (!date) {
      return '--'
    }
    const d = new Date(date)
    const time =
      d.getFullYear() +
      `${test ? '年' : '-'}` +
      (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
      `${test ? '月' : '-'}` +
      (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
      `${test ? '天' : ' '}` +
      (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
      `${test ? '小时' : '：'}` +
      (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
      `${test ? '分' : '：'}` +
      (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds()) +
      `${test ? '秒' : ''}`
    if (type === 'dateTime') {
      return time
    } else if (type === 'date') {
      return time.substring(0, 10)
    } else if (type === 'time') {
      return time.substring(11, 15)
    } else if (type === 'dayAndtime') {
      return time.substring(8, 20)
    }
  },
  // 去掉秒时间
  getTimeString(time) {
    if (!time) {
      return '--'
    }
    return time.split(':')[0] + ':' + time.split(':')[1]
  },
  getDate: function (val, type) {
    if (val === '' || val === null) {
      return '--'
    }
    // 时间戳和gmt转日期
    const d = new Date(val)
    if (type === 1) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
        ':' +
        (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      )
    } else if (type === 2) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      )
    } else if (type === 3) {
      return (
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
      )
    } else if (type === 4) {
      return (
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
      )
    } else if (type === 5) {
      return (
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) +
        '-' +
        (d.getDate() > 9 ? d.getDate() : '0' + d.getDate()) +
        ' ' +
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
      )
    } else if (type === 6) {
      return (
        (d.getHours() > 9 ? d.getHours() : '0' + d.getHours()) +
        ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes()) +
        ':' +
        (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
      )
    }
  },
  getWeeks: val => {
    val = val
      .map(el => {
        if (el === '1') {
          return '周日'
        } else if (el === '2') {
          return '周一'
        } else if (el === '3') {
          return '周二'
        } else if (el === '4') {
          return '周三'
        } else if (el === '5') {
          return '周四'
        } else if (el === '6') {
          return '周五'
        } else if (el === '7') {
          return '周六'
        }
      })
      .join(',')
    return val
  },
  /**
   * 转化为%
   * @param {Number} num 
   */
  parseNum(num) {
    let num1 = num * 1;
    let str = '';
    if (num1 > 0) {
      str = '+' + num1.toFixed(2) + '%';
    } else if (num1 < 0) {
      str = num1.toFixed(2) + '%';
    } else {
      str = '0.00%'
    }
    return str;
  }
}

for (const key in filters) {
  Vue.filter(key, filters[key])
}
