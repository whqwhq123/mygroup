const path = require('path')
// 取本机IP地址
const getIPAdress = () => {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
      var iface = interfaces[devName];
      for (var i = 0; i < iface.length; i++) {
        var alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
}
module.exports = {
  title: 'SDMP 运营管理系统' || '',
  dev: {
    devServer : getIPAdress() || '127.0.0.1',
    assetsRoot: 'assets',   //打包文件路径
    assetsPublicPath: '/', //webAPP根路径
    // proxyTable: {   //代理列表 支持多个代理
    //   '/api': {
    //       target: 'http://dev-user-api.wanshifu.com/',
    //       changeOrigin: true,
    //       withCredentials: true,
    //       secure: false,
    //       pathRewrite: { '^/api': '' }
    //   },
    // },
    autoOpenBrowser: true,
    host: '127.0.0.1', 
    port: 9090, 
    devtool: 'cheap-module-eval-source-map',
  },
//   build: {
//     index: path.resolve(__dirname, '../assets/index.html'),
//     assetsRoot: path.resolve(__dirname, '../assets'),
//     // assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     productionSourceMap: false,
//     devtool: false,
//     productionGzip: false,  //是否压缩启用
//     productionGzipExtensions: ['js', 'css'],  //压缩启用-压缩的内容
//     deleteOriginalAssets : true  //压缩启用-删除压缩的源文件
//   }
}