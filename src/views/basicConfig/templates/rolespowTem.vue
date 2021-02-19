<template>
    <div>
    <el-row
        class="rolessttyone"
        style="min-height: 101px"
         v-if="rolesData.functionType==1"
    >
        <el-row class="rolessttyone_top">
          <span class="roles_titsty" >{{ rolesData.functionName }}</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but" >
            <el-col>
                <el-col v-for="itemchild1 in rolesData.childFunctionList" :span="itemchild1.functionType==1?24:6"  :key="itemchild1.functionCode"  class="rolessttyone_but_elcol">
                   
                    <template v-if="itemchild1.functionType==1">
                        <el-row>{{itemchild1.functionName}}</el-row>
                        <el-row class="rolessttyone_but_elrow">
                        <el-col
                            :span="rolesData.childFunctionList.length>=6?6:4"
                            v-for="itemchild2 in itemchild1.childFunctionList"
                            :key="itemchild2"
                            class="rolessttyone_but_elcol"
                        >                     
                        <el-checkbox
                            v-model="checkboxData[itemchild2.functionCode]"
                            :label="itemchild2.functionCode"
                            :key="itemchild2.functionCode"
                            :checked="checkboxData[itemchild2.functionCode]"                       
                            @change="checkedChange($event, itemchild2.functionCode, itemchild2,itemchild1)"
                            >{{ itemchild2.functionName }}
                        </el-checkbox>
                        <template>
                        <!-- 单选 -->
                          <el-col                              
                                v-for="chicheitem in itemchild2.childFunctionList"
                                :key="chicheitem.functionCode"                           
                            >
                            <el-radio-group
                                class="rolessttyone_but_groupAll"
                                v-model="radioData[chicheitem.parentCode]"
                            >
                                <el-radio
                                class="marbot"
                                :checked="radioData[chicheitem.parentCode]==chicheitem.functionCode"  
                                :label="chicheitem.parentCode"
                                :key="chicheitem.functionCode"
                                @change="radioChange( chicheitem.functionCode,chicheitem,itemchild2)"
                                >{{ chicheitem.functionName }}</el-radio>  
                            </el-radio-group>
                          </el-col>
                        <div class="rolessttyone_but_line" v-if="itemchild1.childFunctionList"></div>
                        </template>
                        </el-col>
                        </el-row>
                    </template>
                    <!--  -->
                    <template v-if="itemchild1.functionType==2">
                
                        <el-row class="rolessttyone_but_elrow">
                        <el-checkbox
                            v-model="checkboxData[itemchild1.functionCode]"  
                            :key="itemchild1.functionCode"
                            :checked="checked"
                            @change="checkedChange($event, itemchild1.functionCode, itemchild1)"
                            >{{ itemchild1.functionName }}
                        </el-checkbox>
                        <el-row class="rolessttyone_but_elrow">
                            <el-col                              
                                v-for="itemchild2 in itemchild1.childFunctionList"
                                :key="itemchild2"                              
                            >
                                    <!-- 单选 -->
                                <el-radio-group
                                    class="rolessttyone_but_groupAll"
                                    v-model="radioData[itemchild1.functionCode]"
                                >
                                    <el-radio
                                    class="marbot"
                                    @change="radioChange( itemchild2.functionCode, itemchild2,itemchild1)"
                                    :key="itemchild2.functionCode"
                                    :label="itemchild2.functionCode"
                                    >{{ itemchild2.functionName }}</el-radio
                                    >
                                </el-radio-group>
                            </el-col>
                        </el-row>
                        <div class="rolessttyone_but_line1" v-if="itemchild1.childFunctionList"></div>
                        </el-row>
                    </template>
                </el-col>
            </el-col>
        </el-row>
    </el-row>
    <rolespow-tem v-for="item in rolesData.childFunctionList" :key="item.functionCode" :rolesData="item"></rolespow-tem>
    </div>
</template>

<script>
    export default {
        name:'rolespowTem',
        props: {
            rolesData:{
                type:Array
            },
            checkboxData:{
                type:Object
            },
            radioData:{
                type:Object
            }
        },
        data () {
            return {
                powerAddData:[]
            }
        },
        watch: {
          rolesData(newVal){
            this.rolesData=newVal
          },
          checkboxData(newVal){
            this.checkboxData=newVal
          },
          radioData(newVal){
            this.radioData=newVal
          } 
        },

        mounted () {
            
        },
        methods: {
            //多选框选中
            checkedChange(e, functionCode, item,itemchild1) {
            if(this.checkboxData[functionCode]){
                if( item.childFunctionList!=null){
                this.radioData[functionCode]=item.childFunctionList[0].functionCode
                }
            }else{
                this.radioData[functionCode]=""
            }
            // console.log(this.radioData,"单选数据绑定 1");
            // console.log(this.checkboxData,"多选数据1");
            //  console.log(this.$parent.$parent);
            this.$emit('update:radioData',this.radioData)
            this.$emit('update:checkboxData',this.checkboxData)
            this.$forceUpdate()
            },
            //单选框选中
            radioChange(functionCode, item,itemchild1) {

            console.log(functionCode, item,itemchild1,this.checkboxData);
            this.checkboxData[itemchild1.functionCode]=true
            this.$set(this.radioData,item.parentCode,functionCode)

            // console.log(this.radioData,"单选数据绑定2 ");
            // console.log(this.checkboxData,"多选数据2");
            // console.log(this.$parent);
            this.$emit('update:radioData',this.radioData)
            this.$emit('update:checkboxData',this.checkboxData)
            this.$forceUpdate()
            },
        }
    
    }
</script>

<style lang="scss" scoped>
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
       .rolessttyone_but_line1 {
      // height: calc(100% - 35px);
      // top: 18px;
      width: 0px;
      height: calc(100% - 110px);
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