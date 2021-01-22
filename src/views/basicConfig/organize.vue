<template>
  <div>
    <el-button type="text" @click="isAddAndseeStaffFun('修改人员')" >修改人员</el-button>
    <el-button type="text" @click="isAddAndseeStaffFun('添加人员')" >添加人员</el-button>
    <el-button type="text" @click="isOrganizeBolFun('添加组织')" >添加组织</el-button>
    <!-- 修改人员 添加人员 添加组织对话框 -->
    <add-andseefrom-com
      v-if="isAddAndseeStaff"
      :isAddAndseeStaff="isAddAndseeStaff"
      :addAndseeStaffBol.sync="isAddAndseeStaff"
      :addAndsee="addAndsee"
    ></add-andseefrom-com>
    <!-- 组织人员 -->
    <organize-com  v-if="isOrganize"
      :isOrganize="isOrganize"
      :isOrganizeBol.sync="isOrganize"
      :organize="organize"></organize-com>
  </div>
</template>

<script>
import addAndseefromCom from "./components/addAndseefromCom.vue";
import organizeCom from "./components/organizeCom.vue";
export default {
  data() {
    return {
      isAddAndseeStaff: false,//控制修改添加人员
      isOrganize:false,// 控制组织人员的弹出框
      addAndsee:'',
      organize:''
    };
  },
  components: { addAndseefromCom,organizeCom },
  watch: {},
//   addAndsee
  methods: {
    //触发 对话框
    isAddAndseeStaffFun(addAndsee,){
        this.isAddAndseeStaff=true;
        this.addAndsee=addAndsee
    },
    isOrganizeBolFun(organize){
        this.isOrganize=true;
        this.organize=organize
    }
  },
};
</script>

<style lang="scss" scoped>
</style>