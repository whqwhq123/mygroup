<template>
  <div>
    <div class="login_left"></div>
    <div class="login_right">
      <img src="../../assets/images/login_logo.png" />
      <div class="title">欢迎使用寻道管理系统</div>
      <div class="login_form">
        <el-form class="company_form forgot" ref="form" :model="form" :rules="rules">
          <el-form-item prop="userPhone">
            <el-input v-model="form['userPhone']" maxlength="11" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input type="password" v-model="form['userPassword']" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()" :loading="submit_loading" :disabled="submit_loading">登录</el-button>
          </el-form-item>
          <el-form-item class="forgot-btn">
            <el-button type="text" @click="toggle">忘记密码</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
  import {
    login
  } from "@/service/api/index";
  import qs from 'qs'


  export default {
    data() {
      var validUser = (rule,value,callback) => {
          if(!value) {
              return callback(new Error('手机号不能为空'));
          }else{
            if(value=='admin'){
              callback()
            }else{
              const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
              if(reg.test(value)) {
                  callback();
              }else{
                  return callback(new Error('手机号或用户名不正确'));
              }
            }
          }  
      }
      return {
        form: {
          userPhone: '',
          userPassword: ''
        },
        list: [],
        rules: {
          userPhone: [
            {
            required: true,
            validator:validUser,
            trigger: 'blur'
           },
          //  {
          //   pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
          //   message: '请输入手机号'
          //  }
          ],
          userPassword: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }]
        },
        submit_loading: false
      }
    },
    created() {
       // console.log(this.$route,"this.$routethis.$routethis.$route");
    },
    methods: {
      toggle(){
       this.$router.push({name:'resetPassword'})
      },
      submit() {
       
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {}

            obj['userPhone'] = this.form['userPhone']
            obj['userPassword'] = this.form['userPassword']
            this.submit_loading = true
            this.$store.dispatch('user/userLogin', obj)
              .then((res) => {
                if (res.code==0) {
                  this.$notify({
                    title: '成功',
                    message: '登录成功',
                    type: 'success'
                  });
                }else{
                  this.$notify.error({
                    title:'提示',
                    message: res.errMsg
                  });
                }
                this.$router.push('/')
                this.submit_loading = false
              })
          }
        });
      }
    }
  }
</script>

<style scoped>
 
  .title {
    color: #43425D;
    font-size: 30px;
    line-height: 30px;
    padding-top: 72px;
    text-align: center;
    padding-bottom: 62px;
  }

  .login_left {
    width: 50%;
    height: 100vh;
    float: left;
    background: url(../../assets/images/login.png) no-repeat #3B86FF;
    background-size: 100%;
  }

  .login_right {
    width: 50%;
    height: 100vh;
    box-sizing: border-box;
    float: left;
    padding-top: 235px;
    background: #F9F9FB;
  }

  .login_right img {
    width: 87px;
    height: 54px;
    display: block;
    margin: 0 auto
  }

  /deep/.login_form .el-form-item {
    margin-bottom: 30px;
  }

  /deep/.login_form .el-input__inner {
    line-height: 70px;
    height: 70px;
    font-size: 22px;
  }

  /deep/.login_form .el-form-item__content {
    width: 620px;
    margin: 0 auto;
  }

  /deep/.login_form .el-button {
    line-height: 68px;
    height: 70px;
    padding: 0;
    width: 620px;
    font-size: 26px;
  }

  /* 修改密码 */
  /deep/ .forgot-btn .el-button--text{
    width:auto;
    text-align: right;
  }
  .forgot-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 30px;
  }
  .login_right .forgot-title img{
    width:67px;
    height: 42px;
    margin: 0;
  }
  .align-login{
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .clickzm{
    background: #D7DAE2;
    color:#43425D;
  }
  .verification{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
  }
  .verification .el-button{
    width:140px;
    background: #E4E6ED;
    border: 0;
    height: 56px;
    line-height: 56px;
    color: #43425D;
    font-size: 22px;
    position: absolute;
    right: 5px;
    z-index: 99;
  }
  .forgot .forgot-btn{
    text-align: right;
  }
  /deep/ .align-login .el-button{
    width: auto;
    height: auto;
    line-height: 0;
    font-size: 16px;
  }
</style>
