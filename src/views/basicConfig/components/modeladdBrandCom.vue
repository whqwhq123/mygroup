<template>
  <div>
    <el-dialog
      title="添加品牌"
      :visible.sync="isbrand"
      append-to-body
      width="35%"
      :before-close="isbrandFun"
    >
      <div class="addbrand">
        <el-row style="height: 100%">
          <!-- 搜索 -->
          <el-col :span="13" class="addbrand_left">
            <el-input placeholder="搜索父品牌/子品牌" @change="addbrandleftseleFun" v-model="selbrandinpu">
              <el-button slot="append" icon="el-icon-search" @change="addbrandleftseleFun"></el-button>
            </el-input>
            <!-- 多选 -->  
            <el-row class="addbrand_leftbox">
              <template>
              <el-col :span="2">
                <el-scrollbar class="scrollber"> 
                  <el-row  v-for="(item,index) in listzm" :key="item" ref="sel" :class="selatv==index?'sellettersty atv':'sellettersty'">
                    <span   @click="selletterstyFun(item,index)">{{item}}</span>
                  </el-row>
                </el-scrollbar>
              </el-col>
              <el-col :span="12">

                 <el-scrollbar class="scrollber">             
                  <el-checkbox-group
                    v-model="checkedListdata"
                  >
                    <el-checkbox
                      v-for="(itemone, index) in listone"
                      :label="itemone"              
                      :key="itemone.makeId"
                      style="margin-bottom: 7px;"
                      @change="handlecheckedListdata($event,itemone, index)"
                      >
                        {{ itemone.makeName}}
                        <i
                        class="el-icon-arrow-right"
                        :style="
                          oneindex == index && onechecked
                            ? 'margin-left: 18px;display: inherit;'
                            : 'margin-left: 18px;display: none;'
                        "
                        ></i>
                    </el-checkbox>
                  </el-checkbox-group>
                  <!-- <div v-for="(itemone, index) in listone" :key="itemone.makeId">
                    <label for="n">
                       <input  @change="handlecheckedListdata($event,itemone, index)" ref="ischecd" type="checkbox" name="n">
                       <span @click="clickonecheck($event,itemone, index)">{{ itemone.makeName}}</span>
                    </label>

                  </div> -->





                 </el-scrollbar>
              </el-col>
              <el-col :span="10">
                <!-- childrenList -->
                 <el-scrollbar class="scrollber">
                  <el-checkbox-group
                    v-model="checkedchildrenList"
                    v-if="istowched"
                  >
                    <el-checkbox
                      v-for="(itemtow,index) in listtow.carGroupList"
                      :label="itemtow"
                      :key="itemtow.groupId"
                      @change="handlecheckedchildrenList($event,itemtow,index)"
                    >
                    {{ itemtow.groupName }}
                    </el-checkbox>
                  </el-checkbox-group>
                 </el-scrollbar>
              </el-col>
              </template>
            </el-row>
          </el-col>
          <!-- 树结构 -->
          <el-col :span="11" class="addbrand_right">
             <el-scrollbar class="scrollber" style="height: 377px;">
            <el-tree
              :data="treeListdata"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ data.makeName }}</span>
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
            </el-scrollbar>
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
import { getNoAddCarMakeTree } from "api/index.js";
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
        // treeListdata:[],//树结构的数据
        childrenList:[],//二级目录数据初始化
        onechecked:false,//一级目录是否选中
        oneindex:-1,//一级目录的下标
        sundata:'',//添加自定义子品牌
        isbrand: false,//是否显示车型品牌对话框
        selbrandinpu:'',//搜索框
        selletter:[],
        selatv:0,
        istowched:false,
        //一级目录数据初始化
        list:[],
        listone:[],

    };
  },
  watch: {
    isbrand(newVal) {
      this.$emit("update:isbrandFun", false);
      this.isbrand = newVal;
    },
  },
  computed: {
    treeListdata(){
        //checkedListdata:[],//一级目录选中的数组
        //checkedchildrenList:[],//二级目录选中的数组
        // this.checkedListdata.map((v,i)=>{
        //     v.carGroupList= v.carGroupList.map((v1,i2)=>{
        //           for (let x = 0; x < this.checkedchildrenList.length; x++) {
        //             if(this.checkedchildrenList[x].groupId!=v1.groupId){
        //                 return v1
        //             } 
        //           }

        //      })
        // })
        this.checkedListdata.forEach(element => {
          
        });


        console.log(1);
      return  this.checkedListdata

    }
  },
  methods: {
    //
    isbrandFun() {
      this.isbrand = false;
    },
    handlecheckedListdataChange(value) {
      console.log(value,"1");
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // this.treeListdata.push()
      // if(!this.onechecked){
      //   this.childrenList=[]
      //   this.checkedchildrenList=[]
      //   // this.oneindex
      // }
        
      // console.log(value,'1222222');
      // this.treeListdata=this.checkedListdata
      // console.log( this.checkedListdata, this.checkedchildrenList,"一级目录和二级目录");
    },
    clickonecheck(e,val,index){
      console.log(e.target,val,index);
       this.listtow=val
       this.istowched=!this.istowched
    },
    handlecheckedListdata(e,val,index){
      console.log(e,val,this.checkedListdata);
      // this.istowched=e.target.checked
      this.istowched=e
      this.listtow=val
      let newtree={makeId:val.makeId,makeName:val.makeName,carGroupList:[]}
     console.log( this.treeListdata);


    },
    handlecheckedchildrenList(ischeckd,val,index){
      console.log(ischeckd,this.listtow);
      console.log(val,index,'2222222');
    },
    //搜索父品牌子品牌
    addbrandleftseleFun(){
      this.getNoAddCarMakeTree(this.selbrandinpu)
      console.log("搜索数据",this.selbrandinpu);
    },
    selletterstyFun(item,index){
     
      this.selatv=index
      this.listone=this.list[this.selatv].carMakeGroupVoList
      //  console.log(item,index);

    },
    remove(node,data){
      console.log(node,data, data.makeId);
      for (let i = 0; i < this.checkedListdata.length; i++) {
        if(this.checkedListdata[i]==data.makeId){
           this.checkedListdata.splice(i,1)
        }
      }

     
    },
    async getNoAddCarMakeTree(){
      let res=await getNoAddCarMakeTree({makeName:''})
      if(res.code==0){
          this.listzm=res.data.map(v=>{
            return v.makeLetter
          })
          this.list=res.data
          this.listone=this.list[this.selatv].carMakeGroupVoList
          console.log( this.list,this.listone,this.listzm);
      }
     
    },
  },
  mounted() {
    this.getNoAddCarMakeTree()
    console.log(this.isbrand);
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border-color: #7cd2a2;
  background: #7cd2a2;
  color: #7cd2a2;
}
/deep/.el-checkbox__inner:hover {
  border-color: #7cd2a2;
}
/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #606266;
}
/deep/.el-checkbox__inner.is-focus .el-checkbox__inner {
  border-color: #7cd2a2;
}
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
/deep/.el-scrollbar__wrap {
    overflow-y: scroll;
    /* overflow: hidden; */

}
/deep/.el-scrollbar__bar.is-vertical{
  display: none;
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
  overflow: hidden;
  border: 1px solid #d7dae2;
  .addbrand_left {
    height: 100%;
    padding: 9px 9px 0 9px;
    background: #f5f6fa;
    .addbrand_leftbox {
      height: 312px !important;
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
      display: flex;
      justify-content: space-around;
      align-items: center;
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
    // height: 100px;
  }
}
.sellettersty{
    cursor: pointer;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    font-size: 14px;
    display: block;
    
}
.sellettersty.atv{
color: #FFFFFF;
background: #3B86FF;
}
.scrollber{
    // overflow-y: scroll;
    margin-bottom: -17px;
    overflow: hidden !important;
    height: 320px;
    padding: 8px 0 0 10px;
}

</style>
