<template>
  <div class="model">
    <el-row>
      <el-col :span="6" class="colleft">
        <el-row type="flex" class="row-bg leftTit" justify="space-between">
          <el-col :span="8"><div class="leftTit_text">基本信息</div></el-col>
          <el-col :span="8">
            <div class="leftTit_tomod">
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
            <!-- :default-expanded-keys="[treedata[0].id]" -->
        <el-tree :data="treedata" @node-click="nodeclickFun"
          node-key="id"
        >
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
                v-if="data.type!=2"
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
        <!-- v-if="tableData.length" -->
        <template>
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
              @click.native="entterFun"
              style="
                color: #ffffff;
                background: #43425d;
                border-radius: 4px;
                width: 70px;
                margin-left: 15px;
              "
              >查询</el-button>
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <!-- v-if="tableData.length" -->
          <el-col >
            <!-- <el-radio-group v-model="radio" @change="radioFun" size="medium">
              <el-radio-button label="在售"></el-radio-button>
              <el-radio-button label="停售"></el-radio-button>
            </el-radio-group> -->
            <div style="display: inline-block; float: right">
              <el-button class="expBtn" type="text" @click="addmodelFun"><svg-icon icon-class="add_icon" />添加车系</el-button>
              <!-- <el-button class="expBtn" type="text"><svg-icon icon-class="export_icon" />导出列表</el-button> -->
            </div>
          </el-col>
        </el-row>
        <el-row class="row-bg rowPid">
          <el-col>
            <div class="rightTit_text">
              <model-tabs-com
                
                :tableData="tableData"
                @tabruneve="tabruneveFun"
              />
              <!-- 分页 -->
              <pagination
                v-if="total > 0"
                :total="total"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.pageSize"
                @pagination="getCarModelListFun"
              />
            </div>
          </el-col>
        </el-row>
        </template>
  
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
            <el-option v-for="sonitem in sonbrand" :key="sonitem.groupId" :label="sonitem.groupName" :value="sonitem.groupId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自定义子品牌">
          <el-input v-model="dialogSubData.subbrandcus"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitForm">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitForm(1)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加车系 -->
    <el-dialog
      title="添加车系"
      append-to-body
      width="25%"
      :visible.sync="dialogAddmodel"
    >
      <el-form ref="form" :model="dialogSubseries" label-width="40px" size="mini">
        <el-form-item label="车系">
          <el-input v-model="dialogSubseries.subbrandTit"></el-input>
        </el-form-item>
        <el-form-item label="车种">
          <el-select
            v-model="dialogSubseries.subbrandsel"
            placeholder="请选择子品牌名称"
          >
          <!-- vehicle -->
            <el-option v-for="(vehitem,index) in vehicle" :key="index" :label="vehitem" :value="vehitem"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitaddmodelFun(1)">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitaddmodelFun(2)"
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
    />
    <!-- 车型管理和限售管理 -->
    <limit-modelrun-com
      v-if="islimitModel"
      :limitModeldata="limitModeldata"
      :islimitModel="islimitModel"
      :treeF="treeF"
      :treeS="treeS"
      :islimitModelFun.sync="islimitModel"
    />
  </div>
</template>

<script>
import modelTabsCom from "./components/modelTabsCom";
import modeladdBrandCom from "./components/modeladdBrandCom";
import limitModelrunCom from "./components/limitModelrunCom";
import Pagination from "@/components/Pagination";
import { getAddCarMakeTree,getCarGroupByMakeId,addCarMake,addCustomizeCarGroup,getCarModelList,getLevelNames ,addCustomizeCarModel,deleteCarMakeOrCarGroup} from "api/index.js";

export default {
  data() {
    return {
    treedata: [],
    tableData: [],
    dialogSubData: {
      subbrandTit: '',
      subbrandsel: '',
      subbrandcus: '',
      subbrandid:'',
    },
    dialogSubseries: {
      subbrandTit: '',
      subbrandsel: ''
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
    total: 0,
    isbrand:false,
    islimitModel:false,
    limitModeldata:{},
    sonbrand:[],//添加子品牌  子品牌名称数据 
    carseriesdefault:'',//默认车系显示
    vehicle:[],//添加车系 车种数据 ,
    treeF:{},
    treeS:{}
    };
  },
  components: {
    modelTabsCom,Pagination,modeladdBrandCom,limitModelrunCom
  },
  watch: {

  },
  mounted () {
    this.getAddCarMakeTreeFun()  
  },
  watch: {
    treedata(newVal){
      console.log(newVal,"treedatatreedatatreedatatreedata");
      this.treedata=newVal
    }
  },
  methods: {
    //左边树形结构选中
    nodeclickFun(e){
      if(e.type==1){
        console.log(e,'父品牌数据');
        this.treeF=e
      }else{
        this.carseriesdefault=e.id
        this.treeS=e
        this.getCarModelListFun()
      }
      

    },
    //添加品牌 子品牌 品牌
    append(node, data) {
        if(data){
            console.log(node, data,"添加子品牌");
            this.dialogSubData.subbrandTit=data.label
            this.dialogSubData.subbrandid=data.id
            this.getCarGroupByMakeIdFun(data.id)
            this.dialogSubBrand=true
        }else{
          console.log('添加品牌');
          this.isbrand=true
            // const newChild = {id: this.treedata.length,label: "一级 1",type: 1,icon: "el-icon-menu",children: []  };
            // this.treedata.push(newChild);

        }

    },
    //子品牌 对话框 关闭之后
    submitForm(i){
      if(i==1){
      console.log(this.dialogSubData);
      //
      if(this.dialogSubData.subbrandsel!=''){
          this.addCarMakeFun()
      }
      //添加自定义品牌
      if (this.dialogSubData.subbrandcus!='') {
          this.addCustomizeCarGroupFun()
      }
      //
      if (this.dialogSubData.subbrandsel!='' && this.dialogSubData.subbrandcus!='') {
          this.addCarMakeFun()
          this.addCustomizeCarGroupFun()
      }
      // console.log(this.dialogSubData.subbrandselid,"子品牌选择id");
      //
      }else{
        this.dialogSubBrand=false
 
      }
      
    },
    // 删除基本信息
   async remove(node) {
     console.log(node.childNodes.length>1);
      if (node.childNodes.length>1) {
        console.log(node);
        this.$message.error('子品牌存在，不可以删除！');
      }else{
        console.log(node);
        console.log('删除品牌 请求接口');
         let data={
          makeId:'',  
          groupId:''  
        }
        if(node.data.type==1){
          data.makeId=node.data.id
        }else if (node.data.type==2) {
          data.groupId=node.data.id
        }
        console.log(data,'deleteCarMakeOrCarGroup');
        let res=await deleteCarMakeOrCarGroup(data)
        if(res.code==0){
          this.$message({
          message: '删除成功',
          type: 'success'
        });
        this.getAddCarMakeTreeFun()
        }else{
           this.$message.error(res.errMsg);
        }
      }
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex((d) => d.id === data.id);
      // children.splice(index, 1);
    },
    //查询按钮
    entterFun(){

      this.getCarModelListFun(this.inputVal.trim())

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
      this.getLevelNamesFun()
    },
    //添加车系 确定取消按钮
    submitaddmodelFun(type){
      if (type==2) {
        
        this.addCustomizeCarModelFun()
      }else{
        this.dialogAddmodel=false
      }
      this.dialogSubseries= {
        subbrandTit: '',
        subbrandsel: ''
      }
      
    },
    //ajax
    //获取tree 列表
    async getAddCarMakeTreeFun(){
   let res= await getAddCarMakeTree()
   if(res.code==0){
        let tree=[]
        res.data.forEach(v => {
          v.carMakeGroupVoList.forEach(v1 => {
            var v1tree={id:v1.makeId,label:v1.makeName,type: 1,icon: "el-icon-menu",children:[]}
            if(v1.carGroupList.length){
              v1.carGroupList.forEach(v2 => {
              var v2tree={id:v2.groupId,label:v2.groupName,type: 2,icon: "el-icon-arrow-right",}
                v1tree.children.push(v2tree)
              });
            }
            tree.push(v1tree)
          });
        });
       this.treedata=tree
      //  this.carseriesdefault    carid:'',  carname:''
      this.carseriesdefault=this.treedata[0].children[0].id
      console.log(this.treedata);
      this.treeF=this.treedata[0],
      this.treeS=this.treedata[0].children[0],
      this.getCarModelListFun()
      //  console.log(this.carseriesdefault,"默认数据显示");
       
      }
    },
    //添加子品牌获取子品牌数据
    async getCarGroupByMakeIdFun(makeId ){
      let res=await getCarGroupByMakeId({makeId})
      if(res.code==0){
        this.sonbrand=res.data   
        this.getAddCarMakeTreeFun()    
        // console.log(res.data,"子品牌数据");
      }
    },
    //添加子品牌
    async addCarMakeFun(){
        let res=await addCarMake({makeIds:this.dialogSubData.subbrandid,groupIds:this.dialogSubData.subbrandsel})
        if(res.code==0){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogSubData= {
          subbrandTit: '',
          subbrandsel: '',
          subbrandcus: '',
          subbrandid:'',
        }
        this.getAddCarMakeTreeFun() 
        this.dialogSubBrand=false
        }else{
          this.$message({
          message: res.errMsg,
          type: 'warning'
          });
        }
    },
    //添加自定义品牌
    async addCustomizeCarGroupFun(){
      let res=await addCustomizeCarGroup({makeId:this.dialogSubData.subbrandid,groupName:this.dialogSubData.subbrandcus})
        if(res.code==0){
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.dialogSubData= {
          subbrandTit: '',
          subbrandsel: '',
          subbrandcus: '',
          subbrandid:'',
        }
        this.getAddCarMakeTreeFun() 
        this.dialogSubBrand=false
        }else{
          this.$message({
          message: res.errMsg,
          type: 'warning'
          });
        }
    },
    // 根据子品牌id获取车系管理列表
    async getCarModelListFun(modelName=''){

      var data={
        groupId:this.carseriesdefault,
        modelName,
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize
      }
     
      let res=await  getCarModelList(data)
        if(res.code==0){
          this.tableData=res.data.list
           this.total=res.data.total
          console.log(res.data,"根据子品牌id获取车系管理列表");
 
      }else{
         this.$message.error('暂无数据');
      }

    },
    //添加车系 获取车种
    async getLevelNamesFun(){
     let res=await getLevelNames()
        if(res.code==0){
          this.vehicle=res.data
      }else{
         this.$message.error('暂无数据');
      }
    },
    // 添加自定义车系  
    async addCustomizeCarModelFun(){

      if (this.dialogSubseries.subbrandsel!='' &&this.dialogSubseries.subbrandsel!='') {
        let data={
          makeId:this.treeF.id,
          groupId:this.treeS.id,
          modelName:this.dialogSubseries.subbrandTit,
          levelName:this.dialogSubseries.subbrandsel
        }
    let res=await addCustomizeCarModel(data)
        if(res.code==0){
          console.log(res);
          this.vehicle.length=0
          this.dialogAddmodel=false
          this.getCarModelListFun()
        }else{
          this.$message.error('操作失败');
        }
      }else{
         this.$message.error('请填写内容');
      }

 
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