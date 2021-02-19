<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">{{modelNames}}</span>
      <!-- titleTypeok 已发布  titleTypego 进行中  titleTypeetc 待发布-->
      <span class="titleTypeok">已发布</span>
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
           <el-col class="fontsty2">{{activityData.startTime}}---{{activityData.endTime}}</el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动详情头图</el-col>
           <el-col class="fontsty2">
               <img v-if="activityData.detailImg1==''?false:true" :src="activityData.detailImg1" alt="" class="detimg1">
               <img v-if="activityData.detailImg2==''?false:true"  :src="activityData.detailImg2" alt="" class="detimg1">
               <img v-if="activityData.detailImg3==''?false:true" :src="activityData.detailImg3" alt="" class="detimg1">
           </el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动运营位图片</el-col>
           <el-col class="fontsty2">
               <img v-if="activityData.operationImg1==''?false:true" :src="activityData.operationImg1" alt="" class="detimg1">
               <img v-if="activityData.operationImg2==''?false:true" :src="activityData.operationImg2" alt="" class="detimg1">
               <img v-if="activityData.operationImg3==''?false:true" :src="activityData.operationImg3" alt="" class="detimg1">
           </el-col>
       </el-row>
       <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">主推车系</el-col>
           <el-col style="height: 30px;line-height: 30px;">
                <el-col :span="4" class="fontsty3">{{activityData.modelNames}}</el-col>
           </el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">执行渠道</el-col>
           <el-col class="fontsty2">{{activityData.firstChannelId}} {{activityData.secondChannelId}}</el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动区域</el-col>
           <el-col class="fontsty2">{{activityData.activityProvince}}{{activityData.activityCity}}{{activityData.activityArea}}{{activityData.areaDetail}}</el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动内容</el-col>
           <!-- v-html="rawHtml" -->
           <el-col class="fontsty2" v-html="activityData.activityContent"></el-col>
       </el-row>
        <el-row type="flex" class="detailsty">
           <el-col :span="2" class="fontsty1">活动要求</el-col>
           <el-col class="fontsty2">{{activityData.activityRequire}}</el-col>
       </el-row>
    </el-row>
    <!-- tab切换 -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-left: 40px;">
        <el-tab-pane label="属性信息" name="first">
            <el-row class="tabsty">
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span>活动大类<span class="tabstyTitp">{{activityData.activityDivision}}</span></el-col>           
                        <el-col class="tabstyTit" :span="4"><span class="yuansty"></span>创建人<span class="tabstyTitp">{{activityData.createrId}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span>活动类型<span class="tabstyTitp">{{activityData.activityType}}</span></el-col>           
                        <el-col class="tabstyTit" :span="4"><span class="yuansty"></span>创建时间<span class="tabstyTitp">{{activityData.createTime}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span>活动来源<span class="tabstyTitp">{{activityData.activityFrom}}</span></el-col>           
                        <el-col class="tabstyTit" :span="4"><span class="yuansty"></span>最后修改人<span class="tabstyTitp">{{activityData.owner}}</span></el-col>           
                    </el-row>
                    <el-row class="tabstyrow">
                        <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span>发起部门<span class="tabstyTitp">{{activityData.ownerDeptId}}</span></el-col>           
                        <el-col class="tabstyTit" :span="4"><span class="yuansty"></span>最后修改时间<span class="tabstyTitp">{{activityData.signUpEndTime}}</span></el-col>           
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
                    <el-col class="tabstyTit" :offset="2" :span="4"><span class="yuansty"></span><span class="tabstyCon">已报名/组</span><span class="tabstyTitp">{{activityData.createTime}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">参与总人数</span><span class="tabstyTitp">{{activityData.createTime}}</span></el-col>           
                    <el-col class="tabstyTit" :span="4"><span class="yuansty"></span><span class="tabstyCon">已签到/组</span><span class="tabstyTitp">{{activityData.createTime}}</span></el-col>                    
                </el-row>
                <el-table
                :data="tableData"
                style="width: 100%">
                    <el-table-column
                    header-align='center' align="center"
                        prop="date"
                        label="报名人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="name"
                        label="报名时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="参加人">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="参加人手机号">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="男/人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="女/人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="小孩数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="总人数">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="备注">
                    </el-table-column>
                    <el-table-column
                    header-align='center' align="center"
                        prop="address"
                        label="状态">
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


import {getActivityInfo} from "api/index.js";

import Pagination from "@/components/Pagination";
import qs from 'qs'
 export default {
   data(){
     return{
      isdetail:true,//控制详情开关
      activityId:'',
      activityData:{},
      activeName: 'first',//tab 选中标签卡片
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
        }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
        }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
        }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
        }],
        //分页
        listQuery: {
          nameOrCode: "",
          userPhone: "",
          roleId: "",
          pageNum: 1,
          pageSize: 10
        },
        total: 2,
        modelNames:'',
      }
   },
   created () {
     this.activityId=sessionStorage.getItem('activityId');
     this.modelNames=this.$route.params.modelNames
     this.getActivityInfo();
   },
   components: {Pagination},
   methods:{
      getActivityInfo(){
        getActivityInfo({activityId:this.activityId}).then(res=>{
         // console.log(res)
          if(res.code==0){
            this.activityData=res.data;
            this.activityData.startTime=res.data.startTime.split('T')[0]
            this.activityData.endTime=res.data.endTime.split('T')[0]
            this.activityData.createTime=res.data.createTime.split('T')[0]
            this.activityData.signUpEndTime=res.data.signUpEndTime.split('T')[0]
            
          }else{
            this.$notify.error({
              title:'错误',
              message:err.errMsg
            })
          }

        })
      },
       //表格数据请求
      get_user_list() {
        let obj = {
          ...this.listQuery,
          deptId: this.deptId || '',
          curUserId:this.userInfo.userId,
          roleId: this.listQuery['roleId'][1]
        }

        if (!obj.deptId) return

        getUserList(obj).then((res) => {
          if (res.code == 0) {
            this.listTable = res.data.list
            this.total = res.data.total
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })
          }
        })
      },
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