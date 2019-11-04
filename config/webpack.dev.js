const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const projectPath = __dirname.replace("config", '');   // 项目路径

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',    // 添加这个 js 的source-map
  entry: './App.js',   			// 入口文件
  output: {
    path: path.resolve(projectPath, 'test'),   // 输出路径
    filename: 'output.bundle.js',         // 文件名
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'apex-component', // 默认值：Webpack App
      filename: 'index.html', // 默认值： 'index.html'
      template: path.resolve(projectPath, 'template/index.html'),
      minify: {
        collapseWhitespace: true,   // 移除空格
        removeComments: true,			// 移除注释
        removeAttributeQuotes: true // 移除属性的引号
      }
    }),
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,  // 一定要加，不然打包慢
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [{
          loader: 'style-loader'			// 这个不需要添加 sourceMap配置
        },
        {
          loader: 'css-loader',			// 写成字典的模式
          options: {
            sourceMap: true				// 添加一个options 参数sourceMap 设置为true
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true				// 添加一个options 参数sourceMap 设置为true
          }
        }]
      },
      {
        test: /\.(sc|c|sa)ss$/,				// 正则，既可以处理css也可以处理scss/sass
        use: [{
          loader: 'style-loader'			// 这个不需要添加 sourceMap配置
        },
        {
          loader: 'css-loader',			// 写成字典的模式
          options: {
            sourceMap: true				// 添加一个options 参数sourceMap 设置为true
          }
        },
        {
          loader: 'sass-loader',			// 这个也要
          options: {
            sourceMap: true
          }
        }]		// 添加 sass-loader模块
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
  devServer: {
    clientLogLevel: 'warning', // 可能的值有 none, error, warning 或者 info（默认值)
    hot: true,  // 启用 webpack 的模块热替换特性, 这个需要配合： webpack.HotModuleReplacementPlugin插件
    contentBase: path.join(projectPath, "test"), // 告诉服务器从哪里提供内容， 默认情况下，将使用当前工作目录作为提供内容的目录
    host: '127.0.0.1', // 指定使用一个 host。默认是 localhost。如果你希望服务器外部可访问 0.0.0.0
    port: 9527, // 端口
    open: true, // 是否打开浏览器
    overlay: {  // 出现错误或者警告的时候，是否覆盖页面线上错误消息。
      warnings: true,
      errors: true
    },
    publicPath: '/', // 此路径下的打包文件可在浏览器中访问。
    quiet: true, // necessary for FriendlyErrorsPlugin. 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: { // 监视文件相关的控制选项
      poll: true,   // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。Vagrant 也有很多问题。在这些情况下，请使用轮询. poll: true。当然 poll也可以设置成毫秒数，比如：  poll: 1000
      ignored: /node_modules/, // 忽略监控的文件夹，正则
      aggregateTimeout: 300 // 默认值，当第一个文件更改，会在重新构建前增加延迟
    }
  },
}