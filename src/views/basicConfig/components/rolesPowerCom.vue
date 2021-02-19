<template>
  <div>
    <el-row>
      <el-row  class="row-bg rightTit" style="border-right: none">
        <el-col :span='4'>
          <div class="roles_titsty" style="padding-left: 22px">
            添加角色
          </div>
        </el-col>
        <el-col :span='20' style="display: flex;justify-content: flex-end;align-items: center;height: 50px;">
          <div class="roles_titbutsty1" @click="onoffaddFun(1)">
            取消
          </div>
          <div class="roles_titbutsty2" @click="onoffaddFun(2)">
            保存
          </div>
        </el-col>
      </el-row>
    </el-row>
     <el-row >
        <el-row class="rolenews">
          <el-row class="rolenews_box">
            <span class="rolenews_tit">角色名称:</span>
            <el-input  v-model="inputValue.rolname"  style="width:440px" placeholder="请输入内容"></el-input>
          </el-row>
          <el-row class="rolenews_box">
            <span class="rolenews_tit">角色类型:</span>
            <el-input v-model="inputValue.roltype" disabled style="width:440px" placeholder="请输入角色类型"></el-input>
          </el-row>
          <el-row class="rolenews_box">
            <span class="rolenews_tit">角色描述:</span>
            <el-input type="textarea" :rows="2" v-model="inputValue.roldesc"  resize="none" style="width:440px" placeholder="请输入描述"></el-input>
          </el-row>
          <el-row class="rolenews_box">
            <span class="rolenews_tit">是否停用:</span>
            <el-switch
              v-model="inputValue.isroles"
              :active-text="inputValue.isroles?'启用':'停用'"
              active-color="#13ce66"
              inactive-color="#dcdfe6"
              style="height: 32px;"
              @change="changeSwitchFun"
            >
            </el-switch>
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
        <el-radio-button v-for="itemrad in radiodata" :key="itemrad.functionCode" :label="itemrad.functionCode">{{itemrad.functionName}}</el-radio-button>
      </el-radio-group>
     <el-scrollbar class="boxscroll">
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
          <template v-if="item.childFunctionList!==null">
            <el-row class="rolessttyone_but_elrow">
              <el-col
                :span="6"
                v-for="itemchild1 in item.childFunctionList"
                :key="itemchild1"
                class="rolessttyone_but_elcol"
              >
              <!-- v-model="checkboxData[itemchild1.functionCode]" -->
                <!-- <el-checkbox-group
                  @change="checkedChange($event, itemchild1.functionCode, item,itemchild1)"
                  class="marbot"
                > -->
                  <el-checkbox

                    :label="itemchild1.functionCode"
                     @change="checkedChange($event, itemchild1.functionCode, item,itemchild1)"
                     v-model="checkboxData[itemchild1.functionCode]"
                    :key="itemchild1.functionCode"
                    :checked="checked"
                    >{{ itemchild1.functionName }}
                  </el-checkbox>
                <!-- </el-checkbox-group> -->
                
                <template v-if="itemchild1.childFunctionList!==null">
                  <!-- 单选 -->
                  <el-radio-group
                    class="rolessttyone_but_groupAll"
                    v-model="radioData[itemchild1.functionCode]"
                  >
                    <el-radio
                      class="marbot"
                      v-for="chicheitem in itemchild1.childFunctionList"
                      @change="radioChange( chicheitem.functionCode, item,itemchild1)"
                      :key="chicheitem.functionCode"
                      :label="chicheitem.functionCode"
                      >{{ chicheitem.functionName }}</el-radio
                    >
                  </el-radio-group>
                  <div
                    class="rolessttyone_but_line"
                    v-if="itemchild1.childFunctionList"
                  ></div>
                </template>
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
    //存放角色权限数据
    rolespowerdata:{
      type:Object
    },
    onoffFun:{
      type:Function
    },
    //
    rolesInput:{
      type:Object
    }
  },
  data() {
    return {
      radiogroup:[],//一级切换标签
      powerlist: [],
      checked:false,
      itemdata:[], 
      value: true,
      powerAddData:[],//保存的数据
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
        isroles:true
      },
      //tabs 切换数据
      radiodata:[],
      radio:'',
      tabsrolesdata:[],//切换之后数据更新

    };
  },
  mounted() {
     console.log(this.rolespowerdata,"权限数据dasdasdasd");
     this.inputValue.roltype=this.rolesInput.label
     
     //初始化radio数据
     this.radiotabFun()
      
  },
  watch:{
    rolespowerdata(newVal){
      this.rolespowerdata=newVal
    },
  },
  computed: {
    //多选框数据绑定初始化
    checkboxData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            obj[v1.functionCode]=false
          })
        }
      });
      console.log(obj,"checkboxData");
      return obj
    },
    //单选数据绑定初始化
    radioData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            if(v1.childFunctionList){
              v1.childFunctionList.forEach(v2=>{
                obj[v2.functionCode]=""
              })
              //
            }
          })    
        }
      });
      console.log(obj,"radioData");
      return obj
    },

  },
  methods: {

    //tabs 切换初始化数据
    radiotabFun(){
      this.rolespowerdata.forEach(v => {
        this.radiodata.push(v)
      });
      this.radio=this.radiodata[0].functionCode
      this.radioFun(this.radiodata[0].functionCode)
    },
    //tabs 数据切换
    radioFun(functionCode){
      this.radiodata.forEach(v=>{
        if(v.functionCode==functionCode){
          this.tabsrolesdata=v
        }
      })
       this.$forceUpdate()
      // console.log(this.tabsrolesdata,'this.tabsrolesdatathis.tabsrolesdatathis.tabsrolesdata');
    },
    // 1递归查找符合要求的数据
      recursive(data){
      for (let i = 0; i < data.length; i++) {
          if(this.checkboxData[data[i].functionCode] ){
              // var  praid=data[i].parentCode
              // console.log(praid);
              //父级的状态数据 
             console.log(data[i],"data[i]data[i]data[i]");
              let item={functionCode:data[i].functionCode,functionLevel:data[i].tableCode}
              let item3={functionCode:data[i].parentCode,functionLevel:data[i].tableCode}
              let item4={functionCode:this.tabsrolesdata.functionCode,functionLevel:this.tabsrolesdata.tableCode}
              console.log(item3,item4);
              this.powerAddData.push(item)
              this.powerAddData.push(item3)
              this.powerAddData.push(item4)
          }
          // if(data[i].functionCode==praid){
          //   console.log(data[i],"checkboxData1");
          // }
          if(this.radioData[data[i].parentCode]==data[i].functionCode){

            if (data[i].tableCode!=null) {
              let item5={functionCode:data[i].parentCode,functionLevel:data[i].tableCode}
              this.powerAddData.push(item5)
            }
            if (data[i].childFunctionList!=null) {
              let item2={functionCode:data[i].parentCode,functionLevel:data[i].tableCode}
              this.powerAddData.push(item2)
            }
          }
          if(data[i].childFunctionList!=null){
              this.recursive(data[i].childFunctionList) 
          }
      }
     }, 
     // 2循环查找符合要求的数据
    forselFun(){
    var data=[]
     for (let i = 0; i < this.rolespowerdata.length; i++) {
        if( this.rolespowerdata[i].childFunctionList!=null){
            let ione=this.rolespowerdata[i].childFunctionList
            if(ione!=null){
              for (let j = 0; j < ione.length; j++) {
              if(this.checkboxData[ione[j].functionCode]){
                let ioneitema={functionCode:ione[j].functionCode,functionLevel:ione[j].tableCode}
                let ioneitemb={functionCode:this.rolespowerdata[i].functionCode,functionLevel:this.rolespowerdata[i].tableCode}
                data.push(ioneitema)
                data.push(ioneitemb)
                if(ione[j].childFunctionList!=null){
                    for (let x = 0; x < ione[j].childFunctionList.length; x++) {
                      let xone=ione[j].childFunctionList[x]
                      if(this.radioData[xone.parentCode]== xone.functionCode){
                        let ioneitemc={functionCode: xone.functionCode,functionLevel: xone.tableCode}
                        data.push(ioneitemc)
                      }
                      
                    }
                }
              }
              }
            }
        }
     }
    //  this.powerAddData=JSON.stringify(JSON.parse(data))
    this.powerAddData=data
      // console.log(data,"datadatadtadta");
    },
    //多选框选中
    checkedChange(e, functionCode, item,itemchild1) {
    if(this.checkboxData[functionCode]){
     if( itemchild1.childFunctionList!=null){
       this.radioData[functionCode]=itemchild1.childFunctionList[0].functionCode
     }
    }else{
      this.radioData[functionCode]=""
    }
    //  console.log(this.checkboxData,"多选框数据绑定初始化");
    //  console.log(this.radioData,"单选数据绑定初始化");
    // console.log(e, functionCode, item,itemchild1);
    this.addsubmitprwer()
    this.$forceUpdate()
    },
    //单选框选中
    radioChange(functionCode, item,itemchild1) {
    // console.log(this.checkboxData,"多选框数据绑定初始化");
    // console.log(this.radioData,"单选数据绑定初始化");
    // console.log(functionCode, item,itemchild1);
    // console.log(this.checkboxData[itemchild1.functionCode]);
    if(!this.checkboxData[itemchild1.functionCode]){
      this.checkboxData[itemchild1.functionCode]=true
    }
     this.$forceUpdate()
     this.addsubmitprwer()
    },
    //添加提交数据处理
    async addsubmitprwer(){
    console.log(this.rolespowerdata,"权限数据");

    // console.log(this.checkboxData,"多选框数据绑定初始化");
    // console.log(this.radioData,"单选数据绑定初始化");
    // this.powerAddData=[]
    //1. 递归获取
    await this.recursive(this.rolespowerdata)
    //去重
    // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    // let obj = {};
    // this.powerAddData = this.powerAddData.reduce((item, next) => {
    //   if (!obj[next.functionCode]) {
    //     item.push(next);
    //     obj[next.functionCode] = true;
    //   }
    //   return item;
    // }, []);
        //去重
    // // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    let obj = {};
    this.powerAddData = this.powerAddData.reduce((item, next) => {
      // console.log(obj[next.functionCode],item, next);
      if (!obj[next.functionCode]) {
        item.push(next);
        obj[next.functionCode] = true;
      }
      if (next.functionLevel!=item.functionLevel) {
          item.forEach(v => {
            if(v.functionCode==next.functionCode){
              v.functionLevel=next.functionLevel
            }
          });  
      }
      return item;
    }, []);
    //  console.log(this.powerAddData,"arrarrarr");
    //循环获取
    // this.forselFun()
    console.log(this.powerAddData,"arrarrarr");
    },
        //保存取消按钮 1 取消  2 新增 3 编辑
    onoffaddFun(type){

      console.log(this.powerAddData,"数据提交",);
      this.onoffFun(type,this.powerAddData,this.inputValue)
      // this.$parent.$parent.onoffFun(type,this.powerAddData,this.rolesInput)

    },
    //ajax

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
      min-height: 140px;
      position: relative;
      z-index: 3;
    }
    .rolessttyone_but_line {
      // height: calc(100% - 35px);
      // top: 18px;
      width: 0px;
      height: calc(100% - 65px);
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