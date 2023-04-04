/*
 * @Author:  qiuwenbin <qiuwenbin@wshifu.com>
 * @Date: 2023-03-28 14:07:55
 * @LastEditors: qiuwenbin
 * @LastEditTime: 2023-04-04 14:04:04
 * @Description: 
 */
// 公共配置
import { Configuration, DefinePlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpackBar from 'webpackbar';
import * as dotenv from "dotenv";

const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const cssRegex = /\.css$/;
const lessRegex = /\.less$/;
const isDev = process.env.NODE_ENV === 'development';
console.log('NODE_ENV', process.env.NODE_ENV) // 区分开发模式还是打包构建模式可以用process.env.NODE_ENV
console.log('BASE_ENV', process.env.BASE_ENV) // 业务环境 dev test pre prod

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, "../env/.env." + process.env.BASE_ENV),
});
const styleLoadersArray = [
  isDev?"style-loader":MiniCssExtractPlugin.loader,
  {
    loader: "css-loader",
    options: {
      modules: {
        // localIdentName：配置生成的css类名组成（path路径，name文件名，local原来的css类名, hash: base64:5拼接生成hash值5位，具体位数可根据需要设置
        // 如下的配置（localIdentName: '[local]__[hash:base64:5]'）：生成的css类名类似 class="edit__275ih"这种，既能达到scoped的效果，又保留原来的css类名(edit)
        localIdentName: "[local]__[hash:5]",
      },
    },
  },
];

const baseConfig: Configuration = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  // 打包出口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
    assetModuleFilename: 'images/[name].[contenthash:8][ext]'
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
        exclude: /node_modules/,
        use: ["thread-loader","babel-loader"]
      },
      {
        test: cssRegex, //匹配 css 文件
        use: [...styleLoadersArray, 'postcss-loader'],
      },
      {
        test: lessRegex, // 匹配less文件
        use: [
          ...styleLoadersArray,
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                importLoaders: 2,
                // 可以加入modules: true，这样就不需要在less文件名加module了
                modules: true,
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true
              },
            }
          },
          'postcss-loader'
        ]

      },
      {
        test: /\.(png|jpe|jpg|gif|svg)$/i, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]', // 文件输出目录和命名
        },
      },
      {
        test: /\.json$/,
        type: "asset/source",
        generator: {
          // 这里专门针对json文件的处理
          filename: "static/json/[name].[hash][ext][query]",
        },
      }
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css"],
    // 别名需要配置两个地方，这里和 tsconfig.json
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找
  },
  // plugins 的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5-react-ts",
      filename: "index.html",
      // 复制 'index.html' 文件，并自动引入打包输出的所有资源（js/css）
      template: path.join(__dirname, "../public/index.html"),
      inject: true, // 自动注入静态资源
      hash: true,
      cache: false,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true, //去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true, // 缩小CSS样式元素和样式属性
      },
      nodeModules: path.resolve(__dirname, "../node_modules"),
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(envConfig.parsed),
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new webpackBar({
      color:"#85d",
      basic:false,
      profile:false
    })
  ],
  cache:{
    type:"filesystem", //使用文件缓存
  }
};

export default baseConfig
