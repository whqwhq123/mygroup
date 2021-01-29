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
                    :label="itemchild1"
                    :key="itemchild1.functionCode"
                    :checked="checked"
                    @change="checkedChange($event, itemchild1.functionCode, item,itemchild1)"
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
                      @change="radioChange(itemchild1,item)"
                      :key="chicheitem.functionCode"
                      :label="chicheitem"
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
    rolespowerdata: {
      type: Object,
    },
  },
  data() {
    return {
      powerlist: [],
      checked:false,
      itemdata:[], 
      value: true,
      dialogSubData: {
        subbrandTit: "",
        subbrandsel: "",
        subbrandcus: "",
      },
    };
  },
  mounted() {
    console.log(this.rolespowerdata, "角色权限数据");
  },
  computed: {
    //多选框数据绑定
    checkboxData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            obj[v1.functionCode]=[]
          })
        }
      });
      return obj
    },
    //单选数据列表
    radioData(){
      let obj={}
      this.rolespowerdata.forEach(v => {
        if(v.childFunctionList){
          v.childFunctionList.forEach(v1 => {
            if(v1.childFunctionList){
              obj[v1.functionCode]=[]
            }
          })    
        }
      });
      return obj
    }
  },
  components: {  
  },
  watch: {
    //判断是不是编辑状态
    isedit(newVal) {
      this.isedit = newVal;
    },
    rolespowerdata(newVal) {
      this.rolespowerdata = newVal;
    },
    checkedChange(newVal){
      console.log(newVal,"newValnewValnewVal");
      this.checkedChange=newVal
    }

  },
  methods: {
    //多选框选中
    checkedChange(e, functionCode, item,itemchild1) {
      this.itemdata=item
      console.log(e, functionCode, item,itemchild1);
      console.log(this.checkboxData,this.radioData);
      console.log(this.checkboxData[functionCode]);
      console.log(this.radioData[itemchild1.functionCode],"当前点击单选数据绑定");
      if (!e && this.radioData[itemchild1.functionCode]) {
        this.radioData[itemchild1.functionCode]=[]
      }
      for (const key in this.checkboxData) {
        if(e && key==functionCode){
          if(this.checkboxData[key][0]){
            if(this.checkboxData[key][0].childFunctionList){
              for (const key2 in this.checkboxData[key][0].childFunctionList) {
                // console.log(this.checkboxData[key][0].childFunctionList[key2].functionCode);
                // console.log(this.radioData[this.checkboxData[key][0].childFunctionList[key2].parentCode],'this.checkboxData.keys()');

                if(this.checkboxData[key][0].childFunctionList[key2].functionCode==itemchild1.childFunctionList[0].functionCode){
                  this.radioData[this.checkboxData[key][0].childFunctionList[key2].parentCode]=this.checkboxData[key][0].childFunctionList[key2]
                console.log(this.checkboxData[functionCode],this.checkboxData[key][0].childFunctionList[key2],'this.checkboxData[key][0][key2]this.checkboxData[key][0][key2]this.checkboxData[key][0][key2]');            
                console.log(this.radioData[this.checkboxData[key][0].childFunctionList[key2].parentCode],'this.checkboxData.keys()');
              }
              }
            }
          }
        }
      }
      console.log(this.radioData,"this.radioDatathis.radioDatathis.radioData");
      this.addsubmitprwer()
      this.$forceUpdate()
    },
    //单选框选中
    radioChange(itemchild1,item) {
      this.itemdata=item
      console.log(item,"itemitem");
      console.log(this.checkboxData);
      console.log(this.checkboxData[itemchild1.functionCode],'当前点击多选数据绑定');
      console.log(this.radioData[itemchild1.functionCode],"当前点击单选数据绑定");
      let ckdata=this.checkboxData[itemchild1.functionCode]
      if(ckdata.length){
      }else{
        // this.checkboxData.push(ckdata)
          if(item.childFunctionList){
          item.childFunctionList.forEach(v => {
            if ( v.functionCode==this.radioData[itemchild1.functionCode].parentCode) {
              this.$set(ckdata,ckdata.length,v)
              // this.checked=true
              // ckdata.push(v.functionCode)
              // this.checkboxData.splice(0,0)
            }
          });
      }
      }
      // this.checkboxData.push(cheitem)
      this.$forceUpdate()
      this.addsubmitprwer()
      console.log(this.checkboxData);
      // console.log(itemchild1,item, this.checkboxData,this.radioData);
    },
    //添加提交
    addsubmitprwer(){
      let data=[]
      for (const key in this.checkboxData) {
        if(this.checkboxData[key].length){
          if(this.checkboxData[key][0].childFunctionList){
          for (const radkey in this.radioData) {
            if(radkey==key && this.radioData[radkey]!=''){
              data.push({functionCode:this.radioData[radkey].parentCode,functionLevel:this.radioData[radkey].tableCode})
            }
          }
          }else{
              data.push({functionCode:this.checkboxData[key][0].functionCode,functionLevel:this.checkboxData[key][0].tableCode})
          }
        }
      }
      data.push({functionCode:this.itemdata.functionCode,functionLevel:this.itemdata.tableCode})

      console.log(data,"xunzhe asdfasd fasdf a");
      this.$emit("update:powerAddData", data);
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
</style>