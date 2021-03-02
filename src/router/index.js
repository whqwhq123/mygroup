import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      title: '数据平台登录'
    }
  },
  {
    path: '/',
    component: Layout,
    //redirect: '/clueManage/originalClue',
    redirect:'/index',
  //  hidden: true,
    children: [{
      path: 'index',
      component: () => import('@/views/home/index'),
      name: 'home',
      meta: {
        title: '首页',
        requireAuth: true
      }
    }]
  },
  {
    path: '/resetPassword',
    name: 'resetPassword',
    component: () => import('@/views/login/forgotPassword'),
    meta: {
      title: '忘记密码'
    }
  }
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
      requireAuth: true
    },
    children: [{
        path: 'enterprise',
        component: () => import('@/views/basicConfig/enterprise'),
        name: 'enterprise',
        meta: {
          title: '企业资料',
          requireAuth: true
        }
      },
      {
        path: 'organize',
        component: () => import('@/views/basicConfig/organize'),
        name: 'organize',
        meta: {
          title: '组织人员',
          requireAuth: true
        }
      },
      {
        path: 'roles',
        component: () => import('@/views/basicConfig/roles'),
        name: 'roles',
        meta: {
          title: '角色管理',
          requireAuth: true
        }
      },
      {
        path: 'model',
        component: () => import('@/views/basicConfig/model'),
        name: 'model',
        meta: {
          title: '品牌车型',
          requireAuth: true
        }
      },
      {
        path: 'channel',
        component: () => import('@/views/basicConfig/channel'),
        name: 'channel',
        meta: {
          title: '渠道管理',
          requireAuth: true
        }
      },
      {
        path: 'administration',
        component: () => import('@/views/basicConfig/administration'),
        name: 'administration',
        meta: {
          title: '行政区域',
          requireAuth: true
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
  },
  {
    path: '/clueManage',
    component: Layout,
    redirect: '/clueManage/originalClue',
    alwaysShow: true,
    name: 'clueManage',
    meta: {
      title: '线索管理',
      requireAuth: true
    },
    children: [
      {
        path: 'originalClue',
        component: () => import('@/views/clueManage/original/originalClue'),
        name: 'originalClue',
        meta: {
          title: '原始线索',
          icon: 'enterprise'
        }
      },
      {
        path: 'addClue',
        component: () => import('@/views/clueManage/original/addClue'),
        name: 'addClue',
        hidden:true,
        meta: {
          title: '新增原始线索'
        }
      },
      {
        path: 'clueDetail',
        component: () => import('@/views/clueManage/original/clueDetail'),
        name: 'clueDetail',
        hidden:true,
        meta: {
          title: '原始线索详情'
        },
      },
      {
        path: 'clueCleaning',
        component: () => import('@/views/clueManage/clueClean/clueCleaning'),
        name: 'clueCleaning',
        meta: {
          title: '线索清洗',
          icon: 'el-icon-s-open'
        }
      },
      {
        path: 'clueCleanDetails',
        component: () => import('@/views/clueManage/clueClean/clueCleanDetails'),
        name: 'clueCleanDetails',
        hidden:true,
        meta: {
          title: '线索清洗详情',
        }
      },
      {
        path: 'onlyClue',
        component: () => import('@/views/clueManage/onlyClue/onlyClues'),
        name: 'onlyClue',
        meta: {
          title: '唯一线索',
          icon: 'el-icon-s-open'
        }
      },
      {
        path: 'onlyClueDetails',
        component: () => import('@/views/clueManage/onlyClue/onlyClueDetails'),
        name: 'onlyClueDetails',
        meta: {
          title: '唯一线索详情',
          icon: 'el-icon-s-open'
        }
      },
      {
        path:'rulesConfig',
        redirect:'rulesConfig/hostsRules',
        component: Layout,
        alwaysShow: true,
        name: 'rulesConfig',
        meta: {
          title: '规则配置',
          icon: 'el-icon-s-open'
        },
        children:[
          {
            path: 'hostsRules',
            component: () => import('@/views/clueManage/rulesConfig/hostsRules'),
            name: 'hostsRules',
            meta: {
              title: '集团配置',
              icon: 'enterprise'
            }
          },
          {
            path: 'dealersRules',
            component: () => import('@/views/clueManage/rulesConfig/dealersRules'),
            name: 'dealersRules',
            meta: {
              title: '经销商配置',
              icon: 'enterprise'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/mallOperation',
    component: Layout,
    redirect: '/mallOperation/goodsManager',
    alwaysShow: true,
    name: 'mallOperation',
    meta: {
      title: '商城运营',
      requireAuth: true
    },
    children: [
      {
        path: 'goodsManager',
        component: () => import('@/views/mallOperation/goodsManager'),
        name: 'goodsManager',
        meta: {
          title: '商品管理',
          icon: 'el-icon-s-open'
        }
      },
    ]
  },
  {
    path: '/activityManager',
    component: Layout,
    redirect: '/activityManager/marketing',
    alwaysShow: true,
    name: 'activityManager',
    meta: {
      title: '活动管理',
      requireAuth: true
    },
    children: [
      {
        path: 'marketing',
        component: () => import('@/views/activityManager/marketing'),
        name: 'marketing',
        meta: {
          title: '营销活动',
          icon: 'el-icon-s-open'
        }
      },
      {
        path: 'activityReport',
        component: () => import('@/views/activityManager/activityReport'),
        name: 'activityReport',
      //  hidden:true,
        meta: {
          title: '活动报告',
        }
      },
      // newactivity
      {
        path: 'newactivity',
        component: () => import('@/views/activityManager/newactivity'),
        name: 'newactivity',
        meta: {
          title: '新建/修改营销活动',
          icon: 'el-icon-s-open'
        }
      },
      {
        path: 'activityDetail',
        component: () => import('@/views/activityManager/activityDetail'),
        name: 'activityDetail',
        meta: {
          title: '活动详情',
          icon: 'el-icon-s-open'
        }
      },
    ]
  }

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
