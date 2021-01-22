<template>
  <div>
    <div class="header">
      <div class="header_logo">
        <img src="../assets/images/logo.png" />
      </div>
    </div>
    <div class="main">
      <div class="nav">
        <span><i class="el-icon-s-order"></i></span>
      </div>
     
      <router-view style="flex: 1;" />
    </div>
      
  </div>
</template>

<script>
  export default {
    data() {
      return {

      };
    },
    created() {

    },
    methods: {

    }
  };
</script>

<style scoped>
  a {
    color: #333;
  }
</style>

<style>
  body{
    font-size: 14px;
  }

  .main {
    width: 100%;
    height: calc(100vh - 64px);
    display: inline-flex;
  }

  .nav {
    width: 50px;
    color: #fff;
    font-size: 26px;
    background: #4E5568;
    text-align: center;
  }

  .nav span{
    display: block;
    height: 50px;
    line-height: 50px;
  }

  .header {
    height: 64px;
    background: #2e304d;
  }

  .header_logo {
    width: 112px;
    height: 17px;
    padding-top: 24px;
    padding-left: 32px;
    float: left;
  }

  .header_logo img {
    width: 112px;
    height: 17px;
    display: block;
  }
</style>
