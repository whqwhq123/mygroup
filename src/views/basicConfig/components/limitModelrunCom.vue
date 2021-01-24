
<template>
  <div>
    <el-drawer
      :title="limitModeldata.runtype == 1 ? '限售管理' : '车型管理'"
      :with-header="true"
      :visible.sync="islimitModel"
      :modal-append-to-body="false"
      size="50%"
      :before-close="islimitModelFun"
    >
      <div class="frawertitle">
        {{ limitModeldata.runtype == 1 ? "限售管理" : "车型管理" }}
      </div>
      <div class="limitModel" v-if="limitModeldata.runtype == 1">
        <div class="limitModel_tit">本田>进口>本田SUV</div>
        <div class="limitModel_fun">
          <div class="floatstyf">
            <div class="floatstyf_tit">批量操作</div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(2)">
              限售
            </div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(1)">
              取消限售
            </div>
          </div>

          <div class="floatstyr">
            <el-input
              class="floatstyr_inp"
              v-model="inputVal"
              placeholder="请输入内容"
            ></el-input>
            <div class="floatstyr_buta">查询</div>
          </div>
        </div>
        <div class="limitModel_tab">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="550"
            :default-sort="{ order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" label="全选" width="60">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column align="center" prop="modelname" label="经销商名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="vehicletype"
              label="所在城市"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="是否限售"
              align="center"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope"
                ><el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="2"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                  class="swcenter"
                  @change="changeSwitch(scope.row)"
                >
                </el-switch
              ></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="limitModel" v-if="limitModeldata.runtype == 2">
        <div class="limitModel_tit">本田>进口>本田SUV</div>
        <div class="limitModel_fun">
          <div class="floatstyf">
            <div class="floatstyf_tit">批量操作</div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(1)">
              在售
            </div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(2)">
              停售
            </div>
            <div
              class="floatstyf_buta"
              style="width: 96px"
              @click="addModelFun"
            >
              <i class="el-icon-plus"></i> 添加车系
            </div>
          </div>
        </div>
        <div class="limitModel_tab">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            height="550"
            :default-sort="{ order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" width="55">
            </el-table-column>
            <el-table-column align="center" label="全选" width="60">
              <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
            </el-table-column>
            <el-table-column align="center" prop="modelname" label="经销商名称">
            </el-table-column>

            <el-table-column
              prop="status"
              label="是否限售"
              align="center"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope"
                ><el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="2"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                  class="swcenter"
                  @change="changeSwitch(scope.row)"
                >
                </el-switch
              ></template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="vehicletype"
              label="所在城市"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button
                  class="expBtn"
                  type="text"
                  @click="operationFun(scope.row)"
                  >操作</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 分页 -->
      <pagination
        v-if="total > 0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="islimitModelFun">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="islimitModelFun(1)"
          >确 定</el-button
        >
      </div>
    </el-drawer>
    <!-- 添加车系 -->
    <el-dialog
      title="添加车系"
      :modal-append-to-body="false"
      width="25%"
      :visible.sync="dialogAddmodel"
    >
      <el-form ref="form" :model="dialogSubData" label-width="40px" size="mini">
        <el-form-item label="车系">
          <el-input
            style="width: 100%"
            v-model="dialogSubData.subbrandTit"
          ></el-input>
        </el-form-item>
        <el-form-item label="车种">
          <el-select
            v-model="dialogSubData.subbrandsel"
            placeholder="请选择子品牌名称"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitaddmodelFun">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitaddmodelFun(1)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
  export default {
      props: {
      islimitModel: {
        type: Boolean
      },
      limitModeldata:{
        type:Object
      }
      },
      components: {
        Pagination
      },
      data() {
        return {
          listQuery: {
            channelName: "",
            pageNum: 1,
            pageSize: 10
          },
          dialogSubData: {
              subbrandTit: '',
              subbrandsel: '',
              subbrandcus: '',
            },
          total: 20,
          tableData: [
            {
              id:1,
              modelname: "路虎",
              vehicletype:"SUV",
              issell:1,
              status:1,
              islimit:1,
            },
            {
              id:2,
              modelname: "宝马1",
              vehicletype:"MVP",
              issell:2,
              status:2,
              islimit:1,
            },
            {
              id:3,
              modelname: "奔驰",
              vehicletype:"SUV",
              issell:1,
              status:1,
              islimit:2,
            },
            {
              id:4,
              modelname: "宝马",
              vehicletype:"MVP",
              issell:2,
              status:1,
              islimit:1,
            },

      
          ],
          multipleSelection: [],
          islimitModelchecAll:[],
          dialogAddmodel:false,
        }
      },
      mounted() {
        console.log(this.limitModeldata);
      },
        watch: {
      islimitModel(newVal) {
        this.$emit("update:islimitModelFun", false);
        this.islimitModel = newVal;
        
      },
      tableData(newVal){
        this.tableData=newVal
      }
    },
    methods: {
      //
      islimitModelFun() {
        this.islimitModel = false;
      },
          //全选按钮
    handleSelectionChange(val) {
      this.islimitModelchecAll=val
        console.log(val);
    },
        //是否限售
    changeSwitch (row) {
      console.log(row);
    },
    //  批量操作  限售 取消限售
    islimitModelcheckFun(i){
      console.log(this.tableData);

      console.log(this.islimitModelchecAll);

      if(i==1){
      this.tableData=this.tableData.map((v,i)=>{
        this.islimitModelchecAll.forEach(e => {
          if(e.id==v.id){
            console.log("111");
            v.status=1
          }
        });
        return v
      })
      }else if(i==2){
        this.tableData=this.tableData.map((v,i)=>{
        this.islimitModelchecAll.forEach(e => {
          if(e.id==v.id){
            console.log("111");
            v.status=2
          }
        });
        return v
      })
      }
    },
    // 车型管理操作
    operationFun(val){
      console.log(val);
    },
    //addModelFun  添加车系
    addModelFun(){
      this.dialogAddmodel=true
      console.log("添加车系");
    },
    //tianja添加车系
    submitaddmodelFun(){
      this.dialogAddmodel=false
    },

    }

  }
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
/deep/.el-drawer__body {
  padding: 20px 20px;
}

/deep/.el-input {
  height: 32px;
  line-height: 32px;
  width: 180px;
}
/deep/ :focus {
  outline: 0;
}

/deep/.el-input__inner {
  height: 32px;
  line-height: 32px;
}
.frawertitle {
  line-height: 34px;
  color: rgb(67, 66, 93);
  height: 34px;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
}
.limitModel {
  .limitModel_tit {
    font-size: 16px;
    font-weight: 400;
    color: #43425d;
  }
  .limitModel_fun {
    height: 60px;
    line-height: 60px;
    display: flex;
    .floatstyf_buta {
      width: 69px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #43425d;
      font-size: 14px;
      border-radius: 4px;
      color: #ffffff;
      margin-left: 20px;
      cursor: pointer;
    }
    .floatstyr_buta {
      width: 69px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #43425d;
      font-size: 14px;
      border-radius: 4px;
      color: #ffffff;
      margin-left: 20px;
      cursor: pointer;
    }
  }
}
.floatstyf {
  /* float: left; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 6;
}
.floatstyr {
  /* float: right; */
  display: flex;
  justify-content: flex-end;
  align-items: center;

  flex: 6;
}
</style>