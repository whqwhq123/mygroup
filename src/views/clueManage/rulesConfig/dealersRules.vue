<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">时间/周期规则配置</span>
    </el-header>
    <el-row style="margin-top: 20px">
      <el-col :span="8" style="height: 10px"></el-col>
      <el-col :span="8">
        <el-form :model="rules" ref="rules" :rules="rule">
          <el-form-item label="线索分配流程：" prop="process">
            <el-select size="small" v-model="rules.process" placeholder="请选择线索分配流程" style="width:280px">
              <el-option v-for="item in deliveryProcess" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上班时间：">
            <el-input size="small" placeholder="08:30" style="width:280px" suffix-icon="el-icon-time" v-model="rules.workTime"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" style="height: 10px"></el-col>
    </el-row>
    <div class="btn">
      <el-button class="reset-btn" size="small" @click="cancel">取消</el-button>
      <el-button class="search-btn" type="info" size="small" @click="save(rules)">保存</el-button>
    </div>
  </el-main>
</template>

<script>
export default {
  data(){
    return {
      modified:true,
      rules:{
        process:'DCC-销售经理-销售顾问',
        workTime:'09:00',
      },
      deliveryProcess:[
        'DCC-销售经理-销售顾问',
        'DCC-销售顾问',
        '销售经理-销售顾问'
      ],
      rule:{
          process:[
            { required: true, message: '请选择分配流程', trigger: 'change' }
          ],
        //   workTime: [
        //     { required: true, message: '请输入时间', trigger: 'blur' }
        // ]
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
  methods: {
    save(rules){
      this.modified=false;
      let that=this;
       that.$refs.rules.validate((valid) => {
         if(valid){
           that.$message({
              type:'success',
              message:'保存成功'
            })
         }else{
           return false
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
  /deep/ .el-form-item__label{
    width:140px;
    text-align: left;
    color: #4D4F5C;
    font-size: 16px;
  }
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-header .title{
    font-weight: 600
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