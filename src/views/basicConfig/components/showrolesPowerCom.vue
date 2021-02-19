<template>
<div>
    <el-row>
      <el-row  class="row-bg rightTit" style="border-right: none">
        <el-col :span='4'>
          <div class="roles_titsty" style="padding-left: 22px">
            角色信息配置
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
              <span>{{inputValue.rolname}}</span>

            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色类型:</span>
             <span>{{inputValue.roltype}}</span>
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">角色描述:</span>
              <span>{{inputValue.roldesc}}</span>
             
            </el-row>
            <el-row class="rolenews_box">
              <span class="rolenews_tit">是否停用:</span>
              <span>{{inputValue.isroles?'启用':'停用'}}</span>

            </el-row>
          </el-row>
      </el-row>
      <el-row>
        <el-row class="row-bg rightTit" style="border-right: none">
          <el-col>
            <div class="roles_titsty" style="padding-left: 22px">
              角色权限
            </div>
          </el-col>
        </el-row>
      </el-row>
      <!-- 权限处理 -->
      <!-- 角色权限tab切换 -->
      <el-radio-group
        v-model="radio"
        @change="radioFun"
        size="medium"
        style="margin: 13px 0 6px 22px"
      >
        <el-radio-button v-for="itemrad in radiotabsdata" :key="itemrad.functionCode" :label="itemrad.functionCode">{{itemrad.functionName}}</el-radio-button>
      </el-radio-group>
  <el-scrollbar class="boxscroll" v-cloak>
    <div class="rolesrightbox">
      <!-- 权限渲染 -->
      <el-row
        class="rolessttyone"
        style="min-height: 101px"
        v-for="item in tabsrolesdata.childFunctionList"
        :key="item.functionCode"
      >
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">{{ item.functionName }}</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but">
          <!-- 多选 -->
          <template v-if="item.childFunctionList">
            <el-row class="rolessttyone_but_elrow">
              <el-col
                :span="itemchild1.functionType==1?24:6" 
                v-for="itemchild1 in item.childFunctionList"
                :key="itemchild1"
                class="rolessttyone_but_elcol"
              >   
             
              <template v-if="itemchild1.functionType==2">
                <div v-if="checkboxData[itemchild1.functionCode]" style="display: flex;">
                    <div class="checkboxtrue checkboxsty" > <i style="position: absolute;" class="el-icon-check"></i> 1</div>
                    <div style="color: #b9b9b9;">{{ itemchild1.functionName }}</div>
                    <template v-if="itemchild1.childFunctionList!=null">
                        <div 
                        v-for="itemchild2 in itemchild1.childFunctionList" 
                        :key="itemchild2.functionCode"        
                        >
                       
                        <!-- <div class="showrolestit" v-if="radioData[itemchild1.functionCode]">  -->
                        <div class="showrolestit" v-if="radioData[itemchild1.functionCode]==itemchild2.functionCode"> 
                        {{'('+itemchild2.functionName+')'}}

                        </div>
                        </div>
                    </template>
                </div>
                <!-- showrolesPowerCom -->
                <div v-else style="display: flex;"> 
                    <div class="checkboxfalse checkboxsty"></div>
                    <div style="color: #b9b9b9;">{{ itemchild1.functionName }}</div>
                </div>
              </template>
              <template v-if="itemchild1.functionType==1">
                {{ itemchild1.functionName }}
                <div v-for="itemchild2 in itemchild1.childFunctionList" :key="itemchild2.functionCode">
                  <div v-if="checkboxData[itemchild2.functionCode]" style="display: flex;">
                    <div class="checkboxtrue checkboxsty" > <i style="position: absolute;" class="el-icon-check"></i> 1</div>
                    <div style="color: #b9b9b9;">{{ itemchild2.functionName }}</div>
                    <template v-if="itemchild2.childFunctionList!=null">
                        <div 
                        v-for="itemchild2 in itemchild2.childFunctionList" 
                        :key="itemchild2.functionCode"        
                        >
                        <div class="showrolestit" v-if="radioData[itemchild2.functionCode]==itemchild1.functionCode"> 
                        {{'('+itemchild2.functionName+')'}}
                        </div>
                        </div>
                    </template>
                  </div>
                  <!-- <div v-else style="display: flex;"> 
                      <div class="checkboxfalse checkboxsty"></div>
                      <div style="color: #b9b9b9;">{{itemchild2.functionName}}</div>
                  </div>  -->
                </div>
         
              </template>
          
               <!-- <div v-if="checkboxData[itemchild2.functionCode]" style="display: flex;">
                    <div class="checkboxtrue checkboxsty" > <i style="position: absolute;" class="el-icon-check"></i> 1</div>
                    <div style="color: #b9b9b9;">{{ itemchild2.functionName }}</div>
                    <template v-if="itemchild2.childFunctionList!=null">
                        <div 
                        v-for="itemchild2 in itemchild2.childFunctionList" 
                        :key="itemchild2.functionCode"        
                        >
                        <div class="showrolestit" v-if="radioData[itemchild2.functionCode]==itemchild2.functionCode"> 
                        {{'('+itemchild2.functionName+')'}}
                        </div>
                        </div>
                    </template>
                </div>-->
                  <!-- showrolesPowerCom -->
                  <!-- <div v-else style="display: flex;"> 
                      <div class="checkboxfalse checkboxsty"></div>
                      <div style="color: #b9b9b9;">{{ itemchild1.functionName }}</div>
                  </div>  -->




              
              </el-col>
            </el-row>
          </template>
        </el-row>
      </el-row>
    </div>
  </el-scrollbar>

</div>

</template>

<script>
export default {
  props: {
    //权限表
    rolespowerdata: {
      type: Object,
    },
    rolesseldata:{
      type:Object
    },
        //
    rolesInput:{
      type:Object
    }
  },
  data() {
    return {
      //角色权限数据
      // rolesseldata:[],
      powerlist: [],
      checkboxData:{},
      radioData:{},
      checked:false,
      itemdata:[], 
      value: true,
      dialogSubData: {
        subbrandTit: "",
        subbrandsel: "",
        subbrandcus: "",
      },
        //输入框数据绑定
        inputValue:{
        rolname:'',
        roltype:'',
        roldesc:'',
        isroles:true,
        },

      //tabs 切换数据
      radiotabsdata:[],
      radio:'',
      tabsrolesdata:[],//切换之后数据更新
    };
  },
    mounted() {
    // this.listFunctionByRoleIdFun()
    console.log(this.rolespowerdata, "角色权限数据");
    console.log(this.rolesseldata,"1点击查看查看角色权限数据");
    this.inputValue.rolname=this.rolesInput.label
    this.inputValue.roltype=this.rolesInput.roleTypeName
    this.inputValue.roldesc=this.rolesInput.roleDesc
    this.inputValue.isroles=this.rolesInput.roleUseStatus==1?true:false
    //数据初始化赋值
    this.startFun(this.rolespowerdata)
    // this.checkboxData={}
    // this.radioData={}
         //初始化radio数据
    this.rolesseldataFun(this.rolespowerdata)
     this.radiotabFun()
     
    this.$forceUpdate()
  },
  components: {  
  },
  watch: {
    rolespowerdata(newVal) {
      this.rolespowerdata = newVal;
    },
    rolesseldata(newVal){
      this.rolesseldata=newVal
      // console.log(this.rolespowerdata, "角色权限数据");
      console.log(this.rolesseldata, "1点击查看查看角色权限数据");
      this.checkboxData={}
      this.radioData={}
      this.rolesseldataFun(this.rolespowerdata)
      console.log(this.checkboxData,"多选数据");
      console.log(this.radioData,"单选数据");
      this.$forceUpdate()

    },
    rolesInput(newVal){
    this.rolesInput=newVal
    this.inputValue.rolname=this.rolesInput.label
    this.inputValue.roltype=this.rolesInput.roleTypeName
    this.inputValue.roldesc=this.rolesInput.roleDesc
    this.inputValue.isroles=this.rolesInput.roleUseStatus==1?true:false
    this.radio=this.radiotabsdata[0].functionCode
    this.radioFun(this.radiotabsdata[0].functionCode)
    }

  },
  methods: {
    //多选 单选双向绑定数据初始化 
    startFun(data){
      for (let i = 0; i < data.length; i++) {

      if(data[i].functionType==2){
        this.$set( this.checkboxData,data[i].functionCode,false)
      }
      if(data[i].functionType==3){
         this.$set(this.radioData,data[i].parentCode,'')
      }
       if(data[i].childFunctionList!=null){
         this.startFun(data[i].childFunctionList)
       }
      }
    },
        //过滤数据回显
    rolesseldataFun(data){    
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < this.rolesseldata.length; j++) {     
          if (this.rolesseldata[j].functionCode == data[i].functionCode) {
            if (data[i].childFunctionList!=null) { 
              // this.checkboxData[data[i].functionCode]=true
              this.$set(this.checkboxData,data[i].functionCode,true)
              this.rolesseldataFun(data[i].childFunctionList)
            }else{
              this.$set(this.checkboxData,data[i].functionCode,true)
              // console.log(data[i],"sdfdgfhfghg1`1",this.radioData);
              // this.radioData[data[i].parentCode]=data[i].functionCode
              this.$set(this.radioData,data[i].parentCode,data[i].functionCode)
            }
          }
            if(data[i].functionType=='3'&&this.rolesseldata[j].functionCode == data[i].parentCode && this.rolesseldata[j].functionLevel==data[i].tableCode){
                this.$set(this.radioData,data[i].parentCode,data[i].functionCode)          
            }
        }
      }
    },
           //tabs 切换初始化数据
    radiotabFun(){
      this.rolespowerdata.forEach(v => {
        this.radiotabsdata.push(v)
      });
     
      this.radio=this.radiotabsdata[0].functionCode
      this.radioFun(this.radiotabsdata[0].functionCode)
    },
    //tabs 数据切换
    radioFun(functionCode){
      this.radiotabsdata.forEach(v=>{
        if(v.functionCode==functionCode){
          this.tabsrolesdata=v
        }
      })
      //  this.rolesseldataFun(this.tabsrolesdata.childFunctionList)
      //  this.$forceUpdate()
      // console.log(this.radiotabsdata,'this.tabsrolesdatathis.tabsrolesdatathis.tabsrolesdata');
      // console.log(this.rolespowerdata, "角色权限数据");
      // console.log(this.rolesseldata, "1点击查看查看角色权限数据");
      // console.log(this.checkboxData,"多选数据");
      // console.log(this.radioData,"单选数据");
    },


  },
};
</script>

<style lang="scss" scoped>
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #7cd2a2;
  background: #7cd2a2;
  color: #7cd2a2;
}
/deep/.el-checkbox__inner:hover {
  border-color: #7cd2a2;
}
/deep/ .el-checkbox__label {
  color: #43425d;
  opacity: 0.7;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #43425d;
  opacity: 1;
}
/deep/.el-checkbox__inner.is-focus .el-checkbox__inner {
  border-color: #7cd2a2;
}
/deep/.el-scrollbar__wrap {
  overflow-y: scroll !important;
  overflow: hidden;
  padding-bottom: 25px;
}
//修改单选的颜色
/deep/ {
  .el-radio {
    .el-radio__input {
      margin-bottom: px(5);
      //选中时的样式
      &.is-checked {
        .el-radio__inner {
          //选中时小圆圈的的颜色
          background-color: #7cd2a2;
          border-color: #7cd2a2;
        }
        + .el-radio__label {
          //选中时字体的颜色
          color: #43425d !important;
        }
      }
      .el-radio__inner {
        // 鼠标滑过小圆点时的样式
        &:hover {
          border-color: #7cd2a2;
        }
      }
    }
  }
}
.boxscroll {
  height: 508px;
  overflow-y: scroll;
  margin-right: -20px;
}
.rolesrightbox {
  padding-left: 22px;
}
//权限通用样式1
.rolessttyone {
  // height: 93px;
  width: 100%;
  padding: 0 11px;
  border: 1px solid #e4e6ed;
  border-right: none;
  border-bottom: none;
  box-sizing: border-box;
  .rolessttyone_top {
    height: 42px;
    line-height: 42px;
  }
  .rolessttyone_line {
    width: 100%;
    height: 1px;
    background: #e4e6ed;
  }
  .rolessttyone_but {
    min-height: 51px;
    line-height: 51px;
    .rolessttyone_but_elcol {
      position: relative;
      z-index: 3;
    }
    .rolessttyone_but_line {
      // height: calc(100% - 35px);
      // top: 18px;
      width: 0px;
      height: calc(100% - 55px);
      border: 1px solid #d7dae2;
      position: absolute;
      top: 40px;
      left: 6px;
      z-index: -22;
    }
  }
}
.roles_titsty {
  margin-right: 19px;
  font-weight: bold;
}
.rolessttyone_but {
  height: 43px;
  line-height: 43px;
  margin-left: 19px;
  font-size: 14px;
  font-weight: bold;
}
.rolessttyone_but_tit {
  height: 43px;
  line-height: 43px;
}
.rolessttyone_but_elrow {
  min-height: 130px;
}
.rolessttyone_but_groupAll {
  display: flex;
  flex-direction: column;
}
.marbot {
  margin-bottom: 10px;
}
.showrolestit{
    position: absolute;
    top: 0;
    // left: 86px;
    color: #b9b9b9;
}
.checkboxtrue{
    width: 14px;
    height: 14px;
    background-color: #43425D;
    color: #fff;
    border:1px solid #43425D;
}
.checkboxfalse{
    width: 14px;
    height: 14px;
    border:1px solid #43425D;
}
.checkboxsty{
    top: 0;
    bottom: 0;
    margin: auto 0;
    margin-right: 5px;
}
     [v-cloak]{
            display: none !important;
        }
   .rolenews {
  height: 282px;
  background: #f5f6fa;
  margin: 10px 22px;
  padding: 16px;

}
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