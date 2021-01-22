<template>
  <div class="wrap">
    <div class="header-wrap">
      <div class="main-header">
        <div class="main-header-left">
          <img src="../image/right-icon.png" @click="goBack" alt />
        </div>
        <div class="main-header-center">我的订单</div>
        <div class="main-header-menu"></div>
      </div>
    </div>
    <div class="consumer-list-wrap">
      <div class="gap-line"></div>
      <div class="order-satus">
        <div class="inner-line"></div>
        <div class="order-status-img">
          <el-upload :action="updateInfoUrl" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <div class="img-inner">
             <img v-if="params.verificationBill" :src="params.verificationBill" class="avatar">
              <div v-else>
              <img src="../image/upload.png" alt />
              <span>上传发票信息</span>
              </div>
            </div>
          </el-upload>

          <div class="isLoading" v-if="isLoading">
            <van-loading size="24px" type="spinner" vertical>
              <span>加载中...</span>
            </van-loading>
          </div>
        </div>

        <ul class="message-input">
          <li class="input">
            <span class="input-txt">收款信息</span>
          </li>
          <li class="input">
            <span class="input-txt">姓名：</span>
            <input type="text" placeholder="请输入姓名" v-model="params.verificationName" />
          </li>
          <li class="input">
            <span class="input-txt">收款卡号：</span>
            <input type="text" placeholder="请输入收款卡号" v-model="params.verificationCarNumber" />
          </li>
          <li class="input">
            <span class="input-txt">开户行：</span>
            <input type="text" placeholder="请输入收款卡号开户行全称" v-model="params.verificationBank" />
          </li>
        </ul>
        <ul class="warn-list">
          <li>说明：</li>
          <li>1.仅限支持银联支持的银行卡且需要保证以上信息完全正确；</li>
          <li>2.发票中姓名须与所留信息中姓名一致</li>
        </ul>
      </div>
    </div>
    <div class="submit" @click="commit">提交</div>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, Picker, area, Toast, Loading } from "vant";
import { mapGetters, mapActions, mapMutations } from "vuex";
import { uploadVerificationInfo } from "@/service/api/index";
Vue.use(Loading);
import { Upload } from "element-ui";
Vue.use(Upload);

import axios from "axios";
export default {
  data() {
    return {
      updateInfoUrl: "http://106.75.24.38:19090/yzf/file/fileUpload",
      currentType: "",
      files: [],
      avatar: "",
      isLoading: false,
      params: {
        couponOrderNo: this.$route.query.couponOrderNo,
        verificationBill: null,
        verificationName: "",
        verificationCarNumber: "",
        verificationBank: ""
      }
    };
  },
  created() {
    if (this.$route.query.type == "edit") {
      this.params = this.$route.query;
    }
    delete this.params.type;
  },
  methods: {
    commit() {
      var obj = this.params;
      var reg = /(^\s)|(\s$)/;
      if (!obj.verificationBill) {
        Toast(`请上传核销信息`);
      } else if (!obj.verificationName) {
        Toast(`请输入姓名`);
      } else if (reg.test(obj.verificationName)) {
        Toast(`姓名首尾不能存在空格`);
      } else if (!obj.verificationCarNumber) {
        Toast(`请输入收款卡号`);
      } else if (!obj.verificationBank) {
        Toast(`请输入开户行`);
      } else {
        uploadVerificationInfo(obj).then(res => {
          if (res.code == 0) {
            Toast(`提交成功`);
            this.$router.push("/orderList");
          }
        });
      }
    },
    beforeAvatarUpload(file) {
      // 图片不大于4m,宽度不大于2000
      return new Promise((resolve, reject) => {
        const isJPG = file.type === "image/png" || file.type === "image/jpeg";
        let _URL = window.URL || window.webkitURL;
        const isLt2M = file.size / 1024 / 1024 > 2; // 判定图片大小是否小于4MB
        // 这里需要计算出图片的长宽
        let img = new Image();
        if (!isJPG) {
          reject("上传图片只能是 PNG/JPG 格式!");
        }
        img.onload = function() {
          file.width = img.width; // 获取到width放在了file属性上
          file.height = img.height; // 获取到height放在了file属性上
          let valid = img.width > 2000; // 图片宽度大于2000
          // console.log(11, file)
          // 这里我只判断了图片的宽度,compressAccurately有多个参数时传入对象
          if (valid || isLt2M) {
            imageConversion
              .compressAccurately(file, {
                size: 400,
                width: 2000
              })
              .then(res => {
                // console.log(33, res)
                resolve(res);
              });
          } else resolve(file);
        };
        // 需要把图片赋值
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return true;
        },
        error => {
          this.$message.error(error);
          return Promise.reject();
        }
      );
      return isSize;
    },
    handleAvatarSuccess(res, file) {
      if (res.code === 0) {
        this.params.verificationBill = res.data;
      }
    },
    goBack() {
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/.el-upload__input {
  display: none;
}
/deep/.el-upload {
  width: 100%;
    height: 192px;
}
/deep/.el-upload .el-upload--text{
  width: 100%;
  height: 192px;
}
.img-inner {
  width: 100%;
  span {
    font-size: 24px;
    color: #7b7b7b;
  }
}
.isLoading {
  width: 685px;
  height: 192px;
  position: absolute;
  left: 40px;
  top: 153px;
  border-radius: 8px;
  padding-top: 50px;
  box-sizing: border-box;
}
.order-status-img /deep/ .van-uploader {
  width: 680px;
  height: 192px;
  background: none;
  border: 1px dashed #ccc;
  border-radius: 8px;
  .van-uploader__wrapper {
    width: 680px;
    height: 192px;
    .van-uploader__input-wrapper {
      width: 680px;
      height: 192px;
      p {
        width: 100%;
        text-align: center;
        padding-top: 40px;
        box-sizing: border-box;
        img {
          width: 58px;
          height: 51px;
        }
        span {
          display: inline-block;
          position: relative;
          top: -15px;
          left: 20px;
          font-size: 24px;
          color: #7b7b7b;
        }
      }
    }
  }
}
.order-status-img .avatar {
  width: 680px;
  height: 192px;
  border-radius: 8px;
}
.wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .header-wrap {
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px;
      height: 88px;
      z-index: 1000;

      .main-header-left {
        width: 30%;
        img {
          height: 34px;
          margin-right: 42px;
        }
      }
      .main-header-center {
        font-size: 36px;
        font-weight: 500;
        color: #1a1a1a;
      }
      .main-header-menu {
        width: 30%;
        text-align: right;
        img {
          height: 24px;
        }
      }
    }
    .admin {
      display: flex;
      padding: 48px 0 80px 40px;
      align-items: center;
      .admin-img {
        width: 112px;
        height: 112px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 30px;
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .admin-info {
        position: relative;
        height: 112px;
        display: flex;
        align-items: center;
        .admin-info-name {
          font-size: 44px;
          color: #1a1a1a;
          padding-right: 28px;
        }
        .admin-info-phone {
          font-size: 28px;
          color: #1a1a1a;
          margin-bottom: -8px;
        }
        .admin-info-map {
          position: absolute;
          left: 0;
          bottom: -28px;
          display: flex;
          align-items: center;
          img {
            height: 30px;
            margin-right: 6px;
          }
        }
      }
    }
  }
  .gap-line {
    width: 100%;
    height: 20px;
    background: #f8f8f8;
  }
  .consumer-list-wrap {
    overflow-y: scroll;
    flex: 1;
    .order-satus {
      .order-satus-header {
        padding: 36px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-size: 30px;
          color: #1a1a1a;
        }
      }
      .inner-line {
        width: 100%;
        height: 2px;
        background: #e3e3e3;
      }
      .order-status-img {
        box-sizing: border-box;
        padding: 40px 40px 0 40px;
        width: 100%;
      }
      .message-input {
        background: #fff;
        .input {
          position: relative;
          display: flex;
          align-items: center;
          padding: 40px;
          input {
            flex: 1;
            border: none;
            outline: none;
            color: #b1b1b1;
            font-size: 26px;
          }
          .input-txt {
            display: block;
            flex-grow: 0;
            width: 120px;
            font-size: 24px;
            line-height: 54px;
            color: rgba(26, 26, 26, 1);
          }
          .select-wrap {
            display: flex;
            i {
              display: inline-block;
              width: 174px;
              height: 60px;
              line-height: 60px;
              text-align: center;
              color: #1a1a1a;
              font-size: 26px;
              border: 2px solid #e1e0e5;
              border-radius: 30px;
              margin-right: 60px;
            }
            .active-sex {
              display: inline-block;
              color: #ff5253;
              border: 2px solid #ff5253;
            }
          }
          .input-code {
            position: absolute;
            right: 40px;
            width: 174px;
            height: 60px;
            text-align: center;
            border: 2px solid rgba(255, 58, 58, 1);
            border-radius: 30px;
            font-size: 26px;
            line-height: 60px;
            color: rgba(255, 58, 58, 1);
          }
          .input-right {
            position: absolute;
            right: 40px;
            img {
              width: 22px;
            }
          }
          .input-map {
            position: absolute;
            right: 40px;
            display: flex;
            align-items: center;
            font-size: 13px;
            color: rgba(52, 52, 52, 1);
            img {
              height: 36px;
              margin-left: 4px;
            }
          }
        }
        .line {
          box-sizing: border-box;
          padding: 0 20px;
          width: 100%;
          margin-bottom: 48px;
          span {
            display: block;
            width: 100%;
            height: 2px;
            background: #f4f4f4;
          }
        }
      }
      .warn-list {
        padding: 0 40px;
        li {
          list-style: none;
          font-size: 24px;
          color: #ff3a3a;
          margin-bottom: 30px;
        }
      }
    }
  }
  .submit {
    position: fixed;
    width: 100vw;
    height: 96px;
    bottom: 0;
    left: 0;
    line-height: 96px;
    text-align: center;
    font-size: 32px;
    color: #fff;
    background: linear-gradient(
      90deg,
      rgba(254, 89, 75, 1) 0%,
      rgba(233, 45, 66, 1) 100%
    );
    opacity: 1;
  }
}
</style>
