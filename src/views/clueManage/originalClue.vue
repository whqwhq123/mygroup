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
      <el-form-item label="意向车型" prop="intentCarStyle">
         <el-select size="small" v-model="searchData.intentCarStyle" placeholder="请选择意向车型">
          <el-option v-for="item in carType" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源渠道" prop="fromChannel">
        <el-cascader placeholder="请选择来源渠道" v-model="fromChannel" :options="ChannesList" :props="setKesLabel"></el-cascader>
      </el-form-item>
      <el-form-item label="任务创建时间" prop="creatTime">
        <el-date-picker size="small" v-model="creatTime" type="daterange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="search-btn" type="info" size="small" @click="submit_search()">搜索</el-button>
        <el-button class="reset-btn" size="small" @click="reset_search(form_list)">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="caozuo">
      <router-link to="/clueManage/addClue">
        <el-button type="text" style="font-size: 14px;color:#3B86FF;margin-right:15px"><svg-icon icon-class="add_icon" />新建原始线索
        </el-button>
      </router-link>
       <el-button type="text" style="font-size: 14px;color:#3B86FF" @click="exportCule()"><svg-icon icon-class="export_icon" />原始线索导出
       </el-button>
    </div>
    <el-table :data="culeList_table" class="table" style="height:520px;overflow-y: auto;margin-bottom: 15px">
      <el-table-column label="原始线索ID" prop="originalId"></el-table-column>
      <el-table-column label="客户名称" prop="customerName"></el-table-column>
      <el-table-column label="手机号码" prop="mobile" :formatter="formatTaskStatus"></el-table-column>
      <el-table-column label="座机号码" prop="telephone"></el-table-column>
      <el-table-column label="意向品牌" prop="intentCarBrand"></el-table-column>
      <el-table-column label="意向车系" prop="intentCarModel"></el-table-column>
      <el-table-column label="意向车型" prop="intentCarStyle" width="110px"></el-table-column>
      <el-table-column label="一级渠道" prop="firstChannelId"></el-table-column>
      <el-table-column label="二级渠道" prop="secondChannelId"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="110px"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="Detail(scope.row.id)" style="color:#008DF8;cursor: pointer;">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
      :current-page.sync="page.pageNum" :page-sizes="[5, 10, 20, 30]" :page-size="page.pageSize" :total="page.total"
      layout="prev, pager, next" class="pagination" style="text-align:center"></el-pagination>

  </el-main>
</template>

<script>
import {clueList,clueSearch,clueExport} from '../../service/api/index'
import {operateFile} from '../../utils/index'
import qs from 'qs'
 export default {
   data(){
     return{
       deptId:1,
       searchData:{
         customerName:'',
         mobile:'',
         originalId:'',
         intentCarStyle:'',
         firstChannelId:'',
         secondChannelId:'',
         startTime:'',
         endTime:''
       },
       creatTime:'',
       fromChannel:'',
       page:{
         pageNum:1,
         pageSize:3,
         total:0
       },
       pageL:{
          pageNum:1,
          pageSize:3,
       },
       carType:[],
       ChannesList:[],   //渠道
       culeList_table:[],
       setKesLabel:{
        value:'channelId',
        label:'channelName',
        children:'children'
       }
     }
   },
   created () {
     this.getCuleList();
     this.searchCriteria()
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
       this.getCuleList();
      },
      reset_search(searchData) { 
        this.$refs.searchData.resetFields();
      },
      getCuleList(){   //列表
        this.searchData.startTime = this.creatTime == undefined ? '' : this.creatTime[0]
        this.searchData.endTime = this.creatTime == undefined ? '' : this.creatTime[1]
        this.searchData.firstChannelId=this.fromChannel[0]
        this.searchData.secondChannelId=this.fromChannel[1]

        clueSearch(this.deptId,qs.stringify(this.pageL),qs.stringify(this.searchData)).then(res=>{
          this.culeList_table=res.data.content;
          this.page.total=res.data.totalElements;
        })
      },
      searchCriteria(){   //车型和渠道
        clueList(this.deptId).then(res=>{
          this.carType=res.data.intentCarStyles;
          this.ChannesList=res.data.channels;
        })
      },
      exportCule(){
        clueExport(this.deptId,qs.stringify(this.pageL),qs.stringify(this.searchData)).then(res=>{
            this.listLoading = false
            operateFile(res, '线索列表')
        }).catch((res) => {
           // console.log(res)
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
  /deep/ .el-table::before{
    height: 0;
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