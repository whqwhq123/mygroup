// webpack.prod.js

const path = require('path')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = WebpackMerge(webpackConfig,{
  // mode:'production',
  devtool:'cheap-module-source-map',
  plugins:[
    new CopyWebpackPlugin({
      patterns: [{
        from:path.resolve(__dirname,'../public'),
        to:path.resolve(__dirname,'../dist')
      }]
    }),
  ],
  optimization:{
    minimizer:[
      new UglifyJsPlugin({//压缩js
        cache:true,
        parallel:true,
        sourceMap:true
      }),
      new OptimizeCssAssetsPlugin({ //压缩Css
        cssProcessor: require('cssnano')
        // filename: 'static/css/style.css',  // 从 .js 文件中提取出来的 .css 文件的名称
      })
    ],
    splitChunks:{
      chunks:'all',
      cacheGroups:{
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial" // 只打包初始时依赖的第三方
        }
      }
    }
  }
})
