<template>
  <div>
     <el-table :data="brandData" style="width: 100%" height="600" align="center" class="table" 
        row-key="makeId" :default-sort="{prop: 'sortNum', order: 'ascending'}" stripe>
        <el-table-column  label="运营位" width="180">
          <template  slot-scope="scope">
            <span>第{{scope.$index+1}}位</span>
          </template>
        </el-table-column>
        <el-table-column  prop="makeName" label="品牌" width="180"></el-table-column>
        <el-table-column prop="ossUrl" label="品牌logo" width="180">
          <template slot-scope="scope">
            <img  src="" alt="" v-if="scope.row.ossUrl==''|| scope.row.ossUrl==undefined">
            <el-image v-else
              style="width: 24px; height: 24px"
              :src="scope.row.ossUrl"
              :fit="fit"></el-image>
              
          </template>
        </el-table-column>
        <el-table-column  prop="address" label="操作排序">
          <template slot-scope="scope">
            <div class="handle">
                <el-select v-model="CarMakeOrder" clearable style="width: 240px;" placeholder="父品牌">
                  <el-option
                      v-for="item in CarMakeOrderData"
                      :key="item.makeId"
                      :label="item.makeName"
                      :value="item.makeId">
                  </el-option>
                </el-select>
              <div>
                <el-button type="text" style="color:#008DF8;cursor: pointer;margin-left: 20px" @click.stop="scope.row.addStatus==true?add(scope):save(scope)">保存</el-button>
                <el-button type="text" style="color:#008DF8;cursor: pointer;" @click.stop="cancel(scope)">取消</el-button>
              </div>
            </div>
            <i  class="el-icon-edit-outline" style="font-size: 28px" @click.stop="edit(scope)"></i>
          </template>
        </el-table-column>
     </el-table>
  </div>
</template>

<script>
  import {getSelectCarMake,getCarMakeOrderList,addCarMakeOrder,updateCarMakeOrder,changeOrder} from '@/service/api/index'
  import Sortable from 'sortablejs';

  export default {
    components: {
      Sortable
    },
    data(){
      return {
        handleStatus:false,
        status:false,
        brandData:[],
        CarMakeOrder:'',
        CarMakeOrderData:[],
        sortString:'',
      }
    },
    created () {
      this.dataInit();
      this.sortString="";
    },
    mounted () {
      this.sortString="";
      this.rowDrop();
    },
    methods:{
      dataInit(){
        getCarMakeOrderList().then(res=>{  //运营位列表
          if(res.code==0){
            console.log(res)
            let empyObj=[];
            if(res.data.length<10){
              for(let i=0;i<10-res.data.length;i++){
                empyObj.push({ossUrl:'',addStatus:true,makeId:0})
              }

              this.brandData=this.brandData.concat(res.data,empyObj);
              for(let i=0;i<this.brandData.length;i++){
                this.brandData[i].status=false;
                this.brandData[i].editStatus=true;
              }

            }else{
              this.brandData=res.data;
            }
          }else{
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })

        getSelectCarMake().then(res=>{   // 父品牌列表  
           if(res.code==0){
            console.log(res)
            this.CarMakeOrderData=res.data
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
          makeIds:this.sortString
        }
        console.log(data)
        changeOrder(data).then(res=>{
           if(res.code==0){
            this.dataInit();  
            this.sortString='';
            this.$notify({
              type:'success',
              message:"排序成功"
            })

          }else{
            this.sortString='';
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })
        this.sortString='';
      
      },
      rowDrop() {
        this.sortString="";
        const tbody = document.querySelector('.el-table__body-wrapper tbody')
        const _this = this;
        Sortable.create(tbody, {
          draggable: ".el-table__row",
          onEnd({ newIndex, oldIndex }) {
            const currRow = _this.brandData.splice(oldIndex, 1)[0]
            _this.brandData.splice(newIndex, 0, currRow)
            _this.brandData = _this.brandData.filter(({ adId }) => adId !== 0)         
            _this.brandData.forEach((item, index) => {
            _this.sortString += item.makeId + ','
            })
            _this.sortString = _this.sortString.substr(0, _this.sortString.length - 1);
            console.log(_this.sortString)
            _this.brandSort()
          }
        })
      },
      save(scope){  
         console.log('修改')
         let that=this;
         let data={
           id:scope.$index,
           makeId:scope.row.makeId
         }

         updateCarMakeOrder(data).then(res=>{   // 编辑父品牌列表----修改
          if(res.code==0){
            console.log(res)
            this.$notify({
              type:'success',
              message:"修改成功"
            })
            setTimeout(function(){
              that.dataInit()
            },1500)
          }else{
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })
      },
      edit(scope){
     
        this.brandData[scope.$index].status=true;
        this.brandData[scope.$index].editStatus=false;
      
      },
      add(scope){
        console.log('新增')
       
        let data={makeId:this.CarMakeOrder};
        addCarMakeOrder(data).then(res=>{   // 新增
           if(res.code==0){
            console.log(res)
        //    this.brandData[scope.$index]=res.data;
             this.dataInit()
             this.$notify({
              type:'success',
              message:"新增成功"
            })
          }else{
            this.$notify({
              type:'error',
              message:res.errMsg
            })
          }
        })
      },
      cancel(scope){
       
        console.log('取消')
        this.brandData[scope.$index].status=false;
        this.brandData[scope.$index].editStatus=true;
        this.$forceUpdate()
        
      },
    }
  }
</script>