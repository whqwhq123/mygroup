<template>
  <el-main>
    <el-header class="atg-header">
      <span class="title">新建营销活动</span>
    </el-header>
    <!--  -->
    <el-row class="basictit">基本信息</el-row>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="padding-left: 100px;">
    <el-form-item label="活动名称" prop="activityName">
        <el-input v-model="ruleForm.activityName" placeholder="请输入活动名称" class="inputwidth"></el-input>
    </el-form-item>

    <el-form-item label="活动时间" prop="activityDate" required>
        <el-date-picker size="small" v-model="ruleForm.activityDate" type="datetimerange" range-separator="至"
          start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd">
        </el-date-picker>
    </el-form-item>
    <el-form-item label="详情头图" prop="uploadimga">
        <el-upload
        action="#"
        ref="upload"
        limit="3"
        v-model="ruleForm.uploadimga"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :on-success="onpreviewFun"
        list-type="picture-card"
        :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
                <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
                >
                <i class="el-icon-delete"></i>
                </span>
            </span>
            </div>
            <div slot="tip" class="el-upload__tip">推荐尺寸：750x484像素</div>
            <div slot="tip" class="el-upload__tip">图片格式：.jpg、png、gif，大小5M以内,最多上传</div>
        </el-upload>
    </el-form-item>
    <el-form-item label="运营位图片" prop="uploadimgb">
        <el-upload
        action="#"
        ref="upload"
        limit="3"
        accept="image/png,image/gif,image/jpg,image/jpeg"
        :on-success="onpreviewFun"
        list-type="picture-card"
        :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
                <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
                >
                <i class="el-icon-delete"></i>
                </span>
            </span>
            </div>
            <div slot="tip" class="el-upload__tip">推荐尺寸：750x484像素</div>
            <div slot="tip" class="el-upload__tip">图片格式：.jpg、png、gif，大小5M以内,最多上传</div>
        </el-upload>
    </el-form-item>

    <el-form-item label="主推车系" prop="pushCarseries">
        <el-select v-model="ruleForm.pushCarseries" class="inputwidth" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="执行渠道">
        <el-select v-model="ruleForm.impChannela" class="inputwidth" placeholder="请选择一级渠道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="ruleForm.impChannelb" class="inputwidth" style="margin-left:35px" placeholder="请选择二级渠道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="地址：" prop="address" class="dizhi-icon">
        <el-cascader placeholder="请选择省市区" clearable style="width: 280px;" :options="area" ref="area" v-model="ruleForm.address" :props="{value:'label'}" @change="selectCity"></el-cascader>
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
                <el-select v-model="ruleForm.broadHeading" placeholder="请选择活动大类">
                <el-option
                    v-for="item in activityStatus"
                    :key="item.type"
                    :label="item.label"
                    :value="item.type">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="intentStyle" label="活动类型">
                <el-select v-model="ruleForm.intentStyle" placeholder="请选择活动类型">
                <el-option
                    v-for="item in activityStatus"
                    :key="item.type"
                    :label="item.label"
                    :value="item.type">
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="activitySource" label="活动来源">
                <el-select v-model="ruleForm.activitySource" placeholder="请选择活动来源">
                <el-option
                    v-for="item in activityStatus"
                    :key="item.type"
                    :label="item.label"
                    :value="item.type">
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
                    <el-date-picker size="small" v-model="signupOffDate" type="datetimerange" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy/MM/dd" value-format="yyyy/MM/dd">
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
                <el-upload
                action="#"
                ref="uploadc"
                limit="3"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                :on-success="onpreviewFun"
                list-type="picture-card"
                :auto-upload="false">
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
                    <div slot="tip" class="el-upload__tip">推荐尺寸：123x123像素</div>
                    <div slot="tip" class="el-upload__tip">
                  图片格式：.jpg、png、gif，大小5M以内,最多上传
                </div>
                </el-upload>
            </el-form-item>

        </el-tab-pane>
    </el-tabs>
    <el-row>
    <el-form-item style="display: flex;justify-content: center;">
        <el-button @click="resetForm('ruleForm')"  class="cancel_but">取消</el-button>
        <el-button @click="resetForm('ruleForm')"  class="keep_but">保存</el-button>
        <el-button @click="submitForm('ruleForm')" class="release_but">发布</el-button>
        
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

import {getCarMakeModelStyle,onlyClueChannel,getDealerData,onlyClueList,distributeAssign} from "api/index.js";
import { parseTime,get_role_function } from '@/utils/index';
import area from '../../assets/javaScript/areaList.js'
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
            //选择活动大类
      activityStatus:[
        {
        type:'all',
        label:'全部'
        },
        {
        type:'marketing',
        label:'营销活动'
        },
        {
        type:'shopping',
        label:'商城活动'
        },
        {
        type:'fans',
        label:'粉丝活动'
        }
      ],
      uploadimg:[],
      dialogImageUrl: '',
      dialogVisible: false,
      formLabelWidth: '80px',
      limitNum: 3,
      form: {},
      ruleForm: {
          activityName: '',
          activityDate: [],
          uploadimga:'',
          uploadimgb:'',
          pushCarseries:'',
          impChannela:'',
          impChannelb:'',
          address:'',
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
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          activityDate:[{ required: true, message: '请选择活动日期', trigger: 'blur' }],
          uploadimga: [{ required: true, message: '该项不能为空', trigger: 'blur' }],
          uploadimgb: [{ required: true, message: '该项不能为空', trigger: 'blur' }],

          broadHeading:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
          intentStyle:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
          activitySource:[{ required: true, message: '该项不能为空', trigger: 'blur' }],
        }

     }
   },
   created () {
       //路由传参
        this.id=sessionStorage.getItem('id');
   },
  components: {
    quillEditor
  },
   mounted () {
     let content = '';  // 请求后台返回的内容字符串
        this.str = this.escapeStringHTML(content);  
   },
   methods:{
    // 上传文件之前的钩子
    handleBeforeUpload(file){
      console.log('before')
      if(!(file.type === 'image/png' || file.type === 'image/gif' || file.type === 'image/jpg' || file.type === 'image/jpeg')) {
        this.$notify.warning({
          title: '警告',
          message: '请上传格式为image/png, image/gif, image/jpg, image/jpeg的图片'
        })
      }
      let size = file.size / 1024 / 1024 / 2
      if(size > 2) {
        this.$notify.warning({
          title: '警告',
          message: '图片大小必须小于2M'
        })
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {

    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadFile() {
      this.$refs.upload.submit()
    },
    onEditorReady(editor) { // 准备编辑器
 
    },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
    // 转码
    escapeStringHTML(str) {
        str = str.replace(/&lt;/g,'<');
        str = str.replace(/&gt;/g,'>');
        return str;
    },

    submitForm(){
        console.log(this.ruleForm,"ruleFormruleForm提交表单");
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