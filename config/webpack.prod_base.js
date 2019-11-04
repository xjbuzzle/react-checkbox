const path = require('path');
const nodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");  // 清理插件

const projectPath = __dirname.replace("config", '');   // 项目路径

module.exports = {
  mode: 'production',
  entry: './src/index.js',   			// 入口文件
  output: {
    filename: 'index.js',
    path: path.resolve(projectPath, 'build'),   // 输出路径
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CleanWebpackPlugin()  // 添加
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,  // 一定要加，不然打包慢
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ],
  },
  externals: [nodeExternals()]
};