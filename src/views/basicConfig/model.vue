<template>
  <div class="model">
    <el-row>
      <el-col :span="6" class="colleft">
        <el-row type="flex" class="row-bg leftTit" justify="space-between">
          <el-col :span="8"><div class="leftTit_text">基本信息</div></el-col>
          <el-col :span="8"><div class="leftTit_tomod">          
              <el-button  type="text" size="mini" style="font-size: 14px;color: #3B86FF;" @click.stop="() => append()">
                +添加品牌
              </el-button></div></el-col>
        </el-row>
        <!-- <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree> -->
        <el-tree :data="treedata">
          <div
            class="custom-tree-node treecom"
            :style="data.type == 1 ? 'background: #E4E6ED;border-bottom: 1px solid #D7DAE2;' : ''"
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
                v-if="data.type"
                style="color: #3B86FF;"
                @click.stop="() => append(node, data)"
              >
                +添加子品牌
              </el-button>
              <el-button
                type="text"
                size="mini"
                icon="el-icon-delete"
                :style="data.type!=1?'color: #929496;':''"
                @click.stop="() => remove(node, data)"
              >
              </el-button>
            </div>
          </div>
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-row class="row-bg rightTit">
          <el-col ><div class="rightTit_text">车系管理</div></el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col  :span="6">
              <el-input
              placeholder="请输入内容"
              v-model="inputVal"
              clearable>
              </el-input>
          </el-col>
          <el-col :span="3" >
              <el-button size="small" style="color: #FFFFFF;background: #43425D;border-radius: 4px;width: 70px;margin-left: 15px;" >查询</el-button>
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col >
            <el-radio-group v-model="radio" @change="radioFun" size="medium">
                <el-radio-button label="在售"></el-radio-button>
                <el-radio-button label="停售"></el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col ><div class="rightTit_text">车系管理</div></el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
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
            icon: "el-icon-arrow-right",
            label: "二级 1-1",
          },
          {
            id: 15,
            icon: "el-icon-arrow-right",
            label: "二级 1-1",
          },
          {
            id: 16,
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
            icon: "el-icon-arrow-right",
            label: "二级 2-1",
          },
          {
            id: 6,
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
            icon: "el-icon-arrow-right",
            label: "二级 3-1",
          },
          {
            id: 8,
            icon: "el-icon-arrow-right",
            label: "二级 3-2",
          },
        ],
      },
    ],
    inputVal: '',
    radio: '在售',
    };
  },
  watch: {

  },
  methods: {
    //添加基本信息
    append(node, data) {
      console.log(node, data);
        if(data){
            const newChild = { id: data.id++,icon: "el-icon-arrow-right", label: "testtest", children: [] };
            if (!data.children) {
            this.$set(data, "children", []);
            }
            data.children.push(newChild);
        }else{
            const newChild = {id: this.treedata.length,label: "一级 1",type: 1,icon: "el-icon-menu",children: []  };
            this.treedata.push(newChild);

        }

    },
    // 删除基本信息
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    },
    
    //在售停售
    radioFun(e){
        console.log(e);
    }
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
/deep/ .el-input__inner{
    height: 32px;
    line-height: 32px;
}
/deep/.el-input__icon{
    height: 32px;
    line-height:32px
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner{
    border-color: #3B86FF;
    color: #3B86FF;
    background-color:#FFF;
}

.rowPid{
    padding-left: 11px;
    margin-top: 11px;
}
.model{
   padding: 20px;
}
.leftTit {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
}
.rightTit{
    height: 50px;
    line-height: 50px;
    border: 1px solid #e4e6ed;
    border-left: none;
    padding-left: 30px;
}
.rightTit_text{
  font-size: 18px;
  font-weight: bold;
  color: #43425d;
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
  min-height: 853px;
  background: #ffffff;
  border: 1px solid #e4e6ed;
  .treecom {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    .node_titright {
      display: none;
      margin-right: 15px;
    }
    .node_titleft {
      padding-top: 2px;
    }
  }
  .treecom:hover .node_titright{
      display:block
  }
}

.treeicon {
  margin-right: 6px;
  margin-left: 11px;
  transform: rotate(46deg);
}
</style>