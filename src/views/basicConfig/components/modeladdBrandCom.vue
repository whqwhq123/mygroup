<template>
  <div>
    <el-dialog
      title="添加品牌"
      :visible.sync="isbrand"
      append-to-body
      width="30%"
      :before-close="isbrandFun"
    >
      <div class="addbrand">
        <el-row style="height: 100%">
          <el-col :span="13" class="addbrand_left">
            <div class="addbrand_leftsele" @click="addbrandleftseleFun">
              <span>请选择父品牌/子品牌</span>
              <i
                :class="
                  addbrandleftsele ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                "
              ></i>
            </div>
            <el-row
              v-if="addbrandleftsele"
              addbrand_leftbox
              style="
                height: 307px !important;
                overflow: hidden !important;
                background: #fff !important;
              "
            >
              <el-col :span="12">
                <div class="itemscroll innerbox">
                  <el-checkbox-group
                    v-model="checkedListdata"
                    @change="handlecheckedListdataChange"
                  >
                    <el-checkbox
                      v-for="(item, index) in listdata"
                      :label="item"
                      :key="item.id"
                      @change="handlecheckedListdata($event, item, index)"
                      >{{ item.label
                      }}<span
                        :style="
                          oneindex == index && onechecked
                            ? 'margin-left: 25px;display: inherit;'
                            : 'margin-left: 25px;display: none;'
                        "
                        >></span
                      ></el-checkbox
                    >
                  </el-checkbox-group>
                </div>
              </el-col>
              <el-col :span="12">
                <!-- childrenList -->
                <div class="itemscroll innerbox">
                  <el-checkbox-group
                    v-model="checkedchildrenList"
                    @change="handlecheckedchildrenListChange"
                  >
                    <el-checkbox
                      v-for="item in childrenList.children"
                      :label="item"
                      :key="item.id"
                      @change="handlecheckedchildrenList($event, item)"
                      >{{ item.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="11" class="addbrand_right">
            <el-tree
              :data="treeListdata"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
                  >
                    <i class="el-icon-close"></i>
                  </el-button>
                </span>
              </span>
            </el-tree>
          </el-col>
        </el-row>
      </div>
      <el-form label-width="130px" style="margin-top: 20px">
        <el-form-item label="添加自定义子品牌">
          <el-input v-model="sundata"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="sdmpbut" @click="isbrandFun">取 消</el-button>
        <el-button class="sdmpbut" type="primary" @click="isbrandFun"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isbrand: {
      type: Boolean
    }
  },
  data() {

    return {
        checkedListdata:[],//一级目录选中的数组
        checkedchildrenList:[],//二级目录选中的数组
        treeListdata:[],//树结构的数据
        childrenList:[],//二级目录数据初始化
        onechecked:false,//一级目录是否选中
        oneindex:-1,//一级目录的下标
        sundata:'',//添加自定义子品牌
        isbrand: false,//是否显示车型品牌对话框
        addbrandleftsele:false,//是否显示品牌的选择
        //一级目录数据初始化
        listdata: [
        {
          id: 1,
          label: "一级 1",
          type: 1,
          icon: "el-icon-menu",
          children: [
            {
              id: 4,
              icon: "el-icon-arrow-right",
              label: "二级 1-1",
            },
            {
              id: 15,
              icon: "el-icon-arrow-right",
              label: "二级 1-1",
            },
            {
              id: 16,
              icon: "el-icon-arrow-right",
              label: "二级 1-1",
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          type: 1,
          icon: "el-icon-menu",
          children: [
            {
              id: 5,
              icon: "el-icon-arrow-right",
              label: "二级 2-1",
            },
            {
              id: 6,
              icon: "el-icon-arrow-right",
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          type: 1,
          icon: "el-icon-menu",
          children: [
            {
              id: 7,
              icon: "el-icon-arrow-right",
              label: "二级 3-1",
            },
            {
              id: 8,
              icon: "el-icon-arrow-right",
              label: "二级 3-2",
            },
          ],
        },
        ],

    };
  },
  watch: {
    isbrand(newVal) {
      this.$emit("update:isbrandFun", false);
      this.isbrand = newVal;
    }
  },
  methods: {
    //
    isbrandFun() {
      this.isbrand = false;
    },
    handlecheckedListdataChange(value) {
      if(!this.onechecked){
        this.childrenList=[]
        this.checkedchildrenList=[]
        // this.oneindex
      }
        
      console.log(value,'1222222');
      this.treeListdata=this.checkedListdata
      console.log( this.checkedListdata, this.checkedchildrenList,"一级目录和二级目录");
    },
    handlecheckedListdata(e,val,index){
      this.onechecked=e
      this.oneindex=index
      if(e){
        this.childrenList=val
        // console.log(e,val,'111111111111');
      }
    },
    handlecheckedchildrenListChange(value){
      // console.log(value,"211111");
    },
    handlecheckedchildrenList(e,val){
            if(e){
        // console.log(e,val,'222222222');
        // console.log( this.checkedListdata, this.checkedchildrenList,"一级目录和二级目录");
        //     let newChild = 
        //     this.treedata.push(newChild);

         this.treeListdata=this.checkedListdata
      }
    },
    addbrandleftseleFun(){
      this.addbrandleftsele=!this.addbrandleftsele
    },
  },
  mounted() {
    console.log(this.isbrand);
  }
};
</script>

<style lang="scss" scoped>
/deep/ .el-select {
  width: 100%;
  height: 32px;
  line-height: 32px;
}

/deep/.el-select-dropdown .el-scrollbar {
  height: 290px !important;
}

/deep/ .el-select-dropdown__item.selected {
  color: #409eff;
  font-weight: 700;
  min-height: 340px;
}
/deep/ .el-dialog__body {
  padding: 30px 20px 0 20px !important;
}
.dialog-footer {
  display: flex;
}
.sdmpbut {
  width: 50% !important;
}
.addbrand {
  width: 100%;
  height: 360px;
  border: 1px solid #d7dae2;
  .addbrand_left {
    height: 100%;
    padding: 9px 9px 0 9px;
    background: #f5f6fa;
    .addbrand_leftbox {
      height: 307px !important;
      overflow: hidden !important;
      background: #fff !important;
    }
    .addbrand_leftsele {
      height: 32px;
      line-height: 32px;
      background: #ffffff;
      border: 1px solid #d7dae2;
      margin-bottom: 10px;
      font-size: 12px;
      padding-left: 10px;
      color: #838389;
      > i {
        margin-left: 95px;
      }
    }
    .itemscroll {
      height: 307px;
      overflow-y: scroll;
    }
    .itemsty {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
    .itemscrollt {
    }
  }
  .addbrand_right {
    height: 100px;
  }
}
.innerbox {
  overflow-x: hidden;
  overflow-y: auto;
  color: #000;
  font-size: 0.7rem;
  height: 100%;
}
/*滚动条样式*/
.innerbox::-webkit-scrollbar {
  width: 4px;
  /*height: 4px;*/
}
.innerbox::-webkit-scrollbar-thumb {
  display: none;
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}
.innerbox::-webkit-scrollbar-track {
  display: none;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}
</style>
