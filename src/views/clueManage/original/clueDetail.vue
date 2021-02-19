<template>
  <div class="cule-detail">
     <div class="add-title">
       <span>原始线索详情</span>
     </div>
     <el-row style="margin-top: 20px;">
       <el-form>
        <el-col :span="2" style="height:10px"></el-col>
        <el-col :span="8" style="border:1px solid #E4E6ED;margin-right:20px">
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
            <el-form-item label="原始线索ID：" class="add-icon">
            {{clueUser.originalId}}
          </el-form-item>
          <el-form-item label="意向车型:" prop="carType" class="add-icon">
           {{clueUser.intentCarBrand}} &nbsp;/&nbsp;{{clueUser.intentCarModel}}&nbsp;/&nbsp;{{clueUser.intentCarStyle}}
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
        <el-col :span="6"></el-col>
       </el-form>
     </el-row>
  </div>
</template>

<script>
import { getDetail} from '../../../service/api/index'
import {parseTime} from '../../../utils/index'
export default {
  data(){
    return {
      id:'',
      clueUser:{},
      sex:1
    }
  },
  created () {  
   // this.id=this.$route.params.id;
    this.id=sessionStorage.getItem('id')
    this.getculeDetail()
  },
  methods:{
    getculeDetail(){
      getDetail(this.id).then(res=>{    
        console.log(res)  
        this.clueUser=res.data;   
        this.clueUser.createTime=parseTime(res.data.createTime);    
        if(res.data.sex=="男"){
          this.sex=1
        }
        else{
          this.sex=2
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
  /deep/ .el-form-item{
    margin-bottom: 10px;
    color: #4D4F5C;
  }
  .cule-detail{
    padding: 15px;
  }
  .add-title{
    height: 40px;
    border-bottom:1px solid #E9E9F0;
    color: #43425D;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .user-title{
    height: 130px;
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
</style>
