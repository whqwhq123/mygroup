<template>
  <div class="roles">
    <el-row>
      <el-col :span="6" class="colleft">
        <el-row type="flex" class="row-bg leftTit" justify="space-between">
          <el-col :span="8"
            ><div class="leftTit_text roles_titsty">角色管理</div></el-col
          >
        </el-row>
        <el-tree :data="treedata" @node-click="nodeclickFun">
          <div
            class="custom-tree-node treecom"
            :style="
              data.type == 1
                ? 'background: #E4E6ED;border-bottom: 1px solid #D7DAE2;'
                : ''
            "
            slot-scope="{ node, data }"
          >
            <div class="node_titleft">
              <i :class="[data.icon, 'treeicon']"></i>
              <span>{{ node.label }}</span>
            </div>
            <div class="node_titright">
              <el-button
                type="text"
                size="mini"
                v-if="data.type == 1"
                style="color: #3b86ff"
                @click.stop="() => append(node, data)"
              >
                +添加
              </el-button>
              <div v-if="data.type == 2">
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  :style="data.type != 1 ? 'color: #929496;' : ''"
                  @click.stop="() => remove(node, data)"
                >
                </el-button>
              </div>
            </div>
          </div>
        </el-tree>
      </el-col>
      <!-- rolesPowerCom   有数据 -->

      <el-col v-if="false" :span="18" class="colright">
        <!-- 角色信息配置 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col
              ><div class="roles_titsty" style="padding-left: 22px">
                角色信息配置
              </div></el-col
            >
          </el-row>
        </el-row>
        <el-row>
          <el-row class="rolenews"> </el-row>
        </el-row>
        <!-- 角色权限 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col
              ><div class="roles_titsty" style="padding-left: 22px">
                角色权限
              </div></el-col
            >
          </el-row>
        </el-row>
        <!-- 角色权限组件 -->
        <el-radio-group
          v-model="radio"
          @change="radioFun"
          size="medium"
          style="margin: 13px 0 6px 22px"
        >
          <el-radio-button label="1">基础配置</el-radio-button>
          <el-radio-button label="2">线索中心</el-radio-button>
          <el-radio-button label="3">商品中心</el-radio-button>
        </el-radio-group>
        <roles-power-com v-if="radio == 1"></roles-power-com>
      </el-col>
      <!-- 无数据 -->
      <el-col :span="18" class="colright">
        <!-- 角色信息配置 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col
              ><div class="roles_titsty" style="padding-left: 22px">
                角色信息配置
              </div></el-col
            >
          </el-row>

          <img
            style="
              width: 453px;
              height: 196px;
              margin-top: 58px;
              margin-left: 75px;
            "
            src="../../assets/images/rolerunno.png"
            alt=""
          />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import rolesPowerCom from "./components/rolesPowerCom";
export default {
  data() {


    return {
    treedata:  [
      {
        id: 1,
        label: "一级 1",
        type: 1,
        icon: "el-icon-menu",
        children: [
          {
            id: 4,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 1-1",
          },
          {
            id: 15,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 1-1",
          },
          {
            id: 16,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 1-1",
          },
        ],
      },
      {
        id: 2,
        label: "一级 2",
        type: 1,
        icon: "el-icon-menu",
        children: [
          {
            id: 5,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 2-1",
          },
          {
            id: 6,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "一级 3",
        type: 1,
        icon: "el-icon-menu",
        children: [
          {
            id: 7,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 3-1",
          },
          {
            id: 8,
            type: 2,
            icon: "el-icon-arrow-right",
            label: "二级 3-2",
          },
        ],
      },
    ],
    //多选框数据绑定
    checkboxData:{
      rolescherun:[],
    },
    cheboxonedata:["添加","修改","删除","停用/启用"],
    dialogSubData: {
      subbrandTit: '',
      subbrandsel: '',
      subbrandcus: '',
    },
    dialogSubBrand:false,
    dialogAddroles:false,
    radio: '1',
    };
  },
  components: {
    rolesPowerCom
  },
  watch: {

  },
  methods: {
    //左边树形结构选中
    nodeclickFun(e){
      if(e.type==1) return
        console.log(e);
    },
    //添加品牌 子品牌 品牌
    append(node, data) {

      
        console.log(node, data,"添加");
            this.dialogSubData.subbrandTit=data.label

            // const newChild = { id: data.id++,icon: "el-icon-arrow-right", label: "testtest", children: [] };
            // if (!data.children) {
            // this.$set(data, "children", []);
            // }
            // data.children.push(newChild);
            this.dialogSubBrand=true

    },
    // 删除基本信息
    remove(node, data) {
     
      if (!node.childNodes.length) {
         console.log(node);
        console.log(1);
      }
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex((d) => d.id === data.id);
      // children.splice(index, 1);
    },
    //基础配置 线索中心  商品中心
    radioFun(e){
        console.log(e);
    },

  },
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
/deep/ .el-tree-node {
  border-bottom: 1px solid #e4e6ed;
}
/deep/ .el-tree-node__content:hover {
  box-sizing: border-box;
  // border: 1px solid #3B86FF;
}
/deep/ .el-input__inner {
  height: 32px;
  line-height: 32px;
}
/deep/.el-input__icon {
  height: 32px;
  line-height: 32px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  border-color: #3b86ff;
  color: #3b86ff;
  background-color: #fff;
}

.rowPid {
  padding-left: 11px;
  margin-top: 11px;
}
.roles {
  /* overflow: hidden; */
  padding: 20px 20px 0 20px;
}

.roles_titsty {
  font-size: 16px;
  font-weight: bold;
  color: #43425d;
}
.leftTit {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.rightTit {
  height: 50px;
  line-height: 50px;
  border: 1px solid #e4e6ed;
  border-left: none;
}

.leftTit_text {
  font-size: 18px;
  font-weight: bold;
  color: #43425d;
}
.leftTit_tomod {
  font-size: 14px;
  color: #3b86ff;
  text-align: right;
  padding-right: 15px;
  cursor: hand;
}
.colleft {
  min-height: 936px;
  background: #ffffff;
  border: 1px solid #e4e6ed;
  .treecom {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    .node_titright {
      /* display: none; */
      margin-right: 15px;
    }
    .node_titleft {
      padding-top: 2px;
    }
  }
  /* .treecom:hover .node_titright {
    display: block;
  } */
}
.colright {
  border: 1px solid #e4e6ed;
  border-left: none;
  border-top: none;
  height: 936px;
}
.treeicon {
  margin-right: 6px;
  margin-left: 11px;
  transform: rotate(46deg);
}
.dialog-footer {
  display: flex;
}
.sdmpbut {
  width: 50% !important;
}
.rolenews {
  height: 251px;
  background: #f5f6fa;
  margin: 10px 22px;
}
</style>