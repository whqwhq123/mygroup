<template>
  <div class="boxscroll">
    <div class="rolesrightbox">
      <!-- 企业资料 -->
      <el-row class="rolessttyone" style="height: 42px; background: #f5f6fa">
        <div class="rolessttyone_top">
          <span class="roles_titsty">企业资料</span>
          <el-switch
            v-model="value"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </div>
      </el-row>
      <!-- 组织人员 -->
      <el-row class="rolessttyone" style="min-height: 450px">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">组织人员</span>
          <el-switch
            v-model="value"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </el-row>
        <el-row class="rolessttyone_line"></el-row>
        <el-row class="rolessttyone_but" style="line-height: 0">
          <!-- 组织管理 -->
          <el-row class="rolessttyone_but_tit">组织管理</el-row>
          <el-row class="rolessttyone_but_elrow">
            <el-col
              :span="4"
              v-for="item in 4"
              :key="item"
              class="rolessttyone_but_elcol"
            >
              <el-checkbox-group
                class="marbot"
                v-model="radioData.organizerun.addche"
                @change="checkedChange('rolescherun')"
              >
                <el-checkbox :checked="true">添加</el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                class="rolessttyone_but_groupAll"
                v-model="radioData.organizerun.addradi"
              >
                <el-radio class="marbot" :label="1">备选项</el-radio>
                <el-radio class="marbot" :label="2"
                  >所在组织及下级组织</el-radio
                >
                <el-radio class="marbot" :label="3">备选项</el-radio>
              </el-radio-group>
              <div class="rolessttyone_but_line"></div>
            </el-col>
            <el-col :span="4" class="rolessttyone_but_elcol">
              <el-checkbox-group
                class="marbot"
                v-model="radioData.organizerun.addche"
                @change="checkedChange('rolescherun')"
              >
                <el-checkbox :checked="true">添加</el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                class="rolessttyone_but_groupAll"
                v-model="radioData.organizerun.addradi"
              >
                <el-radio class="marbot" :label="2"
                  >所在组织及下级组织</el-radio
                >
                <el-radio class="marbot" :label="3">备选项</el-radio>
              </el-radio-group>
              <div class="rolessttyone_but_line"></div>
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
                <el-checkbox :checked="true">添加</el-checkbox>
              </el-checkbox-group>
              <el-radio-group
                class="rolessttyone_but_groupAll"
                v-model="radioData.organizerun.addradi"
              >
                <el-radio class="marbot" :label="1">备选项</el-radio>
                <el-radio class="marbot" v-if="item != 3" :label="2"
                  >所在组织及下级组织</el-radio
                >
                <el-radio class="marbot" :label="3">备选项</el-radio>
                <el-radio class="marbot" :label="3">备选项</el-radio>
                <el-radio class="marbot" :label="3">备选项</el-radio>
              </el-radio-group>
              <div class="rolessttyone_but_line"></div>
            </el-col>
          </el-row>
        </el-row>
      </el-row>
      <!-- 角色权限组件 -->
      <!-- 角色管理 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">角色管理</span>
          <el-switch
            v-model="value"
            style="margin-bottom: 3px"
            :active-value="1"
            :inactive-value="2"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
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
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 经营品牌 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">经营品牌</span>
          <el-switch
            v-model="value"
            :active-value="3"
            :inactive-value="4"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
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
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 渠道来源 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">渠道来源</span>
          <el-switch
            v-model="value"
            :active-value="5"
            :inactive-value="6"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
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
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-row>
      </el-row>
      <!-- 行政区域 -->
      <el-row class="rolessttyone">
        <el-row class="rolessttyone_top">
          <span class="roles_titsty">行政区域</span>
          <el-switch
            v-model="value"
            :active-value="7"
            :inactive-value="8"
            active-color="#13ce66"
            inactive-color="#dcdfe6"
          >
          </el-switch>
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
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-row>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //多选框数据绑定
    checkboxData:{
      rolescherun:[],
      brandcherun:[],
      sourcecherun:[],
      rangecherun:[]
    },
    //单选数据绑定
    radioData:{
      organizerun:{

        addche:[],
        addradi:1,
        charadi:1,
        delradi:3,
        charadi:2,
        stpradi:2
      },
      staffrun:{
        addradi:1,
        charadi:1,
        delradi:3,
        charadi:2,
        stpradi:2,
        expradi:3
      }
    },
    value:true,
    cheboxonedata:[{label:"添加",type:1},{label:"修改",type:2},{label:"删除",type:3},{label:"停用/启用",type:4}],
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

  },
  methods: {

    //多选框选中 
    checkedChange(val){
      console.log(this.checkboxData.rolescherun);
      console.log(val);
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
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
}
/deep/.el-checkbox__inner.is-focus .el-checkbox__inner {
  border-color: #7cd2a2;
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
      height: calc(100% - 20px);
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