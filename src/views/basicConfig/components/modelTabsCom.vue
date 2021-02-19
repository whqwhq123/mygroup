<template>
  <div>
    
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" height="605"
      :default-sort="{ order: 'descending' }" @selection-change="handleSelectionChange" @sort-change="sortChange">
      <!-- <el-table-column align="center" ></el-table-column> -->
      <el-table-column align="center" prop="modelName" label="车系名称">
      </el-table-column>
      <el-table-column align="center" prop="levelName" label="车种" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" prop="onSale" label="是否在售" sortable  show-overflow-tooltip>
        <template slot-scope="scope">{{scope.row.onSale == '1' ? "是" : "否"}} </template>
      </el-table-column>
      <el-table-column prop="isPoint" label="是否重点车系" align="center" width="180" sortable show-overflow-tooltip>
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isPoint" active-value='1' inactive-value='0' active-color="#13ce66"
            inactive-color="#dcdfe6" class="swcenter" @change="changeSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="isLimit" label="是否限售" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.isLimit == '1' ? "是" : "否" }}</template>
      </el-table-column>
      <el-table-column align="center" label="车型管理">
       
        <template slot-scope="scope" class="buttep">
          <el-button size="mini"  @click="limitedmodelrunFun(scope.$index, scope.row, 1)">限售管理</el-button><el-button size="mini" :style="screenWidth<=1850?'margin-left: 0px;':''" @click="limitedmodelrunFun(scope.$index, scope.row, 2)">车型管理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {
    changeIsPoint,getCarModelList
  } from "api/index.js";

  export default {
    props: {
      tableData: {
        type: Object
      },
      carseriesdefault:{
        type:Number
      }
    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        screenWidth:'',
        carseriesdefault:'',
        listQuery: {
          channelName: "",
          pageNum: 1,
          pageSize: 10
        }
      };
    },
    mounted () {
       this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
        })();
      };
    },
    watch: {
      tableData(newVal) {
        this.tableData = newVal
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
      sortChange(column){
       // console.log(column)

       let order='';
       let prop=column.prop;
       if(prop=='onSale'){
          if(column.order=='ascending'){
            order='onSaleAsc'
          }
          else if(column.order=='descending'){
          order='onSaleDesc'
          }
       }
       if(prop=='isPoint'){
        if(column.order=='ascending'){
          order='isPointAsc'
        }
        else if(column.order=='descending'){
         order='isPointDesc'
        }
       }

      var data = {
        groupId: this.carseriesdefault,
        modelName: '',
        pageNum: this.listQuery.pageNum,
        pageSize: this.listQuery.pageSize,
        order:order
      }
      getCarModelList(data).then(res=>{
        console.log(res)
        if(res.code==0){
          this.tableData=res.data.list;
        }
        else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })

      },
      //限售管理 1 //车型管理 2
      limitedmodelrunFun(index, row, runtype) {
        this.$emit('tabruneve', {
          index,
          row,
          runtype
        })
        // console.log(index,row,'limitedrunFun');
      },


      //是否重点车系
      async changeSwitch(row) {
        let res = await changeIsPoint({
          modelId: row.modelId,
          isPoint: row.isPoint == 1 ? 0 : 1
        })
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

  .tabstit>>>.el-table th>.cell {
    padding-left: 28px;
  }
</style>
