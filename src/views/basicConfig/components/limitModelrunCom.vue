
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
      <!-- 限售管理 -->
      <div class="limitModel" v-if="limitModeldata.runtype == 1">
        <div class="limitModel_tit">{{this.treeF.label}} > {{this.treeS.label}} > {{limitModeldata.row.modelName}}{{limitModeldata.row.levelName}}</div>
        <div class="limitModel_fun">
          <div class="floatstyf">
            <!-- <div class="floatstyf_tit">批量操作</div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(2)">
              限售
            </div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(1)">
              取消限售
            </div> -->
          </div>

          <div class="floatstyr">
            <el-input
              class="floatstyr_inp"
              v-model="inputVal"
              @keyup.enter.native="entterFun"
              placeholder="请输入内容"
            ></el-input>
            <div class="floatstyr_buta" @click.native="entterFun">查询</div>
          </div>
        </div>
        <div class="limitModel_tab">
          <el-table
            ref="multipleTable"
            :data="restrictionData"
            tooltip-effect="dark"
            style="width: 100%"
            height="550"
            :default-sort="{ order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center"  width="55">
            </el-table-column>
            <!-- <el-table-column align="center" label="全选" width="60">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column> -->
            <el-table-column align="center" prop="deptName" label="经销商名称">
            </el-table-column>
            <el-table-column
              align="center"
              prop="areaName"
              label="所在城市"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="isLimit"
              label="是否限售"
              align="center"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope"
                ><el-switch
                  v-model="scope.row.isLimit"
                  active-value="1"
                  inactive-value="0"
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
      <!-- 车型管理 -->
      <div class="limitModel" v-if="limitModeldata.runtype == 2">
        <div class="limitModel_tit">{{this.treeF.label}}>{{this.treeS.label}}>{{limitModeldata.row.modelName}}{{limitModeldata.row.levelName}}</div>
        <div class="limitModel_fun">
          <div class="floatstyf">
            <div class="floatstyf_tit">操作</div>
            <!-- <div class="floatstyf_buta" @click="islimitModelcheckFun(1)">
              在售
            </div>
            <div class="floatstyf_buta" @click="islimitModelcheckFun(2)">
              停售
            </div> -->
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
            :data="tablecatData"
            tooltip-effect="dark"
            style="width: 100%"
            height="550"
            :default-sort="{ order: 'descending' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center"  width="55">
            </el-table-column>
            <!-- <el-table-column align="center" label="全选" width="60">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column> -->
            <el-table-column align="center" prop="styleName" label="车型名称">
            </el-table-column>

            <el-table-column
              prop="onSale"
              label="是否在售"
              align="center"
              sortable
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                
                <el-switch
                v-model ="scope.row.onSale"
                active-value='1'
                inactive-value='0'
                active-color="#13ce66"
                inactive-color="#dcdfe6"
                class="swcenter"
                @change="changeSale(scope.row)"
              >
              </el-switch>
                
                </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="vehicletype"
              label="操作"
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
          @pagination="getCarModelListFun"
        />


    </el-drawer>

    <!-- 添加车系 -->
    <el-dialog
      title="添加车型"
      :modal-append-to-body="false"
      width="25%"
      :visible.sync="dialogAddmodel"
    >
      <el-form ref="form" :model="dialogSubData" label-width="80px" size="mini">
        <el-form-item label="车型名称">
          <el-input
            style="width: 100%"
            placeholder="请输入自定义车型名称"
            v-model="dialogSubData"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="submitaddmodelFun(1)">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="submitaddmodelFun(2)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import {getCarStyleList,changeOnSale,addCustomizeCarStyle,getDeptList,changeIsLimit} from "api/index.js";

  export default {
      props: {
      islimitModel: {
        type: Boolean
      },
      limitModeldata:{
        type:Object
      },
      treeF:{
        type:Object,
      },
       treeS:{
        type:Object,
      },

      },

      data() {
        return {
          listQuery: {
            channelName: "",
            pageNum: 1,
            pageSize: 10
          },
          total: 0,
          dialogSubData: '',
        
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
          tablecatData:[],//车型管理tabs
          restrictionData:[],//限售管理tabs
          multipleSelection: [],
          islimitModelchecAll:[],
          dialogAddmodel:false,
        }
      },
      components: {
        Pagination
      },
      mounted() {
        console.log(this.limitModeldata,this.treeF,this.treeS,);
        
        if (this.limitModeldata.runtype==1) {
          this.getDeptListFun()
        }else if (this.limitModeldata.runtype==2) {
          this.getCarStyleListFun()
        }
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
    async changeSwitch (row) {
      console.log(row);  
      let data={modelId:this.limitModeldata.row.modelId,deptId:row.deptId}
      let res=await changeIsLimit(data)
       
    },
    //是否在售
    async changeSale(row){
      console.log(row);
      let res=await changeOnSale({styleId:row.styleId,onSale:row.onSale==1?0:1})
    },
    // 限售管理查询
    entterFun(){
      this.getDeptListFun(this.inputVal.trim())
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
    async  submitaddmodelFun(type){
      if(type==2){
        console.log("发送请求",this.dialogSubData);
        // styleName  车型名称
        // modelId  车系id
        console.log(this.limitModeldata.row.modelId);
        if(this.dialogSubData.trim()!=''){
        let data={
          styleName:this.dialogSubData.trim(),
          modelId:this.limitModeldata.row.modelId
        }
        let res=await addCustomizeCarStyle(data)
        if (res.code==0) {
          
        this.dialogSubData=''
        this.$message({
          message: '添加成功',
          type: 'success'
        });
        this.getCarStyleListFun()
        this.dialogAddmodel=false
        }else{
           this.$message.error('操作失败');
        }
        }else{
          this.$message.error('请填写车系名称');
        }

      }else{
        this.dialogAddmodel=false
      }
      
    },
    //ajax
    //车型管理tabs
    async getCarStyleListFun(){
      // modelId 车系id
      // pageSize 每页数量
      // pageNum 第几页
      let data={
        modelId:this.limitModeldata.row.modelId,
        pageSize:this.listQuery.pageSize,
        pageNum:this.listQuery.pageNum,
      }
      console.log();
      let res=await getCarStyleList(data)
      if(res.code==0){
          console.log(res.data,"datadatadatadata车型管理tabs");
          this.tablecatData=res.data
          this.total=res.data.length
      }else{
          this.$message.error('操作失败');
      }
    },
    //限售管理tabs restrictionData:[],//限售管理tabs  查询
     async getDeptListFun(deptName=''){
        let data={
          modelId:this.limitModeldata.row.modelId,
          groupId:this.limitModeldata.row.groupId,
          deptName,
          pageSize:this.listQuery.pageSize,
          pageNum:this.listQuery.pageNum,
        }
        console.log();
        let res=await getDeptList(data)
        if(res.code==0){
            console.log(res.data,"datadatadatadatax限售管理tabs");
            this.restrictionData=res.data.list
            this.total=res.data.total
        }else{
            this.$message.error('操作失败');
        }
      }
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
  // width: 180px;
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
.sdmpbut{
  width: 50% !important;
}
.dialog-footer{
  display: flex;
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