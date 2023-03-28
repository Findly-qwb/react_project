/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:08:42
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-03-28 14:37:39
 * @Description: 
 */
// 生产环境配置
import path from "path";
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import CopyPlugin from "copy-webpack-plugin";
import baseConfig from "./webpack.base";

const prodConfig: Configuration = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"), // 复制public下文件
          to: path.resolve(__dirname, "../dist"), // 复制到dist目录中
          filter: (source) => !source.includes("index.html"), // 忽略index.html
        },
      ],
    }),
  ],
});

export default prodConfig;