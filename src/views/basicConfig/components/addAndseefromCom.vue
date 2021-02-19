<!-- 添加人员 修改人员 -->
<template>
  <div>
    <el-dialog
      :title="addAndsee"
      append-to-body="true"
      :visible.sync="isAddAndseeStaff"
      width="600px"
      class="dialogStyle"
      :before-close="closeAddAndseeStaff"
    >
      <!-- 表单内容 -->
      <el-form
        ref="ruleForm"
        :model="editForm"
        :rules="rules"
        label-width="130px"
      >
        <div class="formBlockTit">基本信息</div>
        <el-form-item label="姓名" prop="userName">
          <el-input
            v-model="editForm.userName"
            placeholder="请输入真实姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <div class="radio_box">
            <div class="radio_item" @click="changeSex('1')">
              <svg-icon
                :class="editForm.userSex == '1' ? 'select_icon' : ''"
                :icon-class="
                  editForm.userSex == '1'
                    ? 'singleChoice_icon'
                    : 'singleChoice2_icon'
                "
              />男
            </div>
            <div class="radio_item" @click="changeSex('2')">
              <svg-icon
                :class="editForm.userSex == '2' ? 'select_icon' : ''"
                :icon-class="
                  editForm.userSex == '2'
                    ? 'singleChoice_icon'
                    : 'singleChoice2_icon'
                "
              />女
            </div>
          </div>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input
            v-model="editForm.userPhone"
            placeholder="请输入手机号"
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="userDeptId">
          <el-select
            v-model="editForm.userDeptIdName"
            placeholder="请选择"
            @click.native="isDepartmentShow = true"
            @change.native="userDeptIdNameFun"
          ></el-select>
        </el-form-item>
        <el-form-item label="兼职部门" prop="deptIds">
          <el-select
            v-model="editForm.depNameArr"
            placeholder="请选择"
            @click.native="isDepartmentJobShow = true"
          ></el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds" >
          <el-cascader
            v-model="editForm.roleIdsArr"
            :disabled="isroleshow"
            :placeholder="isroleshow?'请选择所属部门后选择':'请选择角色'"
            :options="roleOptionsdata"
            :props="roleProps"
            clearable
            @change="roleIdsC($event,roleOptionsdata)"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="负责品牌" prop="ucUserBrands" v-if="isShowbrand">
            <el-input
              placeholder="请选择"
              v-model="editForm.brandStr"
              suffix-icon="el-icon-arrow-down"
              @click.native="isbrandPop = true"
            >
            </el-input>
        </el-form-item>

        <div class="formBlockTit">人事信息</div>
        <el-form-item label="工号" prop="userCode">
          <el-input v-model="editForm.userCode"></el-input>
        </el-form-item>
        <el-form-item prop="entryTimeStr" label="入职时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="editForm.entryTimeStr"
              value-format="yyyy-MM-dd"
              style="width: 100%"
            ></el-date-picker>
        </el-form-item>
        <el-form-item label="职位" prop="userPosition">
          <el-input v-model="editForm.userPosition"></el-input>
        </el-form-item>
        <el-form-item label="职级" prop="userLevel">
          <el-input v-model="editForm.userLevel"></el-input>
        </el-form-item>
        <el-form-item label="是否在职" prop="positionStatus">
          <div class="radio_box">
            <div class="radio_item" @click="changePositionStatus('1')">
              <svg-icon
                :class="editForm.positionStatus == '1' ? 'select_icon' : ''"
                :icon-class="
                  editForm.positionStatus == '1'
                    ? 'singleChoice_icon'
                    : 'singleChoice2_icon'
                "
              />在职
            </div>
            <div class="radio_item" @click="changePositionStatus('2')">
              <svg-icon
                :class="editForm.positionStatus == '2' ? 'select_icon' : ''"
                :icon-class="
                  editForm.positionStatus == '2'
                    ? 'singleChoice_icon'
                    : 'singleChoice2_icon'
                "
              />离职
            </div>
          </div>
        </el-form-item>

        <div class="formBlockTit">备注信息</div>
        <el-form-item prop="userRemark">
          <el-input
            type="textarea"
            resize="false"
            placeholder="请输入备注信息"
            v-model="editForm.userRemark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="popBtn" @click="closeAddAndseeStaff()"
          >取 消</el-button
        >
        <el-button type="text" class="popBtn" @click="submitForm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <department-job-pop
      v-if="isDepartmentJobShow"
      :isDepartmentShow="isDepartmentJobShow"
      :isEdit="isEdit"
      @departmentJobClick="departmentJobClick"
      :treedata="list_department"
    />
    <department-pop
      v-if="isDepartmentShow"
      :isDepartmentShow="isDepartmentShow"
      :isEdit="isEdit"
      @departmentClick="departmentClick"
      :treedata="list_department"
    />
    <brand-pop
      v-if="isbrandPop"
      :isbrandPop="isbrandPop"
      :isMultiple="true"
      :isEdit="isEdit"
      :brandInfo="brandInfo"
      @brandClick="brandClick"
    />
  </div>
</template>

<script>
import {
  addUser,
  getRoleList,
  getUserInfo,
  editUser,
  queryDeptTreeByDeptId
} from "@/service/api/index";
import { checkPhone, parseTime } from "@/utils/index";
import brandPop from "./brandPop";
import departmentJobPop from "./departmentJobPop";
import departmentPop from "./departmentPop";

export default {
  props: {
    isroleId:0,
    isAddAndseeStaff: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      default: ""
    },
    deptId: {
      type: String,
      default: ""
    }
  },
  data() {
    var checkphone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!checkPhone(value)) {
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      isDepartmentShow: false,
      isDepartmentJobShow: false,
      list_department: [],
      dialogtitle: "",
      addAndsee: "添加人员",
      isEdit: false,
      roleProps: {
        multiple: true,
        value: "roleId",
        label: "roleName",
        roleType:"roleType",
        children: "rootRoles"
      },
      roleOptions: [],
      roleOptionsdata: [],
      isbrandPop: false,
      brandInfo: {},
      editForm: {
        curUserId: "",
        userName: "",
        userSex: "1", //1 男 2女
        // userPassword: '',
        userCode: "",
        userPhone: "",
        userDeptId: "",
        userDeptIdName: "",
        // userBaseId: '',
        entryTimeStr: "",
        userPosition: "",
        userLevel: "",
        positionStatus: "1", //1在职，2离职
        userRemark: "",
        roleIds: "",
        deptIds: "",
        depNameArr: [],
        ucUserBrands: "",
        roleIdsArr: ''
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userSex: [
          { required: true, message: "请选择是性别", trigger: "change" }
        ],
        userPhone: [{ required: true, validator: checkphone, trigger: "blur" }],
        userDeptId: [
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        roleIds: [{ required: true, message: "请选择角色", trigger: "change" }],
        ucUserBrands: [
          { required: true, message: "请选择负责品牌", trigger: "change" }
        ],
        userCode: [{ required: true, message: "请输入工号", trigger: "blur" }],
        positionStatus: [
          { required: true, message: "请选择是否在职", trigger: "change" }
        ]
      },
      isroleshow:true,
      isShowbrand:false,
    };
  },
  components: {
    brandPop,
    departmentJobPop,
    departmentPop
  },
  watch: {
    isAddAndseeStaff(newVal) {
      this.isAddAndseeStaff = newVal;
    },

    userId(newVal) {
      this.userId = newVal;
    },
    roleOptionsdata(newVal){
      this.roleOptionsdata=newVal
    }
  },
  created () {
    this.get_role_list();
  },
  mounted() {
    
    this.init();
    this.get_department_list();
    this.editForm= {
        curUserId: "",
        userName: "",
        userSex: "1", //1 男 2女
        // userPassword: '',
        userCode: "",
        userPhone: "",
        userDeptId: "",
        userDeptIdName: "",
        // userBaseId: '',
        entryTimeStr: "",
        userPosition: "",
        userLevel: "",
        positionStatus: "1", //1在职，2离职
        userRemark: "",
        roleIds: "",
        deptIds: "",
        depNameArr: [],
        ucUserBrands: "",
        roleIdsArr: []
      },
      this.isroleshow=true
      this.isShowbrand=false
  },
  methods: {
    get_department_list() {
      let obj = {};
      obj["deptId"] = 1;
      queryDeptTreeByDeptId(obj).then(res => {
        if (res.code == 0) {

          this.list_department = res.data;
        } else {
          this.$notify.error({
            title: "错误",
            message: res.data.message
          });
        }
      });
    },
    init() {
      this.addAndsee = !this.userId ? "添加人员" : "修改人员";
      this.isEdit = this.userId ? true : false;
      if (this.userId) {
        this.getDetails();
      }
    },

    get_role_list() {
      let obj = {};
      getRoleList(obj).then(res => {
        if (res.code == 0) {
          console.log('1')
          this.roleOptions = res.data.map(item => {
            if (!item.rootRoles || item.rootRoles.length <= 0) {
              item.disabled = true;
            }
            return item;
          });
               if (this.userId) {
        this.getDetails();
      }
        }
      });
    },

    async getDetails() {
      // getUserInfo({ userId: this.userId }).then(res => {
        let res = await getUserInfo({ userId: this.userId })
        if (res.code == 0) {
          let roleIdsArr = [];
          let roleIds = [];
          res.data.ucRoleUsers.forEach(item => {
            roleIdsArr.push([null, item.roleId]);
            roleIds.push(item.roleId);
          });
          let deptIds = [];
          let depNameArr = [];
          res.data.ucDeptUsers.forEach(item => {
            deptIds.push(item.deptId);
            depNameArr.push(item.deptName);
          });
          this.editForm = {
            ...res.data,
            entryTimeStr: parseTime(new Date(res.data.editTime).getTime()),
            roleIdsArr: roleIdsArr,
            roleIds: roleIds,
            userDeptIdName: res.data.deptName,
            deptIds: deptIds.join(),
            depNameArr: depNameArr.join()
          };
          console.log(this.editForm.roleIdsArr,"this.editForm.roleIdsArrthis.editForm.roleIdsArr");
          if (this.editForm.userDeptIdName!='') {
            this.isroleshow=false
          }
          let da={}
          da['deptLevel']=Number(res.data.deptLevel)
          await this.departmentClickData(da)

          this.brandClick(res.data.ucUserBrands);
          //  ++this.isroleId
          console.log(res,this.editForm,'修改数据回显');
          this.$forceUpdate();
        }
      // });
    },


    brandClick(data) {
       this.editForm.brandStr=""
      let brandStr = data.map(item => {
        return item.group_name || item.brandName;
      });

      let ucUserBrands = [];
      data.forEach(item => {
        ucUserBrands.push({
          brandId: item.group_id || item.brandId,
          brandName: item.group_name || item.brandName,
          parentBrandId: item.make_id || item.parentBrandId,
          parentBrandName: item.make_name || item.parentBrandName
        });
      });
      // console.log(ucUserBrands)
      this.editForm.ucUserBrands = JSON.stringify(ucUserBrands);
      this.editForm.brandStr = brandStr.join();
      this.isbrandPop = false;
    },

    departmentClick(data) {
      console.log(data,"this.formObjthis.formObjthis.formObj");
      this.departmentClickData(data)
     
      this.editForm.userDeptId = data.deptId;
      this.editForm.userDeptIdName = data.deptName;
      this.isDepartmentShow = false;
    },
   async departmentClickData(data){
     console.log(data.deptLevel,this.roleOptions,"data,data,data,data,dtaa");
      // await this.get_role_list()
      console.log('3')
      
       this.roleOptionsdata=[]
      // （20厂商，30集团，40大区，50经销商，60二级经销商，70部门）'
      switch (data.deptLevel) {  
        case 20:
          this.roleOptionsdata=this.roleOptions
        break;
        case 30:
          this.roleOptionsdata=[this.roleOptions[0],this.roleOptions[this.roleOptions.length-1]]
        break;
        case 40:
           this.roleOptionsdata=[this.roleOptions[1],this.roleOptions[this.roleOptions.length-1]]
        break;
        case 50:
          this.roleOptionsdata=this.roleOptions[2]
        break;
        case 60:
          this.roleOptionsdata=this.roleOptions[3]
        break;
        case 70:
          this.roleOptionsdata=this.roleOptions
        break;
      
      }
     
       this.isroleshow=false;

    },
    departmentJobClick(data) {
      let deptIds = [];
      let depNameArr = [];
      data.forEach(item => {
        deptIds.push(item.deptId);
        depNameArr.push(item.deptName);
      });

      this.editForm.deptIds = deptIds.join();
      this.editForm.depNameArr = depNameArr.join();
      this.isDepartmentJobShow = false;
    },

    

    roleIdsC(e,data) {
      if (!e.length) {
        this.isShowbrand=false
      }
      
      // data.forEach(v => {
      //   if(v.rootRoles){
      //     for (let i = 0; i < v.rootRoles.length; i++) {
      //       e.forEach(v1 => {
              
      //         if(v1[1]==v.rootRoles[i].roleId){
                
      //           if (v.roleType==5) {
      //             if (this.isShowbrand) return
      //             this.isShowbrand=true
      //           }else{
      //             this.isShowbrand=false
      //           }
      //         }
      //       });
            
      //     }
      //   }
      // });

      this.editForm.roleIds = this.editForm.roleIdsArr.map(item => {
        return item[1];
      });
      this.$forceUpdate();
    },
    //按钮确定
    submitForm() {
      console.log(this.roleOptionsdata,this.editForm.roleIds.join(),"roleOptionsdataroleOptionsdata");
      this.$refs.ruleForm.validate(valid => { 
        if (valid) {
          let data = {
            ...this.editForm,
            curUserId: this.$store.getters.userInfo.userId || "",
            roleIds: this.editForm.roleIds.join()
          };
          delete data.brandStr;
          delete data.roleIdsArr;

          if (!this.userId) {
            addUser(data).then(res => {
              if (res.code == "0") {
                this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                });

   
                this.isAddAndseeStaff = false;
                this.$emit("closePop", true);
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.errMsg
                })
              }
            });
          } else {
            delete data.createTime;
            delete data.entryTime;
            delete data.editTime;
            delete data.userPassword;
            delete data.ucDeptUsers;
            delete data.ucRoleUsers;
            if(JSON.parse(data.ucUserBrands).length==0){
              data.ucUserBrands=''
            }       
            editUser(data).then(res => {
              if (res.code == "0") {

                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                });
                this.isAddAndseeStaff = false;
                this.$emit("closePop", true);
              } else {
                this.$message({
                  type: "warning",
                  message: res.errMsg
                });
              }
            });
          }
        }
      });
  
  
  
  
  
  },
    changeSex(flag) {
      this.editForm.userSex = flag;
    },

    changePositionStatus(flag) {
      this.editForm.positionStatus = flag;
    },

    closeAddAndseeStaff() {
      this.isAddAndseeStaff = false;
      this.$emit("closePop", false);
    },
    userDeptIdNameFun(e){
      // console.log(e,editForm.userDeptIdName,"editForm.userDeptIdNameeditForm.userDeptIdName");
    }

  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/popStyle.scss";
.formBlockTit {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 20px;
  color: #4d4f5c;
  padding: 0 0 20px 40px;
  box-sizing: border-box;
}

/deep/.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #e4e7ed;
  color: #43425d;
  cursor: pointer;
}
/deep/ .el-cascader__tags .el-tag .el-icon-close {
  display: none;
}
/deep/.el-input,
/deep/.el-textarea {
  width: 400px !important;
}

/deep/.el-form-item__content {
  line-height: 40px;
}

/deep/.el-textarea {
  position: absolute;
  bottom: -18px;
  left: 0;
}

.radio_box {
  width: 100%;
  display: flex;
  display: -webkit-flex;
  display: -webkit-inline-flex;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: #4d4f5c;

  .radio_item {
    margin-right: 30px;

    .svg-icon {
      margin-right: 6px;
      color: #d7dae2;
    }
    .select_icon {
      color: #7cd2a2;
    }
  }
}
</style>
