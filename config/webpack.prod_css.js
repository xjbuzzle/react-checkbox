const path = require('path');
const merge = require('webpack-merge')         // 引入合并模块
const common = require('./webpack.prod_base')      // 引入相同的模块
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 引入插件

let config = {
  plugins: [											// 添加一个插件
    new MiniCssExtractPlugin({
      filename: 'index.css', // 设置最终输出的文件名
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,     // style-loader替换成这个
        },
        {
          loader: 'css-loader',			// 写成字典的模式
        }, {
          loader: 'less-loader',
        }]
      },
      {
        test: /\.(sc|c|sa)ss$/,				// 正则，既可以处理css也可以处理scss/sass
        use: [{
          loader: MiniCssExtractPlugin.loader,     // style-loader替换成这个
        },
        {
          loader: 'css-loader',			// 写成字典的模式
        },
        {
          loader: 'sass-loader',			// 这个也要
        }]		// 添加 sass-loader模块
      },
    ],
  },
};

module.exports = merge(common, config)