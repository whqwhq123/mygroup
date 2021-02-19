<template>
  <div class="app-wrapper">
    <!-- 顶部导航 -->
    <top-nav />
    <!-- 左侧导航 -->
    <left-nav :navMenus= "menuData"/>
    <!-- 右侧内容 -->
    <div class="mainContent">
      <nav-tag id="navTag"/>
      <!-- 主题内容 -->
      <div class="appMain">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { LeftNav, TopNav, NavTag } from './components'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    LeftNav,
    TopNav,
    NavTag
  },
  computed: {
    ...mapState({
      menuData: state => state.user.roles,
    })
  },
  data() {
    return {
      // menuData: this.$store.getters.roles
    };
  },
  created(){
    
    this.menuData[0].childFunctionList[1].childFunctionList = null
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .app-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;


    .mainContent {
      width: calc(100% - 13.5%);
      // min-height: 100%;
      background-color: #F0F0F7;
      position: fixed;
      left: 13.5%;
      top: 70px;
      right: 0;
      bottom: 0;
      padding: 20px;
      overflow-y: auto;
      box-sizing: border-box;

      // #navTag {
      //   position: fixed;
      //   z-index: 999;
      //   width: calc(100% - 320px);
      // }

      .appMain {
        width: 100%;
        margin-top: 20px;
        min-height: calc(100% - 182px);
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
        background-color: #fff;
      }
    }
  }

  
</style>
