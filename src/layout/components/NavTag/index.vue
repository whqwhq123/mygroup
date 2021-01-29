<template>
  <div class="selected_tag">
    <div class="left_row">
      <i class="el-icon-arrow-left" @click="leftFun"></i>
    </div>
    <div class="tags" :style="{ marginLeft: num + 'px' }">
      <el-tag
        v-for="tag in tagsArr"
        :key="tag.path"
        :closable="tagsArr.length > 1"
        @close="closeCurrent(index, tag)"
        :type="isActive(tag) ? '' : 'info'"
        ref="tag"
        effect="plain"
        :class="isActive(tag) ? 'person-checked' : ''"
      >
        <router-link
          tag="span"
          :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        >
          {{ tag.title }}
        </router-link>
      </el-tag>
    </div>
    <div class="right_row">
      <i class="el-icon-arrow-right" @click="rightFun"></i>
      <el-dropdown class="drop" trigger="click" placement="bottom">
        <span class="el-dropdown-link">
          <i class="el-icon-delete"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="clearAll(selectedTag)">关闭所有</div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="closeOther(selectedTag)">关闭其他</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavTag",
  components: {},
  computed: {
    tagsArr() {
      return this.$store.state.navTags.tagsArr;
    },
  },
  watch: {
    $route() {
      this.addTags();
    },
  },
  data() {
    return {
      num: 50,
      selectedTag: {}, //选中的tag
    };
  },
  mounted() {
    this.addTags();
  },
  methods: {
    addTags() {
      const { name, meta } = this.$route;
      let rA = {
        ...this.$route,
        meta,
        matched: [],
      };

      if (name) {
        this.$store.dispatch("navTags/addView", rA);
      }
      return false;
    },
    isActive(route) {
      this.selectedTag = route;
      return route.path === this.$route.path;
    },
    // 关闭标签
    closeCurrent(index, view) {
      this.$store
        .dispatch("navTags/delCurrentTags", view)
        .then((visitedViews) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view);
          }
        });
    },
    // 清除全部
    clearAll(view) {
      this.$store.dispatch("navTags/delAllTags").then((visitedViews) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view);
        }
      });
    },
    // 清除其他
    closeOther(view) {
      this.$store.dispatch("navTags/delOtherTags", view);
    },
    // 点击右箭头
    rightFun() {
      if (this.num < 50) {
        this.num = this.num + 10;
      }
    },
    // 点击左箭头
    leftFun() {
      var domWidth = document.getElementsByClassName("selected_tag")[0]
        .clientWidth;
      var tagWidth = document.getElementsByClassName("tags")[0].clientWidth;
      var left = document.getElementsByClassName("right_row")[0].offsetLeft;
      // console.log(domWidth - tagWidth, '---', left)
      if (domWidth - tagWidth <= 167 && left === domWidth) {
        this.num = this.num - 10;
      }
    },
    // 重新跳转
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.selected_tag {
  position: relative;
  min-height: 52px;
  background-color: rgba($color: #fff, $alpha: 0.6);
  display: flex;
  align-items: center;
  overflow-x: hidden;

  .left_row {
    width: 43px;
    min-height: 52px;
    background-color: rgba($color: #fff, $alpha: 0.6);
    position: absolute;
    z-index: 10;
    line-height: 52px;
    padding-left: 13px;
  }
  .el-icon-arrow-left,
  .el-icon-arrow-right,
  .el-icon-delete {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    cursor: pointer;
    color: #a4afb7;
  }
  .tags {
    // flex: 1;
    display: flex;
    align-items: center;
    // width: 100%;
    overflow: hidden;
    margin-left: -130px;
  }
  .right_row {
    height: 52px;
    background: #fff;
    margin-left: 117px;
  }
  .el-icon-arrow-right {
    position: absolute;
    right: 58px;
    top: 10px;
    z-index: 10;
  }
  .el-icon-delete {
    position: absolute;
    right: 0px;
    top: 0px;
  }
  .drop {
    position: absolute;
    right: 13px;
    top: 10px;
  }
  .el-tag {
    margin-left: 10px;
    cursor: pointer;
  }
  .person-checked {
    // background:rgba(59,134,255,0.12);
    border: 1px solid #3b86ff;
    color: #3b86ff;

    /deep/.el-tag__close {
      color: #3b86ff !important;
    }

    /deep/.el-tag__close:hover {
      color: #fff !important;
      background-color: #3b86ff !important;
    }
  }

  &::after {
    z-index: 20;
  }
}
</style>
