 <!-- 添加人员 修改人员 -->
<template>
    <el-dialog :title="addAndsee" append-to-body="true" :visible.sync="isOrganize" class="addAndseeStaff">
      <!-- 表单内容 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row :gutter="20" class="lefromTit">
          <el-col :span="6" :offset="1"><div class="grid-content bg-purple">基本信息</div></el-col>
        </el-row>
        <el-form-item label="上级名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="组织级别" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择部门">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组织名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="经营品牌" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择部门">
            <el-option label="部门一" value="shanghai"></el-option>
            <el-option label="部门二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        


        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" maxlength="11" ></el-input>
        </el-form-item>

        <el-form-item label="直属领导" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择领导">
            <el-option label="领导一" value="shanghai"></el-option>
            <el-option label="领导二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-row :gutter="20" class="lefromTit">
          <el-col :span="6" :offset="1"><div class="grid-content bg-purple">人事信息</div></el-col>
        </el-row>
          <el-form-item label="工号" prop="jobnum">
            <el-input v-model="ruleForm.jobnum"></el-input>
          </el-form-item>
        <el-form-item label="入职时间" required>
            <el-form-item prop="date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="职级" prop="rank">
          <el-input v-model="ruleForm.rank"></el-input>
        </el-form-item>
        <el-form-item label="是否在职" prop="isonthejob">
          <el-switch v-model="ruleForm.isonthejob" :active-text-color="ruleForm.isonthejob?'#DCDFE6':'#DCDFE6'" :active-text="ruleForm.isonthejob?'在职':'离职'"></el-switch>
        </el-form-item>
        <!-- <el-form-item label="特殊资源" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="线上品牌商赞助"></el-radio>
            <el-radio label="线下场地免费"></el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-row :gutter="20" class="lefromTit">
          <el-col :span="6" :offset="1"><div class="grid-content bg-purple">备注信息</div></el-col>
        </el-row>
        <el-form-item  prop="desc">
          <el-input type="textarea" resize="false" placeholder="请输入异动原因" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="isOrganize = false">取 消</el-button>
        <el-button classs="sdmpbut" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  props: {
    isOrganize: {
      type: Boolean,
    },
    organize: {
      type: String,
    },
    organizeData:{
       type: Object,
    }
  },
  data() {
    var checkphone = (rule, value, callback) => {
      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!this.isCellPhone(value)) {
        // 引入methods中封装的检查手机格式的方法
        callback(new Error("请输入正确的手机号!"));
      } else {
        callback();
      }
    };
    return {
      dialogtitle: "",
      isOrganize: false,
      ruleForm: {
        name: "",
        gender: "男",
        phone: "",
        department:"",  
        jobnum:"",
        region: "",
        date: "",
        position:"",
        rank:"",
        isonthejob: false,
        resource: "",
        desc: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个汉字", trigger: "blur" },
        ],
        phone: [{ required: true, validator: checkphone, trigger: "blur" }],
        department:[ { required: true, message: "请选择所属部门", trigger: "change" },],
        region: [
          { required: true, message: "请选择直属领导", trigger: "change" },
        ],
        jobnum:[
          { required: true, message: "请输入工号", trigger: "blur" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        position: [{ required: true, message: "请输入职位", trigger: "blur" },],
        rank: [{ required: true, message: "请输入职级", trigger: "blur" },],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ]
      },
    };
  },
  watch: {
    isOrganize(newVal) {
      this.$emit("update:isOrganizeBol", newVal);
      this.isOrganize = newVal;
    },
    addAndsee(newVal) {
      this.addAndsee = newVal;
    },
  },
  methods: {
    //按钮确定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log("submit!", this.ruleForm);
          this.isOrganize = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //手机号验证
    isCellPhone(val) {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        return false;
      } else {
        return true;
      }
    },
  },
  mounted() {
    // addAndseefromData
    console.log(this.ruleForm, "添加组织this.ruleForm");
    console.log(this.isOrganize, "添加组织this.dialogFormVisible");
  },
};
</script>

<style lang="scss" scoped>
/deep/ .el-button {
  width: 50% !important;
}
/deep/ .el-dialog {
  width: 700px;
  margin-top: 48px !important;
}
/deep/ .el-dialog__wrapper{
  z-index: 9991 !important;
}
/deep/ .el-dialog__title {
  font-size: 20px;
  color: #43425d;
}
/deep/ input.el-input__inner{
  width: 500px !important;
  height: 32px !important;
  line-height:32px !important;
}
/deep/ .el-textarea{
  width: 500px;
  resize: none;
}
/deep/ .el-date-editor{
  width: 500px !important;
  height: 32px !important;
  line-height:32px !important;
}
/deep/ .el-input__icon{
  line-height:32px !important;
}
/deep/ .el-form-item__label{
  line-height:32px !important;
}
/deep/ .el-textarea__inner{ // 然后找到对应的类名，在这里将拉伸去掉即可
  resize: none;
}
/deep/ .el-form-item__content{
  line-height: 32px;
}
.claFrom {
  height: 646px;
}
.lefromTit {
  color: #4d4f5c;
  font-size: 16px;
  margin-bottom: 30px;
  font-weight: bold;
}
.dialog-footer {
  display: flex;
}
</style>
<style>
</style>


