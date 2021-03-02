<template>
  <div class="topNavBox">
    <div class="left-shopInfo">
      <!-- Logo -->
      <div class="logoImg">
        <img :src="companyInfo['companyLogo']" class="sidebar-logo" />
      </div>
      <!-- 系统名称 -->
      <div class="sysTitle">{{companyInfo['deptName']}}</div>
    </div>
    <div class="right-user">
      <div class="searchBox">
        <!-- <el-input
          placeholder="请输入客户名字"
          prefix-icon="el-icon-search"
          suffix-icon="el-icon-arrow-down"
          v-model="customerName"
        /> -->
        <!-- @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin" -->
      </div>
      <div class="badgeBox">
        <!-- <el-badge :value="clipboardSum" :max="99" style="margin-right: 50px">
          <span><svg-icon icon-class="clipboard" />事项</span>
        </el-badge> -->
        <el-badge :value="messageSum" :max="99">
          <span><svg-icon icon-class="message" />消息</span>
        </el-badge>
      </div>
      <!-- 用户信息部分 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userInfo.userName || 'Admin'}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
          <el-dropdown-item @click.native="resetPassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img src="@/assets/images/user.png" alt="" class="headerImg" />
    </div>
    <el-dialog
      title="修改密码"
      :visible.sync="resetPasswordVisible"
      width="23%"
      append-to-body
      top="30vh"
      :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules" class="password-form">
          <el-form-item label="原密码" prop="oldPassword">
            <div class="password-status" v-if="oldOpen">
              <el-input type="text" v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
              <svg-icon icon-class="open_eye" @click="eyeStatus" />
            </div>
            <div class="password-status" v-else>
              <el-input type="password" v-model="form.oldPassword" placeholder="请输入原密码"></el-input>
              <svg-icon icon-class="close_eye" @click="eyeStatus" />
            </div>
          </el-form-item>
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
            <el-button size="mini" type="text" @click="resetPasswordVisible=false">取消</el-button>
            <el-button size="mini" type="text" @click="submit" :disabled="submit_loading">确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import {changePassword} from '../../../service/api/index'
export default {
  name: "TopNav",
  components: {},
  props: {},
  data() {
    return {
      resetPasswordVisible:false,
      customerName: "",
      clipboardSum: 500,
      messageSum: "",
      userInfo: {},
      oldOpen:false,
      openEye:false,
      open:false,
      companyInfo: {},
      submit_loading:false,
      form:{
        oldPassword:'',
        newPassword:'',
        alignNewPassword:''
     },
     rules:{
       oldPassword: [{
          required: true,
          message: '请输入原密码',
          trigger: 'blur'
      }],
      newPassword: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
      }],
      alignNewPassword: [{
          required: true,
          message: '请再次输入新密码',
          trigger: 'blur'
      }]
     }
    };
  },
  mounted(){
    this.userInfo = this.$store.getters.userInfo
    this.companyInfo = this.$store.getters.companyInfo
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    },
    resetPassword(){
      this.resetPasswordVisible=true;
    },
    changeStatus(){ //新密码可见/隐藏
      this.openEye=!this.openEye
    },
    submit(){
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let obj = {}
          obj['oldPassword'] = this.form['oldPassword']
          obj['newPassword'] = this.form['newPassword']
         
          if(this.form.newPassword!=this.form.alignNewPassword){
            this.$notify({
              title: '错误',
              message: '新密码和确认新密码填写不一致',
              type: 'error'
            });
          }else{
            this.submit_loading = true
           // this.$store.dispatch('user/changeNormalPssword', obj)
           console.log(obj)
           changePassword(obj).then((res) => {
                if (res.code==0) {
                  this.$notify({
                    title: '成功',
                    message: '修改密码成功',
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
      });
    },
    changeS(){     //确认新密码可见/隐藏
      this.open=!this.open
    },
    eyeStatus(){    //原密码可见/隐藏
      this.oldOpen=!this.oldOpen
    },
    // cancel(){
    //   this.resetPasswordVisible=false;
    //   if(this.resetPasswordVisible==false){
    //     this.$refs.form.resetFields()
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
$textColor: #43425d;

.topNavBox {
  width: 100%;
  height: 70px;
  background: #fff;
  display: flex;
  display: -webkit-flex;
  display: -webkit-inline-flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: 999;
  cursor: pointer;

  .left-shopInfo {
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
    align-items: center;
    height: 70px;

    .logoImg {
      width: 140px;
      box-sizing: border-box;

      .sidebar-logo {
        width: 55px;
        height: 34px;
        margin: 0 auto;
        display: block;
      }
    }

    .sysTitle {
      font-size: 22px;
      margin-right: 10px;
      cursor: pointer;
      color: $textColor;
    }
  }


  .right-user {
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;
    align-items: center;
    height: 70px;
    color: $textColor;

    .searchBox {
      width: 197px;
      height: 32px;
      margin-right: 50px;

      /deep/.el-input__inner {
        height: 32px;
        line-height: 32px;
      }
      /deep/.el-input__icon {
        line-height: 32px;
      }
    }

    .badgeBox {
      margin-right: 50px;

      .svg-icon {
        margin-right: 5px;
      }
    }

    .headerImg {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ccc;
      margin: 18px;
    }
  }
}

.sysTitle span {
  font-weight: bold;
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
/deep/ .reset-password .el-button:first-child span{
  border-right: 1px solid #D7DAE2;
  color:#43425D
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

