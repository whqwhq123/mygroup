 <!-- 添加人员 修改人员 -->
<template>
  <div>
    <el-dialog :title="addAndsee" append-to-body="true" :visible.sync="isAddAndseeStaff" width="600px" class="dialogStyle" :before-close="closeAddAndseeStaff">
      <!-- 表单内容 -->
      <el-form ref="ruleForm" :model="editForm" :rules="rules" label-width="130px">
        <div class="formBlockTit">基本信息</div>
        <el-form-item label="姓名" prop="userName">
          <el-input v-model="editForm.userName" placeholder="请输入真实姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="userSex">
          <div class="radio_box">
            <div class="radio_item">
              <svg-icon :class="editForm.userSex == '1' ? 'select_icon' : ''" :icon-class="editForm.userSex == '1' ? 'singleChoice_icon' : 'singleChoice2_icon'" />男
            </div>
            <div class="radio_item">
              <svg-icon :class="editForm.userSex == '2' ? 'select_icon' : ''" :icon-class="editForm.userSex == '2' ? 'singleChoice_icon' : 'singleChoice2_icon'" />女
            </div>
          </div>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone">
          <el-input v-model="editForm.userPhone" placeholder="请输入手机号" maxlength="11" ></el-input>
        </el-form-item>
        <el-form-item label="所属部门" prop="userDeptId">
          <el-select v-model="editForm.userDeptId" placeholder="请选择">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="兼职部门" prop="deptIds">
          <el-select v-model="editForm.deptIds" placeholder="请选择">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-cascader v-model="editForm.roleIds" placeholder="请选择" :options="roleOptions" :props="props" clearable></el-cascader>
        </el-form-item>
        <el-form-item label="负责品牌" prop="ucUserBrands">
          <el-select v-model="editForm.ucUserBrands" placeholder="请选择" disabled @click.native="isbrandPop = true"></el-select>
        </el-form-item>

        <div class="formBlockTit">人事信息</div>
        <el-form-item label="工号" prop="userCode">
            <el-input v-model="editForm.userCode"></el-input>
          </el-form-item>
        <el-form-item label="入职时间" required>
            <el-form-item prop="entryTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="editForm.entryTime" style="width: 100%"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="职位" prop="userPosition">
          <el-input v-model="editForm.userPosition"></el-input>
        </el-form-item>
        <el-form-item label="职级" prop="userLevel">
          <el-input v-model="editForm.userLevel"></el-input>
        </el-form-item>
        <el-form-item label="是否在职" prop="positionStatus">
          <div class="radio_box">
            <div class="radio_item">
              <svg-icon :class="editForm.positionStatus == '1' ? 'select_icon' : ''" :icon-class="editForm.positionStatus == '1' ? 'singleChoice_icon' : 'singleChoice2_icon'" />在职
            </div>
            <div class="radio_item">
              <svg-icon :class="editForm.positionStatus == '2' ? 'select_icon' : ''" :icon-class="editForm.positionStatus == '2' ? 'singleChoice_icon' : 'singleChoice2_icon'" />离职
            </div>
          </div>
        </el-form-item>

        <div class="formBlockTit">备注信息</div>
        <el-form-item prop="userRemark">
          <el-input type="textarea" resize="false" placeholder="请输入异动原因" v-model="editForm.userRemark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="popBtn" @click="closeAddAndseeStaff()">取 消</el-button>
        <el-button type="text" class="popBtn" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <brand-pop v-if="isbrandPop" :isbrandPop="isbrandPop" :isMultiple="true" :isEdit="isEdit" :brandInfo="brandInfo" @brandClick="brandClick"/>
  </div>
</template>

<script>
import { addUser } from '@/service/api/index';
import { checkPhone } from '@/utils/index';
import brandPop from "./brandPop";
export default {
  props: {
    isAddAndseeStaff: {
      type: Boolean,
      default: false,
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    personnelInfo:{
      type: Object,
      default: {}
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
      dialogtitle: "",
      addAndsee: '添加人员',
      isAddAndseeStaff: false,
      props: { multiple: true },
      roleOptions: [{
        value: 1,
        label: '东南',
        children: [{
          value: 2,
          label: '上海',
          children: [
            { value: 3, label: '普陀' },
            { value: 4, label: '黄埔' },
            { value: 5, label: '徐汇' }
          ]
        }, {
          value: 7,
          label: '江苏',
          children: [
            { value: 8, label: '南京' },
            { value: 9, label: '苏州' },
            { value: 10, label: '无锡' }
          ]
        }, {
          value: 12,
          label: '浙江',
          children: [
            { value: 13, label: '杭州' },
            { value: 14, label: '宁波' },
            { value: 15, label: '嘉兴' }
          ]
        }]
      }, {
        value: 17,
        label: '西北',
        children: [{
          value: 18,
          label: '陕西',
          children: [
            { value: 19, label: '西安' },
            { value: 20, label: '延安' }
          ]
        }, {
          value: 21,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 22, label: '乌鲁木齐' },
            { value: 23, label: '克拉玛依' }
          ]
        }]
      }],
      isbrandPop: false,
      brandInfo: {},
      editForm: {
        userId: '',
        userName: '',
        userSex: '1',  //1 男 2女
        // userPassword: '',
        userCode: '',
        userPhone: '',
        userDeptId: '',
        userBaseId: '',
        entryTime: '',
        userPosition: '',
        userLevel: '',
        positionStatus: '1',  //1在职，2离职
        userRemark: '',
        roleIds: '',
        deptIds: '',
        ucUserBrands: '',

      },
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        userSex: [
          { required: true, message: "请选择是性别", trigger: "change" },
        ],
        userPhone: [
          { required: true, validator: checkphone, trigger: "blur" }
        ],
        userDeptId:[ 
          { required: true, message: "请选择所属部门", trigger: "change" }
        ],
        roleIds: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        ucUserBrands: [
          { required: true, message: "请选择负责品牌", trigger: "change" }
        ],
        userCode:[
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        positionStatus: [
          { required: true, message: "请选择是否在职", trigger: "change" },
        ]
      },
    };
  },
  components: {
    brandPop
  },
  watch: {
    isAddAndseeStaff(newVal) {
      this.isAddAndseeStaff = newVal;
    },
    personnelInfo(newVal) {
      this.personnelInfo = newVal;
    },
  },
  mounted() {
    

  },
  methods: {
    init() {
      this.addAndsee = !this.isEdit ? '添加人员' : '修改人员'
    },

    //按钮确定
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          // let lngLatArr = []
          // lngLatArr = this.editForm.lngLat && this.editForm.lngLat.split(',');
          // let data = {
          //   ...this.editForm,
          //   curUserId: this.$store.getters.userInfo.userId || '',
          //   deptLng: lngLatArr[0] || '',
          //   deptLat: lngLatArr[1] || ''
          // }
          // delete data.address
          // console.log(data)
          
          // if(!this.organizationInfo.isEdit) {
          //   deptAdd(data).then(res => {
          //     if(res.code == '0') {
          //       this.$message({ type: 'success', message: '添加成功' })
          //       this.isOrganize = false
          //       this.$emit('closePop', true)
          //     } else {
          //       this.$message({
          //         type: 'warning',
          //         message: res.errMsg
          //       })
          //     }
          //   })
          // } else {
          //   delete data.createTime
          //   deptEdit(data).then(res => {
          //     if(res.code == '0') {
          //       this.$message({ type: 'success', message: '修改成功' })
          //       this.isOrganize = false
          //       this.$emit('closePop', true)
          //     } else {
          //       this.$message({
          //         type: 'warning',
          //         message: res.errMsg
          //       })
          //     }
          //   })
          // }

          
        }
      })
    },

    brandClick(data) {
      console.log(data)
      // this.editForm = {
      //   ...this.editForm,
      //   ...data
      // }
      this.isbrandPop = false
    },


    closeAddAndseeStaff () {
      this.isAddAndseeStaff = false
      this.$emit('closePop', false)
    }

  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/popStyle.scss';
.formBlockTit {
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: bold;
  line-height: 20px;
  color: #4D4F5C;
  padding: 0 0 20px 40px;
  box-sizing: border-box;
}

/deep/.el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #E4E7ED;
    color: #43425d;
    cursor: pointer;
}

/deep/.el-input,
/deep/.el-textarea {
  width: 400px !important;
}

/deep/.el-form-item__content {
  line-height: 40px;
}

/deep/.el-textarea{
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
  color: #4D4F5C;

  .radio_item {
    margin-right: 30px;
    
    .svg-icon {
      margin-right: 6px;
      color: #D7DAE2;
    }
    .select_icon {
      color: #7CD2A2;
    }
  }
}
</style>
