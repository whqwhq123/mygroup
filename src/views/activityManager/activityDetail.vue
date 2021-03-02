<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">{{activityName}}</span>
      <!-- titleTypeok 已发布  titleTypego 进行中  titleTypeetc 待发布-->
      <span class="titleTypeok">{{activityStatus}}</span>
    </el-header>
    <!--  -->
    <el-row class="basictit" type="flex" justify="space-between">
        <el-col :span="2">基本信息</el-col>
        <el-col :span="2" style="text-align: right;"><el-button type="text" @click="isdetail=!isdetail" style="color:#008DF8;cursor: pointer;">展开<i :class="isdetail?'el-icon-arrow-down':'el-icon-arrow-up'"></i></el-button></el-col>
    </el-row>
    <el-row v-if="isdetail" class="mainBox">
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动名称</el-col>
           <el-col class="fontsty2">{{activityData.activityName}}</el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动时间</el-col>
           <el-col class="fontsty2">{{activityData.startTime}}至{{activityData.endTime}}</el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动详情头图</el-col>
           <el-col class="fontsty2">
               <img v-if="typeof activityData.detailImg1 == 'string'" :src="activityData.detailImg1" alt="" class="detimg1">
               <img v-if="typeof activityData.detailImg2 == 'string'" :src="activityData.detailImg2" alt="" class="detimg1">
               <img v-if="typeof activityData.detailImg3 == 'string'" :src="activityData.detailImg3" alt="" class="detimg1">
           </el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动运营位图片</el-col>
           <el-col class="fontsty2">
               <img v-if="typeof activityData.operationImg1 == 'string'" :src="activityData.operationImg1" alt="" class="detimg1">
               <img v-if="typeof activityData.operationImg2 == 'string'" :src="activityData.operationImg2" alt="" class="detimg1">
               <img v-if="typeof activityData.operationImg3 == 'string'" :src="activityData.operationImg3" alt="" class="detimg1">
           </el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">主推车系</el-col>
           <el-col style="height: 30px;line-height: 30px;">
             
                <el-col :span="4" class="fontsty3" v-for="(modelNamesItem,modelNamesindex) in activityData.modelNamesList" :key="modelNamesindex">{{modelNamesItem}}</el-col>
           </el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">执行渠道</el-col>
           <el-col class="fontsty2">{{activityData.firstChannelId}} {{activityData.secondChannelId}}</el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动区域</el-col>
           <el-col class="fontsty2">{{activityData.activityProvince || activityData.activityCity?activityData.activityProvince+'/'+activityData.activityCity+'/'+activityData.activityArea:''}} &nbsp;&nbsp; {{activityData.areaDetail}}</el-col>
       </el-row>
        <el-row type="flex" class="detailsty" style="align-items: normal;">
           <el-col :span="2" class="fontsty1" >活动内容</el-col>
           <!-- v-html="rawHtml" -->
           <el-col class="fontsty2 fontstyhtml" v-html="activityData.activityContent"></el-col>
       </el-row>
        <el-row type="flex" class="detailsty" style="align-items: normal;">
           <el-col :span="2" class="fontsty1" style="line-height:24px">活动要求</el-col>
           <el-col class="fontsty2">{{activityData.activityRequire}}</el-col>
       </el-row>
    </el-row>
    <!-- tab切换 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-left: 40px;">
        <el-tab-pane label="属性信息" name="first">
            <el-row class="tabsty">
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="5"><span class="yuansty"></span>活动大类<span class="tabstyTitp">{{activityData.activityDivision}}</span></el-col>           
                        <el-col class="tabstyTit" :span="5"><span class="yuansty"></span>创建人<span class="tabstyTitp">{{activityData.createrren}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="5"><span class="yuansty"></span>活动类型<span class="tabstyTitp">{{activityData.activityType}}</span></el-col>           
                        <el-col class="tabstyTit" :span="5"><span class="yuansty"></span>创建时间<span class="tabstyTitp">{{activityData.createTime}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="5"><span class="yuansty"></span>活动来源<span class="tabstyTitp">{{activityData.activityFrom}}</span></el-col>           
                        <el-col class="tabstyTit" :span="5"><span class="yuansty"></span>最后修改人<span class="tabstyTitp">{{activityData.ownerren}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="5" ><span class="yuansty"></span>发起部门<span class="tabstyTitp" >{{activityData.ownerDeptIdName}}</span></el-col>           
                        <el-col class="tabstyTit" :span="5" ><span class="yuansty"></span>最后修改时间<span class="tabstyTitp">{{activityData.updateTime}}</span></el-col>           
                    </el-row>
            </el-row>
        </el-tab-pane>

        <el-tab-pane label="活动目标" name="second">
            <el-row style="padding-left: 30px;">活动目标</el-row>
            <el-row class="tabsty">
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">邀约量</span><span class="tabstyTitnum">{{activityData.activityInviteCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">集客量</span><span class="tabstyTitnum">{{activityData.activityGatherCustomerCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">新增客户量</span><span class="tabstyTitnum">{{activityData.activityNewAddCustomerCount}}</span></el-col>                    
                </el-row>
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">新增线索量</span><span class="tabstyTitnum">{{activityData.activityNewAddClueCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">加热线索</span><span class="tabstyTitnum">{{activityData.activityExistClueCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">订交量</span><span class="tabstyTitnum">{{activityData.activityOrderDealCount}}</span></el-col>                    
                </el-row>
            </el-row>
            <el-row style="padding-left: 30px;">活动效果</el-row>
            <el-row class="tabsty">
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuanstya"></span><span class="tabstyCon">邀约量</span><span class="tabstyTitnum">{{activityData.activityInviteCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuanstya"></span><span class="tabstyCon">集客量</span><span class="tabstyTitnum">{{activityData.activityGatherCustomerCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuanstya"></span><span class="tabstyCon">新增客户</span><span class="tabstyTitnum">{{activityData.activityNewAddCustomerCount}}</span></el-col>                    
                </el-row>
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuanstya"></span><span class="tabstyCon">新增线索量</span><span class="tabstyTitnum">{{activityData.activityNewAddClueCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuanstya"></span><span class="tabstyCon">加热线索</span><span class="tabstyTitnum">{{activityData.activityExistClueCount}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuanstya"></span><span class="tabstyCon">订交量</span><span class="tabstyTitnum">{{activityData.activityOrderDealCount}}</span></el-col>                    
                </el-row>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="报名参加" name="third">
            <el-row style="padding-left: 30px;">报名要求</el-row>
            <el-row class="tabsty">
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">活动目标人数</span><span class="tabstyTitp">{{activityData.targetCustomerCount}}</span></el-col>           
                </el-row>
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">报名截止时间</span><span class="tabstyTitp">{{activityData.signUpEndTime}}</span></el-col>           
                </el-row>
            </el-row>
            <el-row style="padding-left: 30px;">报名记录</el-row>
                <el-row class="tabsty">
                <el-row class="tabstyrow">
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">已报名/组</span><span class="tabstyTitp">{{totalList.totalSign }}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">参与总人数</span><span class="tabstyTitp">{{totalList.totalNum }}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">已签到/组</span><span class="tabstyTitp">{{totalList.totalSignIn }}</span></el-col>                    
                </el-row>
                <el-row class="tabstyrow">
                  <el-form inline class="atg-search"  :model="form_activityClear" ref="form_activityClear">
                    <el-form-item  prop="applicant" label="报名人">
                      <el-input size="small" placeholder="请填写报名人" v-model="form_activityClear.applicant"></el-input>
                    </el-form-item>
                    <el-form-item  prop="participants" label="参加人">
                      <el-input size="small" placeholder="请填写参加人" v-model="form_activityClear.participants"></el-input>
                    </el-form-item>
                    <el-form-item  prop="participantsPhone" label="参加人手机号">
                      <el-input size="small" placeholder="参加人手机号" maxlength="11" v-model="form_activityClear.participantsPhone"></el-input>
                    </el-form-item>
                    <el-form-item  prop="activityFrom" label="报告状态">
                     <el-select v-model="form_activityClear.activityFrom" clearable style="width: 240px;" placeholder="请选择报告状态">
                        <el-option
                            v-for="item in activityFrom"
                            :key="item.type"
                            :label="item.label"
                            :value="item.label">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="search-btn" style="color: #FFFFFF;background: #43425D;"  size="small" @click="queryget_user_list()">查询</el-button>
                        <el-button class="reset-btn"   size="small" @click="download_excel(form_activityClear)">导出</el-button>
                
                    </el-form-item>
                  </el-form>
                </el-row>
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                    header-align='center' align="center"
                        prop="nickName"
                        label="报名人"
                        >
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpTime"
                        width="100"
                        label="报名时间"
                        >
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpName"
                        label="参加人">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpPhone"
                        width="120"
                        label="参加人手机号">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpMale"
                        label="男/人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpFemale"
                        label="女/人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpChild"
                        label="小孩数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="subzhong"
                        label="总人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpRemark"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signUpStatus"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="signInTime"
                        label="签到时间">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="originalId"
                        label="原始线索id">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="uniqueId"
                        label="唯一线索id">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="customerId"
                        label="客户id">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="销售顾问">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="userName"
                        label="操作">

                      <template slot-scope="scope" >
                        <el-button type="text" @click="getSignInFun(scope.row.id)" :style="scope.row.signUpStatus=='已签到' || scope.row.signUpStatus=='已领取' || scope.row.signUpStatus=='拒绝报名' ?'color:rgb(137, 137, 137);cursor: pointer;':'color:#008DF8;cursor: pointer;'" :disabled="scope.row.signUpStatus=='已签到' || scope.row.signUpStatus=='已领取' || scope.row.signUpStatus=='拒绝报名'?true:false">{{activityData.activityType=='见面礼' ?'已领取' : '已签到'}}</el-button>
                      </template>
                    </el-table-column>
                </el-table>
                <pagination v-if="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
                    @pagination="get_user_list" />
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="分享设置" name="fourth">
          <el-row class="sharesty">
            <el-row style="margin-bottom: 15px;">{{activityData.shareTitle}}</el-row>
            <el-row >
                <el-col :span="14" class="sharestytext">
                    {{activityData.shareDesc}}
                </el-col>                    
                <el-col :span="10">
                    <img v-if="activityData.shareImg1==''?false:true" :src="activityData.shareImg1" alt="" class="detimg1" style="width: 123px;height: 123px;margin-left: 20px;">
                </el-col>                    
            </el-row>

          </el-row>

        </el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>


import {getActivityInfo,getActivitySignUps,getSignIn,exportActivitySignUps,clueList,queryUserAllInfo,queryDeptById} from "api/index.js";
  import {
    operateFile,
    get_role_function
  } from '@/utils/index';
import Pagination from "@/components/Pagination";
import qs from 'qs'
 export default {
   data(){
     return{
      isdetail:true,//控制详情开关
      activityId:'',
      activityData:{},
      activeName: 'first',//tab 选中标签卡片
      form_activityClear:{
          applicant:'',
          participants:'',
          participantsPhone:'',
          enrollState:'',
       },
      activityFrom:[
         {
           type:'all',
           label:'全部'
         },
         {
           type:'yesbaoming',
           label:'已报名'
         },
         {
           type:'nobaoming',
           label:'已拒绝报名'
         },
          {
           type:'yiqiandao',
           label:'已签到'
         }
       ],
       totalList:{},
       clueListData:[],
      tableData: [],
        //分页
        listQuery: {
          nameOrCode: "",
          userPhone: "",
          roleId: "",
          pageNum: 1,
          pageSize: 10
        },
        total: 2,
        activityName:'',
        activityStatus:'',
      }
   },
   created () {
     this.activityId=sessionStorage.getItem('activityId');
     this.activityName=this.$route.params.activityName
     console.log(this.$route.params,"路由数据",this.$store.state);
     switch (this.$route.params.activityStatus) {
          case '1':
            this.activityStatus = '新建'
            break
          case '2':
            this.activityStatus = "已发布"
            break
          case '3':
            this.activityStatus = '已中止'
            break
          case '4':
            this.activityStatus = "已结束"
            break
          case '5':
            this.activityStatus = '已删除'
            break
     }

     
     this.getActivityInfo();
     this.get_user_list()


   },
   components: {Pagination},
   methods:{

     //线索数据
     async clueList(){
      //  clueListData
        let res = await clueList(0)
        if (res.code==0) {
          this.clueListData=res.data.channels
        }
     },
     //详情数据
     async getActivityInfo(){

       await this.clueList()

        getActivityInfo({activityId:this.activityId}).then(res=>{
         // console.log(res)
          if(res.code==0){
            this.activityData=res.data;
            this.activityData.startTime=res.data.startTime ? res.data.startTime.split(' ')[0] : ''
            this.activityData.endTime=res.data.endTime ? res.data.endTime.split(' ')[0] : ''
            this.activityData.createTime=res.data.createTime ? res.data.createTime.split(' ')[0] : ''
            this.activityData.signUpEndTime=res.data.signUpEndTime ? this.xTiem(res.data.signUpEndTime) : ''
            this.activityData.updateTime=res.data.updateTime?res.data.updateTime.split('.')[0] : ''
            console.log(res.data.updateTime,"res.data.updateTimeres.data.updateTimeres.data.updateTime  ");
            // 主推车系 modelNames
            //  this.activityData.modelNamesList=
             if (this.activityData.modelNames) {
               this.activityData.modelNamesList=this.activityData.modelNames.split(',')
             }
            if (this.clueListData) {
              this.clueListData.forEach(v=>{
                if (v.channelId==res.data.firstChannelId) {

                    this.activityData.firstChannelId=v.channelName
                }
                if (v.children) {
                  for (let i = 0; i < v.children.length; i++) {
                    
                    if (v.children[i].channelId==res.data.secondChannelId) {
                    this.activityData.secondChannelId=v.channelName
                    }
                    
                  }
                }
        
              })
           
            }
              
            this.queryUserAllInfoFun(this.activityData.createrId)
            this.queryDeptByIdFun(this.activityData.ownerDeptId)
           
           
           // console.log(this.activityData,this.clueListData,'----------------活动详情数据');
          }else{
            this.$notify.error({
              title:'错误',
              message:err.errMsg
            })
          }

        })
      },
      //queryDeptById 发起部门
      async queryDeptByIdFun(data){
        let res=await queryDeptById({deptId:data})
        console.log(res);
        console.log(1);
        if (res.code==0) {
          this.activityData.ownerDeptIdName=res.data.deptName
          console.log(res.data,"发起部门");
                
         this.$forceUpdate()
       }
      },
      //导出列表
      download_excel() {

        // activityId: this.activityId
        exportActivitySignUps({activityId: this.activityId}).then(res => {
          console.log(res);
          operateFile(res, '参加报名人')
          if (res.code==0) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
          }
        }).catch((req) => {
          this.$notify.error({
            title: '错误',
            message: req.errMsg
          })
        })
      },
      //格式化日期
      rTime(date) {
            var json_date = new Date(date).toJSON();
            return new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').slice(0,-3) 
      },
      xTiem(data){
        let time1=data.split(' ')
        let time2=time1[1].split(':')
       return time1[0] +' ' + time2[0] +':'+time2[1]
      },
      //签到
      async getSignInFun(row){
        let res=await getSignIn({id:row})
        this.get_user_list()
      },
      //查询
      queryget_user_list(){
      var status=''
        switch (this.form_activityClear.activityFrom) {
          case '全部':
            status=''
            break;
          case '已报名':
            status='1'
            break;
          case '已拒绝报名':
            status='2'
            break;
          case '已签到':
            status='3'
            break;
        }
        let data={
          nickName:this.form_activityClear.applicant,
          signUpName:this.form_activityClear.participants,
          signUpPhone:this.form_activityClear.participantsPhone,
          signUpStatus:status,
        }
        console.log(this.form_activityClear);
        this.get_user_list(data)
      },
       //表格数据请求
      async get_user_list(data) {
        // signUpStatus 参与状态 1-已报名 2-拒绝报名 3-已签到
        let obj = {
          ...this.listQuery,
          activityId: this.activityId,
          // activityId: "ACT000016",
          nickName:data?data.signUpName : '',
          signUpName:data?data.signUpName : '',
          signUpPhone:data?data.signUpPhone : '',
          signUpStatus:data?data.signUpStatus : '',
        }
        let res=await getActivitySignUps(obj)

        if (res.code==0) {
          this.tableData=res.data.pageInfo.list

          this.totalList={
            totalNum: res.data.totalNum,
            totalSign: res.data.totalSign,
            totalSignIn: res.data.totalSignIn
          }
          console.log(this.totalList,"报名记录统计数");


          this.tableData=this.tableData.map(v=>{

            if (v.signUpTime) {
              console.log(v.signUpTime,"v.signUpTimev.signUpTime")
              // v.signUpTime=v.signUpTime.split('T')[0] + " " +v.signUpTime.split('T')[1].split('.')[0] 
              v.signUpTime=v.signUpTime.split('.')[0]
            }
            if (v.signInTime) {
              // v.signInTime=v.signInTime.split('T')[0] + " " +v.signInTime.split('T')[1].split('.')[0] 
              v.signInTime=v.signInTime.split('.')[0]
            }
            v.subzhong=v.signUpMale+v.signUpFemale+v.signUpChild
            switch (v.signUpStatus) {
             
              case '1':
                v.signUpStatus='已报名'
                break;
            
              case '2':
                v.signUpStatus='拒绝报名'
                break;
            
              case '3':
                v.activityType=='见面礼'? v.signUpStatus='已领取': v.signUpStatus='已签到'
               
                break;
            
            }

            return v
          })

          // console.log(this.tableData,"this.tableDatathis.tableData");
           this.total = res.data.pageInfo.total
        }
      },
      async queryUserAllInfoFun(data){
       let res=await queryUserAllInfo({userId:data})
       if (res.code==0) {
        //  console.log(res.data,this.activityData,"----------ownerren--------创建人数据");
        
         if (this.activityData.owner==this.activityData.createrId) {
            this.activityData.createrren=res.data.userName
            this.activityData.ownerren=res.data.userName
         }else{
           this.activityData.createrren=res.data.userName
           this.queryUserAllInfoFun1(this.activityData.owner)
          
         }      
         this.$forceUpdate()
       }
     },
    async queryUserAllInfoFun1(data){
       let res=await queryUserAllInfo({userId:data})
       if (res.code==0) {

         this.activityData.ownerren=res.data.userName      
         this.$forceUpdate()
       }
     },



   }
 }
</script>

<style lang="scss" scoped>
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
      width: 280px !important;
  }
  /deep/ .el-upload--picture-card{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 94px;
    line-height: 94px;
    vertical-align: top;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 94px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
/deep/ .el-textarea__inner { resize: none; }
  .inputwidth{
      width: 280px;
  }
  /deep/ .el-tabs--card > .el-tabs__header{
      border-bottom: none;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-bottom: 1px solid #E4E7ED;
  }
  .basictit{
    height: 56px;
    line-height: 56px;
    color: #4D4F5C;
    font-size: 16px;
    font-weight: bold;
    padding-left: 50px;
    padding-right: 50px;
    margin-bottom: 30px;
    border-bottom: 1px solid #D7DAE2;
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
  .atg-header .titleTypeok{
    color: #00C456;
    font-weight: 400;
    font-size: 16px;
    margin-left: 20px;
  }
  .atg-header .titleTypego{
    color: #c4c100;
    font-weight: 400;
    font-size: 16px;
    margin-left: 20px;
  }
  .atg-header .titleTypeetc{
    color: #c40021;
    font-weight: 400;
    font-size: 16px;
    margin-left: 20px;
  }
  .digsele{
    position: absolute;
    width: 100%;
    height: 213px;
    top: 43px;     
    border: 1px solid #3B86FF;
    box-shadow: 0px 3px 6px rgba(191, 210, 241, 0.49);
  }
.mainBox{
      padding: 0 130px;

  }
.fontsty1{    
    color: #4D4F5C;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
}
.fontsty2{    
    font-weight: 400;
    color: #4D4F5C;
    font-weight: 500;
    font-size: 14px;
    margin-left: 20px;
    line-height: 24px;
}

.fontsty3{  
    background: #F0F0F7;
    text-align: center;
    border-radius: 4px;
    font-weight: 400;
    color: #4D4F5C;
    font-weight: 500;
    font-size: 14px;
    margin-left: 20px;
}
.detailsty{
    min-height: 56px;
    line-height: 56px;
    display: flex;
    align-items: center;
}
.detimg1{
    width: 146px;
    height: 94px;
    background: rgba(0, 0, 0, 0);
    margin-right: 20px;
}
.detimg2{
    width: 146px;
    height: 46px;   
    background: rgba(0, 0, 0, 0);
    margin-right: 20px;
}
.tabsty{

}
.tabstyrow{
    margin-bottom: 20px;
}
.tabstyTit{
    font-size: 14px;
    font-weight: 400;
    color: #A5A4BF;
    position: relative;
    padding-right: 15px;

}
.yuansty{
    position: absolute;
    width: 6px;
    height: 6px;
    background: #A5A4BF;
    opacity: 1;
    border-radius: 7px;
    left: -14px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.yuanstya{
    position: absolute;
    width: 6px;
    height: 6px;
    background: #3B86FF;
    opacity: 1;
    border-radius: 7px;
    left: -14px;
    top: 0;
    bottom: 0;
    margin: auto;
}
.tabstyTitp{
    margin-left: 20px;
    color: #43425D;
}
.tabstyTitnum{
    color: #4D4F5C;
    font-size: 18px;
    font-weight: 500;
}
.tabstyCon{
    width: 90px;
    display: inline-block;
}
.sharesty{
    width: 427px;
    height: 188px;
    background: #FFFFFF;
    border: 1px solid #D7DAE2;
    opacity: 1;
    border-radius: 7px;
    position: relative;
    padding: 20px 0 0 20px;
}
.sharestytext{
    height: 128px;
    color: #4D4F5C;
    opacity: 0.7;
    font-size: 14px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    line-height: 25px;
}

</style>
<style>
.fontstyhtml{

}
.fontstyhtml>p{
  
}
.fontstyhtml>p>img{
  width: 80px  !important;
  height: 80px;
  float: left;
}
</style>