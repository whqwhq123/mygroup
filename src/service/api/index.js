import request from './../request'
import qs from 'qs'

// 获取购买力
export function getPurchasingPower(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/getMobileImages',
    method: 'get',
    params: data
  })
}

//品牌列表
export function getBrandList(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/koubei/getBrands',
    method: 'post',
    params: data
  })
}

// 获取购买力
// export function getPurchasingPower(data) {
//   return request({
//     url: '/api/getMobileImages',
//     method: 'post',
//     headers: {
//       'Content-Type': 'text/html'
//     },
//     data: qs.stringify(data)
//   })
// }
