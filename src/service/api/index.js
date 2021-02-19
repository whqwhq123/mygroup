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


// 添加子品牌 通过父品牌id 查询子品牌/carMake/getCarGroupByMakeId           makeId 
export function getCarGroupByMakeId(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carMake/getCarGroupByMakeId',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/getCarGroupByMakeId',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加自定义子品牌  /carMake/addCustomizeCarGroup
export function addCustomizeCarGroup(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carMake/addCustomizeCarGroup',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/addCustomizeCarGroup',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 根据子品牌id获取车系管理列表  /carModel/getCarModelList 
export function getCarModelList(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carModel/getCarModelList',
    url:process.env.VUE_APP_USER_URL+ '/label/carModel/getCarModelList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//添加品牌==》列表
export function getNoAddCarMakeTree(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carMake/getNoAddCarMakeTree',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/getNoAddCarMakeTree',
    method: 'post',
    data: qs.stringify(data)
  })
}
//添加自定义品牌  /carMake/addCustomizeCarMake
//makeName
export function addCustomizeCarMake(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carMake/addCustomizeCarMake',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/addCustomizeCarMake',
    method: 'post',
    data: qs.stringify(data)
  })
}
//添加已选品牌  /label/carMake/addCarMake
export function addCarMake(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carMake/addCarMake',
    url:process.env.VUE_APP_USER_URL+ '/label/carMake/addCarMake',
    method: 'post',
    data: qs.stringify(data)
  })
}

//添加车系 获取车种 http://10.20.0.164:4091/label/carModel/getLevelNames
export function getLevelNames(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carModel/getLevelNames',
    url:process.env.VUE_APP_USER_URL+ '/label/carModel/getLevelNames',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加自定义车系  /carModel/addCustomizeCarModel

export function addCustomizeCarModel(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carModel/addCustomizeCarModel',
    url:process.env.VUE_APP_USER_URL+ '/label/carModel/addCustomizeCarModel',
    method: 'post',
    data: qs.stringify(data)
  })
}

//是否重点车系 /carModel/changeIsPoint
export function changeIsPoint(data){
  return request({
    // url:'http://10.20.0.164:4091/label/carModel/changeIsPoint',
    url:process.env.VUE_APP_USER_URL+ '/label/carModel/changeIsPoint',
    method: 'post',
    data: qs.stringify(data)
  })
}


// 根据车系id获取车型列表

export function getCarStyleList(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carStyle/getCarStyleList',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 通过子品牌获取经销商列表label/carStyle/getDeptList 
export function getDeptList(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carStyle/getDeptList',
    method: 'post',
    data: qs.stringify(data)
  })
}
//修改车系在某经销商是否在售
// label/carStyle/changeIsLimit
export function changeIsLimit(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carStyle/changeIsLimit',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 修改车型在售状态
export function changeOnSale(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carStyle/changeOnSale',
    method: 'post',
    data: qs.stringify(data)
  })
}
//新增自定义车型
// /carStyle/addCustomizeCarStyle

export function addCustomizeCarStyle(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carStyle/addCustomizeCarStyle',
    method: 'post',
    data: qs.stringify(data)
  })
}
//删除已选的父品牌或子品牌
// /carMake/deleteCarMakeOrCarGroup
export function deleteCarMakeOrCarGroup(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/label/carMake/deleteCarMakeOrCarGroup',
    method: 'post',
    data: qs.stringify(data)
  })
}
//角色列表  
export function rolelist(){
  return request({
    url:process.env.VUE_APP_USER_URL+'/logon/role/list',
    method: 'post',
  })
}
//角色权限获取  http://10.20.0.210:7030/logon/function/allPermissionHaveLevel
export function allPermissionHaveLevel(){
  return request({
    url:process.env.VUE_APP_USER_URL+'/logon/function/allPermissionHaveLevel',
    method: 'post',
  })
}





//角色新增 logon/role/add  
export function rolesAdd(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/logon/role/add',
    method: 'post',
    data:qs.stringify(data),
  })
}
//角色修改  logon/role/edit
export function rolesEdit(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/logon/role/edit',
    method: 'post',
    data:qs.stringify(data),
  })
}

//角色权限查询 logon/role/listFunctionByRoleId
export function listFunctionByRoleId(data){
  return request({
    url:process.env.VUE_APP_USER_URL+'/logon/role/listFunctionByRoleId',
    method: 'post',
    data:qs.stringify(data),
  })
}
// 品牌/车系/车型/数据列表
export function getCarMakeModelStyle(){
  return request({
    method: 'post',
    url:process.env.VUE_APP_USER_URL+'/label/carMake/getCarMakeModelStyleNames'
  })
}
// 线索-->经销商数据
export function getDealerData(){
  return request({
    method: 'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/queryDealer'
  })
}
// 线索-->销售顾问数据
export function getSalesData(deptId){
  return request({
    method: 'post',
    url:process.env.VUE_APP_USER_URL +'/logon/user/queryByDeptId?deptId='+ deptId
  })
}
// 原始线索列表
export function clueSearch(deptId, page, data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/page?deptId=' + deptId + '&' + page + '&' + data,
  })
}

//原始线索的渠道数据
export function clueList(deptId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/original/condition?deptId=' + deptId
  })
}
//唯一线索列表的渠道数据
export function onlyClueChannel(deptId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/unique/condition?deptId=' + deptId
  })
}
// 原始线索详情
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

//唯一线索 列表
export function onlyClueList(deptId, page, data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/unique/page?deptId=' + deptId + '&' + page + '&' + data,
  })
}
//唯一线索 人工派发/分配
export function  distributeAssign(data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/unique/manual',
    data:qs.stringify(data)
  })
}
// 唯一线索详情
export function onlyClueDetail(id){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL +'/clue/unique/detail?id='+id
  })
}
// 线索清洗渠道数据
export function cleanClueData(deptId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/clean/condition?deptId=' + deptId
  })
}
//线索清洗
export function cleanClueList(deptId, page, data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/clean/page?deptId=' + deptId + '&' + page + '&' + data,
  })
}
//线索清洗派发/派发
export function  cleanDistribute(data) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/clue/clean/manual',
    data:qs.stringify(data)
  })
}
//线索清洗分配/唯一线索人工分配----销售顾问 数据
export function  assginSalemansData(roleId) {
  return request({
    method: 'post',
    url: process.env.VUE_APP_USER_URL + '/logon/role/queryUserByRoleId?roleId='+roleId,
  })
}
// 线索清洗详情
export function CleaningDetail(id){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL +'/clue/clean/detail?id='+id
  })
}
//线索清洗
export function cleaning(user,validData,data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL +'/clue/clean/result?'+qs.stringify(user)+'&'+qs.stringify(validData)+'&'+qs.stringify(data),
    //data:qs.stringify(data)
  })
}
// 组织人员重置密码
export function organizeResetPassword(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL +'/logon/user/resetPasswordByUserId?'+qs.stringify(data),
   // data:qs.stringify(data)
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
//强制修改默认密码
export function defaultPassword(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/changeDefaultPassword',
    method: 'post',
    data: qs.stringify(data)
  })
}
//修改密码（旧密码改新密码）
export function changePassword(data) {
  return request({
    url: process.env.VUE_APP_USER_URL + '/logon/changePassword',
    method: 'post',
    data: qs.stringify(data)
  })
}
//获取验证码
export function verificationCode(userPhone){
   return request({
    url: process.env.VUE_APP_USER_URL + '/logon/getVerificationCode?userPhone='+userPhone,
    method: 'post',
  })
}
// 确认修改密码
export function confirmChangePassword(data){
   return request({
    url: process.env.VUE_APP_USER_URL + '/logon/resetPassword',
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

// 修改组织人员
export function editUser(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/edit',
    data: qs.stringify(data)
  })
}

//组织人员导出
export function exportList(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/exportList',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}

// 获取品牌信息
export function getMakGroupNameByGroupId(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/carMake/getMakGroupNameByGroupId',
    data: qs.stringify(data)
  })
}

// 组织成员启用停用
export function upUseStatus(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/userUseStatus ',
    data: qs.stringify(data)
  })
}

// 获取品牌信息
export function getUserInfo(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/user/queryUserInfo',
    data: qs.stringify(data)
  })
}
// 组织人员部门
export function queryDeptTreeByDeptId(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/logon/dept/queryDeptTreeByDeptId',
    data: qs.stringify(data)
  })
}
// 新建活动  
export function createActivity(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/activity/createActivity',
    data: qs.stringify(data)
  })
}
// 车系名称，模糊查询 
export function getSelectCarModel(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/carModel/getSelectCarModel',
    data: qs.stringify(data)
  })
}
// 活动更新 
export function updateActivity(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/activity/updateActivity',
    data: qs.stringify(data)
  })
}
// 获取活动信息(反显用)   activityId
export function getActivityInfo(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/activity/getActivityInfo',
    data: qs.stringify(data)
  })
}
//营销活动 列表 查询
export function marketingListPage(data){
  return request({
    method:'post',
    url:process.env.VUE_APP_USER_URL+'/label/activity/getListPage',
    data: qs.stringify(data)
  })
}