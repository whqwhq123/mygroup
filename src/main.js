import Vue from 'vue'
import App from './App.vue'
//引入router组件
import router from './router'
//引入vuex组件
import store from './store'
import './assets/styles/index.scss'
import './assets/styles/elemrewrite.css' //重写elem  ui 的样式
// icon
import './icons'
// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
//vue 实现复制粘贴功能
import VueClipboards from 'vue-clipboards';
Vue.use(VueClipboards)
Vue.use(ElementUI);

// 引入Echarts
import Echarts from 'echarts'
import 'echarts/lib/chart/line'
Vue.prototype.$echarts = Echarts
Vue.use(Echarts)
// 引入vue-echarts
import vueEcharts from 'vue-echarts/components/ECharts'
Vue.component('chart', vueEcharts)
// 引入谷歌地图
import AMap from 'vue-amap'
Vue.use(AMap)
AMap.initAMapApiLoader({
  key: '9942a29754c50c15ddb9f80f9aac0901',
  plugin: ['AMap.Remove', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch',
    'AMap.Geolocation', 'AMap.Geocoder'
  ],
  v: '1.4.4',
  uiVersion: '1.0'
})



//在路由跳转之前判断，除了首页以外，其他页面必须登录才能访问,异步问题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.requireAuth) {
    let token = null
    if(sessionStorage['store']){
      token = JSON.parse(sessionStorage['store']).user.token
    }
    if (store.getters.token || token) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
      return
    }
  } else {
    next();
    return
  }
  next();
})

new Vue({
  //注入router
  router,
  store,
  render: h => h(App)
}).$mount('#app')
