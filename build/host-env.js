/* eslint-disable */
let {NODE_ENV} = process.env
let proxy = {}
if(proxy_url==='prod'){
  proxy = {
    activity_wup: 'https://httpproxy.uptougu.com/json', // 优惠劵
    fortune: 'http://upcenter.test.upchina.com', // wcb
    activitysqx: 'https://a.upchina.com/', // 获取用户权限
    vipcenter: 'https://a.upchina.com', // 获取用户权限
    // vipcenter: 'https://a.upchina.com', // 获取用户权限
  }
}else{
  //测试地址
  proxy = {
    activity_wup: 'https://httpproxy.uptougu.com/json', // 优惠劵
    fortune: 'http://upcenter.test.upchina.com/fortune', // wcb
    activitysqx: 'https://adrms.test.upchina.com', // 获取用户权限
    vipcenter: 'http://upcenter.test.upchina.com', // 获取用户权限
    // vipcenter: 'https://a.upchina.com', // 获取用户权限
  }
}
export default proxy
