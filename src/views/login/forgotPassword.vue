<template>
  <div>
    <div class="login_left"></div>
    <div class="login_right">
      <div class="login_form">
        <el-form class="company_form" ref="forgot" :model="forgot" :rules="password">
          <el-form-item>
            <div class="forgot-title">
              <span>修改密码</span>
              <img src="../../assets/images/login_logo.png" />
            </div>
          </el-form-item>
          <el-form-item prop="userPhone">
            <el-input v-model="forgot.userPhone" maxlength="11" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item class="input-group" prop="verificationCode">
            <div class="verification">
              <el-input  type="text" placeholder="请填写验证码" maxlength="4" show-word-limit class="yzm" v-model="forgot.verificationCode">
              </el-input>
              <el-button type="primary" class="clickYzm" @click.stop="sendCode" :disabled="isclick">{{verificationText}}</el-button>
            </div>
          </el-form-item>
          <el-form-item prop="userPassword">
            <div class="password-status" v-if="openEye">
              <el-input type="text" v-model="forgot.userPassword" maxlength="20" show-word-limit placeholder="设置密码(6~20个字符)"></el-input>
              <svg-icon icon-class="open_eye" @click="changeStatus" />
            </div>
            <div class="password-status" v-else>
              <el-input type="password" v-model="forgot.userPassword" maxlength="20" show-word-limit placeholder="设置密码(6~20个字符)"></el-input>
              <svg-icon icon-class="close_eye" @click="changeStatus" />
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changeSubmit()" :loading="submit_loading" :disabled="submit_loading">确认修改</el-button>
          </el-form-item>
          <el-form-item>
            <div class="align-login">
              <span>已有账号？</span>
              <el-button type="text" @click="goLogin(forgot)" style="color:#3B86FF;cursor: pointer;margin-left:10px">登录</el-button>
              </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="clear"></div>
    <el-dialog
      :visible.sync="resetPasswordVisible"
      width="16%"
      center
      top="30vh"
      :before-close="handleClose">
        <img src="../../assets/images/success1.png" style="width:108px;height:108px;"></img>
        <el-form>
          <el-form-item>
             <span style="font-size:18px;">修改密码成功</span>
          </el-form-item>
          <el-form-item>
            <span style="font-size:14px;">您的密码已经修改生效，请重新登录</span>
          </el-form-item>
          <el-button size="mini" type="primary" @click="goLogin" style="border:0;background: #43425D">登录</el-button>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {
    verificationCode,confirmChangePassword
  } from "@/service/api/index";
  import qs from 'qs'


  export default {
    data() {
      return {
        resetPasswordVisible:false,
        openEye:true,
        verificationText:'获取验证码',
        isclick:false,
        form: {
          userPhone: '',
          userPassword: ''
        },
        forgot:{
          userPhone:'',
          verificationCode:'',
          userPassword:''
        },
        password: {
          userPhone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, 
          {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '请输入手机号'
          }
          ],
          verificationCode: [{
            required: true,
            message: '请输入短信验证码',
            trigger: 'blur'
          }],
          userPassword: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            pattern:/^[\x21-\x7E]{6,20}$/,
            message:'请输入6-20位的字符'
          }]
        },
        submit_loading: false
      }
    },
    created() {
       // console.log(this.$route,"this.$routethis.$routethis.$route");
    },
    methods: {
      sendCode () {
       verificationCode(this.forgot.userPhone).then(res => {
          if(res.code==0){
            if (!this.isclick) {
              this.isclick = true
              this.getYzm(60)
            } else {
              return false
            }
          }else{
            this.$notify({ 
              type: 'error', 
              message:res.errMsg
             })
          }
        }).catch(res => {
          if (res.status !== 200) {
            this.$notify({ type: 'error', title: '失败', message: '获取验证码失败，' + res.message })
          }
        })
      },
      getYzm (i) {
        if (i > 1) {
          i--
          this.verificationText = i + 's后获取'
          setTimeout(() => {
            return this.getYzm(i)
          }, 1000)
        } else {
          this.verificationText = '获取验证码'
          this.isclick = false
          return true
        }
      },
      changeStatus(){
        this.openEye=!this.openEye
      },
      changeSubmit() {
        this.$refs.forgot.validate((valid) => {
          if (valid) {
            let obj = {}
            obj['userPhone'] = this.forgot['userPhone']
            obj['userPassword'] = this.forgot['userPassword']
            obj['verificationCode'] = this.forgot['verificationCode']
            this.submit_loading = true;
          //  console.log(obj)
            confirmChangePassword(obj).then((res) => {
            //    console.log(res)
               if(res.code==0){
                 this.$refs.forgot.resetFields();
                 this.resetPasswordVisible=true;
                 this.submit_loading = false;
               }else{
                  this.$notify.error({
                    title: '错误',
                    message: res.errMsg,
                  });
                  this.submit_loading = false;
               }
               
              })
              .catch(() => {
                this.submit_loading = false
                this.$notify.error({
                  title: '错误',
                  message: res.data.message,
                });
              })
          }
        });
      },
      goLogin(forgot){
       
        this.$router.push({name:'login'})
        
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
    width: 65%;
    margin: 0 auto;
  }

  /deep/.login_form .el-button {
    line-height: 68px;
    height: 70px;
    padding: 0;
    width: 100%;
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
  /deep/ .el-input .el-input__clear{
    font-size: 25px;
    margin-right: 5px;
  } 
  /deep/ .password-status .svg-icon{
    font-size: 39px;
    position: absolute;
    right: 15px;
    top: 15px;
    z-index: 99;
  }
  /deep/ .el-dialog__body{
    text-align: center
  }
</style>
