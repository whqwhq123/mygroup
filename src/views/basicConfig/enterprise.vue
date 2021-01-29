<template>
  <div>
    <div class="content">
      <el-form class="company_form" ref="form" :model="form" label-width="120px">
        <el-form-item label="企业logo" required>
          <div class="upload_left">
            <div class="uploader" @click="select_file()">
              <input type="file" name="file" id="file" @change="upload()" value="" hidden="hidden" />
              <img v-if="form['companyLogo']" :src="form['companyLogo']" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
            <div class="upload_text">上传图片</div>
          </div>
          <div class="upload_right">图片格式：.jpg、png、gif，大小5M以内</div>
          <div class="clear"></div>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input size="small" v-model="form.deptName" placeholder="请输入企业名称" style="width: 280px;"></el-input>
        </el-form-item>
        <el-form-item label="组织级别">
          <el-select size="small" v-model="form.deptLevel  " placeholder="请选择组织级别" style="width: 280px;">
            <el-option :label="value['name']" :value="value['value']" v-for="value in option_type" :key="value['value']"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业电话">
          <el-input size="small" v-model="form.companyPhone" placeholder="请输入企业电话" style="width: 280px;"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-input size="small" v-model="form.companyAddr" placeholder="请输入企业地址" style="width: 280px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit()" :loading="submit_loading" :disabled="submit_loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {
    companyEdit,
    companyQuery,
    LoginApplication
  } from "@/service/api/index";
  export default {
    data() {
      return {
        form: {},
        submit_loading: false,
        option_type: [{
          name: '厂商',
          value: '20'
        }, {
          name: '集团',
          value: '30'
        }, {
          name: '大区',
          value: '40'
        }, {
          name: '经销商',
          value: '50'
        }, {
          name: '二级经销商',
          value: '60'
        }]
      }
    },
    created() {
      this.get_content()
    },
    methods: {
      select_file() {
        document.getElementById('file').click()
      },
      upload() {
        let that = this
        LoginApplication().then((res) => {
          if (res.code == 0) {
            let OSS = require("ali-oss");
            let sts = new OSS({
              region: "oss-cn-beijing",
              accessKeyId: res.data.credentials.accessKeyId,
              accessKeySecret: res.data.credentials.accessKeySecret,
              stsToken: res.data.credentials.securityToken,
              bucket: "dssp-pcm",
            });
            let file = document.getElementById("file").files[0];
            sts.multipartUpload(file.name, file)
              .then(function(res) {
                that.form['companyLogo'] = res.res.requestUrls[0]
                that.form = JSON.parse(JSON.stringify(that.form))
              })
              .catch((err) => {
                that.$notify.error({
                  title: "错误",
                  message: "请检查网络设置",
                });
              });
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            });
          }
        })
      },
      get_content() {
        let obj = {}
        companyQuery(obj).then((res) => {
          if (res.code == 0 && res.data != null) {
            this.form = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            })
          }
        })
      },
      submit() {
        let obj = {}
        obj['curUserId'] = this.$store.getters.userInfo['userId']
        obj['deptName'] = this.form['deptName']
        obj['deptLevel'] = this.form['deptLevel']
        obj['companyLogo'] = this.form['companyLogo']
        obj['companyPhone'] = this.form['companyPhone']
        obj['companyAddr'] = this.form['companyAddr']
        this.submit_loading = true
        companyEdit(obj).then((res) => {
          this.submit_loading = false
          if (res.code == 0) {
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success"
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            });
          }
        })
      }
    }
  }
</script>

<style scoped>
  .content {
    width: 600px;
    padding-top: 45px;
    padding-left: 400px;
  }

  .company_form .uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: #F5F6FA;
  }

  .company_form .avatar-uploader-icon {
    font-size: 28px;
    color: #D7DAE2;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .company_form .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }

  /deep/.company_form .el-form-item {
    margin-bottom: 32px;
  }

  /deep/.company_form .el-form-item__label {
    font-size: 16px;
    color: #4D4F5C;
    font-weight: 500;
    line-height: 30px;
  }

  /deep/.company_form .el-button--primary {
    background: #43425D;
    border: #43425D;
  }

  .upload_left {
    width: 82px;
    float: left;
  }

  .upload_text {
    text-align: center;
    color: #4D4F5C;
    font-size: 13px;
    opacity: 0.5;
    line-height: 22px;
  }

  .upload_right {
    float: left;
    width: 300px;
    color: #4D4F5C;
    font-size: 13px;
    opacity: 0.5;
    line-height: 80px;
    margin-left: 12px;
  }

  /deep/.company_form .el-form-item__content {
    line-height: 20px;
  }
</style>
