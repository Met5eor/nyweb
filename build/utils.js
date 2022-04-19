'use strict'
const path = require('path')
const { logs } = require('./logs')
const pagePath = path.resolve(__dirname, '../src/project')
const glob = require('glob')
const modulesDir = glob.sync(pagePath + '/*')
const buildModule = process.argv[process.argv.length - 1]
let projectList = []
require('colors')
modulesDir.forEach(file => {
  projectList.push(file.split('/')[file.split('/').length - 1])
})
const {NODE_ENV,proxy_url} = process.env;
if (NODE_ENV === 'production') {
  if (projectList.indexOf(buildModule) === -1) {
    console.log(`请您输入正确的打包模块: ${JSON.stringify(projectList)}`.red)
    console.log(`例如: npm run build-prod ${projectList[1]}`.green)
    //终止脚本进程
    process.exit()
  }
  projectList = [buildModule]
  const msg = proxy_url === 'prod' ? '正式环境' : '测试环境'
  logs(`您正在打包模块：${buildModule}，打包环境：${msg}`)
} else {
  // projectList = [
  //   'index',
  //   'project-gnnVipCenter'
  // ]
}
// cdn配置
const cdn = [
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/vue.min.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/vue-router.min.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/vuex.min.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/axios.min.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/moment.min.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/cdn/zh-cn.js',
  'https://canpoint-static.oss-cn-beijing.aliyuncs.com/oos-sdk-6.0.min.js'
]
// 多页面配置
exports.entries = function() {
  const entries = {}
  projectList.forEach(pageDir => {
    entries[pageDir] = {
      // 入口文件
      entry: `src/project/${pageDir}/main.js`,
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: `${projectList.length === 1 ? 'index' : pageDir}.html`,
      // 界面标题配置
      title: '',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk
      cdnConfig: process.env.NODE_ENV === 'production' && process.env.NODE_ENV !== 'test' ? cdn : [],
      chunks: ['chunk-vendors', 'chunk-common', pageDir]
    }
  })
  console.log(entries)
  return entries
}
