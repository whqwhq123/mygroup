// webpack.config.js

const path = require('path')
const webpack = require('webpack')
const config = require('./../config')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin") //优化代码的压缩时间
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //编译进度插件
const chalk = require('chalk') //终端样式库
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
})
const devMode = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';

console.log('环境', process.env.NODE_ENV)
module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:8].js',
    chunkFilename: 'static/js/[name].[hash:8].js'
  },
  module: {
    rules: [
      // {
      //   test:/\.js$/,
      //   use:{
      //     loader:'babel-loader',
      //     options:{
      //       presets:['@babel/preset-env']
      //     }
      //   },
      //   exclude:/node_modules/
      // },
      {
        test: /\.js$/,
        use: [{
          loader: 'happypack/loader?id=happyBabel'
        }],
        exclude: /node_modules/,
        // /node_modules\/(?!(vue-echarts)\/).*/,
      },
      {
        test: /\.vue$/,
        use: [{
          loader: 'vue-loader',
          options: {
            transformAssetUrls: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../../',
            hmr: devMode
          }
        }, 'css-loader', 
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('autoprefixer')
            ]
          }
        },
        {
          loader: 'sass-loader', 
          options: { sourceMap: true }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, '../src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false, // file-loader 的版本是 4.3.0 及以上，默认值是 true，需要手动改成 false
            name: 'static/img/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false, // file-loader 的版本是 4.3.0 及以上，默认值是 true，需要手动改成 false
            name: 'static/file/[name].[hash:8].[ext]',
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        use: {
          loader: 'file-loader',
          options: {
            esModule: false, // file-loader 的版本是 4.3.0 及以上，默认值是 true，需要手动改成 false
            name: 'static/fonts/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'api': path.resolve(__dirname, '../src/service/api'),
      'utils': path.resolve(__dirname, '../src/utils'),
      'store': path.resolve(__dirname, '../src/store'),
      'router': path.resolve(__dirname, '../src/router')
    },
    extensions: ['*', '.js', '.json', '.vue']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      title: config.title || '',
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new Dotenv({ //装载对应环境变量
      path: path.resolve(`./config/.env.${process.env.NODE_ENV}`),
      safe: false,
      systemvars: false
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'static/css/[name].css' : 'static/css/[name].[hash].css',
      chunkFilename: devMode ? 'static/css/[id].css' : 'static/css/[id].[hash].css'
    }),
    new HappyPack({
      id: 'happyBabel', //与loader对应的id标识
      // 用法和loader 的配置一样 注意这里是loaders
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          cacheDirectory: true
        }
      }],
      threadPool: happyThreadPool // 共享进程池
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor/vendor-manifest.json')
    }),
    // new CopyWebpackPlugin({ // 拷贝生成的文件到dist目录 这样每次不必手动去cv
    //   patterns: [{
    //     from:path.resolve(__dirname,'./vendor/vendor.dll.js'),
    //     to:path.resolve(__dirname,'static/js')
    //   }]
    // }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './vendor/vendor.dll.js'),
      outputPath: 'static/js',
      publicPath: 'static/js'
    }),
    new ProgressBarPlugin({
      format: chalk.blueBright(' build :bar :percent (:elapsed seconds) '),
      clear: false,
      summary: false,
      customSummary: res => {
        process.stderr.write(chalk.blueBright.bold(` build end use time ${res} \n`))
      }
    }),
  ],
  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        // cacheDir: './cache/',
        uglifyJS: {
          output: {
            comments: false,
            beautify: false
          },
          compress: {
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true
          }
        }
      })
    ]
  }
}
