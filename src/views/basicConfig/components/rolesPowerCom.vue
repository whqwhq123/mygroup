<template>
<el-scrollbar class="boxscroll">
  <div class="rolesrightbox">
      <!-- 企业资料 -->
      <el-row class="rolessttyone" style="height: 42px; background: #f5f6fa">
        <div class="rolessttyone_top">
          <span class="roles_titsty">企业资料</span>
          <!-- <el-switch
            v-model="value"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch> -->
        </div>
      </el-row>
      <!-- 组织人员 -->
      <el-row class="rolessttyone" style="min-height: 450px">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">组织人员</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but" style="line-height: 0">
          <!-- 组织管理 -->
          <el-row class="rolessttyone_but_tit">组织管理</el-row>
          <el-row class="rolessttyone_but_elrow">
            <el-col
              :span="5"
              v-for="(cheitem,index) in organizerunarr"
              :key="cheitem.type"
              class="rolessttyone_but_elcol"
            >
              <el-checkbox-group
                class="marbot"
                v-model="cheitem.che"
                
                @change="checkedChange(cheitem,index)"
              >
                <el-checkbox >{{cheitem.label}}{{ cheitem.che?"("+cheitem.arr[cheitem.radi]+")":''}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                class="rolessttyone_but_groupAll"
                v-if="cheitem.istit"
                v-model="cheitem.radi"
                @change="radioChange(cheitem,index)"
              >
                <el-radio class="marbot" v-for="(chicheitem,index) in cheitem.arr" :key="index+1" :label="index">{{chicheitem}}</el-radio>

              </el-radio-group>
              <div class="rolessttyone_but_line" v-if="radioData.organizerun.addche"></div>
            </el-col>
          </el-row>
          <!-- 人员管理 -->
          <el-row class="rolessttyone_but_tit">人员管理</el-row>
          <el-row class="rolessttyone_but_elrow">
            <el-col
              :span="4"
              v-for="item in 6"
              :key="item"
              class="rolessttyone_but_elcol"
            >
              <el-checkbox-group
                class="marbot"
                v-model="radioData.organizerun.addche"
                @change="checkedChange('rolescherun')"
              >
                <el-checkbox disabled :checked="true">添加 (所在组织及下级组织)</el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                class="rolessttyone_but_groupAll"
                v-model="radioData.organizerun.addradi"
              >
                <el-radio class="marbot" :label="1">备选项</el-radio>
                <el-radio class="marbot" v-if="item != 3" :label="2">所在组织及下级组织</el-radio>
                <el-radio class="marbot" :label="3">备选项</el-radio>
                <el-radio class="marbot" :label="3">备选项</el-radio>
                <el-radio class="marbot" :label="3">备选项</el-radio>
              </el-radio-group>
              <div class="rolessttyone_but_line"></div>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <!-- 角色管理 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">角色管理</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but">
          <el-checkbox-group
            v-model="checkboxData.rolescherun"
            @change="checkedChange('rolescherun')"
          >
            <el-checkbox
              v-for="item in cheboxonedata"
              :label="item"
              :key="item.type"
              :checked="true"
            >{{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 经营品牌 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">经营品牌</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but">
          <el-checkbox-group
            v-model="checkboxData.brandcherun"
            @change="checkedChange('brandcherun')"
          >
            <el-checkbox
              v-for="item in cheboxonedata"
              :label="item"
              :key="item.type"
              :checked="false"
              >{{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 渠道来源 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">渠道来源</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but">
          <el-checkbox-group
            v-model="checkboxData.sourcecherun"
            @change="checkedChange('sourcecherun')"
          >
            <el-checkbox
              v-for="item in cheboxonedata"
              :label="item"
              :key="item.type"
              :checked="false"
              >{{ item.label }}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 行政区域 -->
      <el-row class="rolessttyone" style="height: 101px;">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">行政区域</span>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but">
          <el-checkbox-group
            v-model="checkboxData.rangecherun"
            @change="checkedChange('rangecherun')"
          >
            <el-checkbox
              v-for="item in cheboxonedata"
              :label="item"
              :key="item.type"
              :checked="false"
              >{{ item.label }}
              </el-checkbox>
          </el-checkbox-group>
        </el-row>
      </el-row>
  </div>
</el-scrollbar>
</template>

<script>
export default {
  props:{
    isedit:{
      type:Boolean
    }
  },
  data() {
    return {
    //多选框数据绑定
    checkboxData:{
      rolescherun:[],
      brandcherun:[],
      sourcecherun:[],
      rangecherun:[]
    },
    cheboxonedata:[{label:"添加",type:1},{label:"修改",type:2},{label:"删除",type:3},{label:"停用/启用"}],
    organizerunarr:[
        {label:"添加",type:1,che:false,radi:0,istit:false,arr:['所在组织','所在组织及下级组织','全部']},
        {label:"修改",type:2,che:false,radi:0,istit:false,arr:['所在组织','所在组织及下级组织','全部']},
        {label:"删除",type:3,che:false,radi:0,istit:false,arr:['所在组织','所在组织及下级组织','全部']},
        {label:"停用/启用",type:4,che:false,radi:0,istit:false,arr:['所在组织','所在组织及下级组织','全部']}
    ],
    //单选数据绑定
    radioData:{
      organizerun:{
        addche:[],
        acudarr:[

        ],
          addradi:1,
        charadi:1,
        delradi:3,
        charadi:2,
        stpradi:2,
        organizerunlist:['所在组织','所在组织及下级组织','全部']
      },


      staffrun:{
        addradi:1,
        charadi:1,
        delradi:3,
        charadi:2,
        stpradi:2,
        expradi:3,
        staffrunarr1:['所在组织','所在组织及下级组织','全部'],
        staffrunarr2:['本人','本人及下属','所在组织','所在组织及下级组织','全部']
      }
    },
    value:true,
    dialogSubData: {
      subbrandTit: '',
      subbrandsel: '',
      subbrandcus: '',
    },

    };
  },
  components: {
  },
  watch: {
      //判断是不是编辑状态
      isedit(newVal){
        this.isedit=newVal
      }
  },
  methods: {

    //多选框选中 
    checkedChange(cheitem,index){
      // console.log(this.organizerunarr);
      
      this.organizerunarr[index].istit=this.organizerunarr[index].che
      console.log(cheitem);
      
      // console.log(this.checkboxData.rolescherun);
      // console.log(val);
    },
    radioChange(cheitem,index){
       this.organizerunarr[index].istit=false
      console.log(this.organizerunarr);
    }



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
/deep/ .el-checkbox__label{
  color: #43425D;
  opacity: 0.7;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #43425D;
  opacity: 1;
}
/deep/.el-checkbox__inner.is-focus .el-checkbox__inner {
  border-color: #7cd2a2;
}
/deep/.el-scrollbar__wrap{
  overflow-y: scroll !important;
  overflow: hidden;
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
  height: 93px;
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
      width: 0px;
      // height: calc(100% - 20px);
      height: calc(100% - 35px);
      border: 1px solid #d7dae2;
      position: absolute;
      top: 18px;
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