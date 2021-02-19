import { login } from '@/service/api'

const state = {
  token: '',  //token
  userInfo: {}, //用户信息
  roles: [],
  functionCode:[],
  companyInfo: {}
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
  SET_FunctionCode: (state, functionCode) => {
    state.functionCode = functionCode
  },
  SET_CompanyInfo: (state, companyInfo) => {
    state.companyInfo = companyInfo
  },
}

const actions = {
  // user login
  userLogin({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        if(response.code==0){
          const { data } = response;
          commit('SET_TOKEN', data[1] || '')
          commit('SET_UserInfo', data[0] || {})
          commit('SET_ROLES', data[2])
          let arr = data[3]
          let arr_code = []
          for(let i = 0; i < arr.length; i++){
            arr_code.push(arr[i]['functionCode'])
          }
          commit('SET_FunctionCode', arr_code)
          commit('SET_CompanyInfo', data[4])
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_UserInfo', {})
      commit('SET_ROLES', [])
      commit('SET_FunctionCode', [])
      commit('SET_CompanyInfo', {})
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
      commit('SET_FunctionCode', [])
      commit('SET_CompanyInfo', {})
      
      resolve()
    })
  },
  // changeNormalPssword({ commit },passWord) {
  //   return new Promise((resolve, reject) => {
  //     changeNormalPssword(passWord).then(response=>{
  //         console.log(response)
  //         commit('SET_TOKEN', '')
  //         commit('SET_UserInfo', {})
  //         commit('SET_ROLES', [])
  //         commit('SET_FunctionCode', [])
  //         commit('SET_CompanyInfo', {})
  //         resolve()
  //     })
  //   })
  // },
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
