<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.channelName" placeholder="输入一级渠道名称 " style="width: 200px;" class="filter-item" clearable @keyup.enter.native="handleFilter"/>
      <el-button v-waves class="filter-item" icon="el-icon-search" type="primary" @click="handleFilter">搜索</el-button>
    </div>

    <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
        <el-radio-button label="top">全部</el-radio-button>
        <el-radio-button label="right">生效中</el-radio-button>
        <el-radio-button label="bottom">已停用</el-radio-button>
    </el-radio-group>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row height="550" style="width: 100%;" >
      <!-- <el-table-column label="序号" type="index" width="100px" align="center" /> -->
      <el-table-column label="一级渠道ID" min-width="80px" prop="tagname" align="center" />
      <el-table-column label="一级渠道" min-width="100px" prop="nickname" align="center" />
      <el-table-column label="备注" min-width="100px" prop="phone" align="center" />
      <el-table-column label="状态" align="center">
        <template v-if="scope.row.lastLoginTime" slot-scope="scope">
          {{ scope.row.lastLoginTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" min-width="120px">
        <template v-if="scope.row.userLevelId != 3" slot-scope="scope">
          <el-button type="success" size="mini" @click="toEdit(scope.row)">停用</el-button>
          <el-button type="success" size="mini" @click="toEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'primaryChannel',
  props: {
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
     listQuery: {
        channelName: ''
     },
     getList: []
    }
  },
  computed: {
    
  },
  components: {
    Pagination
  },
}
</script>

<style lang="scss" scoped>
.el-input__inner {

}
</style>
