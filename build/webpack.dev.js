// webpack.dev.js

const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const WebpackMerge = require('webpack-merge')
const chalk = require('chalk')  //终端样式库
const config = require('./../config')
// const OpenBrowserPlugin = require('open-browser-webpack-plugin')//自动打开浏览器设置

module.exports = WebpackMerge(webpackConfig,{
  mode:'development',
  devtool: config.dev.devtool,//开启相应SourceMap模式,加了导致热更新减慢
  devServer: {  //webpack-server配置（仅开发环境需要）
		contentBase: path.join(__dirname, './dist'),
    publicPath: config.dev.assetsPublicPath,
		port: config.dev.port,
    host: config.dev.host,
    useLocalIp: true,
		// proxy: config.dev.proxyTable,
		compress: true,
    historyApiFallback: true,
    quiet: true, // 如果使用webpack-dev-server，需要设为true，禁止显示devServer的console信息
	},
  plugins:[
    // new webpack.DefinePlugin({  //环境变量装配
		// 	'process.env': {
		// 		NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		// 	},
		// }),
    new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new OpenBrowserPlugin({
    //   url: `http://localhost:${config.dev.port + config.dev.assetsPublicPath}`
    // }),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          chalk.cyan.bold('- Local: ') + chalk.greenBright.bold(`http://localhost:${config.dev.port}/`),
          chalk.cyan.bold('- Network: ') + chalk.greenBright.bold(`http://${config.dev.devServer}:${config.dev.port}/`)
        ],
        onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
        clearConsole: true,
      }
    }),
  ]
})
