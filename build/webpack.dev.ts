/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:08:22
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-03-28 16:30:41
 * @Description: 
 */
// dev配置

import path from "path";
import { merge } from "webpack-merge";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import baseConfig from "./webpack.base";


// 运行命令的时候重启一次打开一个tab 页很烦，所以呢优化一下
// 参考：create-react-app 的启动方式
// https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/openChrome.applescript
// 记得关闭webpack-dev-server的配置中的自动打开 open: false 或者注释
const openBrowser = require("./util/openBrowser");
interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "eval-cheap-module-source-map",
//   devServer:{
//     host,
//     port,
//     open: true, // 是否自动打开
//     compress: false, // gzip压缩,开发环境不开启，提升热更新速度
//     hot: true, // 开启热更新
//     historyApiFallback: true, // 解决history路由404问题
//     setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
//     static: {
//       directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
//     },
//     headers: { "Access-Control-Allow-Origin": "*" },
//   }
});
const devServer = new WebpackDevServer({
  host,
  port,
  open: false, // 是否自动打开
  compress: false, // gzip压缩,开发环境不开启，提升热更新速度
  hot: true, // 开启热更新
  historyApiFallback: true, // 解决history路由404问题
  setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
  static: {
    directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
  },
  headers: { "Access-Control-Allow-Origin": "*" },
},
  webpack(devConfig)
)

devServer.start().then(() => {
  // 启动界面
  openBrowser(`http://${host}:${port}`);
})

export default devConfig;