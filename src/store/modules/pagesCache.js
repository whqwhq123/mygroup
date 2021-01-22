const state = {
  listQuery: {},
  type: 0
}

const mutations = {
  ADD_listQuery: (state, data) => {
    state.listQuery = data
    state.type = 1
  },
  CLEAR_listQuery: (state) => {
    state.listQuery = {}
    state.type = 0
  }
}

const actions = {
  addListQuery({ commit }, data) {
    commit('ADD_listQuery', data)
  },
  clearListQuery({ commit }) {
    commit('CLEAR_listQuery')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
