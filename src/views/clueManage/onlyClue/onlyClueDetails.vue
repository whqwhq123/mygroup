<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">唯一线索详情</span> 
      <span class="status green" v-if="onlyClueUser.clueStatus==0">{{clueUser.clueStatus}}<i class="el-icon-s-promotion"></i></span>
      <span class="status green" v-if="onlyClueUser.clueStatus==1">{{clueUser.clueStatus}}<i class="el-icon-s-promotion"></i></span>
      <span class="status green" v-if="onlyClueUser.clueStatus==2">{{clueUser.clueStatus}}<i class="el-icon-time"></i></span>
    </el-header>
    <p class="subtitle">线索详情</p>
    <div>
      <el-steps :space="130" :active="onlyClueUser.clueStatus" finish-status="success">
        <el-step title="新建"></el-step>
        <el-step title="已派发"></el-step>
        <el-step title="已分配"></el-step>
      </el-steps>
      <ul class="setps-time">
        <li>{{clueUser.createTime}}</li>
        <li>{{clueUser.distributeTime}}</li>
        <li>{{clueUser.assignTime}}</li>
      </ul>
    </div>
    <el-row style="margin: 20px 0">
      <el-form>
        <el-col :span="6" style="border:1px solid #E4E6ED;margin-right:20px">
          <div class="add-user">
              <div class="user-title">
                <span class="header-img">
                  <img v-if="sex==1" src="../../../assets/images/clueManage/man.png" alt="男头">
                  <img v-else src="../../../assets/images/clueManage/woman.png" alt="女头">
                </span>
                <ul class="title-right">
                  <li><span class="user-name">{{clueUser.customerName}}</span><span>{{clueUser.mobile}}</span></li>
                  <li>{{clueUser.telephone}}</li>
                </ul>
              </div>
              <p style="font-weight: 600;margin-left:15px;font-size:18px">客户信息</p>
              <div style="padding: 0 15px 15px">
                  <el-form-item label="性别：" prop="sex" class="sex-icon">
                    {{clueUser.sex}}
                  </el-form-item>
                  <el-form-item label="地址：" prop="province" class="dizhi-icon">
                    {{clueUser.province}}&nbsp;/&nbsp;{{clueUser.city}}&nbsp;/&nbsp;{{clueUser.area}}
                  </el-form-item>
                  <el-form-item label="备注：" class="remark-icon">
                    {{clueUser.remarks}}
                  </el-form-item>
              </div>
            </div>
        </el-col>
        <el-col :span="8" style="margin-top: 20px">
          <el-form-item label="唯一线索ID：" class="add-icon">
            {{clueUser.uniqueId}}
          </el-form-item>
          <el-form-item label="意向车型:" prop="carType" class="add-icon">
            {{clueUser.intentCarBrand}}&nbsp;/&nbsp;{{clueUser.intentCarModel}}&nbsp;/&nbsp;{{clueUser.intentCarStyle}}
          </el-form-item>
          <el-form-item label="来源渠道:" prop="fromChannel" class="add-icon">
              {{clueUser.firstChannelName}}&nbsp;/&nbsp;{{clueUser.secondChannelName}}
          </el-form-item>
          <el-form-item label="经销商名称:" class="add-icon">
              {{clueUser.dealerName}}
          </el-form-item>
          <el-form-item label="销售顾问:" class="add-icon">
              {{clueUser.salesmanName}}
          </el-form-item>
          <el-form-item label="创建时间：" class="add-icon">
            {{clueUser.createTime}}
          </el-form-item>
        </el-col>
        <el-col :span="10"></el-col>
      </el-form>
    </el-row>
    <div v-if="clean">
      <p class="subtitle">线索清洗结果</p>
      <ul class="cleaning">
        <li><span>清洗属性：</span><span>{{clueUser.clean.cleanProp}}</span></li>
        <li><span>清洗状态：</span><span>{{clueUser.clean.cleanStatus}}</span></li>
        <li><span>清洗结果：</span><span>{{clueUser.clean.cleanResult==true?'有效':'无效'}}</span></li>
        <li><span>清洗派发时间：</span><span>{{clueUser.distributeTime}}</span></li>
        <li><span>预计成交时间：</span><span>{{clueUser.clean.estTranDay}}</span></li>
      </ul>
    </div>
    <div style="margin-top: 20px">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="跟进历史" name="1">
          <el-table  :data="followHistory" align="center" height="320" table  class="table">
            <el-table-column label="原始线索ID" prop="originalId" ></el-table-column>
            <el-table-column label="线索状态" prop="groupResult"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
            <el-table-column label="客户ID" prop="uniqueId" ></el-table-column>
            <el-table-column label="意向车型" prop="intentCarStyle" ></el-table-column>
            <el-table-column label="渠道来源" prop="firstChannelName"></el-table-column>
            <el-table-column label="经销商" prop="dealerName"></el-table-column>
            <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="试驾记录" name="2">
          <el-table  :data="drivingRecord" align="center" height="320" table  class="table">
            <el-table-column label="原始线索ID" prop="originalId" ></el-table-column>
            <el-table-column label="线索状态" prop="groupResult"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
            <el-table-column label="客户ID" prop="uniqueId" ></el-table-column>
            <el-table-column label="意向车型" prop="intentCarStyle" ></el-table-column>
            <el-table-column label="渠道来源" prop="firstChannelName"></el-table-column>
            <el-table-column label="经销商" prop="dealerName"></el-table-column>
            <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="报价试算" name="3">
          <el-table  :data="offerTrial" align="center" height="320" table  class="table">
            <el-table-column label="原始线索ID" prop="originalId" ></el-table-column>
            <el-table-column label="线索状态" prop="groupResult"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
            <el-table-column label="客户ID" prop="uniqueId" ></el-table-column>
            <el-table-column label="意向车型" prop="intentCarStyle" ></el-table-column>
            <el-table-column label="渠道来源" prop="firstChannelName"></el-table-column>
            <el-table-column label="经销商" prop="dealerName"></el-table-column>
            <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="订单信息" name="4">
          <el-table  :data="orderInfor" align="center" height="320" table  class="table">
            <el-table-column label="原始线索ID" prop="originalId" ></el-table-column>
            <el-table-column label="线索状态" prop="groupResult"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
            <el-table-column label="客户ID" prop="uniqueId" ></el-table-column>
            <el-table-column label="意向车型" prop="intentCarStyle" ></el-table-column>
            <el-table-column label="渠道来源" prop="firstChannelName"></el-table-column>
            <el-table-column label="经销商" prop="dealerName"></el-table-column>
            <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="归集历史" name="5">
          <el-table :data="compilations" align="center" height="320" table  class="table">
            <el-table-column label="原始线索ID" prop="originalId" ></el-table-column>
            <el-table-column label="归集结果" prop="groupResult"></el-table-column>
            <el-table-column label="客户名称" prop="customerName"></el-table-column>
            <el-table-column label="手机号" prop="mobile"></el-table-column>
            <el-table-column label="固定号码" prop="telphone" ></el-table-column>
            <el-table-column label="意向品牌" prop="intentCarBrand" ></el-table-column>
            <el-table-column label="意向车系" prop="intentCarModel" ></el-table-column>
            <el-table-column label="意向车型" prop="intentCarStyle" ></el-table-column>
            <el-table-column label="一级渠道" prop="firstChannelName"></el-table-column>
            <el-table-column label="二级渠道" prop="secondChannelName"></el-table-column>
            <el-table-column label="经销商" prop="dealerName"></el-table-column>
            <el-table-column label="销售顾问" prop="salesmanName"></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="105px" :formatter="dateFormat"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
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
    </div>
  </el-main>
</template>

<script>
import {onlyClueDetail} from '../../../service/api/index'
import {parseTime} from '../../../utils/index'
export default {
  data(){
    return {
      time:'20210208',
      id:'',
      activeName:'5',
      onlyClueUser:{
        clueStatus:1
      },
      clueUser:{},
      followHistory:[],  //跟进历史
      compilations:[],   //归集历史
      drivingRecord:[],  //试驾记录
      offerTrial:[],   //报价试算
      orderInfor:[],  //订单信息
      clean:true,
      page:{
        pageNum:1,
        pageSize:5,
        total:0
      },
      pageL:{
        pageNum:1,
        pageSize:5
      }
    }
  },
  created () {
    this.id=sessionStorage.getItem('id');
    console.log(this.id)
    this.getDetail()
  },
  methods: {
     handleSizeChange(val) {
      this.pageL.pageSize = val
      
    },
    handleCurrentChange(val) {
      console.log(val)
      this.pageL.pageNum = val
      
    },
    handleClick(tab) {
     // console.log(tab.name);
    },
    getDetail(){
      onlyClueDetail(this.id).then(res=>{
        console.log(res.data);
        if(res.code==0){
          this.clueUser=res.data;
          this.compilations=res.data.originals;
          this.page.total=res.data.originals.length;
          this.clueUser.createTime=parseTime(res.data.createTime);
          this.clueUser.distributeTime=parseTime(res.data.distributeTime);
          this.clueUser.assignTime=parseTime(res.data.assignTime);
         // this.clueUser.clean.distributeTime=parseTime(res.data.clean.distributeTime);
          let sex=res.data.sex;
          let status=res.data.clueStatus;
          switch(status){
            case '新建':
              this.onlyClueUser.clueStatus=0;
            break;
            case '已派发':
              this.onlyClueUser.clueStatus=1;
            break;
            case '已分配':
              this.onlyClueUser.clueStatus=2;
            break;
          }

          switch(sex){
            case '男':
              this.sex=1
            break;
            case '女':
              this.sex=2
             break;
          }
          if(res.data.clean==undefined || res.data.clean==null || res.data.clean==''){
            this.clean=false
          }
          else{
            this.clean=true
          }
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
    },
      dateFormat:function(row, column) {
        var date = row[column.property];
        if (date == undefined) {
            return "";
        }
        return parseTime(date)
      },
  }
}
</script>
<style scoped>
  /* 步骤条 reset */
  /deep/ .el-step__head.is-success{
    color: #1890FF;
    border-color: #1890FF;
  }
  /deep/ .el-step__title.is-success{
    color:#43425D
  }
  /deep/ .el-step__title.is-process{
     color: #43425D;
     font-weight: 500;
  }
  /deep/ .el-step__head.is-process .el-step__icon.is-text{
    background: #1890FF;
    border-color: #1890FF
  }
  /deep/ .el-step__head.is-wait .el-step__icon.is-text{
    border-color: #D7DAE2;
    background: #D7DAE2;
  }
  /deep/ .el-step__head.is-process .el-step__icon.is-text .el-step__icon-inner{
    color:white
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #43425D;
  }
  /deep/ .el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .el-pager li{
    background: none;
    border: 1px solid #E7E9F0;
    border-radius: 3px;
  }
  .setps-time{
    display: flex;

  }
  .setps-time li{
    width:90px;
    height: 20px;
    overflow: hidden;
    font-size: 14px;
    color:#A3A6B4;
    margin-right:40px;
  }
  
/* end--------------- */
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-header .title{
    font-weight: 600;
  }
  .status{
    padding: 2px 5px;
    border-radius: 3px;
    color:#fff;
    font-size: 12px;
    margin-left: 10px;
  }
  .green{
    background: #00C456
  }
  /* 信息详情 */
  /deep/ .el-form-item{
    margin-bottom: 0
  }
  .user-title{
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    background: #F5F6FA;
  }
  .header-img{
    margin:0 20px
  }
  .header-img image{
    width: 76px;
    height: 76px;
  }
  .title-right{
    color: #43425D;
    padding: 0;
  }
  .title-right li{
    margin-top: 10px
  }
  .title-right .user-name{
    font-size: 20px;
    margin-right: 20px;
  }
  .add-icon{
    padding-left: 70px;
    background: url('../../../assets/images/clueManage/line.png') no-repeat left center;
    
  }
  .sex-icon,.dizhi-icon,.remark-icon{
    padding-left: 30px
  }
  .sex-icon{
    background: url('../../../assets/images/clueManage/sex.png') no-repeat left center;
  }
  .dizhi-icon{
    background: url('../../../assets/images/clueManage/dizhi.png') no-repeat left center;
  }
  .remark-icon{
    background: url('../../../assets/images/clueManage/remark.png') no-repeat left 10px;
  }

  .cleaning{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
  }
  .cleaning li{
    margin-right: 40px;
    font-size: 15px;
  }
  .subtitle{
    font-weight: 600;
  }
  .table{
     border:1px solid #F5F6FA;
  }
  /deep/ .el-table th{
    background: #F5F6FA
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #43425D;
  }
  /deep/ .el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .el-pager li{
    background: none;
    border: 1px solid #E7E9F0;
    border-radius: 3px;
  }
</style>