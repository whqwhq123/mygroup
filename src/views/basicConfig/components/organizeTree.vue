<template>
  <div>
    <!--  -->
    <div class="hiddendiv">
      <el-scrollbar class="boxscroll">  
      <el-tree :data="treedata" default-expand-all @node-click="nodeclickFun">
        <div
          :class="[
            'custom-tree-node',
            'treecom',
            data.deptLevel == 1 ? 'oneLevel' : ''
          ]"
          slot-scope="{ node, data }"
          @mouseover="mouseenter(data, true)"
          @mouseout="mouseenter(data, false)"
        >
          <!-- {{node.expanded}} 展开缩放-->
          <div class="node_titleft">
            <img
              v-if="data.deptLevel != 1"
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
            <span
              >{{ data.deptName
              }}{{ data.deptUseStatus == "2" ? "(已停用)" : "" }}</span
            >
            <i
              v-if="data.deptLevel == 2"
              :class="[
                'iconStyle',
                data.isMuntHover ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              ]"
            ></i>
          </div>
          <div class="node_titright">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-more"
              v-show="data.isMuntHover"
              :class="['moreIcon', data.isOperation ? 'moreIcon-color' : '']"
              @click.stop="() => append(node, data)"
            ></el-button>
            <ul class="popover-group" v-show="data.isOperation" v-if="get_role_function('100200210') || get_role_function('100200220') || get_role_function('100200240')">
              <li @click.stop="merchantAdd(node, data, false)" v-if="get_role_function('100200210')">添加</li>
              <li @click.stop="merchantAdd(node, data, true)" v-if="get_role_function('100200220')">编辑</li>
              <li @click.stop="merchantEnable(node, data)" v-if="get_role_function('100200240')">
                {{ data.deptUseStatus == "2" ? "启用" : "停用" }}
              </li>
            </ul>

          </div>
        </div>
      </el-tree>
      </el-scrollbar>
      <organize-com
        v-if="isOrganize"
        :isOrganize="isOrganize"
        :organizationInfo="organizationInfo"
        :deptId="deptId"
        @closePop="closePop"
      />
    </div>
     <!-- <organizeTable  v-if="!isOrganize" :deptId="deptId"/> -->
  </div>

</template>
<script>
import organizeCom from "./organizeCom";
import organizeTable from "./organizeTable";
import { deptUserStatus } from "@/service/api/index";
import { get_role_function } from '@/utils/index';
export default {
  name: "organizeTree",
  props: {
    treedata: {
      type: Array,
      default: [] // deptLevel 部门级别（20厂商，30集团，40大区，50经销商，60二网经销商，70部门）',
    },

  },
  data() {
    return {
      get_role_function,
      isOrganize: false,
      isOperation:false,
      organizationInfo: {},
      deptId: '',
      deptPrincipalId:'',
      isdeptIdtab:false,
    };
  },
  computed: {},
  components: {
    organizeCom,
    organizeTable
  },
  watch: {
    treedata(newVal){
      this.treedata=newVal
      // this.addistreedata(newVal)
    }

  },
  created(){
    
  },
  mounted () {
    
  },
  methods: {

    //左边树形结构选中
    nodeclickFun(e) {
      if (e.deptUseStatus == 2) return;
      this.deptId = e.deptId
      // deptPrincipalId
      console.log(e);
      this.$emit('update:deptId',e.deptId)
      this.$emit('update:deptPrincipalId',e.deptPrincipalId)
    },
    //基础配置 线索中心  商品中心
    radioFun(e) {
      console.log(e);
    },

    //操作
    append(node, data) {
      console.log(node,data,this.treedata);
      // this.selappend(this.treedata,data.deptId,!data.isOperation)
      this.$set(data, "isOperation", !data.isOperation);
      this.$forceUpdate()
    },
    merchantAdd(node, data, flag) {
      //添加编辑
      this.organizationInfo = {
        deptId: data.deptId,
        deptLevel: data.deptLevel,
        deptName: data.deptName,
        isEdit: flag
      };
      this.isOrganize = true;
      this.$set(data, "isOperation", false);
    },

    merchantEnable(node, data) {
      deptUserStatus({
        deptId: data.deptId,
        deptUserStatus: data.deptUseStatus == "2" ? 1 : 2, // 1启用，2停用
        curUserId: this.$store.getters.userInfo.userId || ""
      }).then(res => {
        if (res.code == "0") {
          this.$message({ type: "success", message: "修改成功" });
          this.$emit("upTree", {}); //刷新数
        } else {
          this.$message({
            type: "warning",
            message: res.errMsg
          });
        }
      });
    },

    closePop(upflag) {
      this.isOrganize = false;
      if (upflag) {
        // 是否刷新数
        this.$emit("upTree", {}); //刷新数
      }
    },
    // 悬浮展示
    mouseenter(data, flag) {
      if (!data.isOperation) {
        this.$set(data, "isMuntHover", flag);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-tree-node__content {
  height: 50px;
  box-sizing: border-box;
}
/deep/ .el-tree-node__expand-icon {
  display: none;
}
/deep/ .el-tree-node__content {
  border-bottom: 1px solid #e4e6ed;
}
/deep/ .el-tree-node__content:hover {
  box-sizing: border-box;
  // border: 1px solid #3B86FF;
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
.hiddendiv{
  overflow: hidden;
  height: 623px;
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
  background: #e4e6ed;
  border-bottom: 1px solid #d7dae2;
  box-sizing: border-box;
  padding-left: 11px;
}

.treecom {
  display: flex;
  width: 100%;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  color: #43425d;

  .node_titright {
    position: relative;
    background: #ffffff;
    width: 40px;
    border-bottom: 1px solid #e4e6ed;
    &.node_titright:hover{
      background: #F5F7FA;
    }
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

.popover-group {
  width: 105px;
  padding: 5px 0;
  box-sizing: border-box;
  line-height: 30px;
  text-align: center;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(191, 210, 241, 0.49);
  border-radius: 4px;
  position: absolute;
  z-index: 9;
  top: 40px;
  right: 0;

  li {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #4d4f5c;
    padding: 0 10px;
    text-align: center;

    &:hover {
      background-color: #3b86ff;
      color: #fff;
    }

    &:last-of-type {
      border-bottom: none;
    }
  }
}
.boxscroll{
    height: 648px;
    overflow-y: scroll;
    margin-right: -23px;
    margin-bottom: -24px;
}
</style>
