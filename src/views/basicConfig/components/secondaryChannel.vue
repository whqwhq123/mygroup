<template>
  <div v-loading="listLoading" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="输入二级渠道名称"
        class="filter-item-input"
        clearable
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.parentId"
        class="filter-item-input"
        filterable
        clearable
        placeholder="选择一级渠道"
      >
        <el-option
          v-for="(item, index) in channelList"
          :key="index"
          :label="item.name"
          :value="item.channelId"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item-btn"
        type="primary"
        @click="handleFilter"
        >搜索</el-button
      >
    </div>

    <div class="filter-tab">
      <el-radio-group
        v-model="tabPosition"
        style="margin-bottom: 30px"
        @change="handleClick"
      >
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="inForce">生效中</el-radio-button>
        <el-radio-button label="deactivated">已停用</el-radio-button>
      </el-radio-group>
      <el-button class="expBtn" type="text" @click="exportTab"><svg-icon icon-class="export_icon"/>导出列表</el-button>
      <el-button class="expBtn" type="text" @click="addChannel"><svg-icon icon-class="add_icon" />新增渠道</el-button>
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
        min-width="100px"
        prop="channelId"
        align="center"
      />
      <el-table-column
        label="二级渠道"
        min-width="100px"
        prop="name"
        align="center"
      />
      <el-table-column
        label="一级渠道ID"
        min-width="100px"
        prop="parentId"
        align="center"
      />
      <el-table-column
        label="一级渠道"
        min-width="100px"
        prop="parentName"
        align="center"
      />
      <el-table-column
        label="备注"
        min-width="100px"
        prop="remarks"
        align="center"
      />
      <el-table-column label="清洗属性" width="200" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.clear"
            class="filter-item-input"
            filterable
            clearable
            placeholder="不需要"
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
        <template slot-scope="scope">
          <span v-if="scope.row.enabled" style="color: #00c456">生效中</span>
          <span v-else style="color: #DB3A36">已停用</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="120px"
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini" v-if="scope.row.enabled" @click="upStatus(scope.row, false)">停用</el-button>
          <el-button type="text" size="mini" v-else @click="upStatus(scope.row, true)">启用</el-button>
          <el-button type="text" size="mini" @click="toEdit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="getListReq"
    />

    <!-- 添加 -->
    <el-dialog
      :title="dialogTit"
      :visible.sync="dialogFormVisible"
      append-to-body="false"
      width="430px"
      class="dialogStyle"
    >
      <el-form
        ref="ruleForm"
        :model="editForm"
        :rules="editFormRules"
        label-width="130px"
      >
        <el-form-item label="一级渠道名称：" required>
          <el-select v-model="editForm.parentName" filterable placeholder="请选择" @change="channelChoice">
            <el-option
              v-for="item in channelList"
              :key="item.value"
              :label="item.name"
              :value="{value:item.channelId, label:item.name}"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级渠道ID：">{{editForm.parentId}}</el-form-item>
        <el-form-item label="二级渠道ID：">{{editForm.channelId}}</el-form-item>
        <el-form-item label="二级渠道名称：" prop="name">
          <el-input
            class="item-input"
            v-model="editForm.name"
            autocomplete="off"
            placeholder="请输入二级渠道名称"
          />
        </el-form-item>
        <el-form-item label="备注：">
          <el-input
            type="textarea"
            class="item-input"
            v-model="editForm.remarks"
            autocomplete="off"
            placeholder=""
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="popBtn" @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button type="text" class="popBtn" @click="dialogTit == '新建二级渠道' ? saveChannel() : editChannel()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getSecond, getFirst, getChannelId, addChannel, updateChannel, updateStatus, expSecond } from "@/service/api/index";
import { operateFile } from '@/utils/index';
export default {
  name: "secondaryChannel",
  data() {
    return {
      listLoading: false,
      userInfo: {},
      listQuery: {
        name: "",
        pageNum: 1,
        pageSize: 10,
        deptId: "",
        enabled: "",
        parentId: ""
      },
      channelList: [],
      tagsList: [
        {
          tagName: "不需要",
          tagId: "1",
        },
        {
          tagName: "人工清洗",
          tagId: "2",
        }
      ],
      tabPosition: "all",
      getList: [],
      total: 0,
      dialogFormVisible: false,
      editForm: {
        channelId: null,
        name: null,
        deptId: null,
        userId: null,
        remarks: null,
        parentId: null,
        parentName: null,
      },
      editFormRules: {
        name: [
          { required: true, message: "请输入二级渠道名称", trigger: "blur" }
        ]
      },
      dialogTit: '新建二级渠道'
    };
  },
  computed: {},
  components: {
    Pagination
  },
  created() {
    this.userInfo = this.$store.getters.userInfo || {};
    this.getChannelList();
    this.handleFilter();
  },
  methods: {
    handleFilter() {
      this.listQuery.pageNum = 1;
      this.getListReq();
    },
    handleClick(e) {
      this.listQuery.pageNum = 1;
      if (e == "inForce") {
        this.listQuery.enabled = true;
      } else if (e == "deactivated") {
        this.listQuery.enabled = false;
      } else {
        this.listQuery.enabled = "";
      }
      this.getListReq();
    },
    getListReq() {
      let data = {
        ...this.listQuery,
        deptId: this.userInfo.deptId
      };

      if (this.tabPosition == "all") delete data.enabled;

      getSecond(data).then(res => {
        if (res.code == "0") {
          this.getList = res.data.content || [];
          this.total = res.data.totalElements;
        }
      });
    },

    getChannelList() {
      getFirst({
        name: "",
        pageNum: 1,
        pageSize: 100000,
        deptId: this.userInfo.deptId
      }).then(res => {
        if (res.code == "0") {
          let channelList = res.data.content.map(item => {
            return {
              channelId: item.channelId,
              name: item.name
            }
          })
          this.channelList = channelList || [];
        }
      });
    },

    addChannel() {
      let parentId = ''
      let parentName = ''
      if(this.channelList && this.channelList.length > 0) {
        parentId = this.channelList[0].channelId || ''
        parentName = this.channelList[0].name || ''
        this.channelChoice({
          value: parentId,
          label: parentName
        })
      }
      this.editForm  = {
        channelId: null,
        name: null,
        deptId: null,
        userId: null,
        remarks: null,
        parentId,
        parentName,
      }
      this.dialogTit = '新建二级渠道'
      this.dialogFormVisible = true;
    },
    toEdit(row) {
      this.dialogTit = '修改二级渠道'
      this.editForm = row
      this.dialogFormVisible = true;
    },

    channelChoice(e) {
      const { value, label } = e
      this.editForm.parentId = value,
      this.editForm.parentName = label,
      getChannelId({
        deptId: this.userInfo.deptId,
        parentId: value,

      }).then(res => {
        if(res.code == '0') {
          this.editForm.channelId = res.data
          
        } else {
          this.$message({
            type: 'warning',
            message: res.errMsg
          })
        }

      })
    },

    upStatus(row, flag){
      let data = {
        userId: this.userInfo.userId,
        enabled: flag,
        id: row.id
      };
      updateStatus(data).then(res => {
        if(res.code == '0') {
          this.$message({ type: 'success', message: '修改成功' })
          this.handleFilter()
        } else {
          this.$message({
            type: 'warning',
            message: res.errMsg
          })
        }
      })
    },
    saveChannel() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.listLoading = true
          let data = {
            ...this.editForm,
            userId: this.userInfo.userId,
            deptId: this.userInfo.deptId
          };
          addChannel(data).then(res => {
            if(res.code == '0') {
              this.listLoading = false
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: '添加成功' })
              this.handleFilter()
            } else {
              this.$message({
                type: 'warning',
                message: res.errMsg
              })
            }
          })
        }
      })
    },

    editChannel() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.listLoading = true
          let data = {
            ...this.editForm,
            userId: this.userInfo.userId
          };
          updateChannel(data).then(res => {
            if(res.code == '0') {
              this.listLoading = false
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: '修改成功' })
              this.handleFilter()
            } else {
              this.$message({
                type: 'warning',
                message: res.errMsg
              })
            }
          })
        }
      })
    },

    exportTab() {
      let data = {
        ...this.listQuery,
        deptId: this.userInfo.deptId
      };

      if (this.tabPosition == "all") delete data.enabled;

      this.listLoading = true
      expSecond(data).then(res => {
        this.listLoading = false
        operateFile(res, '一级渠道')
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: res.errMsg
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/filterTabStyle.scss";
@import "@/assets/styles/tableStyle.scss";
@import "@/assets/styles/popStyle.scss";
</style>
