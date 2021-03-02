<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">营销活动</span>
    </el-header>
    <el-form inline class="atg-search"  :style="isAdvancedQuery?'height: 275px;':'height: 60px;'" :model="form_activityClear" ref="form_activityClear">
      <el-form-item  prop="activityDivision" label="活动大类">
        <el-select v-model="form_activityClear.activityDivision" @change="activityTypeSelectFun" clearable placeholder="请选择活动大类">
          <el-option
            v-for="item in activityDivision"
            :key="item.type"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="activityType" label="活动类型">
        <el-cascader  v-model="form_activityClear.activityType" clearable ref="activityType" placeholder="请选择活动类型" :options="form_activityClear.activityDivision=='全部'?activityTypeSelect:activityTypeSelectatv" :props="{value:'label'}"></el-cascader>
      </el-form-item>
      <el-form-item  prop="activityName" label="活动名称">
        <el-input size="small" placeholder="请输入活动名称" v-model="form_activityClear.activityName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" type="info" size="small" @click="submit_search()">查询</el-button>
      </el-form-item>
      <el-button type="text" style="font-size: 14px;color: #3B86FF;margin-left: 20px;position: relative;"  @click="advancedQueryFun" ><i class="el-icon-search" style="margin-right: 5px;"></i>高级查询</el-button>
      <el-row class="digsele" v-if="isAdvancedQuery">
            <el-row>
                <el-col :span="24">
                    <el-button type="text" style="font-size: 14px;color: #3B86FF;margin-left: 20px;" >高级查询</el-button>
                </el-col>
            </el-row>
            <el-row  style="padding-left: 40px;">
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                    <el-form-item  prop="activityFrom" label="活动来源">
                        <el-select v-model="form_activityClear.activityFrom" clearable style="width: 240px;" placeholder="请选择活动类型">
                        <el-option
                            v-for="item in activityFrom"
                            :key="item.type"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                   <el-form-item  prop="modelNames" label="主推车系">
                         <!-- <el-autocomplete
                            v-model="form_activityClear.modelNames"
                            :fetch-suggestions="carModelListAsync"
                            @select="handleSelect"
                            placeholder="请选择活动状态"
                          ></el-autocomplete> -->
                        <el-select
                          v-model="form_activityClear.modelNames"
                          multiple
                          filterable
                          remote
                          reserve-keyword
                          placeholder="请输入关键词"
                          :remote-method="remoteMethod"
                          style="width: 240px;"
                          :loading="loading">
                          <el-option
                            v-for="item in carModelList"
                            :key="item.id"
                            :label="item.value"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                    <el-form-item  prop="activityStatus" label="活动状态">
                        <el-select v-model="form_activityClear.activityStatus" clearable style="width: 240px;" placeholder="请选择活动状态">
                          <el-option
                              v-for="item in activityStatus"
                              :key="item.type"
                              :label="item.label"
                              :value="item.type">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                    <el-form-item  prop="activityId" label="活动ID">
                        <el-input size="small" placeholder="请输入活动ID" style="width: 240px;" v-model="form_activityClear.activityId"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                  <el-form-item  prop="creatTime" label="创建时间">
                      <el-date-picker size="small" v-model="form_activityClear.creatTime" type="datetimerange" 
                      start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                  <el-form-item  prop="startTime" label="开始时间">
                      <el-date-picker size="small" v-model="form_activityClear.startTime" type="datetimerange" range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                      </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="6">
                  <el-form-item  prop="endTime" label="结束时间">
                      <el-date-picker size="small" v-model="form_activityClear.endTime" type="datetimerange" range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                      </el-date-picker>       
                  </el-form-item>
                </el-col>
            </el-row>
            
            <el-row type="flex"  justify="center">
                <el-form-item>
                    <el-button class="search-btn" type="info" size="small" @click="submit_search()">查询</el-button>
                    <el-button class="reset-btn" size="small" @click="reset_search(form_activityClear)">重置</el-button>
                    <el-button type="text" style="font-size: 14px;color: #3B86FF;margin-left: 20px;position: relative;"  @click="advancedQueryFun" >收起<i :class="isAdvancedQuery?'el-icon-arrow-up':'el-icon-arrow-down'" style="margin-left: 5px;"></i></el-button>
                </el-form-item>
            </el-row>

      </el-row>

      <el-button type="text" style="font-size: 14px;color: #3B86FF;float: right;" v-if="get_role_function('030100020')"  @click="newactivityFun" ><i class="el-icon-plus" style="margin-right: 5px;"></i>新建活动</el-button>
    </el-form>
    <!-- table -->
    <el-table :data="activityList_table" align="center"   height="520"  class="table" @selection-change="handleSelectionChange">
      <el-table-column label="活动ID" header-align='center' align="center" prop="activityId" ></el-table-column>
      <el-table-column label="活动名称" header-align='center' align="center" prop="activityName">
        <template slot-scope="scope">
             <el-button type="text" @click="activityDetailFun(scope)" style="color:#008DF8;cursor: pointer;">{{ scope.row.activityName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="活动大类" header-align='center' align="center" prop="activityDivision" width="100"></el-table-column>
      <el-table-column label="活动类型" header-align='center' align="center" prop="activityType"  width="100"></el-table-column>
      <el-table-column label="主推车系" header-align='center' align="center" prop="modelNames" ></el-table-column>
      <!-- :formatter="dateFormat" -->
      <el-table-column label="活动开始时间" header-align='center' align="center" prop="startTime"  ></el-table-column>
      <el-table-column label="活动结束时间" header-align='center' align="center" prop="endTime"  ></el-table-column>
      <el-table-column label="活动状态" header-align='center' align="center" prop="activityStatus" :formatter="statusFormat"></el-table-column>
      <el-table-column label="创建时间" header-align='center' align="center" prop="createTime"   ></el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      header-align='center'
      align="center"
      width="230"
      style="position: relative;"
      >
      <!-- //  1-新建 2-已发布 3-已中止 4-已结束 5-已删除 -->
      <template slot-scope="scope" >
          <el-button type="text" @click="modifyFun(scope,'xiugai')" v-if="get_role_function('030100030')"  :style="scope.row.activityStatus==4?'color:rgb(137 137 137);cursor: pointer':'color:#008DF8;cursor: pointer'" :disabled="scope.row.activityStatus==4?true:false">修改</el-button>
          <el-button type="text" @click="modifyFun(scope,'fabu')"  v-if="get_role_function('030100040')" :style="scope.row.activityStatus!=1 ?'color:rgb(137 137 137);cursor: pointer':'color:#008DF8;cursor: pointer'" :disabled="scope.row.activityStatus!=1?true:false">发布</el-button>
          <el-button type="text" @click="modifyFun(scope,'baogao')"  v-if="get_role_function('030100090')" style="color:#008DF8;cursor: pointer;">活动报告</el-button>
            <el-dropdown style="margin-left: 5px;" @command="handleCommand($event,scope)" >
            <span class="el-dropdown-link " style="color:#008DF8;cursor: pointer;font-weight: bold;font-size: 18px;">
              ...
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item style="text-align: center;color:#409EFF" command="a" v-if="get_role_function('030100070')"  v-clipboard="copyText" >复制活动链接</el-dropdown-item> -->
              <el-dropdown-item style="text-align: center;color:#409EFF" command="b" v-if="get_role_function('030100080')" >下载活动二维码</el-dropdown-item>
              <el-dropdown-item  v-if="get_role_function('030100060')" :style="scope.row.activityStatus==4?'text-align: center;color: rgb(137, 137, 137);':'text-align: center;color:#409EFF'" :disabled="scope.row.activityStatus==4?true:false" style="text-align: center;color:#409EFF" command="end">结束活动</el-dropdown-item>
              <template v-if="get_role_function('030100050')">
                <el-dropdown-item v-if="scope.row.activityStatus==4 || scope.row.activityStatus==1"  :style="scope.row.activityStatus==4 || scope.row.activityStatus==1?'text-align: center;color: rgb(137, 137, 137);':'text-align: center;color:#409EFF'" :disabled="scope.row.activityStatus==4 || scope.row.activityStatus==1?true:false"  command="break">中止</el-dropdown-item>
                <el-dropdown-item v-else :style="scope.row.activityStatus==4 || scope.row.activityStatus==1?'text-align: center;color: rgb(137, 137, 137);':'text-align: center;color:#409EFF'" :disabled="scope.row.activityStatus==4 || scope.row.activityStatus==1?true:false"  command="break">{{scope.row.activityStatus==3?"启用":"中止"}}</el-dropdown-item>
              </template>
              
              <el-dropdown-item v-if="get_role_function('030100100')" :style="scope.row.activityStatus!=1?'text-align: center;color: rgb(137, 137, 137);':'text-align: center;color:#409EFF'" :disabled="scope.row.activityStatus!=1?true:false" style="text-align: center;color:#409EFF" command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </template>
    </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="page.pageNum"
      :page-sizes="[7, 14, 28]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination" style="text-align:center">
    </el-pagination>

  </el-main>
</template>

<script>
import {getSelectCarModel,marketingListPage,updateActivity,downloadCode} from "api/index.js";
import { parseTime,get_role_function } from '@/utils/index';

// import ClipboardJS from 'clipboard';
import qs from 'qs'
 export default {
   data(){
     return{
       get_role_function,
       userInfo:{},
       qrImage:'',//二维码数据
       copyText: "想要复制的文本",
       userTag:'group',
       cleanDeliveryVisible:false,
       cleanAssignVisible:false,
       form_activityClear:{
         activityDivision:'全部',
         activityType:'',
         activityName:'',
         activityFrom:'', 
         modelNames:'',
         activityStatus:'',  //  1-新建 2-已发布 3-已中止 4-已结束 5-已删除
         activityId:'',
         creatTime:'',
         startTime:'',
         endTime:'',
       },
       modelNamesList:[],
       loading: false,
       activityTypeSelect:[
        {
           value:0,
           label:'媒体投放',
           children:[
             {
               value:11,
               label:'品牌投放'
             },
              {
               value:12,
               label:'活动投放'
             }
           ]
         },
         
         {
           value:1,
           label:'营销活动',
           children:[
             {
               value:10,
               label:'见面礼'
             },
             {
               value:11,
               label:'新品上市'
             },
              {
               value:12,
               label:'团购会'
             },
             {
               value:13,
               label:'促销会'
             },
             {
               value:14,
               label:'展销会'
             },
              {
               value:15,
               label:'开业店庆'
             },
             {
               value:16,
               label:'试驾体验'
             }
           ]
         },
         {
           value:2,
           label:'商城活动',
           children:[
             {
               value:21,
               label:'团购'
             },
              {
               value:22,
               label:'众筹'
              }
           ]
         },
         {
           value:3,
           label:'粉丝活动',
           children:[
             {
               value:31,
               label:'客户关怀'
             },
              {
               value:32,
               label:'公益活动'
             },
              {
               value:33,
               label:'粉丝沙龙'
             },
              {
               value:34,
               label:'自由行'
             },
              {
               value:35,
               label:'挑战赛'
             },
              {
               value:36,
               label:'演艺赛事'
             }
           ]
         }
       ],
       activityTypeSelectatv:[],//选中的大类 活动类型
       carModelList:[],  //主推车系
       carModelData:[],//主推车系
       page:{
         pageNum:1,
         pageSize:10,
         total:0
       },
       pageL:{
          pageNum:1,
          pageSize:7,
       },
       //选择活动大类
       activityDivision:[
         {
           type:'all',
           label:'全部'
         },
          {
          type:'meiti',
           label:'媒体投放'
         },
         {
           type:'marketing',
           label:'营销活动'
         },
         {
           type:'shopping',
           label:'商城活动'
         },
          {
           type:'fans',
           label:'粉丝活动'
         }
       ],
       activityFrom:[
         {
           type:'all',
           label:'全部'
         },
         {
           type:'lianhe',
           label:'厂商联合'
         },
         {
           type:'zizhu',
           label:'自主活动'
         },
          {
           type:'yiye',
           label:'异业合作'
         }
       ],
       activityStatus:[
         {
           type:1,
           label:'新建'
         },
         {
           type:2,
           label:'已发布'
         },
         {
           type:3,
           label:'已中止'
         },
         {
           type:4,
           label:'已结束'
         }
       ],
       isAdvancedQuery:false,//高级查询开关
       //活动列表table
       activityList_table:[],
     
      //控制tab菜单显示
      istabmenu:false,
     }
   },
   created () { 
    sessionStorage.setItem('activityId','');
    this.userInfo = this.$store.getters.userInfo || {};
    this.getList()
    this.carModelListAsync()
   },
   methods:{
     activityTypeSelectFun(e){
      //  activityTypeSelectatv
      //  this.activityTypeSelect
      if (!e) return
      this.activityTypeSelectatv=[]
      this.activityTypeSelect.forEach(v=>{
        if ( v.label==e) {
          this.activityTypeSelectatv.push(v)
        }
        if (e=='全部') {
          this.activityTypeSelectatv.push(v)
        }
      })
     },

     remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.carModelList = this.carModelData.filter(item => {
              if (item.value.indexOf(query)>-1) {
                return item
              }
            });
          }, 200);
        } else {
          this.carModelList = this.carModelData;
        }
      },
    handleSizeChange(val) {
       
      this.pageL.pageSize = val
      this.getList();
    },
    handleCurrentChange(val) {
     
      this.pageL.pageNum = val
      this.getList();
      
    },
    submit_search() {
      this.pageL.pageNum = 1;
      this.getList();
    },
    reset_search(form_activityClear) { 
      this.$refs.form_activityClear.resetFields();
      this.getList();
    },
    handleSelectionChange(val){
      console.log(val)
      this.check_table = val;
    },
    dateFormat:function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
          return "";
      }
      return parseTime(date)
    },
    timeForat(row){
      let date=row.createTime
      return date.split('.')[0]
    },
    statusFormat(row){
        let status = row.activityStatus;
        switch (status) {
          case '1':
            status = '新建'
            break
          case '2':
            status = "已发布"
            break
          case '3':
            status = '已中止'
            break
          case '4':
            status = "已结束"
            break
          case '5':
            status = '已删除'
            break
        }
        return status
    },
   async carModelListAsync(data) {
     let res=await getSelectCarModel({ modelName: data })
     if(res.code==0){
       this.carModelData = res.data.map((item) => {
          return {
            value:item.modelName,
            id: item.modelId,
          };
        });
        this.carModelList=this.carModelData
     }
    },
    getList(){   //列表
      let modelNamesstr=''
      for (let i = 0; i < this.form_activityClear.modelNames.length; i++) {
        modelNamesstr+=this.form_activityClear.modelNames[i]+','  
      }
      modelNamesstr = modelNamesstr.substring(0, modelNamesstr.lastIndexOf(','));
      let data={
        ...this.pageL,
        activityDivision:this.form_activityClear.activityDivision=='全部'? '' : this.form_activityClear.activityDivision,
        activityType:this.form_activityClear.activityType[1],
        activityName:this.form_activityClear.activityName,
        activityFrom:this.form_activityClear.activityFrom=='全部'? '' : this.form_activityClear.activityFrom,
        modelNames:modelNamesstr,
        activityStatus:this.form_activityClear.activityStatus,
        activityId:this.form_activityClear.activityId,
        startTimeStart:this.form_activityClear.startTime[0],
        startTimeEnd:this.form_activityClear.startTime[1],
        endTimeStart:this.form_activityClear.endTime[0],
        endTimeEnd:this.form_activityClear.endTime[1],
        createTimeStart:this.form_activityClear.creatTime[0],
        createTimeEnd:this.form_activityClear.creatTime[1]
      }
      // console.log(data,'datatdat');
      marketingListPage(data).then(res=>{
       if(res.code == 0){   
         this.activityList_table=res.data.list;
          this.activityList_table=this.activityList_table.map(v=>{
            if (v.startTime) {
              v.startTime=v.startTime.split(' ')[0]
            }
            if (v.endTime) {
              v.endTime=v.endTime.split(' ')[0]
            }
            if (v.createTime) {
              v.createTime=v.createTime.split(' ')[0]
            }
            return v
          })
         this.page.total=res.data.total;
       }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
       }
      })
    },
    //高级查询
    advancedQueryFun(){
    this.isAdvancedQuery=!this.isAdvancedQuery
    },
    //新建活动 
    newactivityFun(){
      this.$router.push({name:'newactivity'})
    },
    //修改
    modifyFun(scope,scopetit){
      let status=''
       let activityId=scope.row.activityId;
      switch (scopetit) {
        case 'xiugai':
            sessionStorage.setItem('activityId',activityId)
            this.$router.push({name:'newactivity',params:{activityStatus:scope.row.activityStatus}})
          break;
        case 'fabu':
          let data={
            userId:this.userInfo.userId,
            activityId:activityId,
            activityStatus:2
          }
            this.$confirm('此操作将发布该活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                updateActivity(data).then(res=>{
                if(res.code == 0){
                    this.$message({
                      message: '发布成功',
                      type: 'success'
                    });
                  this.$router.go(0)
                }else{
                    this.$notify({
                      message: res.errMsg,
                      type: "error",
                    });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消发布'
              });  
              return       
            });

          break;
        case 'baogao':
          this.$router.push({name:'activityReport',params: {}})
          break;
      }
    },
    //拓展
    istabmenuFun(scope){
        if (this.istabmenu==scope.row.id) {
            this.istabmenu=null
        }else{
            this.istabmenu=scope.row.id
        }
    },
    //查看活动详情
    activityDetailFun(scope){
      // console.log(scope,"点击的数据信息");
      let activityId=scope.row.activityId;
      sessionStorage.setItem('activityId',activityId)

      this.$router.push({name:'activityDetail',params: {activityName:scope.row.activityName,activityStatus:scope.row.activityStatus}})
    },
    copy() {
      console.log(1);
      var clipboard = new ClipboardJS('.tag-read')
        clipboard.on('success', e => {
          console.log('复制成功')
          // 释放内存
          clipboard.destroy()
        })
        clipboard.on('error', e => {
          // 不支持复制
          console.log('该浏览器不支持自动复制')
          // 释放内存
          clipboard.destroy()
        })
      },
    handleCommand(command,scope,noyes){  //操作
      let activityId=scope.row.activityId;
      let status=command;
      let statusText=""
      let data={}
       switch (status) {
          case 'a':
            // clipboardtext
            this.$message({
              type: 'success',
              message:'成功复制活动链接'
            });
            break
          case 'b':
            // downloadCode
            // this.$message({
            //   message: '暂无活动二维码',
            //   type: 'warning'
            // });
            // console.log(scope.row.activityId);
            this.downloadCodeFun(activityId)
            break
          case 'break':
            // console.log(command,scope.row.activityStatus,"scopescopescope"); 
            let tosts=scope.row.activityStatus=="2"?'此操作将中止活动, 是否继续?':'此操作将启用活动, 是否继续?'
            this.$confirm(tosts, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: scope.row.activityStatus=="2"?'中止活动成功':'启用活动成功'
              });
            statusText="已中止"
            data={
              userId:this.userInfo.userId,
              activityId:activityId,
              activityStatus:scope.row.activityStatus=="2"?3:2 //中止 启用
            }

            this.getupdateActivity(data,scope,statusText)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              }); 
                 return       
            });

            break
          case 'end':   //结束

            this.$confirm('此操作将结束活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '结束活动成功!'
              });
              status = 4
              statusText="已结束"
              data={
                userId:this.userInfo.userId,
                activityId:activityId,
                activityStatus:4
              }
              this.getupdateActivity(data,scope,statusText)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              }); 
                 return       
            });
            break
          case 'delete':
             this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
               status = 5  //删除
               statusText="已删除"
                data={
                  userId:this.userInfo.userId,
                  activityId:activityId,
                  activityStatus:5
                }
                this.getupdateActivity(data,scope,statusText)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });  
              return       
            });
           
            break
        }  
    },
    //下载二维码
   async downloadCodeFun(activityId){
      let scene = `1,0,${this.userInfo.userId},${activityId}`
       let res=await downloadCode({
					url:'pages/main/sharePage/index',
          userId:this.userInfo.userId,
					param: scene,
				})

        //下载图片 转换为base64
        var src='data:image/jpg;base64,'+ btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        this.srcImg = src; //图片回显
        var link = document.createElement('a');
        link.href = src;
        link.download = activityId+"Code.jpg";
        link.click();
       
    },
    blobToDataURL(blob, callback) {
				let file = new FileReader();
				file.onload = function(e) {
				  callback(e.target.result);
				}
				file.readAsDataURL(blob);
		},
    getupdateActivity(data,scope,statusText){
      updateActivity(data).then(res=>{
        if(res.code == 0){
        // this.activityList_table[scope.$index]=res.data;
        this.activityList_table[scope.$index].activityStatus=statusText
        this.$router.go(0)
        }else{
            this.$notify({
              message: res.errMsg,
              type: "error",
            });
        }
      })
    }
   }
 }
</script>

<style scoped>
  .table{
    border:1px solid #F5F6FA;
  }
  /deep/ .el-input__inner{
    height: 32px;
    line-height:32px;
  }
  /deep/ .el-table th{
    background: #F5F6FA 
  }
  /deep/ .el-table::before{
    height: 0;
  }
  /deep/ .el-dialog__footer{
    padding: 0
  }
  /deep/ .visible .el-form-item{
    display: flex;
    justify-content: center;
  }
  /deep/ .el-table::before{
    height: 0;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #43425D;
  }
  /deep/ .el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .el-pager li{
    background: none;
    border: 1px solid #E7E9F0;
    border-radius: 3px;
  }
  /deep/ .el-date-editor--datetimerange.el-input__inner{
      width: 240px !important;
  }
  .dialog-footer{
    background: #F5F6FA;
    text-align: center;
    display: flex;
    justify-content: space-around;
  }
  .dialog-footer p{
    flex: 1
  }
  .table{
    height:500px;
    overflow-y: auto;
    margin-bottom: 15px
  }
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-search{
    border-bottom:1px solid #E9E9F0;
    margin-top: 22px;
    position: relative;
  }
  .atg-header .title{
    font-weight: 600
  }
  .search-btn{
    background: #43425D;
    border: 0
  }
  .reset-btn{
    background:#E7E9F0;
    border: 0
  }
  .digsele{
    position: absolute;
    width: 100%;
    background: white;
    top: 43px;     
    border: 1px solid #3B86FF;
    box-shadow: 0px 3px 6px rgba(191, 210, 241, 0.49);
    z-index: 99
  }
  .digsele::after{
      content: '';
      display: block;
      position: absolute;
      top: -6px;
      left: 966px;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #fff;
  }
  .digsele::before{
    content: '';
    display: block;
    position: absolute;
    top: -7px;
    left: 966px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #3B86FF;
  }
  .istabmenusty{
    position: absolute;
    height: 204px;
    display: flex;
    flex-direction: column;
    z-index: 9999;
    left: 119px;
    background: #FFFFFF;
    border: 1px solid #F5F6FA;
    box-shadow: 0px 3px 6px rgba(191, 210, 241, 0.49);
  }
</style>