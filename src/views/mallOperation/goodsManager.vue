<template>
  <el-row style="margin:15px">
    <el-col :span="16">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="品牌区" name="brand">
          <brandArea v-if="activeName=='brand'" />
        </el-tab-pane>
        <el-tab-pane label="车系区" name="carSeries">
           <carModel v-if="activeName=='carSeries'" />
        </el-tab-pane>
        <el-tab-pane label="Banner图区" name="banner">
            <el-table :data="bannerData" style="width: 100%" height="600" align="center" class="table">

            </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>


<script>
  import brandArea from './components/brandArea'
  import carModel from './components/carModel'

  export default {
    components: {
      brandArea,
      carModel
    },
    data(){
      return {
        activeName:'brand'
      }
    }
  }
</script>

<style scoped>
  .table{
    border:1px solid #F5F6FA;
  }
  /deep/ .el-table th{
    background: #F5F6FA 
  }
  /deep/ .el-table::before{
    height: 0;
  }
  /deep/ .el-tabs__item{
    height: 24px;
    line-height: 24px;
  }
  /deep/ .el-tabs__item.is-active{
    border:1px solid  #3B86FF;
    color:#3B86FF
  }
  /deep/ .el-table .cell{
    display: flex;
  }

  /deep/ .el-tabs--card > .el-tabs__header{
    border-bottom: 0;
    border-left: 0;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav{
    height: 25px;
    border: 0;
    border: 1px solid #E4E7ED;
    border-radius: 4px;
    border-left: 0
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item.is-active{
    border-bottom-color:#3B86FF;
    
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__item:first-child{
    border-left:1px solid;
  }
  .handle{
    display: flex
  }
  /deep/ .el-table td div{
    display: flex;
    justify-content: flex-start;
    align-items: center
  }
  </style>