<template>
  <div class="menu-wrapper">
    <template v-if="
        hasOneShowingChild(item.childFunctionList, item) &&
        (!onlyOneChild.childFunctionList || onlyOneChild.noShowingChildren)
      ">
      <app-link :to="resolvePath(onlyOneChild.functionUrl)">
        <el-menu-item :index="resolvePath(onlyOneChild.functionUrl)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <i :class="'iconfont '+onlyOneChild.functionImage"></i>
          <span slot="title">{{ onlyOneChild.functionName }}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.functionUrl)" popper-append-to-body>
      <template slot="title">
        <i :class="'iconfont '+item.functionImage"></i>
        <span slot="title">{{ item.functionName }}</span>
      </template>
      <!-- 递归展示 -->
      <menu-item v-for="child in item.childFunctionList" :key="child.functionUrl" :is-nest="true" :item="child" :base-path="resolvePath(child.functionUrl)"
        class="nest-menu" />
    </el-submenu>
  </div>
</template>

<script>
  import path from "path";
  import AppLink from "./Link";
  export default {
    name: "MenuItem",
    components: {
      AppLink
    },
    props: {
      item: {
        type: Object,
        required: true,
      },
      isNest: {
        type: Boolean,
        default: false,
      },
      basePath: {
        type: String,
        default: "",
      },
    },
    data() {
      this.onlyOneChild = null;
      return {};
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        if(children == null){
          this.onlyOneChild = { ...parent,
            path: "",
            noShowingChildren: true
          };
          return true;
        }
        
        const showingChildren = children.filter((item) => {
          if (item.hidden) {
            return false;
          } else {
            this.onlyOneChild = item;
            return true;
          }
        });

        // 当只有一个子路由器时，默认显示子路由器
        if (showingChildren.length === 1) {
          return true;
        }

        // 如果没有要显示的子路由器，则显示父路由器
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ...parent,
            path: "",
            noShowingChildren: true
          };
          return true;
        }

        return false;
      },
      resolvePath(routePath) {
        if (/^(https?:|mailto:|tel:)/.test(routePath)) {
          return routePath;
        }
        if (/^(https?:|mailto:|tel:)/.test(this.basePath)) {
          return this.basePath;
        }
        return path.resolve(this.basePath, routePath);
      },
    },
    mounted() {},
  };
</script>

<style lang="scss" scoped>
  /deep/.el-menu-item,
  /deep/.el-submenu__title {
    width: 100%;
    height: 55px;
    padding-left: 25px;
    box-sizing: border-box;
  }

  .iconfont {
    width: 20px !important;
    height: 20px !important;
    line-height: 22px;
    vertical-align: middle !important;
    display: inline-block;
    margin-right: 19px;
  }

  /deep/.el-submenu__icon-arrow {
    font-size: 16px;
    font-weight: bold;
  }

  .nest-menu {
    width: 100%;
  }

  /deep/.el-submenu .el-menu-item {
    min-width: 100%;
    // padding: 0 20px 0 0 !important;
  }

  /deep/.el-menu-item.is-active {
    color: #fff !important;
    background-color: #3b86ff !important;
  }
</style>
