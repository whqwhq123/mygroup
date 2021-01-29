<!-- 选择所属部门 -->
<template>
  <el-dialog
    :title="addAndsee"
    append-to-body="true"
    :visible.sync="isbrandPop"
    width="458px"
    class="dialogStyle"
  >
    <!-- 表单内容 -->
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
          @node-click="nodeclickFun"
        >
          <div
            :class="[
              'custom-tree-node',
              'treecom',
              data.type == 1 ? 'oneLevel' : ''
            ]"
            slot-scope="{ node, data }"
          >
            <div class="node_titleft">
              <img
                v-if="data.type != 1"
                class="nextIcon"
                src="@/assets/images/right_angle.png"
                alt=""
              />
              <svg-icon :icon-class="data.icon" class="treeicon" />
              <span>{{ node.label }}</span>
              <i :class="['iconStyle' ,node.expanded ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"></i>
            </div>
          </div>
        </el-tree>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" class="popBtn" @click="isbrandPop = false"
        >取 消</el-button
      >
      <el-button type="text" class="popBtn" @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    isbrandPop: {
      type: Boolean,
      default: true
    },
    addAndsee: {
      type: String,
      default: "选择所属部门"
    },
    addAndseefromData: {
      type: Object
    }
  },
  data() {
    return {
      filterText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      treedata: [
        {
          id: 1,
          label: "长安福特集团",
          type: 1,
          icon: "group_icon",
          children: [
            {
              id: 4,
              type: 2,
              icon: "prohibit_icon",
              label: "财务部",
              disabled: true
            },
            {
              id: 15,
              type: 2,
              icon: "region_icon",
              label: "北部区",
              children: [
                {
                  id: 30,
                  type: 3,
                  icon: "company_icon",
                  label: "深圳长安汽车有限公司",
                  children: [
                    {
                      id: 30,
                      type: 4,
                      icon: "department_icon",
                      label: "销售部门",
                      children: [
                        {
                          id: 30,
                          type: 5,
                          icon: "department_icon",
                          label: "其他部门"
                        },
                        {
                          id: 31,
                          type: 5,
                          icon: "department_icon",
                          label: "其他部门"
                        }
                      ]
                    },
                    {
                      id: 31,
                      type: 4,
                      icon: "department_icon",
                      label: "销售部门",
                      children: [
                        {
                          id: 30,
                          type: 5,
                          icon: "department_icon",
                          label: "其他部门"
                        },
                        {
                          id: 31,
                          type: 5,
                          icon: "department_icon",
                          label: "其他部门"
                        }
                      ]
                    }
                  ]
                },
                {
                  id: 31,
                  type: 2,
                  icon: "company_icon",
                  label: "北京长安汽车有限公司"
                }
              ]
            },
            {
              id: 16,
              type: 2,
              icon: "region_icon",
              label: "华南区"
            },
            {
              id: 14,
              type: 2,
              icon: "region_icon",
              label: "华北区"
            },
            {
              id: 17,
              type: 2,
              icon: "region_icon",
              label: "华东区"
            },
            {
              id: 18,
              type: 2,
              icon: "region_icon",
              label: "南部区"
            }
          ]
        }
      ]
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },

  methods: {
    //左边树形结构选中
    nodeclickFun(e) {
      if (e.label == "财务部") return;
      console.log(e);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
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

  .screenBox {
    width: 100%;
    height: 100%;
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

    /deep/.is-current > .el-tree-node__content{
      background: #3B86FF;
      position: relative;

      /deep/.node_titleft {
        color: #fff !important;
      }
    }

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
      box-sizing: border-box;
      padding-left: 11px;
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
</style>
