<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="605"
      :default-sort="{ order: 'descending' }"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center"  width="55">
     
      </el-table-column>

      <el-table-column
        align="center"
        prop="modelName"
        label="车系名称"
        width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="levelName"
        label="车种"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="onSale"
        label="是否在售"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{
          scope.row.onSale == 1 ? "否" : "是"
        
        }} </template>
      </el-table-column>
      <el-table-column
        prop="isPoint"
        label="是否重点车系"
        align="center"
        width="180"
        sortable
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-switch
            v-model ="scope.row.isPoint"
            active-value='1'
            inactive-value='0'
            active-color="#13ce66"
            inactive-color="#dcdfe6"
            class="swcenter"
            @change="changeSwitch(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="islimit"
        label="是否限售"
        width="120"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{
          scope.row.islimit == 1 ? "否" : "是"
        }}</template>
      </el-table-column>
      <el-table-column align="center" label="车型管理" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="limitedmodelrunFun(scope.$index, scope.row, 1)"
            >限售管理</el-button
          >
          <el-button
            size="mini"
            @click="limitedmodelrunFun(scope.$index, scope.row, 2)"
            >车型管理</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {changeIsPoint} from "api/index.js";

export default {
  props:{
    tableData:{
      type:Object
    }
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],

    };
  },
  watch:{
    tableData(newVal){
      this.tableData=newVal
    }
  },
  computed: {},
  components: {
   
  },
  methods: {
    //全选按钮
    handleSelectionChange(val) {
        console.log(val);
    },
    //限售管理 1 //车型管理 2
    limitedmodelrunFun(index,row,runtype){
      this.$emit('tabruneve',{index,row,runtype})
      // console.log(index,row,'limitedrunFun');
    },
    

    //是否重点车系
    async changeSwitch (row) {
     let res=await changeIsPoint({modelId:row.modelId,isPoint:row.isPoint==1?0:1})
    }


  },

  
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/tableStyle.scss";
.swcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabstit >>> .el-table th > .cell {
  padding-left: 28px;
}
</style>
