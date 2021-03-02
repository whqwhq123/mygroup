<template>
  <div class="add-clue">
     <div class="add-title">
       <span>新建原始线索</span>
     </div>
     <el-row style="margin-top: 20px">
      <el-form ref="userData" :model="userData" :rules="rules">
        <el-col :span="2" style="height:10px"></el-col>
       <el-col :span="10" style="border: 1px solid #E4E6ED;padding:0 0 15px;">
         <div class="add-user">
            <div class="user-title">
              <span class="header-img">
                <img v-if="userData.sex==1" src="../../../assets/images/clueManage/man.png" alt="男头">
                <img v-else src="../../../assets/images/clueManage/woman.png" alt="女头">
              </span>
              <div class="title-right">             
                  <el-form-item prop="customerName" style="margin-right: 20px">
                    <el-input v-model="userData.customerName" placeholder="请输入客户姓名" class="required-icon"></el-input>
                  </el-form-item>
                  <el-form-item prop="mobile">
                    <el-input v-model="userData.mobile" maxlength="11" placeholder="请输入客户手机号" :class="{'required-icon':requiredIcon}"></el-input>
                  </el-form-item>
                  <div class="user-tel" >
                    <el-form-item prop="telCode" style="width:80px;">
                      <el-input v-model="userData.telCode" maxlength="4" placeholder="010" :class="{'required-icon':requiredIcon}"></el-input>
                    </el-form-item> 
                    <div style="color: #43425D;margin: 0 5px">-</div>
                    <el-form-item prop="tel" style="width:120px">
                      <el-input v-model="userData.tel" maxlength="8" placeholder="00000000" :class="{'required-icon':requiredIcon}"></el-input>
                    </el-form-item>
                  </div>              
              </div>
            </div>
            <p style="font-weight: 600;margin-left:15px;">客户信息</p>
            <div style="padding: 0 15px 15px" class="user-info">
                <el-form-item label="性别：" prop="sex" class="sex-icon" required>
                  <el-radio-group v-model="userData.sex" @change="selectSex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="地址：" prop="address" class="dizhi-icon">
                   <el-cascader placeholder="请选择省市区" clearable :options="area" ref="area" v-model="userData.address" :props="{value:'label'}" @change="selectCity"></el-cascader>
                </el-form-item>
                <el-form-item label="备注：" class="remark-icon">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入备注"
                    v-model="userData.remarks">
                  </el-input>
                </el-form-item>            
            </div>
         </div>
       </el-col>
       <el-col :span="10" style="margin-left:20px;">
         <el-form-item label="原始线索ID：" class="add-icon">
           {{userData.originalId}}
         </el-form-item>
         <!-- <el-form-item label="客户属性:" class="add-icon">
            <el-select v-model="userData.custAttr" placeholder="请选择活动">
              <el-option
                v-for="item in custAttrData"
                :key="item.name"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
         </el-form-item> -->
         <el-form-item label="意向车型:" prop="carType" class="add-icon">
             <el-cascader v-model="userData.carType" clearable ref="carType" placeholder="请选择意向车型" :options="intentCarStyleJia" :props="carTypeLabel"></el-cascader>
         </el-form-item>
         <el-form-item label="来源渠道:" prop="fromChannel" class="add-icon" :data="userData.Channels">
           <el-cascader v-model="userData.fromChannel" clearable placeholder="请选择来源渠道"  @change="selectChannel" ref="channelObj" :options="userData.Channels" :props="setKesLabel"></el-cascader>
         </el-form-item>
         
         <el-form-item label="活动名称:" class="add-icon">
            <el-select v-model="userData.activityId" placeholder="请选择活动">
             <el-option
              v-for="item in marketActity"
              :key="item.name"
              :label="item.activityName"
              :value="item.activityId">
            </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="经销商名称:" class="add-icon">
            <el-select v-model="userData.dealers" placeholder="请选择经销商名称" @change="selectDealer">
              <el-option
                v-for="item in dealerName"
                :key="item.deptName"
                :label="item.deptName"
                :value="item.deptId">
              </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="销售顾问:" class="add-icon">
            <el-select v-model="userData.salesPer" placeholder="请选择销售顾问" @visible-change="selectSaleman">
              <el-option
                v-for="item in salesman"
                :key="item.userDeptId"
                :label="item.userName"
                :value="item.userId">
              </el-option>
            </el-select>
         </el-form-item>
        
       </el-col>
       <el-col :span="2" style="height:20px;">

      </el-col>
      </el-form>
     
     </el-row>
     <div class="submit-btn">
        <el-button type="primary" @click="submit(userData)">新建原始线索</el-button>
        <!-- <el-button class="reset-btn" @click="reset_search(userData)">重置</el-button> -->
     </div>
     
  </div>
</template>

<script>
import {addClue,clueList,getId,getCarMakeModelStyle,getSalesData,getDealerData,getFirst,getSecond,getActivityData} from '../../../service/api/index'
import area from '../../../assets/javaScript/areaList.js'
import qs from 'qs'
export default {
 
  data(){
    var checkPhone = (rule,value,callback) => {
       let telphone=this.userData.tel;
       if(!telphone){
          if(!value) {
              return callback(new Error('手机号不能为空'));
          }else{
            const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
            if(reg.test(value)) {
                callback();
            }else{
                return callback(new Error('请输入正确的手机号'));
            }
          }
       }else{
         callback()
       }
    };
    var telPhone= (rule,value,callback) => {
        let mobile=this.userData.mobile;
        if(!mobile){
          if(!value) {
            return callback(new Error('固话不能为空'));
          }else{
            // const reg = /^0[1|2|3|4|5|6|7|8|9][1|2|3|4|5|6|7|8|9][1|2|3|4|5|6|7|8|9]-\d{8}$/
            const reg=/\d{7,8}/
            if(reg.test(value)) {
                callback();
            }else{
                return callback(new Error('请输入正确的固话号码'));
            }
          }
       }else{
         callback()
       }
    };
    var quhao= (rule,value,callback) => {
        let mobile=this.userData.mobile;
        if(!mobile){
          if(!value) {
            return callback(new Error('区号不能为空'));
          }else{
            return callback()
          }
       }else{
         callback()
       }
    };
    var userId=this.$store.getters.userInfo.userId;
    var that=this;
   
    return{
      roleType:'',
      userData:{
        customerName:'',
        mobile:'',
        telCode:'',
        tel:'',
        sex:1,
        address:'',
        remarks:'',
        province:'',
        city:'',
        area:'',
        originalId:'',
        activityId:'',
      //  custAttr:'',
        carType:'',   //意向车型
        fromChannel:'',  //来源渠道
        dealers:'',    //经销商
        Channels:[],  //渠道
        salesPer:'',    //销售顾问
        oneChannelName:'',
        twoChannelName:'',
      },
      marketActity:[
      ],
      custAttrData:[
        {
          value:'submersible',
          name:'潜客'
        },
        {
          value:'guarantor',
          name:'保客'
        },
        
      ],
      requiredIcon:true,
      salesman:[],
      dealerName:[],
      userInfo:{},
      postUserData:{
        telephone:'',
        sex:'male',
        province:'',
        city:'',
        area:'',
        intentCarStyle:'',
        dealerName:'',
        salesman:'',
        firstChannelId:'',
        firstChannelName:'',
        secondChannelId:'',
        secondChannelName:''
      },
      firstId:'',
      setKesLabel:
      {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level ,value} = node;
          let postData={
            pageNum: 1,
            pageSize: 99999,
            userId: userId,
            enabled:true
          }
          setTimeout(() => {
            if(level==0){
              getFirst(postData).then(res=>{  
                console.log(res)
                if(res.code==0){
                  let channels=res.data.content;
                  const nodes=channels.map((item, index) => ({
                      value: item.channelId,
                      label: item.name,
                      leaf:node.level >= 1
                  }));
                  resolve(nodes);
                }else{
                  that.$notify({
                    message: res.errMsg,
                    type: "error",
                  });
                }
              })
            }
            if(level==1){
              getSecond({
                pageNum: 1,
                pageSize: 99999,
                userId: userId,
                enabled:true,
                parentId:value
              }).then(res=>{
                if(res.code==0){
                  let channels=res.data.content;
                  const nodes=channels.map((item, index) => ({
                      value: item.channelId,
                      label: item.name,
                      leaf:node.level >= 1
                  }));
                  resolve(nodes);
                }else{
                  that.$notify({
                    type: "error",
                    message: res.errMsg
                    
                  });
                }
              })
            }
          }, 300);
        }
      },
      carTypeLabel:{
        value:'name',
        label:'name',
        children:'list'
      },
      intentCarStyleJia:[],// 车型
      telephone:'',
      channelText:'',
      area:area.options,
      rules: {
        customerName: [
          { required: true, message: '客户姓名不能为空', trigger: 'blur' }
        ],
        mobile:[
          {required: true,validator:checkPhone, trigger: 'blur'}
        ],
        telCode:[{required: true,validator:quhao, trigger: 'blur'}],
        tel:[{required: true,  validator:telPhone, trigger: 'blur'}],
        address:[{required: true, message: '请选择省市区', trigger: 'change'}],
        carType:[{required: true, message: '请选择车型', trigger: 'change'}],
        fromChannel:[{required: true, message: '请选择来源渠道', trigger: 'change'}]
      }
    }
  },
  created(){
    this.userInfo = this.$store.getters.userInfo || {};
    this.roleType=this.userInfo.ucRoleUsers[0].roleType;
    this.getOriginalId();
    this.getCarMake();
    this.getDealer();
    this.getActivityList();
  },
  methods: {
    selectSex(val){
      if(this.userData.sex==1){
        this.postUserData.sex="male"
      }else{
        this.postUserData.sex="female"
      }
    },
    getActivityList(){
        getActivityData().then(res=>{
          console.log(res)
          if(res.code==0){
            this.marketActity=res.data
          }
        })
    },
    reset_search(userData) { 
    //  console.log(this.$refs)
      this.$refs.userData.resetFields();
      this.userData.carType=[];
      this.userData.fromChannel=[];
      this.userData.address=[];
      this.userData.dealers=[];
      this.userData.salesPer=[]
      this.$refs.area.$refs.panel.activePath = []
      this.$refs.carType.$refs.panel.activePath = []
      this.$refs.channelObj.$refs.panel.activePath = []   
    },
    getCarMake(){
      getCarMakeModelStyle().then(res=>{
        if(res.code==0){
          this.intentCarStyleJia=res.data
        }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
        }
      })
    },
    getDealer(){
      getDealerData().then(res=>{
        if(res.code==0){
          this.dealerName=res.data
        }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
        }
      })
    },
    selectDealer(){
      this.salesman=[];
      this.userData.salesPer="";
    },
    selectSaleman(value){
    // debugger
      if(this.userData.dealers!='' && value==true){
       // value=false;
        let id=this.userData.dealers;
        getSalesData(id).then(res=>{
      //    console.log(res)
          if(res.code==0){
            if(res.data.length>0){
              this.salesman=res.data;
            }else{
              this.$notify({
                type:'error',
                message:'该经销商下面暂时还没有销售顾问！'
              })
            }
          }else{
            this.$notify({
              type:'error',
              message:code.errMsg
            })
          }
        })
       
      }else if(this.userData.dealers=='' && value==true){
      //  debugger
        this.$notify({
          type:'error',
          message:'请先选择经销商'
        })
        return false;
      }
    },
    selectCity(){
      this.postUserData.province=this.userData.address[0];
      this.postUserData.city=this.userData.address[1];
      this.postUserData.area=this.userData.address[2];
    },
    selectChannel(value){
     // debugger
        let channelArr=this.$refs["channelObj"].getCheckedNodes()[0].pathLabels;
        console.log(channelArr)
        this.userData.oneChannelName=channelArr[0];
        this.userData.twoChannelName=channelArr[1];
       
    },
   
    getOriginalId(){  //线索id
      getId(this.userInfo.userId).then(res=>{
        this.userData.originalId=res.data;
      })
    },
    addClueData(){ 
       let telPhone='';
      if(this.userData.telCode!='' && this.userData.tel !=''){
        telPhone=this.userData.telCode+'-'+this.userData.tel
      }
      this.postUserData={
          deptId:this.userInfo.userDeptId,
          userId:this.userInfo.userId,
          sex:this.postUserData.sex,
        //  custAttr:this.userData.custAttr,
          customerName:this.userData.customerName,
          mobile:this.userData.mobile,
          remarks:this.userData.remarks,
          telephone:telPhone,
          activityId:this.userData.activityId,
          originalId:this.userData.originalId,
          intentCarBrand:this.userData.carType[0],
          intentCarModel:this.userData.carType[1],
          intentCarStyle:this.userData.carType[2],
          firstChannelId:this.userData.fromChannel[0],
          secondChannelId:this.userData.fromChannel[1],
          firstChannelName:this.userData.oneChannelName,
          secondChannelName:this.userData.twoChannelName,
          province:this.userData.address[0],
          city:this.userData.address[1],
          area:this.userData.address[2],
          dealerId:this.userData.dealers==undefined?'':this.userData.dealers.toString(),
          salesmanId:this.userData.salesPer==undefined?'':this.userData.salesPer.toString(),
          client:'web',
          roleType:this.roleType
      }
      let that=this;
      addClue(qs.stringify(this.postUserData)).then(res=>{
       // console.log(res);
        if(res.code==0){
          this.$notify({
            duration:1000,
            type:'success',
            message:'新建线索成功'
          });
          setTimeout(function(){
             that.$router.push({name:'originalClue'})
          },2000)
        }else{
          this.$notify({
            message: res.errMsg,
            type: "error",
          });
        }
      })
    },
    submit(userData) {
      if(this.userData.mobile !='' || this.userData.tel!=''){
          this.requiredIcon=false;
      }
      this.$refs.userData.validate((valid) => {
        if (valid) {
          this.addClueData()
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  /deep/ .el-form-item{
    margin-bottom: 0
  }
  /deep/ .el-textarea{
    width:75%;
    margin-left: -10px
  }
   /deep/ .el-form-item__label{
    width:100px;
    text-align: left
  }
  /deep/ .user-info .el-form-item__label{
    width:65px;
  }
  /deep/ .remark-icon .el-form-item__label{
    margin-left: 10px;
  }

  .add-clue{
    padding: 15px;
  }
  .add-title{
    height: 40px;
    border-bottom:1px solid #E9E9F0;
    color: #43425D;
    font-weight: 600;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }
  .user-title{
    background: #F5F6FA;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    padding: 15px;
  
  }
  .user-title .title-right{
    height: 130px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }
  .header-img{
    margin-right: 20px
  }
  .header-img image{
    width: 76px;
    height: 76px;
  }
  .user-tel{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
  }
  .add-icon{
    padding-left: 70px;
    background: url('../../../assets/images/clueManage/line.png') no-repeat left center;
    margin-bottom: 24px;
  }
  .sex-icon,.dizhi-icon,.remark-icon{
    padding-left: 30px
  }
  .sex-icon{
    background: url('../../../assets/images/clueManage/sex.png') no-repeat left center;
  }
  .dizhi-icon{
    background: url('../../../assets/images/clueManage/dizhi.png') no-repeat left center;
    margin: 15px 0;
  }
  .remark-icon{
    background: url('../../../assets/images/clueManage/remark.png') no-repeat left 10px;
    margin-top: 25px;
  }
  .submit-btn{
    width:100%;
    margin-top: 30px;
    text-align: center
  }
  .reset-btn{
    background: #E7E9F0;
    border: 0
  }
  .required-icon::before{
    content:'*';
    color:#F56C6C;
    position: absolute;
    left: 4px;
    top: -3px
  }
</style>