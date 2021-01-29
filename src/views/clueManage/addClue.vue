<template>
  <div class="add-clue">
     <div class="add-title">
       <span>新建原始线索</span>
       <router-link to="/clueManage/originalClue"><el-button size="small">返回列表</el-button></router-link>
     </div>
     <el-row style="margin-top: 20px">
      <el-form ref="userData" :model="userData" :rules="rules">
        <el-col :span="2" style="height:10px"></el-col>
       <el-col :span="10" style="border: 1px solid #E4E6ED;padding:0 0 15px;">
         <div class="add-user">
            <div class="user-title">
              <span class="header-img">
                <img v-if="userData.sex==1" src="../../assets/images/clueManage/man.png" alt="男头">
                <img v-else src="../../assets/images/clueManage/woman.png" alt="女头">
              </span>
              <div class="title-right">             
                  <el-form-item prop="customerName" style="margin-right: 20px">
                    <el-input v-model="userData.customerName" placeholder="请输入客户姓名" class="required-icon"></el-input>
                  </el-form-item>
                  <el-form-item prop="mobile">
                    <el-input v-model="userData.mobile" maxlength="11" placeholder="请输入客户手机号" class="required-icon"></el-input>
                  </el-form-item>
                  <div class="user-tel" >
                    <el-form-item prop="telCode" style="width:80px;">
                      <el-input v-model="userData.telCode" maxlength="4" placeholder="010" class="required-icon"></el-input>
                    </el-form-item> 
                    <div style="color: #43425D;margin: 0 5px">-</div>
                    <el-form-item prop="tel" style="width:120px">
                      <el-input v-model="userData.tel" maxlength="8" placeholder="00000000" class="required-icon"></el-input>
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
                   <el-cascader placeholder="请选择省市区" :options="area" v-model="userData.address" :props="{value:'label'}" @change="selectCity"></el-cascader>
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
       <el-col :span="10" style="margin-left:20px;margin-top: 20px">
         <el-form-item label="原始线索ID：" class="add-icon">
           {{userData.originalId}}
         </el-form-item>
         <el-form-item label="意向车型:" prop="carType" class="add-icon">
            <!-- <el-select v-model="userData.carType" placeholder="请选择意向车型">
              <el-option
                v-for="item in intentCarStyle"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select> -->
             <el-cascader v-model="userData.carType" placeholder="请选择意向车型" :options="intentCarStyleJia" :props="{value:'label'}"></el-cascader>
         </el-form-item>
         <el-form-item label="来源渠道:" prop="fromChannel" class="add-icon" :data="userData.Channels">
          <el-cascader v-model="userData.fromChannel" placeholder="请选择来源渠道" @change="selectChannel" ref="channelObj" :options="userData.Channels" :props="setKesLabel"></el-cascader>
         </el-form-item>
         <el-form-item label="经销商名称:" class="add-icon">
            <el-select v-model="userData.dealers" placeholder="请选择经销商名称">
              <el-option
                v-for="item in dealerName"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
         </el-form-item>
         <el-form-item label="销售顾问:" class="add-icon">
            <el-select v-model="userData.salesPer" placeholder="请选择销售顾问">
              <el-option
                v-for="item in salesman"
                :key="item.name"
                :label="item.name"
                :value="item.name">
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
        <el-button class="reset-btn" @click="reset_search(userData)">重置</el-button>
     </div>
     
  </div>
</template>

<script>
import {addClue,clueList,getId} from '../../service/api/index'
import area from '../../assets/javaScript/areaList.js'
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
       }
    };
    var quhao= (rule,value,callback) => {
        let mobile=this.userData.mobile;
        if(!mobile){
          if(!value) {
            return callback(new Error('区号不能为空'));
          }
       }
    };
    return{
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
        carType:'',   //意向车型
        fromChannel:'',  //来源渠道
        dealerName:'',    //经销商
        Channels:[],  //渠道
        salesman:'',    //销售顾问
        oneChannelName:'',
        twoChannelName:''
      },
      requiredIcon:false,
      salesman:[
        {name:'小李'},
        {name:'小张'},
        {name:'小王'}
      ],
      dealerName:[
        {name:'经销商1'},
        {name:'经销商2'},
        {name:'经销商3'},
      ],
      postUserData:{
        deptId:1,
        userId:1,
        telephone:'',
        sex:'男',
        province:'',
        city:'',
        area:'',
        intentCarStyle:'',
        dealerName:'经销商名儿',
        salesman:'菜菜',
        firstChannelId:'',
        firstChannelName:'',
        secondChannelId:'',
        secondChannelName:''
      },
      setKesLabel:{
        value:'channelId',
        label:'channelName',
        children:'children'
       },
      intentCarStyleJia:[{
        value:'cheid',
        label:'品牌',
        children:[
          {
            value:'chepai',
            label:'车系',
            children:[
              {
                value:'chexing',
                label:'车型'
              }
            ]
          },
          {
            value:'chepai2',
            label:'车系2'
          }
        ]
      }],// 车型
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
    this.getOriginalId()
    this.getType()
  },
  methods: {
    selectSex(val){
      if(this.userData.sex==1){
        this.postUserData.sex="男"
      }else{
        this.postUserData.sex="女"
      }
    },
    reset_search(userData) { 
      this.$refs.userData.resetFields();
    },
    getType(){
      clueList(this.postUserData.deptId).then(res=>{
        this.intentCarStyle=res.data.intentCarStyles;
        this.userData.Channels=res.data.channels;
      })
    },
    selectCity(){
      this.postUserData.province=this.userData.address[0];
      this.postUserData.city=this.userData.address[1];
      this.postUserData.area=this.userData.address[2];
    },
    selectChannel(){
        let channelArr=this.$refs["channelObj"].getCheckedNodes()[0].pathLabels;
        this.userData.oneChannelName=channelArr[0];
        this.userData.twoChannelName=channelArr[1];
    },
    getOriginalId(){  //线索id
      getId(this.postUserData.deptId).then(res=>{
        this.userData.originalId=res.data;
      })
    },
    addClueData(){ 
    
      this.postUserData={
          deptId:this.postUserData.deptId,
          userId:this.postUserData.userId,
          sex:this.postUserData.sex,
          customerName:this.userData.customerName,
          mobile:this.userData.mobile,
          remarks:this.userData.remarks,
          telephone:this.userData.telCode+'-'+this.userData.tel,
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
          dealerName:this.userData.dealers[0],
          salesman:this.userData.salesPer[0]
      }
      console.log(this.postUserData)
    
      addClue(qs.stringify(this.postUserData)).then(res=>{
        console.log(res);
        if(res.code==0){
          this.$message('新建线索成功');
          //this.$router.push({name:'originalClue'})
        }else{
          this.$message(res.errMsg)
        }
        
      })
    },
    submit(userData) {
     
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
    background: url('../../assets/images/clueManage/line.png') no-repeat left center;
    margin-bottom: 24px;
  }
  .sex-icon,.dizhi-icon,.remark-icon{
    padding-left: 30px
  }
  .sex-icon{
    background: url('../../assets/images/clueManage/sex.png') no-repeat left center;
  }
  .dizhi-icon{
    background: url('../../assets/images/clueManage/dizhi.png') no-repeat left center;
    margin: 15px 0;
  }
  .remark-icon{
    background: url('../../assets/images/clueManage/remark.png') no-repeat left 10px;
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