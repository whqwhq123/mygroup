
## 请求文件模板规范
```
import request from './../request'
import qs from 'qs'
// 标签管理
export function getTagsList(data) {
  return request({
    url: process.env.VUE_APP_ADMIN_API + '/goodTag/queryTag',
    method: 'get',
    params: data
  })
}

// 商品添加/编辑
export function addGoods(data) {
  return request({
    url: process.env.VUE_APP_ADMIN_API + '/goods/createGoods',
    method: 'post',
    data: data
  })
}

// 删除商品
export function delGoods(data) {
  return request({
    url: process.env.VUE_APP_ADMIN_API + '/goods/deleteGoods',
    method: 'post',
    data: qs.stringify(data)
  })
}
```

## 请求
```
import { getConfig } from '@/service/api'

let data = {
  tagName: '',
  status: 0,
  pageSize: 10000
}

getConfig(data)
  .then(res => {
    console.log(res.data)
  })
  .catch(() => {
    console.log('error')
  })
```