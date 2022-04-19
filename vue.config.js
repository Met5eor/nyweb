const webpack = require("webpack");
const proxyDev = require("./build/proxy-dev");
const proxyProd = require("./build/proxy-prod");
const proxyTest = require("./build/proxy-test");
const utils = require("./build/utils");
const devServerPort = 8111;
var CdnAsyncPlugin = require("@up/cdn-async-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
let projectName = process.argv[process.argv.length - 1];
let { NODE_ENV, proxy_url } = process.env;
let proxyConfig =
  proxy_url === "prod"
    ? proxyProd
    : proxy_url === "test"
    ? proxyTest
    : proxyDev;
let isPord = process.env.NODE_ENV === "production";
module.exports = {
  publicPath: "./",
  outputDir: "./public/dist",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@$", resolve("src"))
      .set("@store", resolve("src/store"))
      .set("@ass", resolve("src/assets"))
      .set("@c", resolve("src/components/common"))
      .set("@u", resolve("src/utils"))
      .set("@mixins", resolve("src/mixins"))
      .set("@views", resolve("src/views"))
      .set("@build", resolve("build"));
    config.plugin("define").tap((args) => {
      args[0].projectName = JSON.stringify(projectName) || "shareVip";
      return args;
    });
    // if (isPord) {
    //   //开启图片压缩
    //   config.module
    //     .rule("images")
    //     .use("image-webpack-loader")
    //     .loader("image-webpack-loader")
    //     .options({
    //       mozjpeg: { progressive: true, quality: 65 },
    //       optipng: { enabled: false },
    //       pngquant: { quality: [0.65, 0.9], speed: 4 },
    //       gifsicle: { interlaced: false }
    //       // webp: { quality: 75 }
    //     });
    // }
  },
  pages: {
    ...utils.entries(),
    
  },
  devServer: {
    historyApiFallback: {
      verbose: true,
      rewrites: [
        { from: /^\/project-niuniuCard\/.*$/, to: '/project-niuniuCard.html'},
        {from: /^\/print\/.*$/, to: '/print.html'}
      ]
    },
    // 方便内网调试 localhost 127.0.0.1
    disableHostCheck: true,
    host: "0.0.0.0",
    port: devServerPort,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    // 将运行进度输出到控制台
    progress: false,
    proxy: proxyConfig,
  },
  configureWebpack: (config) => {
    let plugins = [];
    
    plugins.push(
      new webpack.DefinePlugin({
        //字符串也要JSON.stringify转如果这个值是一个字符串，它会被当作一个代码片段来使用。 如果这个值不是字符串，它会被转化为字符串(包括函数)。
        "proxy_url":JSON.stringify(proxy_url),
      })
    );
    if(NODE_ENV === "production"){
      let tYear = new Date().getFullYear();
      let tMonth = new Date().getMonth() + 1;
      plugins.push(
        new CdnAsyncPlugin({
          asyncPath: `front/${tYear}/${tMonth}/${projectName}/${proxy_url}`,
          localPath: "./public/dist",
          filter: ["runtime", "manifest"],
        }),
      )
    }else{
      //开发环境
    }
    config.plugins = [...config.plugins, ...plugins]
  },
};
