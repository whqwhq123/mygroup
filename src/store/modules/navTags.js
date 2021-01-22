const state = {
    tagsArr: [],
}

const mutations = {
    ADD_TagSArr: (state, data) => {
        if (state.tagsArr.some(v => v.path === data.path)) return
        // let tA = [
        //     ...state.tagsArr,
        //     {
        //         ...data,
        //         title: data.meta.title || 'no-name'
        //     }
        // ]
        // console.log(tA)
        // state.tagsArr = tA
        state.tagsArr.push(
            Object.assign({}, data, {
                title: data.meta.title || 'no-name'
            })
        )
    },
    DEL_TagSArr: state => {
        state.tagsArr = []
    },
    DEL_OtherTags: (state, data) => {
        state.tagsArr = [].concat(Object.assign({}, data, {
            title: data.meta.title || 'no-name'
        }))
    },
    DEL_CurrentTags: (state, data) => {
        let tags = state.tagsArr.filter(v => v.path != data.path)
        state.tagsArr = tags
    },
}

const actions = {
    addView({ commit, state }, data) {
        return new Promise(resolve => {
            commit('ADD_TagSArr', data)
            resolve([...state.tagsArr])
        })
    },
    delAllTags({ commit, state }) {
        return new Promise(resolve => {
            commit('DEL_TagSArr')
            resolve([...state.tagsArr])
        })
    },
    delOtherTags({ commit, state }, data) {
        return new Promise(resolve => {
            commit('DEL_OtherTags', data)
            resolve([...state.tagsArr])
        })
    },
    delCurrentTags({ commit, state }, data) {
        return new Promise(resolve => {
            commit('DEL_CurrentTags', data)
            resolve([...state.tagsArr])
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
