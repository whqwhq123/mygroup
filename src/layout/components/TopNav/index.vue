<template>
  <div class="topNavBox">
    <div class="left-shopInfo">
      <!-- Logo -->
      <div class="logoImg">
        <img :src="logo" class="sidebar-logo" />
      </div>
      <!-- 系统名称 -->
      <div class="sysTitle">{{ title }}</div>
    </div>
    <div class="right-user">
      <div class="searchBox">
        <el-input
          placeholder="请输入客户名字"
          prefix-icon="el-icon-search"
          suffix-icon="el-icon-arrow-down"
          v-model="customerName"
        />
        <!-- @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin" -->
      </div>
      <div class="badgeBox">
        <el-badge :value="clipboardSum" :max="99" style="margin-right: 50px">
          <span><svg-icon icon-class="clipboard" />事项</span>
        </el-badge>
        <el-badge :value="messageSum" :max="99">
          <span><svg-icon icon-class="message" />消息</span>
        </el-badge>
      </div>
      <!-- 用户信息部分 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          Admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <img src="@/assets/images/user.png" alt="" class="headerImg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
  components: {},
  props: {},
  data() {
    return {
      title: "运营管理系统",
      logo: require("@/assets/images/saaslogo.png"),
      customerName: "",
      clipboardSum: 500,
      messageSum: "",
    };
  },
  methods: { 
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login`)
    }
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
  z-index: 999;
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
</style>
<style lang="scss">
.sysTitle span {
  font-weight: bold;
}
</style>