<template>
  <el-main>
    <el-form>
      <el-header class="atg-header">
        <span class="title">时间/周期规则配置</span>
      </el-header>
      <el-row class="mar-top">
        <el-col :span="4" style="height:10px"></el-col>
        <el-col :span="16">
          <p class="subtitle">归档周期</p>
          <div class="set">
            <el-form-item label="线索归档周期（天）：">
              <el-input size="small" placeholder="180" v-model="hosts.archive" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="线索合并周期（天）：">
              <el-input size="small" placeholder="180" v-model="hosts.merge" style="width:280px"></el-input>
            </el-form-item>
          </div>
          <p class="subtitle two-sub"><span>去重开始时间</span><span>成交归集周期</span></p>
          <div class="set">
            <el-form-item label="去重开始时间：">
              <el-input size="small" placeholder="180" v-model="hosts.restartTime" style="width:280px" suffix-icon="el-icon-time"></el-input>
            </el-form-item>
          
            <el-form-item label="成交归集周期（天）：">
              <el-input size="small" placeholder="180" v-model="hosts.dealGuiCycle" style="width:280px"></el-input>
            </el-form-item>
          </div>
           <p class="subtitle">首次跟进及时时效</p>
           <div class="set">
              <el-form-item label="主机厂线索首次跟进在：">
                <el-input size="small" placeholder="0" v-model="hosts.firstTimeFollow" style="width:140px;margin-right: 10px"></el-input>小时内，认定为及时
              </el-form-item>
           </div>
        </el-col>
        <el-col :span="4" style="height:10px"></el-col>
      </el-row>
      <el-header class="atg-header">
        <span class="title">战败/无效规则配置</span>
      </el-header>
      <el-row class="mar-top">
        <el-col :span="4" style="height:10px"></el-col>
        <el-col :span="16">
          <el-form-item label="顾问跟进：" prop="validNum">
            <el-input size="small" placeholder="0" v-model="hosts.followNum" style="width:140px;margin-right:10px;"></el-input>次后可申请战败，之前都为无效
          </el-form-item>
        </el-col>
        <el-col :span="4" style="height:10px"></el-col>
      </el-row>
      <div class="btn">
        <el-button class="reset-btn" size="small" @click="cancel">取消</el-button>
        <el-button class="search-btn" type="info" size="small" @click="save(rules)">保存</el-button>
      </div>
    </el-form>
  </el-main>
</template>

<script>
import {ruleOemSave,ruleOemDetail} from '@/service/api/index'
export default {
  data(){
    return {
     userInfo:{},
     modified:true,
     id:'',
     hosts:{
       archive:'180',  //归档
       merge:'180',   //合并
       restartTime:'08:30',
       dealGuiCycle:'15',
       firstTimeFollow:'12',
       followNum:'3'
     }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.modified) {
      next();
      return;
    }
    this.$confirm('当前页面数据未保存，确定要离开？', '提示', { type: 'warning' })
      .then(() => {
        next();
      })
      .catch(() => {
        next(false);
      });
  },
  created () {
     this.userInfo = this.$store.getters.userInfo || {};
     this.getDetail()
  },
  methods: {
    getDetail(){
      let data={
        deptId:this.userInfo.userDeptId
      }

      ruleOemDetail(data).then(res=>{
        if(res.code==0){
          console.log(res.data)
         this.hosts.followNum=res.data.followNum;
         this.id=res.data.id;
        }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
        }
      })
    },
    save(rules){
     
      let data={
        deptId:this.userInfo.userDeptId,
        userId:this.userInfo.userId,
        id:this.id,
        followNum:this.hosts.followNum
      }
      ruleOemSave(data).then(res=>{
        if(res.code==0){
          this.$notify({
            message: '保存成功',
            type: "success",
          });
          this.modified=false;
        }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
        }
      })
    },
    cancel(){
      this.$message('已取消此操作')
    }
  }
}
</script>
<style scoped>
  .mar-top{
    margin-top: 20px
  }
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-header .title{
    font-weight: 600
  }
  .subtitle{
    font-weight: 600;
    font-size: 16px;
  }
  .set{
    display: flex;
    justify-content: space-between;
  }
  .two-sub{
    display: flex;
  }
  .two-sub span{
    flex: 1
  }
  /deep/ .set .el-form-item{
    flex: 1
  }
  /deep/ .el-form-item__label{
    width:170px;
    text-align: left
  }

  .btn{
    text-align: center;
    margin-top: 50px;
  }
  .search-btn{
    width:100px;
    background: #43425D;
    border: 0;
    margin-left: 20px;
  }
  .reset-btn{
    width:100px;
    background:#E7E9F0;
    border: 0
  }
</style>