// webpack.dll.config.js
const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
module.exports = {
  // 你想要打包的模块的数组
  entry: {
    vendor: [
      'vue/dist/vue.esm.js',
      'vuex',
      'axios',
      'vue-router',
      'qs',
      'element-ui',
    ]
  },
  output: {
    path: path.resolve(__dirname, '../build/vendor/'), // 打包后文件输出的位置
    filename: '[name].dll.js',
    library: '[name]_library'
     // 这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../build/vendor/[name]-manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
};
