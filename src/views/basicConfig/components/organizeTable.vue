<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.nameOrCode" placeholder="请输入姓名/工号" class="filter-item-input" clearable
        @keyup.enter.native="handleFilter" />
      <el-input v-model="listQuery.userPhone" placeholder="请输入手机号" class="filter-item-input" maxlength="11" clearable
        @keyup.enter.native="handleFilter" />
      <el-cascader class="filter-item-input cascaderStyle" v-model="listQuery.roleId" placeholder="请选择角色" :options="roleOptions"
        :props="props" clearable></el-cascader>
      <el-button v-waves class="filter-item-btn" type="primary" @click="handleFilter()">搜索</el-button>
    </div>

    <div class="filter-tab">
      <el-button class="expBtn" type="text">
        <svg-icon icon-class="export_icon" />导出列表</el-button>
      <el-button class="expBtn" type="text" @click="addPersonnel()">
        <svg-icon icon-class="add_icon" />添加人员</el-button>
    </div>

    <el-table v-loading="listLoading" :data="listTable" border fit highlight-current-row height="550" style="width: 100%">
      <el-table-column label="序号" type="index" width="120" align="center" />
      <el-table-column label="员工姓名/工号" align="left" width="320">
        <template slot-scope="scope">
          <template v-if="scope.row.positionStatus == 2">
            <span class="leader_express">部门负责人</span>
            <span class="state_box">离职</span>
          </template>
          <span class="user_name" @click="get_user_info(scope.row.userId)">
            {{scope.row.userName}}
            |
            {{scope.row.userCode}}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <template v-if="scope.row.userSex">
            {{scope.row.userSex == 1 ? '男' : '女'}}
          </template>
          <template v-else>
            -
          </template>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="userPhone"/>
      <el-table-column label="角色" align="center" prop="roleNames" width="210"/>
      <el-table-column label="账号状态" align="center">
        <template v-if="scope.row.userUseStatus" slot-scope="scope">
          <span v-if="scope.row.userUseStatus == 1" style="color:#00C456">启用</span>
          <span v-else style="color:#DB3A36">停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="180px">
        <template v-if="scope.row.userLevelId != 3" slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="toEdit(scope.row)">启用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-if="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
      @pagination="listTable" />

    <el-drawer title="人员信息" :visible.sync="isDrawer" direction="rtl" size="600" :modal-append-to-body="false">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">
          <basic-info :info="basicInfoObj" />
        </el-tab-pane>
        <el-tab-pane label="异动信息" name="second">
          <change-info :info="userRecord" />
        </el-tab-pane>
      </el-tabs>
    </el-drawer>

    <add-andseefrom-com v-if="isAddAndseeStaff" :isAddAndseeStaff="isAddAndseeStaff" :isEdit="isEdit" :closePop="closePop" :addAndsee="addAndsee"></add-andseefrom-com>

    <organize-com v-if="isOrganize" :isOrganize="isOrganize" :organize="organize"></organize-com>

    <!-- <brand-pop /> -->
    <!-- <department-job-pop /> -->
    <!-- <department-pop /> -->
  </div>
</template>

<script>
  import {
    getRoleList,
    getUserList,
    queryUserInfo,
    queryUserRecordInfo
  } from "@/service/api/index";
  import Pagination from "@/components/Pagination";
  import basicInfo from './../templates/basicInfo';
  import changeInfo from './../templates/changeInfo';
  import addAndseefromCom from "./../components/addAndseefromCom";
  import organizeCom from "./../components/organizeCom";
  import brandPop from "./../components/brandPop";
  import departmentPop from "./../components/departmentPop";
  import departmentJobPop from "./../components/departmentJobPop"

  export default {
    name: "organizeTable",
    data() {
      return {
        listQuery: {
          nameOrCode: "",
          userPhone: "",
          roleId: "",
          pageNum: 1,
          pageSize: 10
        },
        props: {
          value: 'roleType',
          label: 'roleName',
          children: 'rootRoles',
        },
        roleOptions: [],
        tabPosition: "all",
        listTable: [{
            nickname: "嘻嘻嘻哈哈",
            stateStr: "生效中",
          },
          {
            nickname: "嘻嘻嘻哈哈",
            stateStr: "已停用",
          },
          {},
        ],
        total: 0,
        dialogFormVisible: false,
        editForm: {},
        isDrawer: false,
        activeName: 'first',
        basicInfoObj: {},
        userRecord: [],
        isAddAndseeStaff: false,
        isEdit: false, //添加编辑判断
        isOrganize: false
      };
    },
    computed: {},
    created() {
      this.get_role_list()
      this.get_user_list()
    },
    components: {
      Pagination,
      basicInfo,
      changeInfo,
      addAndseefromCom,
      organizeCom,
      brandPop,
      departmentPop,
      departmentJobPop
    },
    methods: {
      handleFilter() {
        this.listQuery.pageNum = 1;
        this.get_role_list();
      },
      get_user_info(id){
        this.isDrawer = true
        let obj = {}
        obj['userId'] = id
        queryUserInfo(obj).then((res) => {
          if (res.code == 0) {
            this.basicInfoObj = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            })
          }
        })

        queryUserRecordInfo(obj).then((res) => {
          if (res.code == 0) {
            this.userRecord = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            })
          }
        })
      },
      get_role_list() {
        let obj = {}
        getRoleList(obj).then((res) => {
          if (res.code == 0) {
            this.roleOptions = res.data
            this.total = res.data.total
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            })
          }
        })
      },
      get_user_list() {
        let obj = {}
        obj['nameOrCode'] = this.listQuery['nameOrCode']
        obj['userPhone'] = this.listQuery['userPhone']
        obj['roleId'] = this.listQuery['roleId'][0]
        obj['pageNum'] = this.listQuery['pageNum']
        obj['pageSize'] = this.listQuery['pageSize']
        getUserList(obj).then((res) => {
          if (res.code == 0) {
            this.listTable = res.data.list
            this.total = res.data.total
          } else {
            this.$notify.error({
              title: '错误',
              message: res.data.message
            })
          }
        })
      },
      toEdit(row) {
        this.dialogFormVisible = true
      },

      addPersonnel() {
        this.isAddAndseeStaff = true
      },
      closePop(flag) {
        this.isAddAndseeStaff = false
        if(flag) {
          this.handleFilter()
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "@/assets/styles/filterTabStyle.scss";
  @import "@/assets/styles/tableStyle.scss";

  .app-container {
    padding: 10px;
    box-sizing: border-box;
    position: relative;

    .filter-tab {
      width: auto;
      position: absolute;
      top: 15px;
      right: 10px;
    }

    .leader_express {
      width: 70px;
      height: 14px;
      line-height: 14px;
      text-align: left;
      padding-left: 3px;
      background: #FFBE00;
      border-radius: 0px 0px 14px 0px;
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #43425D;
      position: absolute;
      top: 0;
      left: 0;
    }

    .state_box {
      // width: 40px;
      height: 17px;
      line-height: 17px;
      background: #7D7D7D;
      border-radius: 3px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      text-align: center;
      padding: 0 6px;
      margin-right: 6px;
    }
  }

  // /deep/.el-drawer__wrapper {
  //     top: 70px;
  // }

  /deep/.el-drawer {
    width: 600px;
  }

  /deep/.el-tabs__item {
    color: #4D4F5C !important;
    font-size: 18px;
  }

  /deep/.el-tabs__item.is-active {
    color: #3B86FF !important;
  }

  /deep/.el-tabs__active-bar {
    width: 108px !important;
    background-color: #3B86FF !important;
  }

  /deep/.el-tabs__nav-wrap::after {
    height: 1px;
    background-color: #D7DAE2 !important;
  }

  /deep/.el-tabs__nav-wrap {
    padding: 0 30px;
  }

  /deep/.el-tabs__active-bar {
    width: 64px !important;
  }

  /deep/.el-tabs__item {
    font-size: 16px;
  }

  /deep/ :focus {
    outline: 0;
  }

  .filter-item-input /deep/.el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }

  .user_name {
    color: #3B86FF;
    cursor: pointer;
  }
</style>
