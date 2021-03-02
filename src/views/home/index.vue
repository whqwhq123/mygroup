<template>
  <div class="welcome">
    <ul class="top">
      <li>{{userInfo.userName}}</li>
      <li>欢迎使用本系统</li>
    </ul>
    <el-row :gutter="30" style="margin-top: 50px;">
      <el-col :span="8">
        <div class="content">
          <p class="blue">
            <svg-icon icon-class="xiansuo"></svg-icon>
          </p>
          <p>线索管理</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content">
          <p class="blue">
            <svg-icon icon-class="huodong"></svg-icon>
          </p>
          <p>活动管理</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content">
          <p class="blue">
             <svg-icon icon-class="zuzhi"></svg-icon>
          </p>
          <p>组织管理</p>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="修改密码"
      :visible.sync="changeNormalPassword"
      width="450px"
      append-to-body
      :close-on-click-modal="false"
      :show-close="false"
      top="30vh"
      :before-close="handleClose">
        <div style="font-size:14px;color:#FF7065;position: absolute;top: 60px;">请先修改默认密码后再使用</div>
        <el-form :model="form" ref="form" :rules="rules" class="password-form">
          <el-form-item label="新密码" prop="newPassword">
            <div class="password-status" v-if="openEye">
              <el-input type="text" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
              <svg-icon icon-class="open_eye" @click="changeStatus" />
            </div>
            <div class="password-status" v-else>
              <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
              <svg-icon icon-class="close_eye" @click="changeStatus" />
            </div>
          </el-form-item>
          <el-form-item label="确认新密码" prop="alignNewPassword">
            <div class="password-status" v-if="open">
              <el-input type="text" v-model="form.alignNewPassword" placeholder="请再次输入新密码"></el-input>
              <svg-icon icon-class="open_eye" @click="changeS" />
            </div>
            <div class="password-status" v-else>
              <el-input type="password" v-model="form.alignNewPassword" placeholder="请再次输入新密码"></el-input>
              <svg-icon icon-class="close_eye" @click="changeS" />
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer reset-password">
          <el-button size="mini" type="text" @click="submit" :disabled="submit_loading">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
import {defaultPassword} from '../../service/api/index'
export default {
  name: 'home',
  data() {
    return {
     changeNormalPassword:false,
     openEye:false,
     open:false,
     userInfo:{},
     submit_loading:false,
     form:{
       newPassword:'',
       alignNewPassword:''
     },
     rules:{
        newPassword: [{
            required: true,
            message: '请输入新密码',
            trigger: 'blur'
        }],
        alignNewPassword: [{
            required: true,
            message: '请再次输入新密码',
            trigger: 'blur'
        }],
     }
    }
  },
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
  },
  created() {
    this.userInfo = this.$store.getters.userInfo || {};
    this.changeNormalPassword=this.userInfo.defaultPassword==1?true:false;
   
  },
  methods: {
    changeStatus(){
      this.openEye=!this.openEye
    },
    changeS(){
      this.open=!this.open
    },
    submit(){
       this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = {}
          obj['password'] = this.form['newPassword']
          console.log(obj)
         
          if(this.form.newPassword!=this.form.alignNewPassword){
            this.$notify({
              title: '错误',
              message: '新密码和确认新密码填写不一致',
              type: 'error'
            });
          }else{
            if(this.form['newPassword']=='123456'){
              this.$notify({
                title: '错误',
                message: '新密码不能与默认密码重复',
                type: 'error'
              });
            }else{
              this.submit_loading = true;
              //this.$store.dispatch('user/changeNormalPssword', obj)
              defaultPassword(obj).then((res) => {
                console.log(res)
                  if (res.code==0) {
                    this.$notify({
                      title: '成功',
                      message: '密码修改成功',
                      type: 'success'
                    });
                    this.$router.push({name:'login'})
                    this.submit_loading = false
                  }else{
                    this.$notify.error({
                      title:'提示',
                      message: res.errMsg
                    });
                    this.submit_loading = false
                  }
              })
            }
          }
        }
      });
    }
  }
}
</script>
<style scoped>
  p{
    margin: 0;
    padding: 0
  }
  .welcome{
    padding: 50px;
    height: 600px;
  }
  .top li{
    font-size: 30px;
    color:#43425D;
    margin:22px 0;
    text-align: center
  }
  .content{
    text-align: center;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }
  .blue{
    height:246px;
    background: linear-gradient(180deg, #3B86FF 0%, #4C91EE 100%);
    color: white;
    font-size: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .content :last-child{
    height: 60px;
    line-height: 60px;
  }
  /deep/ .el-dialog__footer{
  padding: 0
}
.reset-password{
  display: flex;
  background: #F5F6FA;
  padding: 0;
  height: 50px;
}
.password-status{
  width:380px;
  position: relative;
}
/deep/ .reset-password .el-button{
  flex: 1;
}
/deep/ .reset-password .el-button span{
  display:block;
  font-size: 16px;
}
.password-form{
  margin-top: 30px;
}
/deep/ .password-form .el-form-item__label{
  width:100px;
}
/deep/ .password-form .el-input{
  width:280px;
}
/deep/ .password-form .svg-icon{
  font-size: 16px;
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
