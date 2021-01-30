<template>

  <el-scrollbar class="boxscroll">
    <div class="rolesrightbox">
      <!-- 权限渲染 -->
      <el-row
        class="rolessttyone"
        style="min-height: 101px"
        v-for="item in rolespowerdata"
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
                :span="4"
                v-for="itemchild1 in item.childFunctionList"
                :key="itemchild1"
                class="rolessttyone_but_elcol"
              >   
                <div v-if="checkboxData[itemchild1.functionCode]" style="display: flex;">
                    <div class="checkboxtrue checkboxsty" > <i style="position: absolute;" class="el-icon-check"></i> 1</div>
                    <div style="color: #b9b9b9;">{{ itemchild1.functionName }}</div>
                    <template v-if="itemchild1.childFunctionList!=null">
                        <div 
                        v-for="itemchild2 in itemchild1.childFunctionList" 
                        :key="itemchild2.functionCode"        
                        >
                        
                        <div class="showrolestit" v-if="radioData[itemchild1.functionCode]==itemchild2.functionCode"
                        > 
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
              
              </el-col>
            </el-row>
          </template>
        </el-row>
      </el-row>
    </div>
  </el-scrollbar>
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
    }
  },
  data() {
    return {
      //角色权限数据
      // rolesseldata:[],
      powerlist: [],
      checked:false,
      itemdata:[], 
      checkboxData:[],
      radioData:{},
      value: true,
      dialogSubData: {
        subbrandTit: "",
        subbrandsel: "",
        subbrandcus: "",
      },
    };
  },
  mounted() {
    // this.listFunctionByRoleIdFun()
    console.log(this.rolespowerdata, "角色权限数据");
    console.log(this.rolesseldata, "1点击查看查看角色权限数据");
    
    this.rolesseldataFun(this.rolespowerdata)
  },
  computed: {
    //多选框数据绑定
    checkboxData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            obj[v1.functionCode]=false
          })
        }
      });
      return obj
    },
    //单选数据绑定初始化
    radioData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            if(v1.childFunctionList){
              obj[v1.functionCode]=""
            }
          })    
        }
      });
      // console.log(obj);
      return obj
    }
  },
  components: {  
  },
  watch: {
    rolespowerdata(newVal) {

      this.rolespowerdata = newVal;
    },
    rolesseldata(newVal){
      this.rolesseldata=newVal
      console.log(this.rolespowerdata, "角色权限数据");
      console.log(this.rolesseldata, "1点击查看查看角色权限数据");
      console.log(this.checkboxData,"多选数据");
      console.log(this.radioData,"单选数据");
      this.rolesseldataFun(this.rolespowerdata)
    },
    checkboxData(newVal){
      this.checkboxData=newVal
    },
    radioData(newVal){
      this.radioData=newVal
    },
  },
  methods: {
    //过滤数据回显
    rolesseldataFun(data){
      for (let i = 0; i < data.length; i++) {
        var fcode= data[i].functionCode
        var tableCode=data[i].tableCode
        for (let j = 0; j < this.rolesseldata.length; j++) {
          if (this.rolesseldata[j].functionCode==fcode) {
            // console.log(data[i]);
            this.checkboxData[data[i].functionCode]=true
            if (data[i].childFunctionList!=null) {
              this.rolesseldataFun(data[i].childFunctionList)
            }
          }
            if (this.rolesseldata[j].functionLevel==data[i].tableCode && data[i].tableCode!==null && this.rolesseldata[j].functionCode==data[i].parentCode) {
              // console.log(data[i].parentCode,"data[i]data[i]");
              // this.radioData[data[i].parentCode]=data[i].functionCode
              this.radioData[data[i].parentCode]=data[i].functionCode
              // this.$set(this.radioData,data[i].parentCode,data[i].functionCode)
            }
        }
            // for (const key in this.checkboxData) {
            //     if (data[i].functionCode==key) {
            //       this.checkboxData[data[i].functionCode]=true
            //     }
            // }
      }
   
    this.$forceUpdate()
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
    left: 58px;
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
</style>