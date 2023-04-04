import { Configuration } from 'webpack';
/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-04-04 10:42:33
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-04-04 12:26:12
 * @Description: 
 */
import prodConfig from './webpack.prod';
import { merge } from 'webpack-merge'
const speedMeasurePlugin = require('speed-measure-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 打包速度分析
const smp = new speedMeasurePlugin();



// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
const analyConfig: Configuration = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin() //分析打包结果
    ]
  }))
export default analyConfig;