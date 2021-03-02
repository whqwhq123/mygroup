<template>
  <el-main>
    <el-form inline class="atg-search" :model="searchData" ref="searchData">
      <el-form-item label="原始线索ID" prop="originalId">
        <el-input size="small" placeholder="请输入原始线索ID" v-model="searchData.originalId"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" prop="customerName">
        <el-input size="small" placeholder="请输入客户名称" v-model="searchData.customerName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input size="small" placeholder="请输入客户名称" v-model="searchData.mobile"></el-input>
      </el-form-item>
      <el-form-item label="意向车型" prop="intentCarStyles">
         <el-cascader v-model="searchData.intentCarStyles" clearable ref="carType"  placeholder="请选择意向车型" :options="carTypeData"  :props="carTypeLabel"></el-cascader>
      </el-form-item>
      <el-form-item label="来源渠道" prop="fromChannel">
        <el-cascader placeholder="请选择来源渠道" clearable ref="fromChannel" v-model="fromChannel"  :options="ChannesList"  :props="setKesLabel"></el-cascader>
      </el-form-item>
      <el-form-item label="活动名称:" class="add-icon">
          <el-select v-model="searchData.activityId" clearable placeholder="请选择活动">
            <el-option
              v-for="item in marketActity"
              :key="item.name"
              :label="item.activityName"
              :value="item.activityId">
            </el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="创建时间" prop="creatTime">
        <el-date-picker size="small" v-model="creatTime" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd HH:mm:ss" value-format="yyyy/MM/dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" type="info" size="small" @click="submit_search()">搜索</el-button>
        <el-button class="reset-btn" size="small" @click="reset_search(searchData)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="caozuo">
      <router-link to="/clueManage/addClue">
        <el-button type="text" v-if="get_role_function('200100120')" style="font-size: 14px;color:#3B86FF;margin-right:15px"><svg-icon icon-class="add_icon" />新建原始线索
        </el-button>
      </router-link>
       <el-button type="text" v-if="get_role_function('200100130')" style="font-size: 14px;color:#3B86FF" @click="exportCule()"><svg-icon icon-class="export_icon" />原始线索导出
       </el-button>
    </div>
    <el-table :data="culeList_table"
      fit
      highlight-current-row 
      align="center"
      class="table" height="520" style="overflow-y: auto;margin-bottom: 15px">
      <el-table-column label="原始线索ID" prop="originalId"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="手机号码" prop="mobile"></el-table-column>
      <el-table-column label="座机号码" prop="telephone"></el-table-column>
      <el-table-column label="意向品牌" prop="intentCarBrand"></el-table-column>
      <el-table-column label="意向车系" prop="intentCarModel"></el-table-column>
      <el-table-column label="意向车型" prop="intentCarStyle" width="110px"></el-table-column>
      <el-table-column label="一级渠道" prop="firstChannelName"></el-table-column>
      <el-table-column label="二级渠道" prop="secondChannelName"></el-table-column>
      <el-table-column label="活动名称" prop="activityName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="110px" :formatter="dateFormat"></el-table-column>
      <el-table-column label="操作" width="180">
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

  </el-main>
</template>

<script>
import {clueList,clueSearch,getCarMakeModelStyle,clueExport,getActivityData} from '../../../service/api/index'
import {operateFile,parseTimeNoS,get_role_function} from '../../../utils/index'
import qs from 'qs'
 export default {
   data(){
     return{
      userInfo:{},
      get_role_function,
      searchData:{
        customerName:'',
        mobile:'',
        originalId:'',
        intentCarBrands:'',
        intentCarModels:'',
        intentCarStyles:'',
        firstChannelIds:'',
        secondChannelIds:'',
        startTime:'',
        endTime:'',
        activityId:''
      },
      creatTime:'',
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
      marketActity:[
      ],
      carTypeData:[],
      ChannesList:[],   //渠道
      culeList_table:[],
      selectMore:[],
      carTypeLabel:{
        value:'name',
        label:'name',
        children:'list',
       // multiple: true
      },
      setKesLabel:{
        value:'channelId',
        label:'channelName',
        children:'children',
        //multiple: true
       }
     }
   },
   created () {
     this.userInfo = this.$store.getters.userInfo || {};
     this.getCuleList();
     this.getCarMake();
     this.getActivityList();
     this.searchCriteria()
    // console.log(this.userInfo)
   },
   methods:{
      handleSizeChange(val) {
        this.pageL.pageSize = val
        this.getCuleList()
      },
      handleCurrentChange(val) {
        this.pageL.pageNum = val
        this.getCuleList()
      },
      submit_search() {
       this.pageL.pageNum = 1;
       this.getCuleList();
      },
      reset_search(searchData) { 
        this.$refs.searchData.resetFields();
        this.searchData.intentCarStyles='';
        // this.searchData.intentCarBrands=[];
        // this.searchData.intentCarModels=[];
        // this.searchData.firstChannelIds=[];
        // this.searchData.secondChannelIds=[];
        this.$refs.fromChannel.$refs.panel.activePath = []
        this.$refs.carType.$refs.panel.activePath = []
        this.fromChannel='';
        this.creatTime='';
        this.getCuleList();
      },
      getCarMake(){
        getCarMakeModelStyle().then(res=>{
          if(res.code==0){
            console.log(res)
            this.carTypeData=res.data
          }else{
            this.$notify({
              message: res.errMsg,
              type: "error",
            });
          }
          
        })
      },
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return parseTimeNoS(date)
      },
      getActivityList(){
        getActivityData().then(res=>{
          console.log(res)
          if(res.code==0){
            this.marketActity=res.data
          }
        })
      },
      getCuleList(){   //列表
        this.searchData.startTime = this.creatTime == undefined ? '' : this.creatTime[0]
        this.searchData.endTime = this.creatTime == undefined ? '' : this.creatTime[1]
        this.searchData.firstChannelIds=this.fromChannel[0]
        this.searchData.secondChannelIds=this.fromChannel[1]
        // this.searchData.firstChannelIds=this.searchData.firstChannelIds.toString()
        // this.searchData.secondChannelIds=this.searchData.secondChannelIds.toString()
        // this.searchData.intentCarStyles=this.searchData.intentCarStyles.toString()
       
        console.log(this.searchData)
        
        clueSearch(this.userInfo.userId,qs.stringify(this.pageL),qs.stringify(this.searchData)).then(res=>{
         if(res.code == 0){
           this.culeList_table=res.data.content;
           this.page.total=res.data.totalElements;
         }else{
            this.$notify({
              message: res.errMsg,
              type: "error",
            });
         }
        })
      },
      searchCriteria(){   //渠道
        clueList(this.userInfo.userDeptId).then(res=>{
          //this.carType=res.data.intentCarStyles;
          console.log(res)
          this.ChannesList=res.data.channels;
        })
      },
      selectCarList(value){   //车型多选
      //  console.log(value)
        let data=value;
        let selectMore=[];
        let that=this;
        data.forEach(function(item){
          console.log(item)
          let length=item.length;
          
          switch(length){
            case 3:
              selectMore=electMore.concat(item[0]);
            break;
            case 2:
              selectMore=selectMore.concat(item[0]);
            break;
            case 1:
              selectMore=selectMore.concat(item[0]);
            break;
          }
          that.searchData.intentCarStyles=selectMore
          console.log(that.searchData.intentCarStyles)
        })
      },
      selectList(value){   //渠道多选
      //  console.log(value)
        let data=value;
        let selectMore=[];
        let that=this;
        data.forEach(function(item){
          console.log(item)
          let length=item.length;
          
          switch(length){
            case 3:
              selectMore=selectMore.concat(item[0]);
            break;
            case 2:
              selectMore=selectMore.concat(item[0]);
            break;
            case 1:
              selectMore=selectMore.concat(item[0]);
            break;
          }
         // that.fromChannel=selectMore
         that.searchData.firstChannelIds=selectMore
          console.log(that.searchData.firstChannelIds)
        })
      },

      exportCule(){
        //console.log(this.searchData)
        clueExport(this.userInfo.userId,qs.stringify(this.pageL),qs.stringify(this.searchData)).then(res=>{
            this.listLoading = false
            operateFile(res, '线索列表')  
        }).catch((res) => {
            console.log(res)
        })
      },
      Detail(id) {
        this.$router.push({name:'clueDetail'})
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
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #43425D;
  }
  /deep/ .el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .el-pager li{
    background: none;
    border: 1px solid #E7E9F0;
    border-radius: 3px;
  }
  .caozuo{
    display: flex;
    justify-content: flex-end;
    align-items: center;
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