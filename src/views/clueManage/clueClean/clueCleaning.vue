<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">线索清洗列表</span>
    </el-header>
    <el-form inline class="atg-search" :model="form_clueClear" ref="form_clueClear">
      <el-form-item  prop="uniqueId">
        <el-input size="small" placeholder="请输入唯一线索ID" v-model="form_clueClear.uniqueId"></el-input>
      </el-form-item>
      <el-form-item prop="cleanStatus">
        <el-select size="small" v-model="form_clueClear.cleanStatus" placeholder="请选择清洗状态" clearable>
          <el-option v-for="item in cleanStatusData" :key="item.value" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
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
      <el-form-item  prop="mobile">
        <el-input size="small" placeholder="请输入客户名称" v-model="form_clueClear.customerName"></el-input>
      </el-form-item>
      <el-form-item  prop="intentCarStyles">
        <el-cascader v-model="form_clueClear.intentCarStyles" clearable ref="carType" placeholder="请选择意向车型" :options="carTypeData" :props="carTypeLabel"></el-cascader>
      </el-form-item>
      <el-form-item  prop="fromChannel">
        <el-cascader placeholder="请选择来源渠道" clearable ref="fromChannel" v-model="fromChannel" :options="ChannesList" :props="setKesLabel"></el-cascader>
      </el-form-item>
      <el-form-item  prop="dealerName">
        <!-- <el-input size="small" placeholder="请输入经销商" v-model="form_clueClear.dealerName"></el-input> -->
        <el-select v-model="form_clueClear.dealerId" placeholder="请选择经销商名称" clearable>
          <el-option
            v-for="item in dealerName"
            :key="item.deptName"
            :label="item.deptName"
            :value="item.deptId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="creatTime">
        <el-date-picker size="small" v-model="creatTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item  prop="deliveryTime">
        <el-date-picker size="small" v-model="deliveryTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" type="info" size="small" @click="submit_search()">搜索</el-button>
        <el-button class="reset-btn" size="small" @click="reset_search(form_clueClear)">重置</el-button>
      </el-form-item>
    </el-form>
    <div>
       <el-button type="text" style="font-size: 14px;color:#3B86FF" v-if="get_role_function('200200120')" @click="delivering('delivery')"><svg-icon icon-class="cleaning" />清洗派发
       </el-button>
       <el-button type="text" style="font-size: 14px;color:#3B86FF" @click="delivering('assgin')"><svg-icon icon-class="cleaning" />清洗分配
       </el-button>
    </div>
    <el-table :data="culeList_table"  align="center" height="520" class="table" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="唯一线索ID" prop="uniqueId"></el-table-column>
      <el-table-column label="清洗状态" prop="cleanStatus"></el-table-column>
      <el-table-column label="线索状态" prop="clueStatus"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="客户ID" prop="customerId"></el-table-column>
      <el-table-column label="手机号码" prop="mobile"></el-table-column>
      <el-table-column label="座机号码" prop="telephone"></el-table-column>
      <el-table-column label="意向品牌" prop="intentCarBrand"></el-table-column>
      <el-table-column label="意向车系" prop="intentCarModel"></el-table-column>
      <el-table-column label="意向车型" prop="intentCarStyle"></el-table-column>
      <el-table-column label="一级渠道" prop="firstChannelName"></el-table-column>
      <el-table-column label="二级渠道" prop="secondChannelName"></el-table-column>
      <el-table-column label="经销商" prop="dealerName"></el-table-column>
      <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="派发时间" prop="distributeTime" width="105px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作">
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
      title="清洗人工派发"
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
      title="清洗人工分配"
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
import {getCarMakeModelStyle,getDealerData,cleanClueData,cleanClueList,cleanDistribute,assginSalemansData} from '../../../service/api/index'
import {parseTimeNoS,get_role_function} from '../../../utils/index'

import qs from 'qs'
 export default {
   data(){
     return{
       userInfo:{},
       get_role_function,
       userTag:'group',
       cleanDeliveryVisible:false,
       cleanAssignVisible:false,
       form_clueClear:{
         customerName:'',
         mobile:'',
         uniqueId:'',
         cleanStatus:'',
         clueStatus:'',
         dealerId:'',
         intentCarBrands:'',
         intentCarModels:'',
         intentCarStyles:'',
         firstChannelIds:'',
         secondChannelIds:'',
         createStartTime:'',
         createEndTime:'',
         distributeStartTime:'',
         distributeEndTime:''
       },
       cleanStatusData:[
         {
           name:'待清洗',
           value:'todo'
         },
         {
           name:'已清洗',
           value:'done'
         },
       ],
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
         }
       ],
       check_table:[],
       creatTime:'',
       deliveryTime:'',
       fromChannel:'',
       page:{
         pageNum:1,
         pageSize:10,
         total:0
       },
       pageL:{
          pageNum:1,
          pageSize:10,
       },
       carTypeData:[],
       noCleanArr:[],
       carType:[],
       ChannesList:[],   //渠道
       culeList_table:[],
       setKesLabel:{
        value:'channelId',
        label:'channelName',
        children:'children'
       },
       carTypeLabel:{
        value:'name',
        label:'name',
        children:'list'
       },
       dealerName:[],
      DCCId:152,
      caozuoDealerName:'',
       delivery:{
         dealerId:''
       },
      assgin:{
        salesmanId:''
      },
      salesmanName:[],
      cleaningData:[],
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
   // console.log(this.userInfo)
    this.dataInit()
    this.getCuleList()
   },
   methods:{
      dataInit(){
        getCarMakeModelStyle().then(res=>{  //车型
          if(res.code==0){
            this.carTypeData=res.data
          }else{
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })
        getDealerData().then(res=>{   //经销商
          if(res.code==0){
           // console.log(res.data)
            this.dealerName=res.data
          }else{
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })
        this.getChannel()   //渠道
      },
      handleSizeChange(val) {
        this.pageL.pageSize = val
        this.getCuleList();
      },
      handleCurrentChange(val) {
        this.pageL.pageNum = val
        this.getCuleList();
      },
      submit_search() {
        this.pageL.pageNum = 1;
        this.getCuleList();
      },
      reset_search(form_clueClear) { 
        this.$refs.form_clueClear.resetFields();
        this.form_clueClear.intentCarStyles='';
        this.form_clueClear.clueStatus='';
        this.form_clueClear.dealerId=''
        this.fromChannel='';
        this.creatTime='';
        this.deliveryTime="";
        this.$refs.fromChannel.$refs.panel.activePath = []
        this.$refs.carType.$refs.panel.activePath = []
        this.getCuleList();
      },
      handleSelectionChange(val){
      //  console.log(val)
				this.check_table = val;
        
			},
      getChannel(){
        cleanClueData(this.userInfo.userDeptId).then(res=>{
         // console.log(res)
          if(res.code==0){
            this.ChannesList=res.data.channels;
          }else{
            this.$notify.error({
              title:'提示',
              message:res.errMsg
            })
          }
        })
      },
      delivering(flag){  //清洗派发
      console.log(this.check_table)
        let that=this;
        that.cleaningData=[];
        if(that.check_table.length>0){
          
          that.check_table.forEach(function(item){ 
              if(item.cleanStatus=='待清洗'){
                 that.cleaningData.push(item);
                 console.log(that.cleaningData)
                if(flag=='delivery'){
                    that.cleaningData.forEach(function(waitClean){
                    if(waitClean.clueStatus=='新建'){
                      that.noCleanArr.push(waitClean.id);
                      if(that.noCleanArr.length>0){
                        that.cleanDeliveryVisible=true;
                      }
                    }else{
                      that.$notify.error({
                        title: '提示',
                        message: '请选择新建的数据进行派发！'
                      });
                    }
                  })
                }
                if(flag=='assgin'){
                  that.cleaningData.forEach(function(waitClean){
                  console.log(waitClean.clueStatus)
                  if(waitClean.clueStatus!='新建' && waitClean.clueStatus=='已派发' && waitClean.clueStatus!='已分配'){
                    that.noCleanArr.push(waitClean.id);
                    if(that.noCleanArr.length>0){
                      that.cleanAssignVisible=true;
                    }
                  }else{
                    that.$notify.error({
                      title: '提示',
                      message: '请选择已派发的数据进行分配！'
                    });
                  }
                })
              } 
              }else{
                
                that.$notify.error({
                  title: '提示',
                  message: '请选择待清洗的数据！'
                });
              }
              
          })
        }else{
          that.$notify.error({
            title: '提示',
            message: '请选中至少一条待清洗里的数据！'
          });
        }
      },
      SalemansData(){
        assginSalemansData(this.DCCId).then(res=>{
          console.log(res)
          if(res.code==0){
            this.salesmanName=res.data;
          }else{
            this.$notify.error({
              message:res.errMsg
            })
          }
        })
      },
      confirmSubmit(flag){
        let that=this;
        let postData={};
        if(flag=='assgin'){
          this.$refs.assgin.validate((valid) => {
            if (valid) {
              postData={
                userId:this.userInfo.userId,
                salesmanId:this.assgin.salesmanId,
                ids:this.noCleanArr.toString()
              }
              cleanDistribute(postData).then(res=>{
                if(res.code==0){
                  this.cleanAssignVisible = false;
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
         
          this.$refs.delivery.validate((valid) => {
            if (valid) {
              postData={
                userId:this.userInfo.userId,
                dealerId:this.delivery.dealerId,
                ids:this.noCleanArr.toString()
              }
              cleanDistribute(postData).then(res=>{
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

      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return parseTimeNoS(date)
      },
      getCuleList(){   //列表
      
        this.form_clueClear.createStartTime = this.creatTime == undefined ? '' : this.creatTime[0]
        this.form_clueClear.createEndTime = this.creatTime == undefined ? '' : this.creatTime[1]
        this.form_clueClear.distributeStartTime = this.deliveryTime == undefined ? '' : this.deliveryTime[0]
        this.form_clueClear.distributeEndTime = this.deliveryTime == undefined ? '' : this.deliveryTime[1]
        this.form_clueClear.firstChannelIds=this.fromChannel==undefined?'':this.fromChannel[0]
        this.form_clueClear.secondChannelIds=this.fromChannel==undefined?'':this.fromChannel[1]
        this.form_clueClear.intentCarBrands=this.form_clueClear.intentCarStyles==undefined?'':this.form_clueClear.intentCarStyles[0];
        this.form_clueClear.intentCarModels=this.form_clueClear.intentCarStyles==undefined?'':this.form_clueClear.intentCarStyles[1];
        this.form_clueClear.intentCarStyles=this.form_clueClear.intentCarStyles==undefined?'':this.form_clueClear.intentCarStyles[2];
        console.log(this.form_clueClear)
        cleanClueList(this.userInfo.userDeptId,qs.stringify(this.pageL),qs.stringify(this.form_clueClear)).then(res=>{
          console.log(res)
         if(res.code == 0){
           this.culeList_table=res.data.content;
           this.page.total=res.data.totalElements;
         }else{
            this.$notify({
              type: 'error',
              message: res.errMsg
            })
         }
        })
      },
      Detail(id) {
        this.$router.push({name:'clueCleanDetails'})
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