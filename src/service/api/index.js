import request from './../request'
import qs from 'qs'

// 获取购买力
export function getPurchasingPower(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/getMobileImages',
    method: 'get',
    params: qs.stringify(data)
  })
}

//品牌车型基本信息 tree /carMake/getAddCarMakeTree

// export function getAddCarMakeTree(data){
//   return request({
//     url:'http://10.20.0.164:4091/label/carMake/getAddCarMakeTree',
//     method: 'post',
//     headers:{
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     data: qs.stringify(data)
//   })
// }

// 添加子品牌 通过父品牌id 查询子品牌/carMake/getCarGroupByMakeId           makeId 
export function getCarGroupByMakeId(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/getCarGroupByMakeId',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 添加自定义子品牌  /carMake/addCustomizeCarGroup
export function addCustomizeCarGroup(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/addCustomizeCarGroup',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 根据子品牌id获取车系管理列表  /carModel/getCarModelList 
export function getCarModelList(data){
  return request({
    url:'http://10.20.0.164:4091/label/carModel/getCarModelList',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
//添加品牌==》列表
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
//添加自定义品牌  /carMake/addCustomizeCarMake
//makeName
export function addCustomizeCarMake(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/addCustomizeCarMake',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
//添加已选品牌  /label/carMake/addCarMake
export function addCarMake(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/addCarMake',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//添加车系 获取车种 http://10.20.0.164:4091/label/carModel/getLevelNames
export function getLevelNames(data){
  return request({
    url:'http://10.20.0.164:4091/label/carModel/getLevelNames',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 添加自定义车系  /carModel/addCustomizeCarModel

export function addCustomizeCarModel(data){
  return request({
    url:'http://10.20.0.164:4091/label/carModel/addCustomizeCarModel',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

//是否重点车系 /carModel/changeIsPoint
export function changeIsPoint(data){
  return request({
    url:'http://10.20.0.164:4091/label/carModel/changeIsPoint',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}


// 根据车系id获取车型列表

export function getCarStyleList(data){
  return request({
    url:'http://10.20.0.164:4091/label/carStyle/getCarStyleList',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
// 通过子品牌获取经销商列表label/carStyle/getDeptList 
export function getDeptList(data){
  return request({
    url:'http://10.20.0.164:4091/label/carStyle/getDeptList',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
//修改车系在某经销商是否在售
// label/carStyle/changeIsLimit
export function changeIsLimit(data){
  return request({
    url:'http://10.20.0.164:4091/label/carStyle/changeIsLimit',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}

// 修改车型在售状态
export function changeOnSale(data){
  return request({
    url:'http://10.20.0.164:4091/label/carStyle/changeOnSale',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
//新增自定义车型
// /carStyle/addCustomizeCarStyle

export function addCustomizeCarStyle(data){
  return request({
    url:'http://10.20.0.164:4091/label/carStyle/addCustomizeCarStyle',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}
//删除已选的父品牌或子品牌
// /carMake/deleteCarMakeOrCarGroup
export function deleteCarMakeOrCarGroup(data){
  return request({
    url:'http://10.20.0.164:4091/label/carMake/deleteCarMakeOrCarGroup',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  })
}





//角色列表  
export function rolelist(){
  return request({
    url:'http://10.20.0.210:7030/logon/role/list',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':'sdmp_header eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJleHAiOjE2MTE5OTgxNTgsInVzZXJfaWQiOiIxIiwiaWF0IjoxNjExOTExNzU4LCJ1c2VyX25hbWUiOm51bGx9.n5WTcXN0lcOUQO_2leUIctdysfT_ABFAqE5SxOrxUMA'
    },
  })
}
//角色添加权限获取  http://10.20.0.210:7030/logon/function/allPermissionHaveLevel
export function allPermissionHaveLevel(){
  return request({
    url:'http://10.20.0.210:7030/logon/function/allPermissionHaveLevel',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':'sdmp_header eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJleHAiOjE2MTE5OTgxNTgsInVzZXJfaWQiOiIxIiwiaWF0IjoxNjExOTExNzU4LCJ1c2VyX25hbWUiOm51bGx9.n5WTcXN0lcOUQO_2leUIctdysfT_ABFAqE5SxOrxUMA'
    },
  })
}

//角色新增 logon/role/add  
export function rolesAdd(data){
  return request({
    url:'http://10.20.0.210:7030/logon/role/add',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':'sdmp_header eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJleHAiOjE2MTE5OTgxNTgsInVzZXJfaWQiOiIxIiwiaWF0IjoxNjExOTExNzU4LCJ1c2VyX25hbWUiOm51bGx9.n5WTcXN0lcOUQO_2leUIctdysfT_ABFAqE5SxOrxUMA'
    },
    data:qs.stringify(data),
  })
}
//角色权限查询 logon/role/listFunctionByRoleId
export function listFunctionByRoleId(data){
  return request({
    url:'http://10.20.0.210:7030/logon/role/listFunctionByRoleId',
    method: 'post',
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'token':'sdmp_header eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIiLCJleHAiOjE2MTE5OTgxNTgsInVzZXJfaWQiOiIxIiwiaWF0IjoxNjExOTExNzU4LCJ1c2VyX25hbWUiOm51bGx9.n5WTcXN0lcOUQO_2leUIctdysfT_ABFAqE5SxOrxUMA'
    },
    data:qs.stringify(data),
  })
}
// 原始线索列表
export function clueSearch(deptId, page, data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/page?deptId=' + deptId + '&' + page + '&' + data,
  })
}

//线索列表的车型和渠道
export function clueList(deptId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/condition?deptId=' + deptId
  })
}

// 线索详情
export function getDetail(id) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/detail?id=' + id
  })
}

//新建线索
export function addClue(clueData) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/save?' + clueData
  })
}
// 原始线索ID
export function getId(deptId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/id?deptId=' + deptId
  })
}
//线索列表导出
export function clueExport(deptId, page, data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/export?deptId=' + deptId + '&' + page + '&' + data,
    responseType: 'blob'
  })
}

//省
export function selectProvinceInfo(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/saasAdmin/pi/selectProvinceInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//市
export function selectCityInfo(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/saasAdmin/ci/selectCityInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//区
export function selectAreaInfo(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/saasAdmin/ai/selectAreaInfo',
    method: 'post',
    data: qs.stringify(data)
  })
}

//登录
export function login(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/login',
    method: 'post',
    data: data
  })
}

//编辑企业信息
export function companyEdit(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/dept/companyEdit',
    method: 'post',
    data: qs.stringify(data)
  })
}

//查询企业信息
export function companyQuery(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/dept/companyQuery',
    method: 'post',
    data: qs.stringify(data)
  })
}

//oss密钥
export function LoginApplication(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/requestSecretKey',
    method: 'post'
  })
}


// 一级渠道列表
export function getFirst(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/page/first',
    data: qs.stringify(data)
  })
}

// 获取渠道id
export function getChannelId(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/id',
    data: qs.stringify(data)
  })
}

// 新增渠道
export function addChannel(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/save',
    data: qs.stringify(data)
  })
}

// 修改渠道
export function updateChannel(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/modify',
    data: qs.stringify(data)
  })
}

// 修改渠道状态
export function updateStatus(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/enable',
    data: qs.stringify(data)
  })
}

// 导出一级渠道
export function expFirst(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/export/first',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}

// 二级渠道列表
export function getSecond(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/page/second',
    data: qs.stringify(data)
  })
}

// 导出二级渠道
export function expSecond(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/clue/channel/export/second',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}

// 角色人员-业务线
export function deptQueryBusiness(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/deptQueryBusiness',
    data: qs.stringify(data)
  })
}

// 角色人员-业务线-添加
export function deptAdd(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/deptAdd',
    data: qs.stringify(data)
  })
}

// 角色人员-业务线-编辑
export function deptEdit(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/deptEdit',
    data: qs.stringify(data)
  })
}

// 经营品牌
export function getAddCarMakeTree(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/getAddCarMakeTree',
    data: qs.stringify(data)
  })
}

// 部门负责人
export function getDeptPrincipal(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/queryDeptPrincipal',
    data: qs.stringify(data)
  })
}

// 组织详情
export function getDeptByIdForEdit(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+ '/logon/dept/queryDeptByIdForEdit',
    data: qs.stringify(data)
  })
} 

// 角色人员-业务线-启用停用
export function deptUserStatus(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/deptUserStatus',
    data: qs.stringify(data)
  })
}

//组织人员获取角色
export function getRoleList(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/role/list',
    data: qs.stringify(data)
  })
}

//获取组织人员
export function getUserList(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/list',
    data: qs.stringify(data)
  })
}

//获取组织人员
export function queryUserInfo(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/queryUserInfo',
    data: qs.stringify(data)
  })
}

//获取组织人员
export function queryUserRecordInfo(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/userRecord/queryUserRecordInfo',
    data: qs.stringify(data)
  })
}

// 添加组织人员
export function addUser(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/add',
    data: qs.stringify(data)
  })
}
