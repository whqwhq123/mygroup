// import { login, logout } from '@/api/user'
import { asyncRoutes, constantRoutes } from '@/router'
// 

const state = {
  token: '',  //token
  userInfo: {}, //用户信息
  roles: constantRoutes.concat(asyncRoutes)
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_UserInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      // login(userInfo).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)

      //   // commit('SET_ROLES', data.roles)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      const response = {
        token: 'kkkkkkkkkkkkkkkkk',
        info: {
          name: '王五',
          avatar: '',
        },
        roles: []
      }
      commit('SET_TOKEN', response.token)
      commit('SET_UserInfo', response.info)
      commit('SET_ROLES', constantRoutes.concat(asyncRoutes))
      resolve()
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_UserInfo', {})
      commit('SET_ROLES', [])
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },
  
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_UserInfo', {})
      commit('SET_ROLES', [])
      resolve()
    })
  },

  // dynamically modify permissions
  // changeRoles({ commit, dispatch }, role) {
  //   return new Promise(async resolve => {
  //     const token = role + '-token'

  //     commit('SET_TOKEN', token)
  //     setToken(token)

  //     const { roles } = await dispatch('getInfo')

  //     resetRouter()

  //     // generate accessible routes map based on roles
  //     const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

  //     // dynamically add accessible routes
  //     router.addRoutes(accessRoutes)

  //     // reset visited views and cached views
  //     dispatch('tagsView/delAllViews', null, { root: true })

  //     resolve()
  //   })
  // }
}

export default {
  namespaced: true, //使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  mutations,
  actions
}
