import axios from 'axios'
import store from '@/store'
import router from './../../router'

const service = axios.create({
  timeout: 10000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = store.getters.token || ''
    }

    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code == '2001') {
      sessionStorage.clear()
      store.dispatch('user/logout')
      // router.push('/login')
      router.push({ path: '/login', query: { res: res }})
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
