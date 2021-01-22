import axios from 'axios'

// create an axios instance
const service = axios.create({
  timeout: 10000 // request timeout
})

service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['token'] = getToken()
    // }
    // config.headers['api-version'] = process.env.VUE_APP_API_VERSION

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
    // if (res.code) {
    //   return Promise.reject(new Error(res.errMsg || 'Error'))
    // } else {
    //   return res
    // }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service

