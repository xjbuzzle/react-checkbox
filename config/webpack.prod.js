const path = require('path');
const merge = require('webpack-merge')         // 引入合并模块
const common = require('./webpack.prod_base')      // 引入相同的模块

let config =  {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'			// 这个不需要添加 sourceMap配置
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
          loader: 'style-loader'			// 这个不需要添加 sourceMap配置
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