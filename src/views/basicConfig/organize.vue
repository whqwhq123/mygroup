<template>
  <div class="roles">
    <el-row  type="flex">
      <el-col class="colleft">
        <el-row type="flex" class="row-bg leftTit" justify="space-between">
          <el-col>
            <div class="leftTit_item act_tit">业务线</div>
          </el-col>
          <el-col>
            <div class="leftTit_item">品牌线</div>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg screenTree" justify="space-between">
          <el-col>
            <el-select
              v-model="hierarchy"
              class="filter-item-input"
              filterable
              clearable
              :popper-append-to-body="false"
              placeholder="不限组织层级"
              style="height: 32px"
            >
              <el-option
                v-for="(item, index) in levelList"
                :key="index"
                :label="item.tagName"
                :value="item.tagId"
              />
            </el-select>
          </el-col>
          <el-col>
            <div class="radioBox" @click="deptUseClick">
              <img class="radio_img" v-if="deptUseStatus == 1" src="@/assets/images/radio_icon.png" alt="">
              <div class="radio_circular" v-else></div>
              <span>显示停用组织</span>
            </div>
          </el-col>
        </el-row>

        <organize-tree :treedata="treedata" @upTree="upTree"/>
      </el-col>

      <el-col class="colright">
        <!-- 角色信息配置 -->
        <el-row>
          <el-row class="row-bg rightTit" style="border-right: none">
            <el-col>
              <div class="roles_titsty" style="padding-left: 22px">
                组织成员
              </div>
            </el-col>
          </el-row>
        </el-row>
        <el-row>
          <organizeTable />
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import organizeTree from "./components/organizeTree";
import organizeTable from "./components/organizeTable";
import brandPop from "./components/brandPop"
import { deptQueryBusiness } from '@/service/api/index'
export default {
  data() {
    return {
      userInfo: {},
      deptUseStatus: '', //全部为空 1 正常、2 停用
      treedata: [],
      radio: "1",
      hierarchy: "-1",
      levelList: [{
        tagName: "不限组织层级",
        tagId: "-1",
      }, {
        tagName: "厂商",
        tagId: "20",
      }, {
        tagName: "集团",
        tagId: "30",
      }, {
        tagName: "大区",
        tagId: "40",
      },{
        tagName: "经销商",
        tagId: "50",
      },{
        tagName: "二级经销商",
        tagId: "60",
      },{
        tagName: "部门",
        tagId: "70",
      }],
    };
  },
  components: {
    organizeTree,
    organizeTable
  },
  watch: {},
  created() {
    this.userInfo = this.$store.getters.userInfo || {};
    this.getBusiness()
  },
  methods: {
    getBusiness(){
      deptQueryBusiness({
        curUserId: this.userInfo.userId || '',
        deptUseStatus: this.deptUseStatus
      }).then(res=> {
        if(res.code == 0) {
          this.treedata = res.data || []
        }
      })
    },
    deptUseClick() {
      this.deptUseStatus = this.deptUseStatus == 1 ? '' : 1;
      this.getBusiness()
    },
    upTree() {
      this.getBusiness()
    }
  },
};
</script>

<style lang="scss" scoped>
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

/deep/.el-tree-node__children {
  overflow: visible;
}

.rowPid {
  padding-left: 11px;
  margin-top: 11px;
}
.roles {
  padding: 20px 20px 0 20px;
}

.colleft {
  width: 320px;
  min-height: 936px;
  background: #ffffff;
  border: 1px solid #e4e6ed;

  .leftTit {
    height: 50px;
    line-height: 50px;
    cursor: pointer;

    .leftTit_item {
      text-align: center;
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #4d4f5c;
      opacity: 0.7;
      border-bottom: 1px solid #e4e6ed;
    }

    .act_tit {
      height: 100%;
      box-sizing: border-box;
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #3b86ff;
      border: 1px solid #3b86ff;
      opacity: 1;
    }
  }

  .screenTree {
    height: 50px;
    line-height: 50px;
    background: #f5f6fa;
    border: 1px solid #e4e6ed;
    box-sizing: border-box;
    padding: 0 11px;
    position: relative;

    /deep/.el-input__inner {
      width: 119px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #d7dae2;
      border-radius: 4px;
      font-size: 12px;
      color: #4d4f5c;
      position: relative;
      top: -2px;
    }

    .radioBox {
      text-align: right;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      cursor: pointer;
      color: rgba($color: #43425d, $alpha: 0.5);

      .radio_img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
        margin-right: 6px;
        margin-top: -4px;
      }

      .radio_circular {
        display: inline-block;
        width: 18px;
        height: 18px;
        background: #ffffff;
        border: 1px solid #d7dae2;
        opacity: 1;
        border-radius: 9px;
        box-sizing: border-box;
        margin-right: 6px;
        vertical-align: middle;
        margin-top: -4px;
      }
    }
  }
}

.colright {
  flex: 1;
  border: 1px solid #e4e6ed;
  border-left: none;
  border-top: none;
  height: 936px;
  overflow: hidden;

  .rightTit {
    height: 50px;
    line-height: 50px;
    border: 1px solid #e4e6ed;
    border-left: none;

    .roles_titsty {
      font-size: 16px;
      font-weight: bold;
      color: #43425d;
    }
  }
}
</style>