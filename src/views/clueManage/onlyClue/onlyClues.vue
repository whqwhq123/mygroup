<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">唯一线索清洗列表</span>
    </el-header>
    <el-form inline class="atg-search" :model="form_clueClear" ref="form_clueClear">
      <el-form-item  prop="uniqueId">
        <el-input size="small" placeholder="请输入唯一线索ID" v-model="form_clueClear.uniqueId"></el-input>
      </el-form-item>
      <el-form-item  prop="customerName">
        <el-select v-model="form_clueClear.clueStatus" placeholder="请选择线索状态" clearable>
          <el-option
            v-for="item in clueStatus"
            :key="item.type"
            :label="item.label"
            :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item  prop="customerName">
        <el-input size="small" placeholder="请输入客户名称" v-model="form_clueClear.customerName"></el-input>
      </el-form-item>
       <el-form-item  prop="customerId">
        <el-input size="small" placeholder="请输入客户ID" v-model="form_clueClear.customerId"></el-input>
      </el-form-item>
      <el-form-item  prop="intentCarStyle">
         <el-cascader v-model="form_clueClear.intentCarStyle" clearable ref="carType" placeholder="请选择意向车型" :options="carTypeData" :props="carTypeLabel"></el-cascader>
      </el-form-item>
      <el-form-item prop="fromChannel">
        <el-cascader placeholder="请选择来源渠道" style="height: 32px;" clearable ref="fromChannel" v-model="fromChannel" :options="ChannesList" :props="setKesLabel"></el-cascader>
      </el-form-item>
      <el-form-item  class="add-icon">
        <el-select v-model="form_clueClear.dealerId" placeholder="请选择经销商名称" clearable>
          <el-option
            v-for="item in dealerName"
            :key="item.deptName"
            :label="item.deptName"
            :value="item.deptId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="add-icon">
          <el-select v-model="form_clueClear.activityId" clearable placeholder="请选择活动">
            <el-option
              v-for="item in marketActity"
              :key="item.name"
              :label="item.activityName"
              :value="item.activityId">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item  prop="creatTime" label="创建时间：">
        <el-date-picker size="small" v-model="creatTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="distributeTime" label="派发时间：" v-if="get_role_function('200300120')">
        <el-date-picker size="small" v-model="distributeTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="assignTime" label="分配时间：" v-if="get_role_function('200300130')">
        <el-date-picker size="small" v-model="assignTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" type="info" size="small" @click="submit_search()">搜索</el-button>
        <el-button class="reset-btn" size="small" @click="reset_search(form_clueClear)">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
       <el-button type="text" style="font-size: 14px;color:#3B86FF" @click="delivering('delivery')" v-if="get_role_function('200300120')"><svg-icon icon-class="paifa" />人工派发
       </el-button>
       <el-button type="text" style="font-size: 14px;color:#3B86FF" @click="delivering('assgin')" v-if="get_role_function('200300130')"><svg-icon icon-class="fenpei" />人工分配
       </el-button>
    </div>
    <el-table :data="culeList_table" align="center" height="520"  class="table" @selection-change="handleSelectionChange" :span-method="arraySpanMethod">
      <el-table-column type="selection" align="center" width="55" :selectable="checkSelect"></el-table-column>
      <el-table-column label="唯一线索ID" align="center" prop="uniqueId" width="125"></el-table-column>
      <el-table-column label="线索状态" align="center" prop="clueStatus"></el-table-column>
      <el-table-column label="客户名称" align="center" prop="customerName"></el-table-column>
      <el-table-column label="客户ID" align="center" prop="customerId" width="125"></el-table-column>
      <el-table-column label="意向车型" align="center" prop="catBMS" width="220"></el-table-column>
      <el-table-column label="渠道来源" align="center" prop="ChannelName" width="220"></el-table-column>
      <el-table-column label="经销商" align="center" prop="dealerName" width="125"></el-table-column>
      <el-table-column label="活动名称" align="center" prop="activityName" width="125"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="派发时间" align="center" v-if="get_role_function('200300120')" prop="distributeTime" width="105px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="分配时间" align="center" v-if="get_role_function('200300130')" prop="assignTime" width="105px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="Detail(scope.row.id)" style="color:#008DF8;cursor: pointer;">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
     
    <el-pagination background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page.pageNum"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
      class="pagination" style="text-align:center">
    </el-pagination>

    <el-dialog
      title="唯一线索人工派发"
      :visible.sync="cleanDeliveryVisible"
      width="30%"
      append-to-body="true"
      custom-class="visible"
      >
      <el-form :model="delivery" ref="delivery" :rules="deliveryRules">
        <el-form-item label="经销商" prop="dealerId">
          <el-select v-model="delivery.dealerId" placeholder="请选择经销商">
           <el-option
              v-for="item in dealerName"
              :key="item.deptName"
              :label="item.deptName"
              :value="item.deptId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <p @click="cleanDeliveryVisible = false"><span>取 消</span></p>
        <p type="primary" @click="confirmSubmit('delivery')" style="color: #6289FE;border-left:1px solid #D7DAE2">确 定</p>
      </div>
    </el-dialog>

    <el-dialog
      title="唯一线索人工分配"
      :visible.sync="cleanAssignVisible"
      width="30%"
      append-to-body="true"
      custom-class="visible"
      >
      <el-form ref="assgin" :model="assgin" :rules="assginRules">
        <el-form-item label="销售顾问" prop="salesmanId">
          <el-select v-model="assgin.salesmanId" placeholder="请选择销售顾问">
            <el-option
              v-for="item in salesmanName"
              :key="item.userId"
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <p @click="cleanAssignVisible = false"><span>取 消</span></p>
        <p type="primary" @click="confirmSubmit('assgin')" style="color: #6289FE;border-left:1px solid #D7DAE2">确 定</p>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import {getCarMakeModelStyle,onlyClueChannel,getDealerData,onlyClueList,distributeAssign,assginSalemansData,getActivityData} from '../../../service/api/index'
import {parseTimeNoS,get_role_function} from '../../../utils/index'
import qs from 'qs'
 export default {
   data(){
     return{
       get_role_function,
       userInfo:{
       },
       userTag:'group',
       cleanDeliveryVisible:false,
       cleanAssignVisible:false,
       marketActity:[],
       form_clueClear:{
         customerName:'',
         mobile:'',
         uniqueId:'',
         customerId:'',
         clueStatus:'',
      //   intentCarBrands:'',
      //   intentCarModels:'',
         intentCarStyle:'',
         firstChannelIds:'',
         activityId:'',
         secondChannelIds:'',
         startTime:'',
         dealerId:'',
         endTime:'',
         distributeStartTime:'',
         distributeEndTime:'',
         clueStatus:''
       },
       check_table:[],
       creatTime:'',
       distributeTime:'',
       assignTime:'',
       fromChannel:'',
       cleaningData:[],
       page:{
         pageNum:1,
         pageSize:10,
         total:0
       },
       pageL:{
          pageNum:1,
          pageSize:10,
       },
       clueStatus:[
         {
           type:'new',
           label:'新建'
         },
         {
           type:'distributed',
           label:'已派发'
         },
         {
           type:'assigned',
           label:'已分配'
         },
         {
           type:'followed',
           label:'已跟进'
         },
         {
           type:'arrived',
           label:'已到店'
         },
         {
           type:'driven',
           label:'已试驾'
         },
         {
           type:'ordered',
           label:'已下订'
         },
         {
           type:'deal',
           label:'已成交'
         },
         {
           type:'delivery',
           label:'已交车'
         },
         {
           type:'defeated',
           label:'战败/流失'
         },
         {
           type:'invalid',
           label:'无效'
         }
       ],
       carType:[],
       ChannesList:[],   //渠道
       culeList_table:[],
       setKesLabel:{
      //  multiple: true,
        value:'channelId',
        label:'channelName',
        children:'children'
       },
       carTypeLabel:{
        value:'name',
        label:'name',
        children:'list'
       },
       carTypeData:[],
       dealerName:[],
       noCleanArr:[],
       assignArr:[],
       deliveryData:[],
       assginData:[],
       tableSelect:'',
       caozuoDealerName:'',
       salesmanId:150,
       delivery:{
         dealerId:''
       },
      assgin:{
        salesmanId:''
      },
      salesmanName:[],
      assginRules:{
        salesmanId: [
          { required: true, message: '请选择销售顾问', trigger: 'change' }
        ]
      },
      deliveryRules:{
        dealerId: [
          { required: true, message: '请选择经销商', trigger: 'change' }
        ]
      }
     }
   },
   created () {
    this.userInfo = this.$store.getters.userInfo || {};
    this.dataInit();
    this.getCuleList();
    this.SalemansData();
   },
   methods:{
    dataInit(){
      getCarMakeModelStyle().then(res=>{  //车型
        if(res.code==0){
           this.carTypeData=res.data
        }else{
          this.$notify.error({
            title:'错误',
            message:res.errMsg
          })
        }
      })
      onlyClueChannel(this.userInfo.userDeptId).then(res=>{  //渠道
        if(res.code==0){
          this.ChannesList=res.data.channels;
        }else{
          this.$notify.error({
            title:'错误',
            message:res.errMsg
          })
        }
      })
      getDealerData().then(res=>{   //经销商
        if(res.code==0){
         // console.log(res.data)
          this.dealerName=res.data
        }else{
          this.$notify.error({
            title:'错误',
            message:res.errMsg
          })
        }
      })
      
      getActivityData().then(res=>{
        console.log(res)
        if(res.code==0){
          this.marketActity=res.data
        }
      })

    },
    handleSizeChange(val) {
      this.pageL.pageSize = val;
      this.getCuleList();
    },
    handleCurrentChange(val) {
      this.pageL.pageNum = val;
      this.getCuleList();
    },
    submit_search() {
      this.pageL.pageNum = 1;
      this.getCuleList();
    },
    reset_search(form_clueClear) { 
      this.$refs.form_clueClear.resetFields();
      this.form_clueClear.clueStatus=''
      this.form_clueClear.intentCarStyle='';
      this.form_clueClear.dealerId=''
      this.fromChannel=[];
      this.creatTime='';
      this.assignTime='';
      this.distributeTime='';
      this.$refs.fromChannel.$refs.panel.activePath = []
      this.$refs.carType.$refs.panel.activePath = []
      this.getCuleList();
    },
    handleSelectionChange(val){
    //  console.log(val)
      this.check_table = val;
    },
    arraySpanMethod1({ row, column, rowIndex, columnIndex }) {
     // console.log(rowIndex)
    //  console.log(columnIndex);
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2];
        } else if (columnIndex === 1) {
          return [0, 0];
        }
      }
    },
    dateFormat:function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
          return "";
      }
      return parseTimeNoS(date)
    },
    SalemansData(){
      let data={
        roleId:this.salesmanId,
        userDeptId:this.userInfo.userDeptId
      }
      assginSalemansData(data).then(res=>{
       // console.log(res)
        if(res.code==0){
          this.salesmanName=res.data;
        }else{
          this.$notify.error({
            message:res.errMsg
          })
        }
      })
    },
    checkSelect (row,index) {
      let isChecked = false;
      if (row.clueStatus == '已分配') { 
        isChecked = false
      } else {
        isChecked = true
      }
      return isChecked
    },
    filterData(data,status){
      if(status=='新建'){
        this.deliveryData=data.filter(item=>item.clueStatus==status);
        if(this.deliveryData.length==0 && this.assginData.length==0){
          this.$notify.error({
            title: '提示',
            message: '请选择新建的数据进行派发！'
          });
        }
      }
      if(status=='已派发'){
        this.assginData=data.filter(item=>item.clueStatus==status);
        if(this.deliveryData.length==0 && this.assginData.length==0){
          this.$notify.error({
            title: '提示',
            message: '请选择已派发的数据进行分配！'
          });
        }
      }
    },
    delivering(flag){  //清洗派发
      let that=this;
      that.cleaningData=[];
      if(that.check_table.length>0){
        if(flag=='delivery'){
          console.log(that.check_table)
          that.filterData(that.check_table,'新建');
        //  debugger
          if(that.check_table.length>this.deliveryData.length){
            this.$notify.error({
              title: '提示',
              message: '只能选中新建的数据状态进行派发'
            });
          }
          else{
            that.deliveryData.forEach(function(waitClean){
              if(waitClean.clueStatus=='新建'){
                that.noCleanArr.push(waitClean.id);
                if(that.noCleanArr.length>0){
                  that.cleanDeliveryVisible=true;
                }
              }
            })
          }
        }
        if(flag=='assgin'){
          that.filterData(that.check_table,'已派发');
          if(that.check_table.length>this.assginData.length){
            this.$notify.error({
              title: '提示',
              message: '只能选中已派发的数据进行分配'
            });
          }else{
            that.assginData.forEach(function(waitClean){
              if(waitClean.clueStatus=='已派发'){
                that.noCleanArr.push(waitClean.id);
                if(that.noCleanArr.length>0){
                  that.cleanAssignVisible=true;
                //  that.SalemansData();
                }
              }
            })
          }
        } 
      }else{
        that.$notify.error({
          title: '提示',
          message: '没有选中的数据！'
        });
      }
    },
    changeChannels(value){  //级联多选操作
      console.log(value)
     
    },
    getCuleList(){   //列表
      // console.log(this.form_clueClear.intentCarStyles)
      this.form_clueClear.createStartTime = this.creatTime == undefined ? '' : this.creatTime[0]
      this.form_clueClear.createEndTime = this.creatTime == undefined ? '' : this.creatTime[1]
      this.form_clueClear.distributeStartTime = this.distributeTime == undefined ? '' : this.distributeTime[0]
      this.form_clueClear.distributeEndTime = this.distributeTime == undefined ? '' : this.distributeTime[1]
      this.form_clueClear.assignStartTime = this.assignTime == undefined ? '' : this.assignTime[0]
      this.form_clueClear.assignEndTime = this.assignTime == undefined ? '' : this.assignTime[1]
      this.form_clueClear.firstChannelIds=this.fromChannel==undefined?'':this.fromChannel[0]
      this.form_clueClear.secondChannelIds=this.fromChannel==undefined?'':this.fromChannel[1]
    //  this.form_clueClear.intentCarBrands=this.form_clueClear.intentCarStyle==undefined?'':this.form_clueClear.intentCarStyle[0];
    //  this.form_clueClear.intentCarModels=this.form_clueClear.intentCarStyle==undefined?'':this.form_clueClear.intentCarStyle[1];
      this.form_clueClear.intentCarStyle=this.form_clueClear.intentCarStyle==undefined?'':this.form_clueClear.intentCarStyle[2];

      onlyClueList(this.userInfo.userId,qs.stringify(this.pageL),qs.stringify(this.form_clueClear)).then(res=>{
        // console.log(res)
       if(res.code == 0){

         this.culeList_table=res.data.content;
         //合并单元格-行
         this.culeList_table=this.culeList_table.map(v=>{
           if (v.intentCarBrand && v.intentCarModel && v.intentCarStyle) {
              v.catBMS=v.intentCarBrand+'/'+v.intentCarModel+'/'+v.intentCarStyle
           }else{
             v.catBMS=''
           }
          if (v.firstChannelName && v.secondChannelName) {
            v.ChannelName=v.firstChannelName+'/'+v.secondChannelName
          }else{
            v.ChannelName=''
          }
          return v
         })
        //  console.log(this.culeList_table,"-----------------this.culeList_table 表格数据");
         this.page.total=res.data.totalElements;
       }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
       }
      })
    },
    submit(flag){
      this.$refs.assgin.validate((valid) => {
        if (valid) {
          this.confirmSubmit(flag)
        } else {
          return false;
        }
      });
    },
    confirmSubmit(flag){
      //console.log(flag)

      let that=this;
      let postData={};
      
      if(flag=='assgin'){
       // console.log(this.$refs)
        this.$refs.assgin.validate((valid) => {
          if (valid) {
            postData={
              userId:this.userInfo.userId,
              deptId:this.userInfo.userDeptId,
              salesmanId:this.assgin.salesmanId,
              ids:this.noCleanArr.toString()
            }
            
           distributeAssign(postData).then(res=>{
            if(res.code==0){
              this.cleanAssignVisible=false;
              this.$notify({
                type: 'success',
                message:'提交成功'
              })
              this.$router.go(0)
            }else{
              this.$notify({
                type: 'error',
                message: res.errMsg
              })
            }
          })
          } else {
            return false;
          }
        });

        }else if(flag=='delivery'){
         //  console.log(this.$refs)
          this.$refs.delivery.validate((valid) => {
            if (valid) {
              postData={
                userId:this.userInfo.userId,
                deptId:this.userInfo.userDeptId,
                dealerId:this.delivery.dealerId,
                ids:this.noCleanArr.toString()
              }
              distributeAssign(postData).then(res=>{

                if(res.code==0){
                  this.cleanDeliveryVisible = false;
                  
                  this.$notify({
                    type: 'success',
                    message:'提交成功'
                  })
                  this.$router.go(0)
                }else{
                  this.$notify({
                    type: 'error',
                    message: res.errMsg
                  })
                }
              })
            }else{
              return false
            }
          })
        }
      
    },
    Detail(id) {
      this.$router.push({name:'onlyClueDetails'})
      sessionStorage.setItem('id',id)
    }
   }
 }
</script>

<style scoped>
  .table{
    border:1px solid #F5F6FA;
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
  /deep/ .el-input__inner{
    height: 32px;
    line-height:32px;
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
  
</style>