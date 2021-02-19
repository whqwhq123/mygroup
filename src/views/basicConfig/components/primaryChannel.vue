<template>
  <div v-loading="listLoading" class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.name"
        placeholder="输入一级渠道名称"
        class="filter-item-input"
        clearable
        @keyup.enter.native="handleFilter"
      />
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
        label="一级渠道ID"
        min-width="100px"
        prop="channelId"
        align="center"
      />
      <el-table-column
        label="一级渠道"
        min-width="100px"
        prop="name"
        align="center"
      />
      <el-table-column
        label="备注"
        min-width="130px"
        prop="remarks"
        align="center"
      />
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
      :title="!isEdit ? '新增一级渠道' : '修改一级渠道'"
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
        <el-form-item label="一级渠道ID：">{{
          editForm.channelId
        }}</el-form-item>
        <el-form-item label="一级渠道名称：" prop="name">
          <el-input
            class="item-input"
            v-model="editForm.name"
            autocomplete="off"
            placeholder="请输入一级渠道名称"
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
        <el-button type="text" class="popBtn" @click="!isEdit ? saveChannel() : editChannel()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { getFirst, getChannelId, addChannel, updateChannel, updateStatus, expFirst } from "@/service/api/index";
import { operateFile } from '@/utils/index'
export default {
  name: "primaryChannel",
  props: {},
  data() {
    return {
      listLoading: false,
      userInfo: {},
      listQuery: {
        name: "",
        pageNum: 1,
        pageSize: 10,
        deptId: "",
        enabled: ""
      },
      tabPosition: "all",
      getList: [],
      total: 0,
      dialogFormVisible: false,
      editForm: {
        channelId: null,
        name: null,
        deptId: null,
        userId: null,
        remarks: null
      },
      editFormRules: {
        name: [
          { required: true, message: "请输入一级渠道名称", trigger: "blur" }
        ]
      },
      isEdit: false
    };
  },
  computed: {},
  components: {
    Pagination
  },
  created() {
    this.userInfo = this.$store.getters.userInfo || {};
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
      // console.log(this.userInfo)
      let data = {
        ...this.listQuery,
        deptId: this.userInfo.userDeptId
      };

      if (this.tabPosition == "all") delete data.enabled;

      getFirst(data).then(res => {
        if (res.code == "0") {
          this.getList = res.data.content || [];
          this.total = res.data.totalElements;
        }
      });
    },
    addChannel() {
      this.editForm  = {
        channelId: null,
        name: null,
        deptId: null,
        userId: null,
        remarks: null
      }
      this.isEdit = false
      getChannelId({deptId: this.userInfo.userDeptId}).then(res => {
        if(res.code == '0') {
          this.editForm.channelId = res.data
          this.dialogFormVisible = true;
        } else {
          this.$notify.error({
            title: '错误',
            message: res.errMsg
          });
        }
        
      })
    },
    toEdit(row) {
      this.isEdit = true
      this.editForm = Object.assign({}, row);
      this.dialogFormVisible = true;
    },
    upStatus(row, flag){
      let data = {
        userId: this.userInfo.userId,
        enabled: flag,
        id: row.id
      };
      updateStatus(data).then(res => {
        if(res.code == '0') {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success'
          });
          this.handleFilter()
        } else {
          this.$notify.error({
            title: '错误',
            message: res.errMsg
          });
        }
      })
    },
    saveChannel() {
      if(this.listLoading) return
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.listLoading = true
          let data = {
            ...this.editForm,
            userId: this.userInfo.userId,
            deptId: this.userInfo.userDeptId
          };
          clearTimeout(timer);
          let timer = setTimeout(()=> {
              addChannel(data).then(res => {
                if(res.code == '0') {
                  this.listLoading = false
                  this.dialogFormVisible = false
                  this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                  });
                  this.handleFilter()
                } else {
                  this.$notify.error({
                    title: '错误',
                    message: res.errMsg
                  });
                }
              })
          }, 500);

          
        }
      })
    },

    editChannel() {
      if(this.listLoading) return
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.listLoading = true
          let data = {
            ...this.editForm,
            userId: this.userInfo.userId
          };
          clearTimeout(timer);
          let timer = setTimeout(()=> {
            updateChannel(data).then(res => {
              if(res.code == '0') {
                this.listLoading = false
                this.dialogFormVisible = false
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
                this.handleFilter()
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.errMsg
                });
              }
            })
          }, 500)
        }
      })
    },

    exportTab() {
      let data = {
        ...this.listQuery,
        deptId: this.userInfo.userDeptId
      };

      if (this.tabPosition == "all") delete data.enabled;

      this.listLoading = true
      expFirst(data).then(res => {
        this.listLoading = false
        operateFile(res, '一级渠道')
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: res.errMsg
        });
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
