import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [{
  path: '/login',
  name: 'login',
  hidden: true,
  component: () => import('@/views/login/index'),
  meta: {
    title: '数据平台登录'
  }
}, {
  path: '/',
  component: Layout,
  redirect: '/index',
  // hidden: true,
  children: [
    {
      path: 'index',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: { title: '首页', icon: 'guide', affix: false }
    }
  ]
},
  // {
  //   path: '/404',
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // }
]

export const asyncRoutes = [{
  path: '/basicConfig',
  component: Layout,
  redirect: '/basicConfig/channel',
  alwaysShow: true,
  name: 'basicConfig',
  meta: {
    title: '基础配置',
    icon: 'enterprise'
  },
  children: [
    {
      path: 'enterprise',
      component: () => import('@/views/basicConfig/enterprise'),
      name: 'enterprise',
      meta: {
        title: '企业资料'
      }
    },
    {
      path: 'organize',
      component: () => import('@/views/basicConfig/organize'),
      name: 'organize',
      meta: {
        title: '组织人员'
      }
    },
    {
      path: 'roles',
      component: () => import('@/views/basicConfig/roles'),
      name: 'roles',
      meta: {
        title: '角色管理'
      }
    },
    {
      path: 'model',
      component: () => import('@/views/basicConfig/model'),
      name: 'model',
      meta: {
        title: '品牌车型'
      }
    },
    {
      path: 'channel',
      component: () => import('@/views/basicConfig/channel'),
      name: 'channel',
      meta: {
        title: '渠道管理',
        icon: 'enterprise'
      }
    },
    {
      path: 'administration',
      component: () => import('@/views/basicConfig/administration'),
      name: 'administration',
      meta: {
        title: '行政区域'
      }
    },
    // {
    //   path: 'manage',
    //   component: () => import('@/views/businessDomain/manage'),
    //   name: 'manage',
    //   meta: {
    //     title: '应用管理',
    //     roles: ['admin']
    //   }
    // }
  ]
}, {
  path: '/clueManage',
  component: Layout,
  redirect: '/clueManage/originalClue',
  alwaysShow: true,
  name: 'clueManage',
  meta: {
    title: '线索管理',
    icon: 'clue'
  },
  children: [
    {
      path: 'originalClue',
      component: () => import('@/views/clueManage/originalClue'),
      name: 'originalClue',
      meta: {
        title: '原始线索',
        icon: 'enterprise'
      }
    }
  ]
},
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    }
  },
  routes: constantRoutes.concat(asyncRoutes)
})

const router = createRouter()

export default router
