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
                <el-checkbox-group
                  v-model="checkboxData[itemchild1.functionCode]"
                  @change="checkedChange($event, itemchild1.functionCode, item,itemchild1)"
                  class="marbot"
                >
                  <el-checkbox
                    :label="itemchild1.functionCode"

                    :key="itemchild1.functionCode"
                    :checked="checked"
                    >{{ itemchild1.functionName }}
                  </el-checkbox>
                </el-checkbox-group>
                
                <template v-if="itemchild1.childFunctionList">
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
</template>

<script>
export default {
  props: {
    isedit: {
      type: Boolean,
    },
    //存放角色权限数据
    rolespowerdata:{
      type:Object
    }
  },
  data() {
    return {
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
    };
  },
  mounted() {
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
  watch: {
    //判断是不是编辑状态
    isedit(newVal) {
      this.isedit = newVal;
    },


  },
  methods: {
    // 1递归查找符合要求的数据
    recursive(data){
    for (let i = 0; i < data.length; i++) {
        if(this.checkboxData[data[i].functionCode] ){
            // var  praid=data[i].parentCode
            // console.log(praid);
            //父级的状态数据  bug
            let item3={functionCode:data[i].parentCode,functionLevel:data[i].tableCode}
            let item={functionCode:data[i].functionCode,functionLevel:data[i].tableCode}
            this.powerAddData.push(item)
            this.powerAddData.push(item3)
        }
        // if(data[i].functionCode==praid){
        //   console.log(data[i],"checkboxData1");
        // }
        if(this.radioData[data[i].parentCode]==data[i].functionCode){
          let item2={functionCode:data[i].functionCode,functionLevel:data[i].tableCode}
          // console.log(data[i],"radioData");
          this.powerAddData.push(item2)
        }
        if(data[i].childFunctionList!=null){
            this.recursive(data[i].childFunctionList) 
        }
    }
    return this.powerAddData
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
    // console.log(this.checkboxData,"多选框数据绑定初始化");
    // console.log(this.radioData,"单选数据绑定初始化");
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
    this.powerAddData=[]
    //1. 递归获取
    await this.recursive(this.rolespowerdata)
    //去重
    // 利用reduce方法遍历数组,reduce第一个参数是遍历需要执行的函数，第二个参数是item的初始值
    let obj = {};
    this.powerAddData = this.powerAddData.reduce((item, next) => {
      if (!obj[next.functionCode]) {
        item.push(next);
        obj[next.functionCode] = true;
      }
      return item;
    }, []);
    //  console.log(this.powerAddData,"arrarrarr");
    //循环获取
    // this.forselFun()
    // console.log(this.powerAddData,"arrarrarr");
      this.$emit("update:powerAddData", this.powerAddData);
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
</style>