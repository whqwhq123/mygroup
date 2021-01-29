<template>
  <div>
    <div class="login_left"></div>
    <div class="login_right">
      <img src="../../assets/images/login_logo.png" />
      <div class="title">欢迎使用寻道管理系统</div>
      <div class="login_form">
        <el-form class="company_form" ref="form" :model="form" :rules="rules">
          <el-form-item prop="userPhone">
            <el-input v-model="form['userPhone']" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="userPassword">
            <el-input type="password" v-model="form['userPassword']" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit()" :loading="submit_loading" :disabled="submit_loading">保存</el-button>
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
      return {
        form: {
          userPhone: '',
          userPassword: ''
        },
        list: [],
        rules: {
          userPhone: [{
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          }, {
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: '请输入手机号'
          }],
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

    },
    methods: {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let obj = {}
            obj['userPhone'] = this.form['userPhone']
            obj['userPassword'] = this.form['userPassword']

            this.submit_loading = true
            this.$store.dispatch('user/userLogin', obj)
              .then(() => {
                this.$router.push('/')
                this.submit_loading = false
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
</style>
