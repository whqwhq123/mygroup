<template>
  <div class="app-container" v-if="get_role_function('100200130')">
    <div class="filter-container">
      <el-input v-model="listQuery.nameOrCode" placeholder="请输入姓名/工号" class="filter-item-input" clearable
        @keyup.enter.native="handleFilter"  />
      <el-input v-model="listQuery.userPhone" placeholder="请输入手机号" class="filter-item-input" maxlength="11" clearable
        @keyup.enter.native="handleFilter" />
      <el-cascader class="filter-item-input cascaderStyle" v-model="listQuery.roleId" placeholder="请选择角色" :options="roleOptions"
        :props="props" clearable></el-cascader>
      <el-button v-waves class="filter-item-btn" type="primary" @click="handleFilter()">搜索</el-button>
    </div>

    <div class="filter-tab">
      <el-button class="expBtn" type="text" v-if="get_role_function('100200150')" @click="download_excel()">
        <svg-icon icon-class="export_icon"  />导出列表</el-button>
      <el-button class="expBtn" type="text" @click="addPersonnel({},'1')" v-if="get_role_function('100200110')">
        <svg-icon icon-class="add_icon" />添加人员</el-button>
    </div>

    <el-table v-loading="listLoading" :data="listTable" border fit highlight-current-row height="605" style="width: 100%">
      <el-table-column label="序号" type="index" width="120" align="center" />
      <el-table-column label="员工姓名/工号" align="left" width="200">
        <template slot-scope="scope">
          <template >
            <span class="leader_express" v-if="scope.row.userId == deptPrincipalId">部门负责人</span>
            <span class="state_box" v-if="scope.row.positionStatus == 2">离职</span>
          </template>
          <!-- <template v-if="scope.row.positionStatus == 2">
            <span class="leader_express">部门负责人</span>
            <span class="state_box">离职</span>
          </template> -->
          <span class="user_name" @click="get_user_info(scope.row.userId)" v-if="get_role_function('100200130')">
            {{scope.row.userName}}
            |
            {{scope.row.userCode}}
          </span>
          <span class="user_name" v-else>
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
      <el-table-column label="手机号" align="center" prop="userPhone" />
      <el-table-column label="角色" align="center" prop="roleNames" width="210" />
      <el-table-column label="账号状态" align="center">
        <template v-if="scope.row.userUseStatus " slot-scope="scope">
          <span v-if="scope.row.userUseStatus == 1" style="color:#00C456">启用</span>
          <span v-if="scope.row.userUseStatus == 2" style="color:#DB3A36">停用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="180px">
        <template v-if="scope.row.userLevelId != 3" slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="addPersonnel(scope.row, '2')" v-if="get_role_function('100200120') ||  get_role_function('100200121')">修改</el-button> -->
          <el-button type="text" size="mini" @click="addPersonnel(scope.row, '2')" v-if="get_role_function('100200120')">修改</el-button>
          <el-button type="text" size="mini" v-if="scope.row.positionStatus == 2" style="color:#D7DAE2">{{ scope.row.userUseStatus == "2" ? "启用" : "停用" }}</el-button>
          <el-button type="text" size="mini" v-else-if="get_role_function('100200140')" @click.stop="merchantEnable(scope.row)">{{ scope.row.userUseStatus == "2" ? "启用" : "停用" }}</el-button>
          <el-button type="text" size="mini" @click.stop="resetPassword(scope.row)" v-if="get_role_function('100200160')">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-if="total > 0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize"
      @pagination="get_user_list" />

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
    <el-dialog
      title="密码重置"
      :visible.sync="resetPasswordDialog"
      width="30%"
      append-to-body
      custom-class="reset-dialog"
      :before-close="handleClose">
      <!-- <span style="font-size:18px;margin-left:77px;">密码重置</span> -->
      <div style="padding:0 90px">
        <el-form>
          <!-- <el-form-item label="密码重置" style="font-size:18px">
          </el-form-item> -->
          <el-form-item label="用户">
            {{user.userName}}&nbsp;|&nbsp;{{user.userCode}}
          </el-form-item>
          <el-form-item label="新密码">
            <div class="password-status" v-if="openEye">
                <el-input type="text" v-model="user.newPassword" placeholder="请输入新密码"></el-input>
                <svg-icon icon-class="open_eye" @click="changeStatus" />
              </div>
              <div class="password-status" v-else>
                <el-input type="password" v-model="user.newPassword" placeholder="请输入新密码"></el-input>
                <svg-icon icon-class="close_eye" @click="changeStatus" />
              </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="resetPasswordDialog = false">取 消</el-button>
        <el-button type="primary" @click="corfimChange">确 定</el-button> -->
        <p @click="resetPasswordDialog = false"><span>取 消</span></p>
        <p  @click="corfimChange"  style="color: #6289FE;border-left:1px solid #D7DAE2">确 定</p>
      </div>
    </el-dialog>
    <add-andseefrom-com v-if="isAddAndseeStaff" :isAddAndseeStaff="isAddAndseeStaff" :userId="userId" @closePop="closePop"
      :deptId="deptId"></add-andseefrom-com>

    <!-- <organize-com v-if="isOrganize" :isOrganize="isOrganize" :organize="organize"></organize-com> -->
  </div>
</template>

<script>
  import {
    getRoleList,
    getUserList,
    queryUserInfo,
    queryUserRecordInfo,
    exportList,
    upUseStatus,
    organizeResetPassword
  } from "@/service/api/index";
  import Pagination from "@/components/Pagination";
  import basicInfo from './../templates/basicInfo';
  import changeInfo from './../templates/changeInfo';
  import addAndseefromCom from "./../components/addAndseefromCom";
  import organizeCom from "./../components/organizeCom";
  import {mapGetters} from 'vuex';
  import {
    operateFile,
    get_role_function
  } from '@/utils/index';

  export default {
    name: "organizeTable",
    props: {
      deptId: {
        type: String,
      },
      deptPrincipalId:{
        type:String
      }
    },
    data() {
      return {
        get_role_function,
        openEye:true,
        listQuery: {
          nameOrCode: "",
          userPhone: "",
          roleId: "",
          pageNum: 1,
          pageSize: 10
        },
        props: {
          value: 'roleId',
          label: 'roleName',
          children: 'rootRoles'
        },
        roleOptions: [],
        tabPosition: "all",
        listTable: [],
        total: 0,
        editForm: {},
        isDrawer: false,
        activeName: 'first',
        basicInfoObj: {},
        userRecord: [],
        isAddAndseeStaff: false,
        resetPasswordDialog:false,
        userId: '', //添加编辑判断
        isOrganize: false,
        user:{
          userName:'',
          userId:'',
          newPassword:'',
          userCode:''
        }
        
      };
    },
    watch: {
      deptId(newVal) {
        this.deptId = newVal;
        console.log(this.deptId,"this.deptIdthis.deptId");
        this.handleFilter()
      },
      deptPrincipalId(newVal){
        this.deptPrincipalId=newVal
      }
    },
    computed: {
    ...mapGetters(['userInfo']),
  },
    created() {
       console.log(this.deptId);
       console.log(this.deptPrincipalId);
      this.get_role_list()
      this.handleFilter()
    },
    components: {
      Pagination,
      basicInfo,
      changeInfo,
      addAndseefromCom,
      organizeCom
    },

    mounted () {
      console.log(this.deptId,"this.deptIdthis.deptIdthis.deptIdthis.deptId");
    },
    methods: {
      tabsFun(data){
        console.log(data,"tabsFun");
      },
      download_excel() {
        let obj = {}
        obj['nameOrCode'] = this.listQuery['nameOrCode']
        obj['userPhone'] = this.listQuery['userPhone']
        obj['roleId'] = this.listQuery['roleId'][0]
        obj['curUserId']=this.userInfo.userId,
        obj['deptId'] = this.deptId
        console.log(obj,"列表导出");

        exportList(obj).then(res => {
          operateFile(res, '组织人员')
          if (res.code==0) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: 'success'
            });
          }
        }).catch((req) => {
          this.$notify.error({
            title: '错误',
            message: req.errMsg
          })
        })
      },
      handleFilter() {
        this.listQuery.pageNum = 1;
        this.get_user_list();
      },
      get_user_info(id) {
        this.isDrawer = true
        let obj = {}
        obj['userId'] = id
        queryUserInfo(obj).then((res) => {
          if (res.code == 0) {
            this.basicInfoObj = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })
          }
        })

        queryUserRecordInfo(obj).then((res) => {
          if (res.code == 0) {
            this.userRecord = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })
          }
        })
      },
      get_role_list() {
        let obj = {}
        getRoleList(obj).then((res) => {
          if (res.code == 0) {
            this.roleOptions = res.data
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })
          }
        })
      },
      get_user_list() {
        let obj = {
          ...this.listQuery,
          deptId: this.deptId || '',
          curUserId:this.userInfo.userId,
          roleId: this.listQuery['roleId'][1]
        }

        if (!obj.deptId) return

        getUserList(obj).then((res) => {
          if (res.code == 0) {
            this.listTable = res.data.list
            this.total = res.data.total
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })
          }
        })
      },

      addPersonnel(row, flag) {
        if (flag == '2') {
          this.userId = row.userId
        } else {
          this.userId = ''
        }
        this.isAddAndseeStaff = true
      },

     async merchantEnable(row) {
      
      let data={
          userId: row.userId,
          userUseStatus: row.userUseStatus == "2" ? 1 : 2, // 1启用，2停用
          curUserId: this.$store.getters.userInfo.userId || ""
      }
      console.log(data);
      let res=await upUseStatus(data)
      if (res.code == "0") {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.handleFilter()
          } else {
            this.$notify.error({
              title: '错误',
              message: res.errMsg
            })            
          }
      },
      closePop(flag) {
        this.isAddAndseeStaff = false
        if (flag) {
          this.handleFilter()
        }
      },
      resetPassword(row){
        console.log(row);
        this.user.userName=row.userName;
        this.user.userId=row.userId;
        this.user.userCode=row.userCode;
        this.resetPasswordDialog=true;
      },
      changeStatus(){
        this.openEye=!this.openEye
      },
      corfimChange(){
        let user={
          userId:this.user.userId,
          userPassword:this.user.newPassword
        }
        organizeResetPassword(user).then(res=>{
          console.log(res)
          if(res.code==0){
            this.resetPasswordDialog=false;
            this.$notify({
              message:'重置密码成功'
            })
          }else{
            this.$notify({
              message:res.errMsg
            })
          }
        })
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
  // /deep/ .el-table--scrollable-y .el-table__body-wrapper{
  //   // overflow-x: hidden !important;
  //   // overflow-y: hidden !important;
  //   &::-webkit-scrollbar {
  //     display: none; /* Chrome Safari */
  //   }
  // }


  .filter-item-input /deep/.el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }

  .user_name {
    color: #3B86FF;
    cursor: pointer;
  }

  /deep/.el-drawer.rtl{
     overflow-y: auto;
   }
  /deep/.el-tab-pane {
    height: 85vh;
    overflow-y: auto;
  }
  /deep/ .password-status .el-input{
    width:280px;
  }
  /deep/ .password-status .el-input__inner{
    width:280px;
  }
  /deep/ .password-status .svg-icon{
    color: #43425D;
    position: absolute;
    right: 10px;
    top: 12px;
    font-size: 16px;
  }
  /deep/ .reset-dialog .el-form-item__label{
    width:70px;
    text-align: right;
    color:#4D4F5C
  }

  /deep/ .el-dialog__footer{
    padding: 0
  }
  .dialog-footer{
    background: #F5F6FA;
    text-align: center;
    display: flex;
    justify-content: space-around;
  }
  .dialog-footer p{
    flex: 1
  }
 
</style>
