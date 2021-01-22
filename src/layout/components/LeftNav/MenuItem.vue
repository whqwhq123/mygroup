<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <svg-icon
            v-if="onlyOneChild.meta.icon"
            :icon-class="onlyOneChild.meta.icon"
          />
          <span slot="title">{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title" v-if="item.meta">
        <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </template>
      <!-- 递归展示 -->
      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import AppLink from "./Link";
export default {
  name: "MenuItem",
  components: { AppLink },
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
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
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
.svg-icon {
  width: 20px !important;
  height: 20px !important;
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
