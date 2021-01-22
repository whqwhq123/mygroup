

## 目录结构

```

|- build
    -- webpack.config.js--开发和打包用到的公用配置项，通过webpack-merge 分别使用
    -- webpack.prod.js--打包配置
    -- webpack.dev.js--开发配置，生成本地服务，设置访问域名、热替换、代理、端口等信息
    -- webpack.dll.config.js--抽离第三方模块
|- config
    -- index.js--本地服务域名、端口等配置
    -- .env.development--开发模式静态全局变量配置
    -- .env.staging--测试域名、版本号等静态全局变量配置
    -- .env.production--线上域名、版本号等静态全局变量配置
|- dist
|- mock
    -- data.js--设置mock接口数据
    -- server.js--本地mock服务
|- src
    |- assets
    |- components
    |- router
    |- service
    |- utils
    |- views
    -- App.vue
    -- main.js
|-  .babelc 
|-  .editorconfig
|-  .gitignore
|-  package.json
|-  postcss.config.js

```

## 开发

```bash
# 克隆项目
git clone ssh://git@192.168.100.243:4399/webProduct/yunshanfu/auto_category.git

# 进入项目目录
cd auto_category

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动前端服务
npm run dev

```

浏览器访问 http://localhost:8806

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 更新第三方依赖包
npm run dll
```

## 注释规范

```JAVASCRIPT
  /**
     * @method computedCanvasSize 
     * @params Imgwidth 图片的实际宽度(px)
     * @author zhoujianxu
     * @result 根据容器的高度 与图片高度计算比例 并计算出宽度 将结果赋给 canvasInfo 对象
     * @return 吐出函数结果
     * */
```

## 项目编写规范

- 减少代码量,增加代码注释
- 多次复用的组件分离成公用组件
- 尽量减少定时器的使用 如使用setInterval 记得在钩子里关闭

## 修改ui库样式 使用样式穿透如下

```javascript
1.deep
.text-box {
  /deep/ input {
    width: 166px;
    text-align: center;
  }
}
2. >>>
.wrapper >>> .swiper-pagination-bullet-active{
    background: red !important;

```