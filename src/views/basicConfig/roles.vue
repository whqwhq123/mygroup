<template>
  <div class="roles">
    <el-row>
      <el-col :span="5" class="colleft">
        <el-row type="flex"  class="row-bg leftTit" justify="space-between">
          <el-col :span="8">
            <div class="leftTit_text roles_titsty">角色管理</div>
          </el-col>
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
              <i   :class="[data.icon, 'treeicon']"></i>
              <span v-if="data.type == 1">{{ node.label }}（{{data.childrenNum}}）</span>
              <span v-else>{{ node.label }}</span>
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
                  icon="el-icon-edit-outline"
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
      </el-col>
      <!-- rolesPowerCom   有数据 -->
      <el-col v-if="isdata" :span="19" class="colright">
        <!-- 角色信息配置 修改编辑 -->
        <template v-if="isedit">
        <el-row>
          <el-row  class="row-bg rightTit" style="border-right: none">
            <el-col :span='4'>
              <div class="roles_titsty" style="padding-left: 22px">
                添加/修改角色
              </div>
            </el-col>
            <el-col :span='20' style="display: flex;justify-content: flex-end;align-items: center;height: 50px;">
              <div class="roles_titbutsty1" @click="onoffFun(1)">
                取消
              </div>
              <div class="roles_titbutsty2" @click="onoffFun(2)">
                保存
              </div>
            </el-col>
        </el-row>
        </el-row>
        <el-row >
          <el-row class="rolenews">
            <el-row class="rolenews_box">
              <i class="el-icon-s-custom" style="font-size: 40px;color: #A5A4BF;"></i>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色名称:</span>
              <el-input v-model="rolesInput.rolname"  style="width:440px" placeholder="请输入内容"></el-input>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色类型:</span>
              <el-input v-model="rolesInput.roltype" disabled  style="width:440px" placeholder="请输入角色类型"></el-input>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色描述:</span>
              <el-input type="textarea" :rows="2" v-model="rolesInput.roldesc"  resize="none" style="width:440px" placeholder="请输入描述"></el-input>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">是否停用:</span>
              <el-switch
                v-model="isroles"
                :active-text="isroles?'启用':'停用'"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                style="height: 32px;"
              >
              </el-switch>
            </el-row>
          </el-row>
        </el-row>
        </template>
        <!-- 角色信息配置 -->
        <template v-else>
        <el-row>
          <el-row  class="row-bg rightTit" style="border-right: none">
            <el-col :span='4'>
              <div class="roles_titsty" style="padding-left: 22px">
                角色信息配置
              </div>
            </el-col>
        </el-row>
        </el-row>
        <el-row>
          <el-row class="rolenews">
            <el-row class="rolenews_box">
              <i class="el-icon-s-custom" style="font-size: 40px;color: #A5A4BF;"></i>
              
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色名称:</span>
              <span>{{rolesdata.roleName}}</span>

            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色类型:</span>
             <span>{{rolesdata.roleTypeName}}</span>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色描述:</span>
              <span>{{rolesdata.roleDesc}}</span>
             
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">是否停用:</span>
              <el-switch
                v-model="rolesdata.isroles"
                disabled
                :active-text="rolesdata.isroles?'启用':'停用'"
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                style="height: 32px;"
              >
              </el-switch>
            </el-row>
          </el-row>
        </el-row>
        </template>
        <!-- 角色权限 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col>
              <div class="roles_titsty" style="padding-left: 22px">
                角色权限
              </div>
            </el-col>
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
        <template v-if="radio == 1">
        <showroles-power-com v-if="showpower" :rolesseldata="rolesseldata" :rolespowerdata='rolespowerdata' ></showroles-power-com>
        <roles-power-com v-else :isedit="isedit" :rolesseldata="rolesseldata" :rolespowerdata='rolespowerdata'  :powerAddData.sync="powerAddData"></roles-power-com>

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
import {rolelist,allPermissionHaveLevel,rolesAdd,listFunctionByRoleId } from "api/index.js";
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
    treedata: [],
    //多选框数据绑定
    checkboxData:{
      rolescherun:[],
    },
    //角色信息
    rolesdata:{},
    powerAddData:{},
    //权限信息
    rolespowerdata:[],
    //角色权限信息
    rolesseldata:[],
    showpower:false,
    //输入框数据绑定
    rolesInput:{
      rolname:'',
      roltype:'',
      roldesc:'',
      isroles:true
    },
    //编辑
    isedit:false,
    //有无数据
    isdata:false,
    //是否启用
    isroles:true,
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
    rolesPowerCom,showrolesPowerCom
  },
  computed: {
    ...mapGetters(['userInfo']),
  },
  watch: {
  powerAddData(newVal){
    this.powerData=newVal
  }
  },
  mounted () {
    
    this.rolelistFun()
    
  },
  methods: {
    //左边树形结构选中
    nodeclickFun(e){
      if(e.type==1) return
      console.log(e);
      this.allPermissionHaveLevelFun()
      this.listFunctionByRoleIdFun(e.roleId)
     
      this.rolesdata=e
      this.isdata=false
      this.showpower=true
      this.isedit=false
       console.log(this.isdata,"this.isdata=true");
    },
    //添加角色
    append(node, data) {
      this.rolesInput={
        rolname:'',
        roltype:'',
        roldesc:'',
        isroles:true
      }
      console.log(node, data,"添加");
      this.addrolesdata=data
      this.rolesInput.roltype=data.label
      this.allPermissionHaveLevelFun()
      this.isdata=true
      this.isedit=true
      this.dialogSubBrand=true
      this.dialogSubData.subbrandTit=data.label


    },
    // 删除基本信息
    remove(node, data) {
     
      if (!node.childNodes.length) {
         console.log(node);
        console.log(1);
      }
    },
    //修改基本信息 控制页面效果
    outline(node, data){
      this.isedit=true
      console.log("修改编辑");
    },
    //保存取消按钮 1 取消  2 保存
    async onoffFun(type){
      if(type==2){
        console.log( this.powerData,this.addrolesdata,' powerAddDatapowerAddData');
        // addrolesdata
        // curUserId 当前用户id
        // roleName 角色名称
        // roleType 角色类型
        if(this.rolesInput.rolname=='') {
           this.$message({
            message: '请输入昵称',
            type: 'warning'
          });
          return
        }
        this.powerData.push({functionCode:this.rolespowerdatares.functionCode,functionLevel:this.rolespowerdatares.tableCode})
        let data={
          curUserId:this.userInfo.userId,
          roleName:this.rolesInput.rolname,
          roleType:this.addrolesdata.id,
          roleFunctions:JSON.stringify(this.powerData)
        }
       console.log(this.rolespowerdatares,'权限配置');

        let res=await rolesAdd(data)
    
        console.log(res,"rolesAdd新增");
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
          this.rolesInput={
            rolname:'',
            roltype:'',
            roldesc:'',
            isroles:true
          }
        }
      }else{

      }
    },
    //基础配置 线索中心  商品中心
    radioFun(e){
        console.log(e);
    },
    powerDataFun(data){
      console.log(data,"datatasdfsdfefd");
    },
    //ajax
    //角色列表
    async rolelistFun(){
      let res=await rolelist()
        if(res.code==0){
        let rolearr=[]
        res.data.forEach(v => {
          var v1tree={id:v.roleType,label:v.roleName,type: 1,icon: "el-icon-menu",childrenNum:0,children: []}
          if(v.rootRoles!=null){
            v1tree.childrenNum=v.rootRoles.length
            v.rootRoles.forEach(v1 => {
              var v2tree={
                id:v1.roleId,
                label:v1.roleName,
                type: 2,
                icon: "el-icon-arrow-right",
                roleDesc:v1.roleDesc,
                roleFunctions:v1.roleFunctions,
                roleId: v1.roleId,
                roleName: v1.roleName,
                roleType: v1.roleType,
                roleTypeName:v.roleName,
                roleUseStatus:v1.roleUseStatus,
                isroles:v1.roleUseStatus==1?false:true,
                rootRoles: v1.rootRoles,
              }
              v1tree.children.push(v2tree)
            });
          }
          rolearr.push(v1tree)
        });
        this.treedata=rolearr
        console.log(rolearr,"角色树形结构");

      }else{
         this.$message.error('暂无数据');
      }
    },
    //添加角色权限获取
    async allPermissionHaveLevelFun(){
      let res =await allPermissionHaveLevel()
      if(res.code==0){
        this.rolespowerdata=res.data[0].childFunctionList
        this.rolespowerdatares=res.data[0]

      }else{
         this.$message.error('暂无数据');
      }
    },
    //点击角色获取权限
    async listFunctionByRoleIdFun(roleId){
      let res =await listFunctionByRoleId({roleId})
      if(res.code==0){
        console.log(res);
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
  overflow: hidden;
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