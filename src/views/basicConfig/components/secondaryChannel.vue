<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.channelName"
        placeholder="输入二级渠道名称"
        class="filter-item-input"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.tagId"
        class="filter-item-input"
        filterable
        clearable
        placeholder="选择一级渠道"
      >
        <el-option
          v-for="(item, index) in tagsList"
          :key="index"
          :label="item.tagName"
          :value="item.tagId"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item-btn"
        type="primary"
        @click="handleFilter"
        >搜索</el-button>
    </div>

    <div class="filter-tab">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="inForce">生效中</el-radio-button>
        <el-radio-button label="deactivated">已停用</el-radio-button>
      </el-radio-group>
        <el-button class="expBtn" type="text"><svg-icon icon-class="export_icon" />导出列表</el-button>
      <el-button class="expBtn" type="text"><svg-icon icon-class="add_icon" />新增渠道</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="getList"
      border
      fit
      highlight-current-row
      height="550"
      style="width: 100%"
    >
      <el-table-column
        label="二级渠道ID"
        min-width="80px"
        prop="tagname"
        align="center"
      />
      <el-table-column
        label="一级渠道"
        min-width="100px"
        prop="nickname"
        align="center"
      />
      <el-table-column
        label="二级渠道"
        min-width="80px"
        prop="tagname"
        align="center"
      />
      <el-table-column
        label="一级渠道"
        min-width="100px"
        prop="nickname"
        align="center"
      />
      <el-table-column
        label="一级渠道ID"
        min-width="80px"
        prop="tagname"
        align="center"
      />
      <el-table-column
        label="一级渠道"
        min-width="100px"
        prop="nickname"
        align="center"
      />
      <el-table-column
        label="备注"
        min-width="100px"
        prop="phone"
        align="center"
      />
      <el-table-column label="清洗属性" width="200" align="center">
        <template slot-scope="scope">
          <el-select
                v-model="scope.row.tagId"
                class="filter-item-input"
                filterable
                clearable
                placeholder="清洗"
                style="width:128px;height:32px"
            >
                <el-option
                v-for="(item, index) in tagsList"
                :key="index"
                :label="item.tagName"
                :value="item.tagId"
                />
            </el-select>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template v-if="scope.row.stateStr" slot-scope="scope">
            <span v-if="scope.row.stateStr == '生效中'" style="color:#00C456">{{ scope.row.stateStr }}</span>
            <span v-else style="color:#DB3A36">{{ scope.row.stateStr }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="120px"
      >
        <template v-if="scope.row.userLevelId != 3" slot-scope="scope">
          <el-button type="text" size="mini" @click="toEdit(scope.row)"
            >停用</el-button
          >
          <el-button type="text" size="mini" @click="toEdit(scope.row)"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.pageSize"
      @pagination="getList"
    />

    <!-- 添加 -->
    <el-dialog
      :title="creat === '新建一级渠道' ? '新建一级渠道' : '修改一级渠道'"
      :visible.sync="dialogFormVisible"
      append-to-body="false"
      width="430px"
      class="dialogStyle"
    >
      <el-form ref="ruleForm" :model="editForm" :rules="editFormRules" label-width="130px">
        <el-form-item label="二级渠道ID：">AOEXOEJROEJR</el-form-item>
        <el-form-item label="二级渠道名称：" required>
          <el-input class="item-input" v-model="editForm.name" autocomplete="off" placeholder="请输入二级渠道名称"/>
        </el-form-item>
        <el-form-item label="一级渠道ID：">AOEXOEJROEJR</el-form-item>
        <el-form-item label="一级渠道名称：" required>
            <el-select v-model="value" filterable placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          <!-- <el-input class="item-input" v-model="editForm.name" autocomplete="off" placeholder="请输入一级渠道名称"/> -->
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" class="item-input" v-model="editForm.name" autocomplete="off" placeholder=""/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="popBtn" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="text" class="popBtn" @click="saveBanner">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "secondaryChannel",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      listQuery: {
        channelName: "",
        pageNum: 1,
        pageSize: 10,
      },
      tagsList: [
        {
          tagName: "线索一",
          tagId: "1",
        },
        {
          tagName: "线索二",
          tagId: "2",
        },
        {
          tagName: "线索三",
          tagId: "3",
        },
      ],
      tabPosition: "all",
      getList: [
        {
          nickname: "嘻嘻嘻哈哈",
          stateStr: "生效中",
        },
        {
          nickname: "嘻嘻嘻哈哈",
          stateStr: "已停用",
        },
        {},
      ],
      total: 20,
      dialogFormVisible: false,
      editForm: {}
    };
  },
  computed: {},
  components: {
    Pagination,
  },
  methods: {
    toEdit(row) {
        this.dialogFormVisible = true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/filterTabStyle.scss";
@import "@/assets/styles/tableStyle.scss";
@import '@/assets/styles/popStyle.scss';
</style>
