<!-- 选择兼职部门 -->
<template>
  <el-dialog
    :title="addAndsee"
    append-to-body="true"
    :visible.sync="isDepartmentJobShow"
    :before-close="handleClose"
    default-expand-all
    width="700px"
    class="dialogStyle"
  >
    <!-- 表单内容 -->
    <div class="popBox">
      <div class="popBox_left">
        <div class="choice">选择：</div>
        <div class="popContent">
          <el-input
            prefix-icon="el-icon-search"
            v-model="filterText"
            placeholder="搜索"
          ></el-input>
          <div class="screenBox">
            <el-tree
              :data="treedata"
              :props="defaultProps"
              :filter-node-method="filterNode"
              ref="tree"
              :check-strictly="true"
              show-checkbox
              @check-change="nodeclickFun"
            >
              <div class="custom-tree-node treecom" slot-scope="{ node, data }">
                <div class="node_titleft" v-if="data.type == 0">
                  <span>{{ node.label }}</span>
                </div>

                <div class="node_titleft" v-else>
                  <img
                    v-if="data.type != 1"
                    class="nextIcon"
                    src="@/assets/images/right_angle.png"
                    alt=""
                  />
                  <svg-icon
                    :icon-class="
                      data.deptUseStatus == '2'
                        ? 'prohibit_icon'
                        : data.deptLevel == 20
                        ? 'group_icon'
                        : data.deptLevel == 30
                        ? 'manufacturer_icon'
                        : data.deptLevel == 40
                        ? 'region_icon'
                        : data.deptLevel == 50 || data.deptLevel == 60
                        ? 'distributor_icon'
                        : 'department_icon'
                    "
                    class="treeicon"
                  />
                  <span>{{ node.label }}</span>
                  <i
                    :class="[
                      'iconStyle',
                      node.expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                    ]"
                  ></i>
                </div>
              </div>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="popBox_right">
        <div class="choice">选择：</div>
        <div class="popContent select_content">
          <div class="node_titleft" v-for="value in list_tree" :key="value">
            <svg-icon class="treeicon" icon-class="department_icon" />
            <span>{{ value["deptName"] }}</span>
            <i class="el-icon-circle-close close_icon"></i>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" class="popBtn" @click="handleClose()"
        >取 消</el-button
      >
      <el-button type="text" class="popBtn" @click="handleClose()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isDepartmentJobShow: {
      type: Boolean,
      default: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    addAndsee: {
      type: String,
      default: "选择所属部门"
    },
    treedata: {
      type: Object,
      default: []
    }
  },
  data() {
    return {
      filterText: "",
      defaultProps: {
        value: "deptId",
        label: "deptName",
        children: "children"
      },
      list_tree: [],
      formObj: []
    };
  },
  watch: {
    isDepartmentJobShow(val) {
      this.isDepartmentJobShow = val;
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    isEdit(newVal) {
      this.newVal = newVal
    },
  },

  methods: {
    //左边树形结构选中
    nodeclickFun(e) {
      this.list_tree = this.$refs.tree.getCheckedNodes();
      console.log(this.list_tree)

      this.formObj = this.list_tree.map(item => {
        return {
          deptName: item.deptName,
          deptId: item.deptId
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClose() {
      this.isDepartmentJobShow = false
      console.log(this.formObj,"this.formObjthis.formObj");
      this.$emit('departmentJobClick', this.formObj)
    },
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/popStyle.scss";

/deep/.el-dialog__header {
  padding: 20px 20px 10px 30px;
}

/deep/.el-dialog__body {
  padding: 0 30px 30px 30px;
}

.popBox {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  display: -webkit-inline-flex;
  justify-content: space-between;

  .popBox_left {
    width: 300px;
  }

  .popBox_right {
    width: 300px;
  }
}

.choice {
  font-size: 16px;
  font-weight: 400;
  color: #43425d;
  opacity: 0.7;
  margin: 20px 0;
}

.popContent {
  width: 100%;
  height: 362px;
  overflow: hidden;
  background: #f5f6fa;
  border: 1px solid #d7dae2;
  padding: 10px;
  box-sizing: border-box;

  /deep/.el-input {
    width: 100% !important;
  }

  .screenBox {
    width: 100%;
    height: 85%;
    margin-top: 12px;
    overflow: auto;

    /deep/.el-tree {
      width: 100%;
      background: #f5f6fa;
    }

    /deep/ .el-tree-node__content {
      height: 30px;
      box-sizing: border-box;
    }

    /deep/ .el-tree-node__expand-icon {
      display: none;
    }
    /deep/ .el-tree-node__content:hover {
      box-sizing: border-box;
      // border: 1px solid #3B86FF;
    }

    // /deep/.is-current > .el-tree-node__content {
    //   background: #3b86ff;
    //   position: relative;

    //   /deep/.node_titleft {
    //     color: #fff !important;
    //   }
    // }

    .treeicon {
      margin-right: 6px;
      opacity: 0.7;
    }

    .iconStyle {
      display: inline-block;
      margin-left: 14px;
      position: relative;
      top: 1px;
    }

    .nextIcon {
      width: 16px;
      height: 16px;
      margin-left: 11px;
      margin-right: 6px;
      position: relative;
      top: -6px;
    }

    .oneLevel {
      // background: #3B86FF;
      // border-bottom: 1px solid #d7dae2;
      // color: #fff !important;
      // box-sizing: border-box;
      // padding-left: 11px;
    }

    .treecom {
      display: flex;
      width: 100%;
      height: 30px;
      line-height: 30px;
      justify-content: space-between;
      color: #43425d;

      .node_titright {
        margin-right: 15px;
        position: relative;

        .moreIcon {
          font-size: 18px;
          color: #43425d;
        }
        .moreIcon-color {
          color: #3b86ff;
        }
      }
      .node_titleft {
        padding-top: 2px;
      }
    }
    /* .treecom:hover .node_titright {
    display: block;
  } */
  }
  ::-webkit-scrollbar {
    display: none;
  }
}

.select_content {
  cursor: pointer;
  overflow: auto;

  .node_titleft {
    width: 100%;
    height: 30px;
    line-height: 30px;
    justify-content: space-between;
    color: #43425d;
    font-size: 14px;
    overflow: hidden;

    .treeicon {
      margin-right: 6px;
      opacity: 0.7;
    }

    .close_icon {
      float: right;
      line-height: 30px;
    }
  }
}
</style>
