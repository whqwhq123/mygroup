<template>

  <div>
     <el-table :data="carSeriesData" style="width: 100%" height="600" align="center" class="table">
        <el-table-column prop="date" label="运营位" width="180">
            <template  slot-scope="scope">
            <span>第{{scope.$index+1}}位</span>
          </template>
        </el-table-column>
        <el-table-column  prop="modelName" label="车系名称" width="180">
          
        </el-table-column>
        <el-table-column prop="minprice" label="最低价" width="180">

        </el-table-column>
          <el-table-column  prop="address" label="操作排序">
          <template slot-scope="scope">
            <div class="handle">
              <el-cascader v-model="intentCarStyles" clearable ref="carType" placeholder="意向车型" :options="carTypeData" :props="carTypeLabel"></el-cascader> 
              <div>
                <el-button type="text" style="color:#008DF8;cursor: pointer;margin-left: 20px" @click.stop="scope.row.carModelStatus==true?carModelAdd(scope):carModelSave(scope)">保存</el-button>
                <el-button type="text" style="color:#008DF8;cursor: pointer;" @click.stop="carModelCancel(scope)">取消</el-button>
              </div>
            </div>
            <i class="el-icon-edit-outline" style="font-size: 28px" @click.stop="carModelEdit(scope)"></i>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
 import {
    getCarModelOrderList,addCarModelOrder,updateCarModelOrder,changeCarModelOrder,getSelectCarMakeGroupModel
  } from '@/service/api/index'
  import Sortable from 'sortablejs';
export default {
  components: {
    Sortable
  },
  data(){
    return {
      handleStatus:false,
      status:false,
      carSeriesData:[],
      intentCarStyles:'',
      sortString:'',
      carTypeData:[],
      carTypeLabel:{
        value:'modelId',
        label:'name',
        children:'list'
      }
    }
  },
  created () {
    this.carModelList();
    this.sortString="";
  },
  mounted () {
    this.sortString="";
    this.rowDrop();
  },
  methods:{
    carModelList(){
      debugger;
      getCarModelOrderList().then(res=>{  //车系位列表
        if(res.code==0){
         console.log(res)
          let empyObj=[];
          if(res.data.length<6){
            for(let i=0;i<6-res.data.length;i++){
              empyObj.push({ossUrl:'',carModelStatus:true,modelId:0})
            }
            
            this.carSeriesData=this.carSeriesData.concat(res.data,empyObj);
            for(let i=0;i<this.carSeriesData.length;i++){
              this.carSeriesData[i].status=false;
              this.carSeriesData[i].editStatus=true;
            }
            console.log(this.carSeriesData)
          }
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
      getSelectCarMakeGroupModel().then(res=>{   
          if(res.code==0){
          console.log(res)
          this.carTypeData=res.data
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      });
    },
    brandSort(){  //拖拽排序
      let data={
        modelIds:this.sortString
      }
      console.log(data)
      changeCarModelOrder(data).then(res=>{
          if(res.code==0){
          this.carModelList();
          this.sortString="";
          this.$notify({
            type:'success',
            message:"排序成功"
          })

        }else{
          this.sortString="";
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
      this.sortString="";
    },
    rowDrop() {
      this.sortString="";
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this;
      Sortable.create(tbody, {
        draggable: ".el-table__row",
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.carSeriesData.splice(oldIndex, 1)[0]
          _this.carSeriesData.splice(newIndex, 0, currRow)
          _this.carSeriesData = _this.carSeriesData.filter(({ adId }) => adId !== 0)         
          _this.carSeriesData.forEach((item, index) => {
          _this.sortString += item.modelId + ','
          })
          _this.sortString = _this.sortString.substr(0, _this.sortString.length - 1);
          console.log(_this.sortString)
          _this.brandSort()
        }
      })
    },
    carModelSave(scope){  
      console.log('保存修改')
      let that=this;
      let data={
        id:scope.$index,
        modelId:scope.row.modelId
      }
      updateCarModelOrder(data).then(res=>{   
        if(res.code==0){
          console.log(res)
          this.carModelList()
          this.$notify({
            type:'success',
            message:"修改成功"
          })
          setTimeout(function(){
            that.carModelList();
          },1500)
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
    },
    carModelEdit(scope){
      this.carSeriesData[scope.$index].status=true;
      this.carSeriesData[scope.$index].editStatus=false;
      this.$forceUpdate()
    },
    carModelAdd(scope){
      console.log('新增')
      let data={modelId:this.intentCarStyles[2]};
      addCarModelOrder(data).then(res=>{   // 新增
        if(res.code==0){
          this.carModelList();
            this.$notify({
            type:'success',
            message:"新增成功"
          })
          setTimeout(function(){
            that.carModelList();
          },1500)
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
    },
    carModelCancel(scope){
      console.log('取消')
      this.carSeriesData[scope.$index].status=false;
      this.carSeriesData[scope.$index].editStatus=true;
    }
  }
}
</script>
<style scoped>

</style>