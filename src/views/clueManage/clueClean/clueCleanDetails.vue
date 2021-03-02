<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">线索清洗详情</span> 
      <span class="status gray" v-if="clueUser.clean.cleanStatus==1">待清洗<i class="el-icon-s-open"></i></span>
      <span class="status green" v-if="clueUser.clean.cleanStatus==2">已清洗<i class="el-icon-time"></i></span>
    </el-header>
    <p class="subtitle">线索详情</p>
    <el-row>
      <el-form class="unique">
        <el-col :span="8" style="border:1px solid #E4E6ED;margin-right:20px">
          <div class="add-user">
              <div class="user-title">
                <span class="header-img">
                  <img v-if="sex==1" src="../../../assets/images/clueManage/man.png" alt="男头">
                  <img v-else src="../../../assets/images/clueManage/woman.png" alt="女头">
                </span>
                <ul class="title-right">
                  <li><span class="user-name">{{clueUser.clean.customerName}}</span><span>{{clueUser.clean.mobile}}</span></li>
                  <li>{{clueUser.clean.telephone}}</li>
                </ul>
              </div>
              <p style="font-weight: 600;margin-left:15px;font-size:18px">客户信息</p>
              <div style="padding: 0 15px 15px">
                  <el-form-item label="性别：" prop="sex" class="sex-icon">
                    {{clueUser.clean.sex}}
                  </el-form-item>
                  <el-form-item label="地址：" prop="province" class="dizhi-icon">
                    {{clueUser.clean.province}}&nbsp;/&nbsp;{{clueUser.clean.city}}&nbsp;/&nbsp;{{clueUser.clean.area}}
                  </el-form-item>
                  <el-form-item label="备注：" class="remark-icon">
                    {{clueUser.clean.remarks}}
                  </el-form-item>
              </div>
            </div>
        </el-col>
        <el-col :span="9" style="margin-top: 20px">
          <el-form-item label="唯一线索ID：" class="add-icon">
            {{clueUser.clean.uniqueId}}
          </el-form-item>
          <el-form-item label="客户属性" class="add-icon">
            {{clueUser.clean.custAttr}}
          </el-form-item>
          <el-form-item label="意向车型:" prop="carType" class="add-icon">
           {{clueUser.clean.intentCarBrand}}&nbsp;/&nbsp;{{clueUser.clean.intentCarModel}}&nbsp;/&nbsp;{{clueUser.clean.intentCarStyle}}
          </el-form-item>
          <el-form-item label="来源渠道:" prop="fromChannel" class="add-icon">
              {{clueUser.clean.firstChannelName}}&nbsp;/&nbsp;{{clueUser.clean.secondChannelName}}
          </el-form-item>
          <el-form-item label="经销商名称:" class="add-icon">
              {{clueUser.clean.dealerName}}
          </el-form-item>
          <el-form-item label="销售顾问:" class="add-icon">
              {{clueUser.clean.salesmanName}}
          </el-form-item>
          <el-form-item label="创建时间：" class="add-icon">
            {{clueUser.clean.createTime}}
          </el-form-item>
        </el-col>
        <el-col :span="7"></el-col>
      </el-form>
    </el-row>
    <div class="hr" v-if="clueUser.clean.cleanStatus==2"></div>

    <p class="subtitle" v-if="clueUser.clean.cleanStatus==2">线索清洗结果</p>

    <el-row class="invalid" v-if="clueUser.clean.cleanStatus==1 && clueUser.clean.cleanResult==null">
      <el-form>
        <el-form-item label="清洗结果" prop="invalidReason" :rules="{required:true,message:'请滑动这次清洗是否有效',trigger: 'blur'}">
          <el-switch v-model="cleanResult" active-text="有效" inactive-text="无效" inactive-color="#C0CCDA" active-color="rgb(124,210,106)"></el-switch>
        </el-form-item>
      </el-form>
      <div class="hr"></div>
      <el-form :model="invalidForm" ref="invalidForm" :rules="invalidRules">
        <div  v-if="cleanResult==false">
            <el-form-item label="无效原因" prop="invalidReason">
            <el-cascader placeholder="请选择无效原因" clearable :options="invalidReason" ref="invalidReason" v-model="invalidForm.invalidReason" :props="{value:'value'}"></el-cascader>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入备注"
                v-model="invalidForm.remarks"
                style="width:304px">
              </el-input>
            </el-form-item>
        </div>
      </el-form>
    </el-row>
    <el-row class="effective" v-if="clueUser.clean.cleanStatus==1 && clueUser.clean.cleanResult==null">
       <el-form :model="effective" ref="effective" :rules="effectiveRules" v-if="cleanResult==true">
        <el-col :span="8">
          <el-col :span="4">
             <img v-if="sexpost==1" src="../../../assets/images/clueManage/man.png" alt="男头">
             <img v-else src="../../../assets/images/clueManage/woman.png" alt="女头">
          </el-col>
          <el-col :span="20">
            <el-form-item label="客户名称" prop="customerName" style="margin-right: 20px">
              <el-input v-model="effective.customerName" placeholder="请输入客户姓名" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="客户性别：" prop="sex">
              <el-radio-group v-model="effective.sex" @change="selectSex">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客户地址：" prop="address">
                <el-cascader placeholder="请选择省市区" clearable :options="area" ref="area" v-model="effective.address" :props="{value:'label'}" @change="selectCity"></el-cascader>
            </el-form-item>
            <el-form-item label="经销商" prop="dealerName">
              <el-select v-model="effective.dealerName" placeholder="请选择经销商">
                <el-option
                  v-for="item in dealerName"
                  :key="item.deptName"
                  :label="item.deptName"
                  :value="item.deptId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item></el-form-item>
            <el-form-item></el-form-item>
          </el-col>
         
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否已购车" prop="boughtCar">
              <el-radio-group v-model="effective.boughtCar" @change="selectBoughtCar">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
          <el-form-item label="意向车型" prop="intentionModel">
            <el-cascader v-model="effective.intentionModel" clearable ref="carType" placeholder="请选择意向车型" :options="carTypeData" :props="carTypeLabel"></el-cascader>
          </el-form-item>
          <el-form-item label="竞品车型" prop="jingCarModel">
            <el-cascader v-model="effective.jingCarModel" clearable ref="carType" placeholder="请选择竞品车型" :options="jingCarModel" :props="carTypeLabel"></el-cascader>
          </el-form-item>
          <el-form-item label="预计成交时间" prop="validStatus">
            <el-select v-model="effective.estTranDay" placeholder="请选择预计成交时间">
              <el-option
                v-for="item in dealTime"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注"
              v-model="invalidForm.remarks"
              style="width:304px">
            </el-input>
          </el-form-item> 
        </el-col>
        <el-col :span="8" style="height:10px;"></el-col>
      </el-form>
      <div style="clear:both;width:32%;text-align: center;">
        <el-button size="mini" class="clean-cancel" @click="back">取消</el-button>
        <el-button size="mini" class="submit-btn" type="primary" @click="submit(invalidForm)">提交</el-button>
      </div>
    </el-row>
    <!-- ---------------------------------------------清洗结果 -->
    <el-row class="invalid-over" v-if="clueUser.clean.cleanStatus==2 && clueUser.clean.cleanResult==false">
      <el-form>
        <el-form-item label="清洗结果">
         {{clueUser.clean.cleanResult==true?'有效':'无效'}}
        </el-form-item>
        <div class="hr"></div>
        <el-form-item label="无效原因">
          {{clueUser.clean.invalidMajorReason}} &nbsp;/&nbsp;{{clueUser.clean.invalidMinorReason}}
        </el-form-item>
        <el-form-item label="备注">
           {{clueUser.clean.remarks}}
        </el-form-item>   
      </el-form>
    </el-row>
    <el-row class="effective-over" v-if="clueUser.clean.cleanStatus==2 && clueUser.clean.cleanResult==true">
      <el-form>
        <el-form-item label="清洗结果" prop="validStatus">
           {{clueUser.clean.cleanResult==true?'有效':'无效'}}
        </el-form-item>
        <div class="hr"></div>
        <el-col :span="8">
          <el-col :span="4">
            <img v-if="clueUser.unique.sex=='男'" src="../../../assets/images/clueManage/man.png" alt="男头">
            <img v-else src="../../../assets/images/clueManage/woman.png" alt="女头">
          </el-col>
          <el-col :span="20">
            <el-form-item label="客户名称" style="margin-right: 20px">
              {{clueUser.unique.customerName}}
            </el-form-item>
            <el-form-item label="客户性别" prop="sex">
              {{clueUser.unique.sex}}
            </el-form-item>
            <el-form-item label="客户地址" prop="address">
              {{clueUser.unique.province}}&nbsp;/&nbsp;{{clueUser.unique.city}}&nbsp;/&nbsp;{{clueUser.unique.area}}
            </el-form-item>
            <el-form-item label="经销商" prop="dealerName">
              {{clueUser.unique.dealerName}}
            </el-form-item>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-form-item label="意向车型" prop="intentionModel">
             {{clueUser.unique.intentCarBrand}}&nbsp;/&nbsp;{{clueUser.unique.intentCarModel}}&nbsp;/&nbsp;{{clueUser.unique.intentCarStyle}}
          </el-form-item>
          <el-form-item label="竞品车型" prop="jingCarModel">
             {{clueUser.clean.compCarBrand==null?'':clueUser.clean.compCarBrand+'&nbsp;/&nbsp;'}} 
             {{clueUser.clean.compCarModel==null?'':clueUser.clean.compCarModel+'&nbsp;/&nbsp;'}}
             {{clueUser.clean.compCarStyle}}
          </el-form-item>
          <el-form-item label="预计成交时间" prop="validStatus">
            {{clueUser.clean.estTranDay}}
          </el-form-item>
          <el-form-item label="备注">
            {{clueUser.unique.remarks}}
          </el-form-item> 
        </el-col>
        <el-col :span="8"></el-col>
      </el-form>
    </el-row>
  </el-main>
</template>

<script>
import {getCarMakeModelStyle,getDealerData,CleaningDetail,cleaning} from '../../../service/api/index'
import {parseTime} from '../../../utils/index'
import area from '../../../assets/javaScript/areaList.js'
export default {
  data(){
    return {
      id:'',
      clueUser:{},
      cleanResult:true,
      invalidForm:{   //无效
        invalidReason:'',
        remarks:''
      },
      sex:1,
      sexpost:1,
      effective:{   //有效
        customerName:'',
        sex:1,
        province:'',
        address:'',
        city:'',
        area:'',
        boughtCar:true,   // 是否购车
        dealerName:'',
        intentionModel:'',  //意向车型
        jingCarModel:'',
        compCarBrand:'', 
        compCarModel:'',
        compCarStyle:'',
        estTranDay:''   //预计成交时间
      },
      carTypeData:[],
      carTypeLabel:{
        value:'name',
        label:'name',
        children:'list'
      },
      area:area.options,
      invalidReason:[
        {
          value:'defeated_others',
          label:'他品战败',
          children:[
            {
              value:'others_exterior_color',
              label:'外观颜色'
            },
            {
              value:'others_low_performance',
              label:'性价比低'
            },
            {
              value:'others_low_hedge_rate',
              label:'保值率低'
            },
            {
              value:'others_high_failure_rate',
              label:'故障率高'
            },
            {
              value:'others_high_fuel_avg_power',
              label:'油耗高动力一般'
            },
            {
              value:'others_avg_control',
              label:'操控一般'
            },
            {
              value:'others_avg_comfort',
              label:'舒适度一般'
            },
            {
              value:'others_high_after_sales',
              label:'售后成本高'
            },
            {
              value:'others_avg_after_sales_service',
              label:'售后服务能力一般'
            },
            {
              value:'others_insufficient_financial_support',
              label:'金融支持不足'
            },
            {
              value:'others_pickup_long_waiting',
              label:'提车等待时间长'
            },
            {
              value:'others_brand_preference',
              label:'品牌偏好'
            },
            {
              value:'others_avg_reputation',
              label:'口碑一般'
            },
            {
              value:'others_others',
              label:'其他'
            }
          ]
        },
        {
          value:'defeated_same',
          label:'同品战败',
          children:[
            {
              value:'same_buy_used_car',
              label:'选购二手车'
            },
            {
              value:'same_avg_after_sales_service',
              label:'售后服务能力一般'
            },
            {
              value:'same_insufficient_financial_support',
              label:'金融支持不足'
            },
            {
              value:'same_small_discount',
              label:'优惠力度小'
            },
            {
              value:'same_style_resources',
              label:'车型资源'
            },
            {
              value:'same_pickup_long_waiting',
              label:'提车等待时间长'
            }
          ]
        },
        {
          value:'customer_canceled',
          label:'客户取消计划',
          children:[
            {
              value:'canceled_unable_get_plate',
              label:'无法上牌'
            },
            {
              value:'canceled_insufficient_funds',
              label:'资金不足'
            },
            {
              value:'canceled_emigrate',
              label:'移居外地'
            },
            {
              value:'canceled_not_buy_temporarily',
              label:'暂时不购车'
            },
            {
              value:'canceled_others',
              label:'其他原因'
            }
          ]
        },
        {
          value:'customer_lost',
          label:'客户失联'
        }
      ],
      dealerName:[],
      jingCarModel:[],
      dealTime:[
        {
          value:'seven',
          label:'预计7天内成交'
        },
        {
          value:'fifteen',
          label:'预计15天内成交'
        },
        {
          value:'thirty',
          label:'预计30天内成交'
        },
        {
          value:'month',
          label:'预计30天以上成交'
        }
      ],
      invalidRules: {
        validStatus: [
          { required: true, message: '请切换清洗状态是否有效', trigger: 'change' }
        ],
        invalidReason: [
          { required: true, message: '请选择无效原因', trigger: 'change' }
        ]
      },
      effectiveRules:{
        customerName:[{required: true, message: '客户姓名不能为空', trigger: 'blur'}],
        sex:[{required: true, message: '请选择性别', trigger: 'change'}],
        address:[{required: true, message: '请选择地址', trigger: 'change'}],
        dealerName:[{required: true, message: '请选择经销商', trigger: 'change'}],
        intentionModel:[{required: true, message: '请选择意向车型', trigger: 'change'}]
      },
    }
  },
  created () {
    this.userInfo = this.$store.getters.userInfo || {};
    this.id=sessionStorage.getItem('id')
    this.getDetailData()
    this.dataInit();
  },
  methods: {
    selectCity(){
      this.effective.province=this.effective.address[0];
      this.effective.city=this.effective.address[1];
      this.effective.area=this.effective.address[2];
    },
    dataInit(){
      getCarMakeModelStyle().then(res=>{  //车型
        if(res.code==0){
           this.carTypeData=res.data;
           this.jingCarModel=res.data;
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
      getDealerData().then(res=>{   //经销商
        if(res.code==0){
          console.log(res.data)
          this.dealerName=res.data
        }else{
          this.$notify({
            type:'error',
            message:res.errMsg
          })
        }
      })
    },
    selectSex(val){
      console.log(val)
      if(effective.sex==1){
        this.sexpost=1;
        this.effective.sex="male"
      }else{
        this.sexpost=0
        this.effective.sex="female"
      }
    },
    getDetailData(){
      CleaningDetail(this.id).then(res=>{
        console.log(res)
        if(res.code==0){
          this.clueUser=res.data;
          this.clueUser.unique.createTime=parseTime(res.data.unique.createTime);
        //  this.clueUser.clean.distributeTime=parseTime(res.data.clean.distributeTime)
          let qingxi=res.data.clean.cleanStatus;
          let sex=res.data.clean.sex;
         // let clue=res.data.clean.cleanResult;
          switch(qingxi){
            case '待清洗':
              this.clueUser.clean.cleanStatus=1
            break;
            case '已清洗':
              this.clueUser.clean.cleanStatus=2
             break;
          }
          switch(sex){
            case '男':
              this.sex=1
            break;
            case '女':
              this.sex=2
             break;
          }
        }
      })
    },
    submitData(){ 

      let user={
        id:this.clueUser.clean.id,
        userId:this.userInfo.userId,
        cleanResult:this.cleanResult
      }
     
      let disappear=this.invalidForm.invalidReason;
      if(disappear==undefined){
        disappear=''
      }else{
        disappear=this.invalidForm.invalidReason[0]
        if(this.invalidForm.invalidReason[1]==undefined){
          disappear=this.invalidForm.invalidReason[0]
        }
      }

      let invalidData={
        invalidMajorReason:this.invalidForm.invalidReason==undefined?'':this.invalidForm.invalidReason[0],
        invalidMinorReason:disappear,
        remarks:this.invalidForm.remarks,
      }
     
      let effective={
        customerName:this.effective.customerName,
        sex:this.effective.sex==1?'male':'female',
        province:this.effective.province,
        city:this.effective.city,
        area:this.effective.area,
        boughtCar:this.effective.boughtCar,
        intentCarBrand:this.effective.intentionModel[0],
        intentCarModel:this.effective.intentionModel[1],
        intentCarStyle:this.effective.intentionModel[2],
        dealerId:this.effective.dealerName,
        dealerName:this.effective.dealerName,
        estTranDay:this.effective.estTranDay,
        compCarBrand:this.effective.jingCarModel[0], 
        compCarModel:this.effective.jingCarModel[1],
        compCarStyle:this.effective.jingCarModel[2]
      }
      console.log(effective);
      cleaning(user,invalidData,effective).then(res=>{
         //console.log(res)
         if(res.code==0){
           this.$router.push({name:'clueCleaning'});
           this.$notify({
             type:'success',
             message:'提交成功'
           })
         }else{
           this.$notify({
             type:'error',
             message:res.errMsg
           })
         }
      })
    },
    back(){
      this.$router.go(-1);
    },
    submit() {
      if(this.cleanResult==true){
        this.$refs.effective.validate((valid) => {
          if (valid) {
            this.submitData()
          } else {
            return false;
          }
        });
      }
      else{
        this.$refs.invalidForm.validate((valid) => {
          if (valid) {
            this.submitData()
          } else {
            return false;
          }
        });
      }
    }
  }
}
</script>

<style lang="css" scoped> 
  /deep/ .el-form-item{
    margin-bottom:0
  }
  /deep/ .effective .el-form-item{
    margin-bottom:20px
  }
  /deep/ .unique .el-col-9 .el-form-item__label{
    width:100px;
    text-align: left
  }
  /deep/ .invalid-over .el-form-item__label{
    width: 100px;
    text-align: left
  }
  /deep/ .effective-over .el-form-item__label{
    width:100px;
    /* text-align: right; */
  }
  /deep/ .effective-over .el-col-20 .el-form-item__label{
    width:80px;
    text-align: left;
  }
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-header .title{
    font-weight: 600;
  }
  .status{
    padding: 2px 5px;
    border-radius: 3px;
    color:#fff;
    font-size: 12px;
    margin-left: 10px;
  }
  .green{
    background: #00C456
  }
  .gray{
    background: #FFBE00;
  }
  .subtitle{
    font-size: 15px;
  }
  .clean-cancel{
    background: #E4E6ED;
    border: 0
  }
  .submit-btn{
    background: #43425D;
    border: 0;
  }
  /* 唯一线索详情 */
  .user-title{
    height: 100px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    background: #F5F6FA;
  }
  .header-img{
    margin:0 20px
  }
  .header-img image{
    width: 76px;
    height: 76px;
  }
  .title-right{
    color: #43425D;
    padding: 0;
  }
  .title-right li{
    margin-top: 10px
  }
  .title-right .user-name{
    font-size: 20px;
    margin-right: 20px;
  }
  .add-icon{
    padding-left: 70px;
    background: url('../../../assets/images/clueManage/line.png') no-repeat left center;
    
  }
  .sex-icon,.dizhi-icon,.remark-icon{
    padding-left: 30px
  }
  .sex-icon{
    background: url('../../../assets/images/clueManage/sex.png') no-repeat left center;
  }
  .dizhi-icon{
    background: url('../../../assets/images/clueManage/dizhi.png') no-repeat left center;
  }
  .remark-icon{
    background: url('../../../assets/images/clueManage/remark.png') no-repeat left 10px;
  }

  /* 清洗结果操作 */
  .hr{
    border-top: 1px solid #E4E6ED;
    margin: 20px 0;
  }
  /deep/ .invalid .el-form-item__label{
    width:90px;
    text-align: left;
  }
  /deep/ .effective .el-form-item__label{
    width:100px;
    text-align: left;
  }
  /deep/ .el-textarea__inner{
    margin-top: 10px
  }

</style>