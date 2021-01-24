<template>
  <div class="model">
    <el-row>
      <el-col :span="6" class="colleft">
        <el-row type="flex" class="row-bg leftTit" justify="space-between">
          <el-col :span="8"><div class="leftTit_text">基本信息</div></el-col>
          <el-col :span="8"
            ><div class="leftTit_tomod">
              <el-button
                type="text"
                size="mini"
                style="font-size: 14px; color: #3b86ff"
                @click.stop="() => append()"
              >
                +添加品牌
              </el-button>
            </div></el-col
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
                v-if="data.type"
                style="color: #3b86ff"
                @click.stop="() => append(node, data)"
              >
                +添加子品牌
              </el-button>
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
        </el-tree>
      </el-col>
      <el-col :span="18">
        <el-row class="row-bg rightTit">
          <el-col><div class="rightTit_text">车系管理</div></el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col :span="6">
            <el-input
              placeholder="请输入内容"
              v-model="inputVal"
              @keyup.enter.native="entterFun"
              clearable
            >
            </el-input>
          </el-col>
          <el-col :span="3">
            <el-button
              size="small"
              @input.native="entterFun"
              style="
                color: #ffffff;
                background: #43425d;
                border-radius: 4px;
                width: 70px;
                margin-left: 15px;
              "
              >查询</el-button
            >
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col>
            <el-radio-group v-model="radio" @change="radioFun" size="medium">
              <el-radio-button label="在售"></el-radio-button>
              <el-radio-button label="停售"></el-radio-button>
            </el-radio-group>
            <div style="display: inline-block; float: right">
              <el-button class="expBtn" type="text" @click="addmodelFun"
                ><svg-icon icon-class="add_icon" />添加车系</el-button
              >
              <el-button class="expBtn" type="text"
                ><svg-icon icon-class="export_icon" />导出列表</el-button
              >
            </div>
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col
            ><div class="rightTit_text">
              <model-tabs-com
                :tableData="tableData"
                @tabruneve="tabruneveFun"
              ></model-tabs-com>
              <!-- 分页 -->
              <pagination
                v-if="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
                @pagination="getList"
              /></div
          ></el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 添加子品牌 -->
    <el-dialog
      title="添加子品牌"
      append-to-body
      width="25%"
      :visible.sync="dialogSubBrand"
    >
      <el-form
        ref="form"
        :model="dialogSubData"
        label-width="110px"
        size="mini"
      >
        <el-form-item label="父级品牌">
          <el-input
            v-model="dialogSubData.subbrandTit"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="子品牌名称">
          <el-select
            v-model="dialogSubData.subbrandsel"
            placeholder="请选择子品牌名称"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义子品牌">
          <el-input v-model="dialogSubData.subbrandcus"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitForm">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitForm(1)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加车系 -->
    <el-dialog
      title="添加车系"
      append-to-body
      width="25%"
      :visible.sync="dialogAddmodel"
    >
      <el-form ref="form" :model="dialogSubData" label-width="40px" size="mini">
        <el-form-item label="车系">
          <el-input v-model="dialogSubData.subbrandTit"></el-input>
        </el-form-item>
        <el-form-item label="车种">
          <el-select
            v-model="dialogSubData.subbrandsel"
            placeholder="请选择子品牌名称"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitaddmodelFun">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitaddmodelFun(1)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 添加品牌 -->
    <!-- modeladdBrandCom -->
    <modeladd-brand-com
      v-if="isbrand"
      :isbrand="isbrand"
      :isbrandFun.sync="isbrand"
    ></modeladd-brand-com>
    <!-- 车型管理和限售管理 -->
    <limit-modelrun-com
      v-if="islimitModel"
      :limitModeldata="limitModeldata"
      :islimitModel="islimitModel"
      :islimitModelFun.sync="islimitModel"
    ></limit-modelrun-com>
  </div>
</template>

<script>
import modelTabsCom from "./components/modelTabsCom";
import modeladdBrandCom from "./components/modeladdBrandCom";
import limitModelrunCom from "./components/limitModelrunCom";
import Pagination from "@/components/Pagination";
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
          tableData: [
        {
          modelname: "路虎",
          vehicletype:"SUV",
          issell:1,
          status:1,
          islimit:1,
        },
                {
          modelname: "宝马1",
          vehicletype:"MVP",
          issell:2,
          status:2,
          islimit:1,
        },
        {
          modelname: "奔驰",
          vehicletype:"SUV",
          issell:1,
          status:1,
          islimit:2,
        },
        {
          modelname: "宝马",
          vehicletype:"MVP",
          issell:2,
          status:1,
          islimit:1,
        },

   
      ],
    dialogSubData: {
      subbrandTit: '',
      subbrandsel: '',
      subbrandcus: '',
    },
    dialogSubBrand:false,
    dialogAddmodel:false,
    inputVal: '',
    radio: '在售',
    listQuery: {
      channelName: "",
      pageNum: 1,
      pageSize: 10
    },
    total: 20,
    isbrand:false,
    islimitModel:false,
    limitModeldata:{}
    };
  },
  components: {
    modelTabsCom,Pagination,modeladdBrandCom,limitModelrunCom
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

        
        if(data){
        console.log(node, data,"添加子品牌");
            this.dialogSubData.subbrandTit=data.label

            // const newChild = { id: data.id++,icon: "el-icon-arrow-right", label: "testtest", children: [] };
            // if (!data.children) {
            // this.$set(data, "children", []);
            // }
            // data.children.push(newChild);
            this.dialogSubBrand=true
        }else{
          console.log('添加品牌');
          this.isbrand=true
            // const newChild = {id: this.treedata.length,label: "一级 1",type: 1,icon: "el-icon-menu",children: []  };
            // this.treedata.push(newChild);

        }

    },
    //子品牌 对话框 关闭之后
    submitForm(){

      this.dialogSubBrand=false
      this.dialogSubData= {
        subbrandTit: '',
        subbrandsel: '',
        subbrandcus: '',
      }

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
    //查询按钮
    entterFun(){

      if (!this.inputVal || this.inputVal.trim() == "") {
        console.log(this.inputVal);
        console.log('发送请求');
	    return false;
	}

    },
    //在售停售
    radioFun(e){
        console.log(e);
    },
    //  限售管理车型管理 限售管理 1 //车型管理 2   limitModelrunCom
    tabruneveFun(e){
      this.limitModeldata=e
      this.islimitModel=true
      // console.log(e,"00000000000000000");
    },
    //添加车系
    addmodelFun(){
      this.dialogAddmodel=true
    },
    submitaddmodelFun(){
      this.dialogAddmodel=false
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
/deep/ .el-select {
  width: 100%;
}
.rowPid {
  padding-left: 11px;
  margin-top: 11px;
}
.model {
  padding: 20px 20px 0 20px;
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
  padding-left: 30px;
}
.rightTit_text {
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
  .treecom:hover .node_titright {
    display: block;
  }
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
</style>