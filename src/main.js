import Vue from 'vue'
import App from './App.vue'
//引入router组件
import router from './router'
//引入vuex组件
import store from './store'
import './assets/styles/index.scss'
import './assets/styles/elemrewrite.css'   //重写elem  ui 的样式

// icon
import './icons'
// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//在路由跳转之前判断，除了首页以外，其他页面必须登录才能访问,异步问题

router.beforeEach((to, from, next) => {
  // console.log(from)
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})


new Vue({
  //注入router
  router,
  store,
  render: h => h(App)
}).$mount('#app')
