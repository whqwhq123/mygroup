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

//添加品牌列表
export function getNoAddCarMakeTree(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/getNoAddCarMakeTree',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
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
