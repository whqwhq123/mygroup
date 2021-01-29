<template>
  <div class="navMenu">
   
    <!-- 导航 -->
    <el-menu
      class="el-menu-vertical-demo"
      :default-active="activeMenu"
      :collapse="false"
      :unique-opened="false"
      background-color="#43425D"
      text-color="#C7C6CE"
      active-text-color="#ffd04b"
      :collapse-transition="false"
      mode="vertical"
    >
      <menu-item
        v-for="route in navMenus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";

export default {
  name: "LeftNav",
  components: { MenuItem },
  props: {
    navMenus: {
      type: Array,
      required: [],
    },
  },
  computed: {
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }

      return path
    },
  },
  data() {
    return {
      title: "SDMP 运营管理系统",
      logo: require("@/assets/images/saaslogo.png"),
    };
  },
};
</script>

<style lang="scss" scoped>
$bgColor: #43425d;

.navMenu {
  // width: 260px;
  width: 13.5%;
  min-height: 100%;
  background: $bgColor;
  position: fixed;
  top: 70px;
  left: 0;
  // z-index: 999;
}
</style>
<style scoped>
.el-menu {
  border-right: none;
}
</style>