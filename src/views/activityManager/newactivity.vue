<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">{{activityId?'修改营销活动':'新建营销活动'}}</span>
    </el-header>
    <!--  -->
    <el-row class="basictit">基本信息</el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-left: 100px;padding-right: 100px;">
    <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="ruleForm.activityName" placeholder="请输入活动名称" class="inputwidth"></el-input>
    </el-form-item>

    <el-form-item label="活动时间" prop="activityDate" required>
        <el-date-picker size="small" v-model="ruleForm.activityDate" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="详情头图">
      <upload-img-com  @setImgs='setImgsFun' @setImgslength="setImgsFun" :filelist='imageUrl.imageUrla' imgid=1></upload-img-com>
    </el-form-item>
    <el-form-item label="运营位图片" prop="uploadimgb">
         <upload-img-com  @setImgs='setImgsFun' @setImgslength="setImgsFun" :filelist='imageUrl.imageUrlb' imgid=2></upload-img-com> 
    </el-form-item>
    <el-form-item label="主推车系" prop="pushCarseries">
      <el-autocomplete
        v-model="ruleForm.pushCarseries.value"
        :fetch-suggestions="querySearchAsync"
        @select="handleSelect"
        placeholder="请选择主推车系"
      ></el-autocomplete>
    </el-form-item>
    <el-form-item label="执行渠道" prop="impChannel">
      <el-cascader placeholder="请选择来源渠道" clearable ref="fromChannel" v-model="ruleForm.impChannel"  :options="channelList"  :props="setKesLabel"></el-cascader>
    </el-form-item>
    <el-form-item label="活动区域" prop="address" class="dizhi-icon">
        <el-cascader placeholder="请选择省市区" clearable style="width: 280px;"  :options="area" ref="area" v-model="ruleForm.address" :props="{value:'label'}" @change="selectCity"></el-cascader>
        <el-input v-model="ruleForm.detAddress" placeholder="请输入详细地址" style="margin-left:35px" class="inputwidth"></el-input>
    </el-form-item>

    <el-form-item label="活动内容" >
         <quill-editor 
            v-model="ruleForm.desc"
            ref="myQuillEditor" 
            style="width: 595px;"
            :options="editorOption" 
        >
        </quill-editor>
    </el-form-item>
    <el-form-item label="活动要求" class="remark-icon">
        <el-input
        type="textarea"
        :rows="2"
        style="width: 280px"
        placeholder="请输入活动要求"
        v-model="ruleForm.remarks">
        </el-input>
    </el-form-item> 
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="属性信息" name="first">
            <el-row style="display: flex;">
            <el-form-item  prop="broadHeading" label="活动大类">
                <el-select v-model="ruleForm.broadHeading"  @change="activityStatusFun" placeholder="请选择活动大类">
                <el-option
                    v-for="item in activityStatus"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"
                   
                >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="intentStyle" label="活动类型">
                <el-select v-model="ruleForm.intentStyle" placeholder="请选择活动类型">
                <el-option
                    v-for="item in activitytype"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="activitySource" label="活动来源">
                <el-select v-model="ruleForm.activitySource" placeholder="请选择活动来源">

                <el-option
                    v-for="item in activitySourceList"
                    :key="item.id"
                    :label="item.label"
                    :value="item.label"    
                  >
                   
                </el-option>
                </el-select>
            </el-form-item>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="活动目标" name="second">
            <el-row  style="display: flex;">
                <el-form-item label="邀约量" prop="invitationNum">
                    <el-input v-model="ruleForm.invitationNum" placeholder="请输入邀约量" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="集客量" prop="gathercustomerNum">
                    <el-input v-model="ruleForm.gathercustomerNum" placeholder="请输入集客量" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="新增客户" prop="addcustomer">
                    <el-input v-model="ruleForm.addcustomer" placeholder="请输入新增客户" class="inputwidth"></el-input>
                </el-form-item>
            </el-row>
            <el-row  style="display: flex;">
                <el-form-item label="新增线索量" prop="addclueNum">
                    <el-input v-model="ruleForm.addclueNum" placeholder="请输入新增线索量" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="加热线索" prop="heatingclue">
                    <el-input v-model="ruleForm.heatingclue" placeholder="请输入加热线索" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="订交量" prop="orderVolume">
                    <el-input v-model="ruleForm.orderVolume" placeholder="请输入订交量" class="inputwidth"></el-input>
                </el-form-item>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="报名参加" name="third">
            <el-row  style="display: flex;">
                <el-form-item label="活动目标人数" prop="targetNumber">
                    <el-input v-model="ruleForm.targetNumber" placeholder="请输入活动目标人数" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="报名截止时间" prop="signupOffDate">
                    <el-date-picker
                    v-model="ruleForm.signupOffDate"
                    type="date"
                    format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>

                </el-form-item>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="分享设置" name="fourth">
                <el-form-item label="分享标题" prop="shareTitle">
                    <el-input v-model="ruleForm.shareTitle" placeholder="请输入分享标题" class="inputwidth"></el-input>
                </el-form-item>
                <el-form-item label="分享描述" prop="shareDesc">
                    <el-input v-model="ruleForm.shareDesc" placeholder="请输入分享描述" class="inputwidth"></el-input>
                </el-form-item>

                <el-form-item label="运营位图片" prop="uploadimgb">
                  <upload-img-com  @setImgs='setImgsFun' @setImgslength="setImgsFun" :filelist='imageUrl.imageUrlc' imgid=3></upload-img-com> 
                </el-form-item>

        </el-tab-pane>
    </el-tabs>
    <el-row>
    <el-form-item style="display: flex;justify-content: center;">
        <el-button @click="resetForm('ruleForm')"  class="cancel_but">取消</el-button>
        <el-button @click="submitForm('ruleForm',1)"  class="keep_but">保存</el-button>
        <el-button @click="submitForm('ruleForm',2)" class="release_but">发布</el-button>
        
    </el-form-item>
    </el-row>
    </el-form>
  </el-main>
</template>

<script>
//引入vue-quill-editor 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

import {clueList,createActivity,getActivityInfo,getSelectCarModel,updateActivity} from "api/index.js";
import { parseTime,get_role_function } from '@/utils/index';
import area from '../../assets/javaScript/areaList.js';
import uploadImgCom from "./components/uploadImgCom";

import qs from 'qs'
 export default {
   data(){
     return{
      get_role_function,
      area:area.options,
       activeName: 'first',
       editorOption: {
            placeholder: "请在这里输入",
            modules:{
            toolbar:[
                ['bold'],    //加粗，斜体，下划线，删除线
                [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                [{ 'font': [] }],     //字体
                [{ 'align': [] }],    //对齐方式
                ['image','video']    //上传图片、上传视频
            ]
        }
      },
      imageUrl:{
        imageUrla:[],
        imageUrlb:[],
        imageUrlc:[]
      },
      //选择活动大类
      activityStatus:[
        {
        id:1,
        type:'media',
        label:'媒体投放',
        children:[
          {
              id:10,
              type:'media10',
              label:'品牌投放',
          },
          {
              id:11,
              type:'media11',
              label:'活动投放',
          },
        ],
        },
        {
        id:2,
        type:'marketing',
        label:'营销活动',
        children:[
          {
              id:20,
              type:'marketing20',
              label:'见面礼',
          },
          {
              id:21,
              type:'marketing21',
              label:'新品上市',
          },
          {
              id:22,
              type:'marketing22',
              label:'团购会',
          },
          {
              id:23,
              type:'marketing23',
              label:'促销会',
          },
          {
              id:24,
              type:'marketing24',
              label:'展销会',
          },
          {
              id:25,
              type:'marketing25',
              label:'开业店庆',
          },
          {
              id:26,
              type:'marketing26',
              label:'试驾体验',
          },
        ]
        },
        {
        id:3,
        type:'fans',
        label:'粉丝活动',
        children:[
          {
              id:30,
              type:'marketing30',
              label:'客户关怀',
          },
          {
              id:31,
              type:'marketing31',
              label:'公益活动',
          },
          {
              id:32,
              type:'marketing32',
              label:'粉丝沙龙',
          },
          {
              id:33,
              type:'marketing33',
              label:'自由行',
          },
          {
              id:34,
              type:'marketing34',
              label:'挑战赛',
          },
          {
              id:35,
              type:'marketing35',
              label:'演艺赛事',
          },
   
        ]
        },
        {
        id:4,
        type:'shopping',
        label:'商城活动',
        children:[
          {
            id:40,
            type:'marketing40',
            label:'促销玩法', 
          }
        ]
        },
       
      ],
      //活动类型
      activitytype:[],
      //活动来源
      activitySourceList:[
          {
          id:1,
          label:'厂商联合',
          },
          {
          id:2,
          label:'自主活动',
          },
          {
          id:3,
          label:'异业合作',
          },
      ],

      //执行渠道
      channelList:[],
      uploadimg:[],
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 3,
      form: {},
      //数据的初始化
      ruleForm: {
          activityName: '',
          activityDate: [],
          uploadimga:'',
          uploadimgb:'',
          pushCarseries:{
            id:'',
            value:''
          },
          impChannel:[],
          address:[],
          detAddress:'',
          desc: '',
          remarks:'',

         broadHeading:'',
         intentStyle:'',
         activitySource:'',
        
         invitationNum:'',
         gathercustomerNum:'',
         addcustomer:'',
         addclueNum:'',
         heatingclue:'',
         orderVolume:'',

         targetNumber:'',
         signupOffDate:'',

         shareTitle:'',
         shareDesc:'',
         shareIcon:'',
     
      },
        rules: {
          activityName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
          activityDate:[{ required: true, message: '请选择活动日期', trigger: 'blur' }],
          // uploadimga: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
          // uploadimgb: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
          // impChannel: [{ required: true, message: '该项不能为空', trigger: 'blur' }],

          broadHeading:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
          intentStyle:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
          activitySource:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
        },
        setKesLabel:{
        value:'channelId',
        label:'channelName',
        children:'children',
        //multiple: true
       },
       timeout1:null,
       activityId:'',//活动ID
       ruleFormEcho:[],//回显的数据

     }
   },
   created () {
      this.activityId=sessionStorage.getItem('activityId');
      // this.activityId='ACT000012'
      this.getActivityInfo()
      this.userInfo = this.$store.getters.userInfo || {};
   },
  components: {
    quillEditor,uploadImgCom
  },
   mounted () {
     sessionStorage.setItem('activityId','');
     this.searchCriteria();//渠道树结构
   },
   methods:{
     selectCity(){
       console.log(this.ruleForm.address)
     },
     //图片数据处理
     setImgsFun(data){
      if(data.imttype=='add'){
        if (data.imgurl=='' && data.imgurl==null) return
        switch (data.imgid) {
          case '1':
            this.imageUrl.imageUrla.push(data.imgurl)
            break;
          case '2':
            this.imageUrl.imageUrlb.push(data.imgurl)
            break;
          case '3':
            this.imageUrl.imageUrlc.push(data.imgurl)
            break;
        }
      }else if(data.imttype=='del'){
        switch (data.imgid) {
          case '1':
            this.imageUrl.imageUrla[data.imglength]=''
            break;
          case '2':
            this.imageUrl.imageUrlb[data.imglength]=''
            break;
          case '3':
            this.imageUrl.imageUrlc[data.imglength]=''
            break;
        }

      }
      console.log(this.imageUrl,"setImgsFun图片数据处理");

     },

    //提交表单   创建活动按钮,createActivity,
    submitForm(formName,type){
      // this.imageUrl.imageUrla
         let data={
          activityName:this.ruleForm.activityName || '',
          startTime:this.ruleForm.activityDate[0] || '',
          endTime:this.ruleForm.activityDate[1] || '',
          detailImg1:this.imageUrl.imageUrla[0] || '',
          detailImg2:this.imageUrl.imageUrla[1] || '',
          detailImg3:this.imageUrl.imageUrla[2] || '',
          operationImg1:this.imageUrl.imageUrlb[0] || '',
          operationImg2:this.imageUrl.imageUrlb[1] || '',
          operationImg3:this.imageUrl.imageUrlb[2] || '',
          modelIds:this.ruleForm.pushCarseries.id || '',
          modelNames:this.ruleForm.pushCarseries.value || '',
          firstChannelId:this.ruleForm.impChannel[0] || '',
          secondChannelId:this.ruleForm.impChannel[1] || '',
          activityProvince:this.ruleForm.address[0] || '',
          activityCity:this.ruleForm.address[1] || '',
          activityArea:this.ruleForm.address[2] || '',
          areaDetail:this.ruleForm.detAddress || '',
          activityContent:this.ruleForm.desc || '',
          activityRequire:this.ruleForm.remarks || '',
        
          activityDivision:this.ruleForm.broadHeading || '',
          activityType:this.ruleForm.intentStyle || '',
          activityFrom:this.ruleForm.activitySource || '',
          activityInviteCount:this.ruleForm.invitationNum || '',
          activityGatherCustomerCount:this.ruleForm.gathercustomerNum || '',
          activityNewAddCustomerCount:this.ruleForm.addcustomer || '',
          activityNewAddClueCount:this.ruleForm.addclueNum || '',
          activityExistClueCount:this.ruleForm.heatingclue || '',
          activityOrderDealCount:this.ruleForm.orderVolume || '',

          targetCustomerCount:this.ruleForm.targetNumber || '',
          signUpEndTime:this.ruleForm.signupOffDate || '',

          shareTitle:this.ruleForm.shareTitle || '',
          shareDesc:this.ruleForm.shareDesc || '',
          shareImg1:this.imageUrl.imageUrlc[0] || '',
          shareImg2:this.imageUrl.imageUrlc[1] || '',
          shareImg3:this.imageUrl.imageUrlc[2] || '',
          createrId:this.userInfo.userId || '',
          owner:this.userInfo.owner || '',
          ownerDeptId:this.userInfo.ownerDeptId || '',
          activityStatus:type,
          }
          this.$refs[formName].validate(async (valid) => {
          if (valid) {
            if (this.activityId) {
              data.activityId=this.activityId
              data.updaterId=this.userInfo.userId || ''
              let res=await updateActivity(data)
              if(res.code==0){
                if (type==2) {
                  this.$message({
                  message: '修改成功',
                  type: 'success'
                });
               }else if (type==1) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
               }

               this.$router.replace('marketing')
             }
            }else{
             let res= await createActivity(data)
             if(res.code==0){
                if (type==2) {
                  this.$message({
                  message: '发布成功',
                  type: 'success'
                });
               }else if (type==1) {
                this.$message({
                  message: '保存成功',
                  type: 'success'
                });
               }

               this.$router.replace('marketing')
             }
            }
          } else {
            this.$message.error('请完整填写内容');
            return false;
          }
        });

        console.log(data,"ruleFormruleForm提交表单");

    },
    //活动大类活动类型数据处理
    activityStatusFun(data){
      // this.activitytype
      console.log(this.ruleForm.broadHeading,"data 活动大类活动类型数据处理");
      this.activityStatus.forEach(v => {
        if (v.label==this.ruleForm.broadHeading) {
        this.activitytype=v.children
        }
      });

    },
    //主推车系
    handleSelect(item) {
      this.ruleForm.pushCarseries.id=item.id
      this.ruleForm.pushCarseries.value=item.value
    },
    //ajax
    async searchCriteria(){   //渠道
      let res= await clueList(this.userInfo.userDeptId)
      this.channelList=res.data.channels  
    },
    //主推车系
    async querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout1);
      this.timeout1 = setTimeout(() => {
        getSelectCarModel({ modelName: queryString }).then((res) => {
          let results = "";
          if (res.code == 0) {
            results = res.data.map((item) => {
              return {
                value: item.modelName,
                id: item.modelId,
              };
            });
          }
          cb(results);
        });
      }, 1000 * Math.random());
    },
    //修改  获取的数据
    async getActivityInfo(){
      let res= await getActivityInfo({activityId:this.activityId })

      if (res.code==0) {
        if (res.data==null) return
        this.ruleForm.activityName=res.data.activityName
        this.ruleForm.pushCarseries.id=res.data.modelIds
        this.ruleForm.pushCarseries.value=res.data.modelNames
        this.ruleForm.activityDate=[res.data.startTime.split('T')[0],res.data.endTime.split('T')[0]]
        this.ruleForm.impChannel=[res.data.firstChannelId,res.data.secondChannelId]
        this.ruleForm.address = [res.data.activityProvince, res.data.activityCity, res.data.activityArea]
        this.ruleForm.detAddress=res.data.areaDetail
        this.ruleForm.desc=res.data.activityContent
        this.ruleForm.remarks=res.data.activityRequire

        this.ruleForm.broadHeading=res.data.activityDivision
        this.ruleForm.intentStyle=res.data.activityType
        this.ruleForm.activitySource=res.data.activityFrom
        this.ruleForm.invitationNum=res.data.activityInviteCount
        this.ruleForm.gathercustomerNum=res.data.activityGatherCustomerCount
        this.ruleForm.addcustomer=res.data.activityNewAddCustomerCount
        this.ruleForm.addclueNum=res.data.activityNewAddClueCount
        this.ruleForm.heatingclue=res.data.activityExistClueCount
        this.ruleForm.orderVolume=res.data.activityOrderDealCount

        this.ruleForm.targetNumber=res.data.targetCustomerCount
        this.ruleForm.signupOffDate=res.data.signUpEndTime

        this.ruleForm.shareTitle=res.data.shareTitle
        this.ruleForm.shareDesc=res.data.shareDesc

        //图片数据赋值
        console.log(res.data);
        this.imageUrl.imageUrla=[res.data.detailImg1,res.data.detailImg2,res.data.detailImg3].filter((s)=> {
              return s && s.trim();
         });
        this.imageUrl.imageUrlb=[res.data.operationImg1,res.data.operationImg2,res.data.operationImg3].filter((s)=> {
              return s && s.trim();
         });
        this.imageUrl.imageUrlc=[res.data.shareImg1,res.data.shareImg2,res.data.shareImg3].filter((s)=> {
              return s && s.trim();
         });
        console.log(this.imageUrl,"this.imageUrlhuixian回显的数据");

      }
    }


   }
 }
</script>

<style scoped>
  .table{
    border:1px solid #F5F6FA;
  }
  /deep/ .el-input__inner{
    height: 32px;
    line-height:32px;
  }
  /deep/ .el-table th{
    background: #F5F6FA 
  }
  /deep/ .el-table::before{
    height: 0;
  }
  /deep/ .el-dialog__footer{
    padding: 0
  }
  /deep/ .visible .el-form-item{
    display: flex;
    justify-content: center;
  }
  /deep/ .el-table::before{
    height: 0;
  }
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active{
    background: #43425D;
  }
  /deep/ .el-pagination.is-background .btn-next,/deep/ .el-pagination.is-background .btn-prev,/deep/ .el-pagination.is-background .el-pager li{
    background: none;
    border: 1px solid #E7E9F0;
    border-radius: 3px;
  }
  /deep/ .el-date-editor--datetimerange.el-input__inner{
      width: 280px !important;
  }
  /deep/ .el-upload--picture-card{
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 94px;
    line-height: 94px;
    vertical-align: top;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item {
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 146px;
    height: 94px;
    margin: 0 8px 8px 0;
    display: inline-block;
}
/deep/ .el-textarea__inner { resize: none; }
  .inputwidth{
      width: 280px;
  }
  /deep/ .el-tabs--card > .el-tabs__header{
      border-bottom: none;
  }
  /deep/ .el-tabs--card > .el-tabs__header .el-tabs__nav {
      border-bottom: 1px solid #E4E7ED;
  }
 .elfromi >>> .el-form-item__error {

    left: 35px;
}
  .basictit{
    height: 56px;
    line-height: 56px;
    color: #4D4F5C;
    font-size: 16px;
    font-weight: bold;
    padding-left: 50px;
  }
  .dialog-footer{
    background: #F5F6FA;
    text-align: center;
    display: flex;
    justify-content: space-around;
  }
  .dialog-footer p{
    flex: 1
  }
  .table{
    height:500px;
    overflow-y: auto;
    margin-bottom: 15px
  }
  .atg-header{
    padding-left: 0;
    line-height: 60px;
    border-bottom:1px solid #E9E9F0;
  }
  .atg-search{
    border-bottom:1px solid #E9E9F0;
    margin-top: 22px;
    position: relative;
  }
  .atg-header .title{
    font-weight: 600
  }

  .cancel_but{
    width: 100px;
    background: #E4E6ED;
    border: 0
  }
  .keep_but{
    width: 100px;
    color: #FFFFFF;
    background: #43425D;
    border: 0
  }
 .release_but{
     
     background: #3B86FF;
     color: #FFFFFF;
     width: 100px;
     border: 0
 }

  .digsele{
    position: absolute;
    width: 100%;
    height: 213px;
    top: 43px;     
    border: 1px solid #3B86FF;
    box-shadow: 0px 3px 6px rgba(191, 210, 241, 0.49);
  }
  
</style>