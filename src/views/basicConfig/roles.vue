<template>
  <div class="roles">
    <el-row>
      <el-col :span="5" class="colleft">
        <el-row type="flex"  class="row-bg leftTit" justify="space-between">
          <el-col :span="8">
            <div class="leftTit_text roles_titsty">角色管理</div>
          </el-col>
        </el-row>
        <!-- 树形结构 -->
      <el-scrollbar class="boxscroll">   
        <el-tree :data="treedata" @node-click="nodeclickFun">

          <div
            class="custom-tree-node treecom"
            :style="data.type == 1? 'background: #E4E6ED;border-bottom: 1px solid #D7DAE2;': ''"
            slot-scope="{ node, data }"
          >
            <div class="node_titleft">
              <i   :class="data.icon"></i>
              <span v-if="data.type == 1">{{ node.label }}（{{data.childrenNum}}）</span>
              <span v-else>{{ node.label }}{{data.isroles?'':'(已停用)'}}</span>
            </div>
            <!-- v-if="data.isroles" -->
            <div class="node_titright" >
              <el-button
                type="text"
                size="mini"
                v-if="data.type == 1 && get_role_function('100300110')"
                style="color: #3b86ff"
                @click.stop="() => append(node, data)"
              >
                +添加
              </el-button>
              <div v-if="data.type == 2">
                <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-edit-outline"
                   v-if="get_role_function('100300120')"
                  :style="data.type != 1 ? 'color: #929496;' : ''"
                  @click.stop="() => outline(node, data)"
                >
                </el-button>
                <!-- <el-button
                  type="text"
                  size="mini"
                  icon="el-icon-delete"
                  :style="data.type != 1 ? 'color: #929496;' : ''"
                  @click.stop="() => remove(node, data)"
                >
                </el-button> -->
              </div>
            </div>
          </div>
        </el-tree>
      </el-scrollbar>    

      </el-col>
      <!-- rolesPowerCom   有数据 -->
      <el-col v-if="isdata" :span="19" class="colright">
        <!-- 角色信息配置 添加 -->
        <template v-if="isadd">
            <roles-power-com :onoffFun='onoffFun' :rolesInput="rolesInput" :rolespowerdata='rolespowerdata'></roles-power-com>
        </template>
        <!-- 角色信息配置 修改编辑 -->
        <template v-if="isedit">
          <alterroles-power-com :onoffFun='onoffFun' :rolesseldata="rolesseldata" :rolesInput="rolesInput" :rolespowerdata='rolespowerdata'></alterroles-power-com>
        </template>
        <!-- 角色信息配置 查看-->
        <template v-if="isshow">
            <showroles-power-com :rolesseldata="rolesseldata" :rolesInput="rolesInput" :rolespowerdata='rolespowerdata'></showroles-power-com>
        </template>
      </el-col>
        <!-- 无数据 -->
      <el-col v-else :span="19" class="colright">
        <!-- 角色信息配置 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col>
              <div class="roles_titsty" style="padding-left: 22px">
                角色信息配置
              </div>
            </el-col>
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
import showrolesPowerCom from "./components/showrolesPowerCom";
import alterrolesPowerCom from "./components/alterrolesPowerCom";
import {rolelist,allPermissionHaveLevel,rolesAdd,listFunctionByRoleId,rolesEdit } from "api/index.js";
import {mapGetters} from 'vuex';
import { get_role_function } from '@/utils/index';
export default {
  data() {
    return {
    get_role_function,
    treedata: [],
    //多选框数据绑定
    checkboxData:{
      rolescherun:[],
    },
    //角色信息
    rolesdata:{},
    powerAddData:{},
    //修改数据
    powerEnditData:{},
    //权限信息
    rolespowerdata:[],
    //角色权限信息
    rolesseldata:[],
    showpower:false,
    //输入框数据绑定
    rolesInput:{},
    //编辑状态
    isedit:false,
    //添加状态
    isadd:false,
    //查看状态
    isshow:false,
    //有无数据
    isdata:false,

    //是否启用
    isroles:true,
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
    rolesPowerCom,showrolesPowerCom,alterrolesPowerCom
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
  powerAddData(newVal){
    this.powerAddData=newVal
  },
  powerEnditData(newVal){
    this.powerEnditData=newVal
  }
  },
  mounted () {
    this.rolelistFun()
    this.allPermissionHaveLevelFun()
  },
  methods: {
    //左边树形结构选中查看
   async nodeclickFun(e){
      if(e.type==1) return
      // if (!e.isroles) return
      this.isroles=e.isroles
      console.log(e,'左边树形结构选中角色查看信息');
      // this.ine.roleUseStatus==1?true:false
      this.rolesInput=e
      await this.allPermissionHaveLevelFun()
      await this.listFunctionByRoleIdFun(e.roleId)
      this.isshow=true
      this.isedit=false
      this.isadd=false
      this.$forceUpdate()
    },
    //添加角色
    append(node, data) {
      console.log(node, data,"添加");
      this.addrolesdata=data
      this.rolesInput=data
      this.allPermissionHaveLevelFun()
      this.isdata=true
      this.isshow=false
      this.isedit=false
      this.isadd=true
      this.dialogSubBrand=true
      this.dialogSubData.subbrandTit=data.label


    },
    // 删除基本信息
    remove(node, data) {
      if (!node.childNodes.length) {
        //  console.log(node);
        // console.log(1);
      }
    },
    //修改基本信息 控制页面效果
    outline(node, data){
      // console.log(node,data);
       this.allPermissionHaveLevelFun()
      this.endirolesdata=data
      this.rolesInput=data
      this.isedit=true
      this.isshow=false
      this.isadd=false
      // console.log("修改编辑");
    },
    //保存取消按钮 1 取消  2 新增 3 编辑
    async onoffFun(type,ajaxdata,inputdata){
      console.log(ajaxdata,"添加权限");
      // console.log(type,"1 取消  2 保存 3 编辑");
      if(type==2){
        console.log( this.powerAddData,this.addrolesdata,' powerAddDatapowerAddData');
        if(inputdata.rolname=='') {
           this.$message({
            message: '请输入昵称',
            type: 'warning'
          });
          return
        }
        if (!ajaxdata  || !ajaxdata.length) {
           this.$message({
            message: '请选择权限',
            type: 'warning'
          });
          return
        }
        let data={
          curUserId:this.userInfo.userId,
          roleName:inputdata.rolname,
          roleType:this.addrolesdata.id,
          roleDesc:inputdata.roldesc,
          roleUseStatus:inputdata.isroles?1:2,
          roleFunctions:JSON.stringify(ajaxdata)
        }
          //  roleUseStatus:this.
        console.log(data,"添加按钮执行",ajaxdata);

        let res=await rolesAdd(data)
        if(res.code==0){
        //q请求角色列表
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.isdata=false
        this.rolelistFun()
        }else{
          this.$message({
            message: res.errMsg,
            type: 'warning'
          });
        }
      }else if (type==3) {
          // this.powerEnditData.push({functionCode:this.rolespowerdatares.functionCode,functionLevel:this.rolespowerdatares.tableCode})
          // console.log(this.powerEnditData,"this.powerEnditDatathis.powerEnditData",this.rolesseldata);
          // console.log(ajaxdata,"编辑提交");
         let data={}
        if(ajaxdata.length){
          data={
            curUserId:this.userInfo.userId,
            roleId:this.endirolesdata.roleId,
            roleName:inputdata.rolname,
            roleDesc:inputdata.roldesc,
            roleType:this.endirolesdata.roleType,
            roleUseStatus:inputdata.isroles?1:2,
            roleFunctions:JSON.stringify(ajaxdata)
          }
        }else{
            data={
            curUserId:this.userInfo.userId,
            roleId:this.endirolesdata.roleId,
            roleName:inputdata.rolname,
             roleDesc:inputdata.roldesc,
            roleType:this.endirolesdata.roleType,
            roleUseStatus:inputdata.isroles?1:2,
            roleFunctions:JSON.stringify(this.rolesseldata)
          }
        }
        console.log(data,"编辑");
        let res=await rolesEdit(data)
        // console.log(res,"rolesenid 修改");
        if(res.code==0){
        //q请求角色列表
        this.$message({
          message: '修改成功',
          type: 'success'
        });
        this.isdata=false
        this.rolelistFun()
        }else{
          this.$message({
            message: res.errMsg,
            type: 'warning'
          });
        }
      }else if (type==1) {
        //编辑状态
        this.isedit=false
        //添加状态
        this.isadd=false
        //查看状态
        this.isshow=false
        //有无数据
        this.isdata=false
      }
      this.rolesInput={
        rolname:'',
        roltype:'',
        roldesc:'',
        isroles:true
      }
    },
    //ajax
    //角色树形结构
    async rolelistFun(){
      let res=await rolelist()
        if(res.code==0){
        console.log(res.data,"角色树形结构"); 
        let rolearr=[]
        res.data.forEach(v => {
          var v1tree={id:v.roleType,label:v.roleName,type: 1,icon: "el-icon-s-custom treeicon1",childrenNum:0,children: []}
          if(v.rootRoles!=null){
            v1tree.childrenNum=v.rootRoles.length
            v.rootRoles.forEach(v1 => {
              var v2tree={
                id:v1.roleId,
                label:v1.roleName,
                type: 2,
                icon: v1.roleUseStatus==1?"el-icon-arrow-right treeicon2":"iconfont icon-tingyong treeicon1",
                roleDesc:v1.roleDesc,
                roleFunctions:v1.roleFunctions,
                roleId: v1.roleId,
                roleName: v1.roleName,
                roleType: v1.roleType,
                roleTypeName:v.roleName,
                roleUseStatus:v1.roleUseStatus,
                isroles:v1.roleUseStatus==1?true:false,
                rootRoles: v1.rootRoles,
              }
              v1tree.children.push(v2tree)
            });
          }
          rolearr.push(v1tree)
        });
        this.isdata=false
        this.treedata=rolearr
       

      }else{
         this.$message.error('暂无数据');
      }
    },
    //角色权限获取
    async allPermissionHaveLevelFun(){
      let res =await allPermissionHaveLevel()
      console.log(res);
      if(res.code==0){

        this.rolespowerdata=res.data
        // this.rolespowerdatares=res.data
        // this.isdata=false
      }else{
         this.$message.error('暂无数据');
      }
    },
    //点击角色获取权限
    async listFunctionByRoleIdFun(roleId){
      let res =await listFunctionByRoleId({roleId})
      if(res.code==0){
        this.rolesseldata=res.data
        this.isdata=true
      }else{
         this.$message.error('暂无数据');
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
/deep/.el-switch__label.is-active{
  color: #43425D  ;
}
/deep/.el-switch.is-disabled{
  opacity: 1;
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
    height: 884px;
    overflow: hidden;
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
.boxscroll{
    height: 852px;
    overflow-y: scroll;
    margin-right: -23px;
    margin-bottom: -24px;
}
.colright {
  border: 1px solid #e4e6ed;
  border-left: none;
  border-top: none;
  height: 936px;
  overflow: hidden;
}
.treeicon1 {
  margin-right: 6px;
  margin-left: 11px;
  // transform: rotate(46deg);
}
.treeicon2 {
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
  height: 282px;
  background: #f5f6fa;
  margin: 10px 22px;
  padding: 16px;
  .rolenews_box{
    display: flex;
    min-height: 32px;
    line-height: 32px;
    margin-bottom: 14px;
  }
  .rolenews_tit{
    width: 70px;
    font-size: 14px;
    font-weight: 400;
    color: #43425D;

  }
}
.roles_titbutsty1{
    height: 32px;
    line-height: 32px;
    width: 100px;
    text-align: center;
    border-radius: 4px;
    background: #E4E6ED;
    font-size: 14px;
    color: #43425D;
    margin-right: 20px;
}
.roles_titbutsty2{
    height: 32px;
    line-height: 32px;
    width: 100px;
    text-align: center;
    border-radius: 4px;
    background: #43425D;
    font-size: 14px;
    color: #FFFFFF;
    margin-right: 14px;
}

</style>
