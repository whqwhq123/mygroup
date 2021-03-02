<template>
    <el-upload
        class="avatar-uploader"
        ref="upload_img"
        action=""
        accept="image/jpeg,image/jpg,image/png"
        list-type="picture-card"
        :data-imgid="imgid"
        :name="upload_name"
        :on-remove="handleRemove"
        :on-exceed="handleExceed"
        :limit="3"
        :file-list="file_list"
        :http-request="uploadSectionFile">
        <i class="el-icon-plus"></i>
        <div slot="tip" class="el-upload__tip">上传图片</div>
        <div slot="tip" class="el-upload__tip">推荐尺寸：{{imgid=='1'?'750x484像素':imgid=='1'?'630x200像素':'630x200像素'}}</div>
        <div slot="tip" class="el-upload__tip">图片格式：.jpg、png、gif，大小5M以内,最多上传{{imgid=='3'?1:3}}张</div>
    </el-upload>
</template>

<script>
import {LoginApplication} from "api/index.js";
    export default {
        props:{
            //用于多个时候 区分
            imgid:{
                type:String,
                default: '1'
            },
            filelist:{
                type:Object,
            },
        },
        data () {
            return {
                file_list:[   
                    //展示已上传的图片数据  【修改时 显示已上传的图片 用的】
                    // {
                    //   name: '01',
                    //   url: 'http://voucher-backend.frgiftcube.com:80/upload/2019/07/31/1847366e138ac779a7c5bd229b65a2d4e130a1e5.jpg'
                    // }
                 ],
                upload_name: 'files',//图片上传的后端接受图片文件的 key
                dialogImageUrl: '',  //上传后的图片地址
            }
        },
        watch: {
            imgid(newVal){
                console.log(newVal,"imgid");
                this.imgid=newVal
            },
            filelist(newVal){
                this.file_list=[]
                newVal.forEach((v,i)=> {
                    if (v!=null && v!='') {
                        this.file_list.push({name:i,url:v})
                    }
                });
                console.log(this.file_list,"监听的imgdatas数据");
                this.filelist=newVal
            },

        },
        mounted () {
            this.file_list=[]
        },
        methods:{
            //文件超出个数限制时的钩子【判断上传的图片是否超过限制，超过提醒删除再进行上传】
            handleExceed() {     
                this.$alert('图片最多上传三张，请删除再重新上传！', '', {
                showConfirmButton: false,
                callback: action => {}
                });
            },
            // 文件列表移除文件时的钩子
            handleRemove(file, fileList) { 
                // console.log(this.dialogImageUrl,file, fileList);
                // this.file_list=fileList
                let imgsdata={
                    imgid:this.$refs.upload_img.$el.dataset.imgid,
                    imglength:fileList.length,
                    imttype:'del'
                }
                this.$emit('setImgslength',imgsdata)
                this.dialogImageUrl='';
            },
            // 这个方法主要对图片的类型和大小进行一个判断
            uploadSectionFile (params) {
                // 自定义上传方法
                var that = this,
                file = params.file,   //获取上传的文件
                fileType = file.type,   //获取文件类型
                isImage = fileType.indexOf('image') != -1,  //  判断是否是图片类型
                file_url = that.$refs.upload_img.uploadFiles[0].url;
                var isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {  // 判断大小
                alert("上传图片的大小不能超过 2MB!");
                that.$refs.upload_img.uploadFiles = [];  //不符合就清空已选择的图片
                return;
                }
                if(!isImage){  // 文件格式
                alert("请选择图片文件！");
                that.$refs.upload_img.uploadFiles = [];  //不符合就清空已选择的图片
                return;
                }
                if (isImage) {
                var img = new Image();
                img.src = file_url;
                img.onload = function () {
                //  一切验证通过后调用上传方法
                    that.uploadFile(file);
                }
                }
            },
            async uploadFile(file) {   // 上传的函数
                var that = this,
                formData = new FormData();
                formData.append(that.upload_name, file);
                let res= await LoginApplication()
                console.log(res,'resresresress');
                if (res.code == 0) {
                let OSS = require("ali-oss");
                let sts = new OSS({
                    region: "oss-cn-beijing",
                    accessKeyId: res.data.credentials.accessKeyId,
                    accessKeySecret: res.data.credentials.accessKeySecret,
                    stsToken: res.data.credentials.securityToken,
                    bucket: "dssp-pcm",
                });
                let sesimg=await sts.multipartUpload(file.name, file)
                let imgsdata={
                    imgid:this.$refs.upload_img.$el.dataset.imgid,
                    imgurl:sesimg.res.requestUrls[0].split("?")[0],
                    imttype:'add'
                }
                // console.log(imgsdata);
                this.$emit('setImgs',imgsdata)
     
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: res.errMsg
                    });
                } 
            },
        }
    }
</script>

<style lang="scss" scoped>
/deep/.el-upload__tip{
    margin-top: 0px;
}
</style>