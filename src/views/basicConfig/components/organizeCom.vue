<!-- 添加人员 修改人员 -->
<template>
  <div>
    <el-dialog
      :title="addAndsee"
      append-to-body="true"
      :visible.sync="isOrganize"
      :before-close="closeOrganize"
      width="700px"
      class="dialogStyle"
    >
      <!-- 表单内容 -->
      <el-form
        ref="ruleForm"
        :model="editForm"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="上级组织名称" prop="deptParentName">
          <el-input
            v-model="editForm.deptParentName"
            placeholder="请输入"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="组织级别" prop="deptLevel">
          <el-select v-model="editForm.deptLevel" placeholder="请选择">
            <el-option
              v-for="(item, index) in levelList"
              :key="index"
              :label="item.tagName"
              :value="item.tagId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="组织名称" prop="deptName">
          <el-input
            v-model="editForm.deptName"
            placeholder="20字符以内"
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="经营品牌"
          prop="brandName"
          v-if="editForm.deptLevel == 50"
        >
          <el-select
            v-model="editForm.brandName"
            placeholder="请选择"
            @click.native="isbrandPop = true"
          ></el-select>
        </el-form-item>
        <el-form-item label="部门负责人" prop="name">
          <el-autocomplete
            v-model="editForm.deptPrincipal"
            :fetch-suggestions="querySearchAsync"
            @select="handleSelect"
            placeholder="请输入姓名/工号搜索"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="所在区域" prop="name">
          <el-cascader
            ref="cascaderAddr"
            placeholder="请选择省市区"
            :options="area"
            v-model="editForm.address"
            :props="{ value: 'Code', currentLabels: 'label' }"
            @change="regionChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="地址" prop="name">
          <el-input
            v-model="editForm.companyAddr"
            placeholder="请输入地址"
            maxlength="100"
            @change="companyAddrChange()"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纬度" prop="name">
          <el-input
            v-model="editForm.lngLat"
            placeholder="请输入经纬度"
          ></el-input>
        </el-form-item>

        <div class="map_container" id="container">
          <div class="map_button">
            <span
              @click="map_change(1)"
              v-bind:class="[map_type == 1 ? 'hover' : '']"
              style="border-right: 1px solid #aaa"
              >地图</span
            >
            <span
              @click="map_change(2)"
              v-bind:class="[map_type == 2 ? 'hover' : '']"
              >卫星</span
            >
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" class="popBtn" @click="closeOrganize"
          >取 消</el-button
        >
        <el-button type="text" class="popBtn" @click="submitForm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <brand-pop
      v-if="isbrandPop"
      :isbrandPop="isbrandPop"
      :isMultiple="isMultiple"
      :isEdit="organizationInfo.isEdit"
      :brandInfo="brandInfo"
      @brandClick="brandClick"
    />
  </div>
</template>

<script>
var satelliteLayer = "";
var geocoder = "";
import {
  getDeptPrincipal,
  deptAdd,
  getDeptByIdForEdit,
  deptEdit,
} from "@/service/api/index";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import area from "@/assets/javaScript/areaList.js";
import brandPop from "./brandPop";
import departmentPop from "./departmentPop";
import departmentJobPop from "./departmentJobPop";

export default {
  props: {
    isOrganize: {
      type: Boolean,
      default: false,
    },
    organizationInfo: {
      type: Object,
      default: {},
    },
    
  },
  data() {
    return {
      addAndsee: "添加组织",
      map: "",
      map_type: 1,
      timeout: null,
      dialogtitle: "",
      editForm: {
        deptParentName: "",
        deptParentId: "",
        deptName: "",
        deptLevel: "",
        curUserId: "",
        codeProvince: "",
        codeCity: "",
        codeArea: "",
        nameProvince: "",
        nameArea: "",
        nameCity: "",
        deptLng: "",
        deptLat: "",
        brandId: "",
        brandName: "",
        parentBrandId: "",
        parentBrandName: "",
        deptPrincipalId: "",
        deptPrincipal: "",
        address: "",
        addressStr: "",
        lngLat: "",
        companyAddr: "",
        fullAddress: "",
      },
      levelList: [
        {
          tagName: "厂商",
          tagId: "20",
        },
        {
          tagName: "集团",
          tagId: "30",
        },
        {
          tagName: "大区",
          tagId: "40",
        },
        {
          tagName: "经销商",
          tagId: "50",
        },
        {
          tagName: "二网经销商",
          tagId: "60",
        },
        {
          tagName: "部门",
          tagId: "70",
        },
      ],
      area: area.options,
      plugin: [
        {
          pName: "ToolBar",
          events: {
            init(instance) {
              console.log(instance);
            },
          },
        },
      ],
      rules: {
        deptParentName: [
          { required: true, message: "请选择上级组织", trigger: "blur" },
        ],
        deptName: [
          {
            required: true,
            max: 20,
            message: "请输入组织名称",
            trigger: "blur",
          },
        ],
        brandName: [
          { required: true, message: "请选择经营品牌", trigger: "blur" },
        ],
        deptLevel: [
          { required: true, message: "请选择组织级别", trigger: "change" },
        ],
      },
      isMultiple: false,
      isbrandPop: false,
      brandInfo: {},
      deptId: "1",
    };
  },
  watch: {
    isOrganize(newVal) {
      this.isOrganize = newVal;
    },
    addAndsee(newVal) {
      this.addAndsee = newVal;
    },
    organizationInfo(newVal) {
      this.init(newVal);
    },
    "editForm.fullAddress": {
      handler(val, oldVal) {
        this.get_location();
      },
      deep: true,
    },
  },
  components: {
    brandPop,
    departmentPop,
    departmentJobPop,
  },
  mounted() {
    this.init(this.organizationInfo);

    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("container", {
        center: [116.397428, 39.90923],
        zoom: 12,
      });
      satelliteLayer = new AMap.TileLayer.Satellite();
      this.map.addControl(
        new AMap.ToolBar({
          locate: false,
        })
      );
      geocoder = new AMap.Geocoder();
    });
  },
  methods: {
    init(newVal) {
      this.addAndsee = !newVal.isEdit ? "添加组织" : "修改组织";
      if (!newVal.isEdit) {
        (this.editForm.deptParentName = newVal.deptName),
          (this.editForm.deptParentId = newVal.deptId),
          (this.levelList = this.levelList.filter((item) => {
            return newVal.deptLevel < item.tagId;
          }));
      } else {
        this.getDetails(newVal.deptId);
      }
    },

    getDetails(deptId) {
      getDeptByIdForEdit({ deptId: deptId }).then((res) => {
        if (res.code == 0) {
          this.levelList = this.levelList.filter((item) => {
            return res.data.deptParentLevel < item.tagId;
          });
          this.editForm = {
            ...res.data,
            lngLat:
              res.data.deptLng && res.data.lat
                ? `${res.data.deptLng},${res.data.lat}`
                : "",
            deptPrincipal: res.data.deptPrincipalVO
              ? `${res.data.deptPrincipalVO.userName}/${res.data.deptPrincipalVO.userCode}`
              : "",
            addressStr: `${res.data.nameProvince}${res.data.nameCity}${res.data.nameArea}`,
            address: [
              res.data.codeProvince,
              res.data.codeCity,
              res.data.codeArea,
            ],
            deptLevel: String(res.data.deptLevel),
            fullAddress: `${res.data.nameProvince}${res.data.nameCity}${res.data.nameArea}${res.data.companyAddr}`,
          };
          this.brandInfo = {
            parentBrandId: res.data.parentBrandId,
            parentBrandName: res.data.parentBrandName,
            brandId: res.data.brandId,
            brandName: res.data.brandName,
          };
          // this.get_location()
          this.$forceUpdate();
        }
      });
    },

    get_location() {
      let that = this;
      if (!this.editForm.companyAddr) return false;

      geocoder.getLocation(
        this.editForm.fullAddress,
        function (status, result) {
          if (status === "complete" && result.geocodes.length) {
            let marker = new AMap.Marker();
            let lng = result.geocodes[0].location.lng;
            let lat = result.geocodes[0].location.lat;
            that.editForm.deptLng = lng;
            that.editForm.deptLat = lat;
            that.editForm.lngLat = `${lng},${lat}`;
            marker.setPosition(result.geocodes[0].location);
            that.map.add(marker);
            that.map.setFitView(marker);
          } else {
            this.$notify({
              title: '成功',
              message: '根据地址查询位置失败',
              type: 'warning'
            });
          }
        }
      );
    },
    companyAddrChange() {
      this.editForm.fullAddress = `${this.editForm.addressStr}${this.editForm.companyAddr}`;
    },
    //按钮确定
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let lngLatArr = [];
          lngLatArr = this.editForm.lngLat && this.editForm.lngLat.split(",");
          let data = {
            ...this.editForm,
            curUserId: this.$store.getters.userInfo.userId || "",
            deptLng: lngLatArr[0] || "",
            deptLat: lngLatArr[1] || "",
          };
          delete data.address;
          console.log(data);

          if (!this.organizationInfo.isEdit) {
            deptAdd(data).then((res) => {
              if (res.code == "0") {
                this.$notify({
                  title: '成功',
                  message: '添加成功',
                  type: 'success'
                });
                this.isOrganize = false;
                this.$emit("closePop", true);
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.errMsg
                })
              }
            });
          } else {
            delete data.createTime;
            delete data.editTime;
            delete data.deptNo;
            delete data.companyLogo;
            delete data.children;
            delete data.deptPrincipalVO;
            deptEdit(data).then((res) => {
              if (res.code == "0") {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success'
                });
                this.isOrganize = false;
                this.$emit("closePop", true);
              } else {
                this.$notify.error({
                  title: '错误',
                  message: res.errMsg
                })  
              }
            });
          }
        }
      });
    },
    map_change(type) {
      this.map_type = type;
      if (type == 1) {
        this.map.remove(satelliteLayer);
      } else {
        this.map.add(satelliteLayer);
      }
    },
    querySearchAsync(queryString, cb) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        getDeptPrincipal({ nameOrCode: queryString }).then((res) => {
          let results = "";
          if (res.code == 0) {
            results = res.data.map((item) => {
              return {
                value: item.userName + "/" + item.userCode,
                id: item.userId,
              };
            });
          }
          cb(results);
        });
      }, 1000 * Math.random());
    },

    handleSelect(item) {
      this.editForm.deptPrincipalId = item.id;
    },
    regionChange(e) {
      // console.log(this.editForm.address)
      let data = this.$refs["cascaderAddr"].getCheckedNodes()[0].pathLabels;

      this.editForm = {
        ...this.editForm,
        codeProvince: e[0],
        codeCity: e[1],
        codeArea: e[2],
        nameProvince: data[0],
        nameCity: data[1],
        nameArea: data[2],
        addressStr: `${data[0]}${data[1]}${data[2]}`,
        fullAddress: `${data[0]}${data[1]}${data[2]}${this.editForm.companyAddr}`,
      };
      // this.get_location()
    },

    brandClick(data) {
      console.log(data);
      this.editForm = {
        ...this.editForm,
        ...data,
      };
      this.isbrandPop = false;
    },

    closeOrganize() {
      this.isOrganize = false;
      this.$emit("closePop", false);
    },
    // changeLevel(e) {
    //   this.editForm.deptLevel = e.deptLevel
    //   this.editForm.deptName = e.deptName
    // }
    // editForm
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/popStyle.scss";

/deep/.el-input.is-disabled .el-input__inner {
  background-color: #fff;
  border-color: #e4e7ed;
  color: #43425d;
  cursor: pointer;
}

/deep/.el-input,
/deep/.el-textarea {
  width: 453px !important;
}

/deep/.el-form-item__content {
  line-height: 40px;
}

/deep/.el-textarea {
  position: absolute;
  bottom: -18px;
  left: 0;
}

/deep/ .el-dialog__body{
  height: 500px;
  overflow: auto;
}
.map_container {
  position: relative;
  width: 577px;
  height: 326px;
  margin: 0 auto;
}

.map_button {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 100;
  border: 1px solid #aaa;
  border-radius: 2px;
  color: #666;
}

.map_button span {
  display: inline-block;
  background: #fff;
  width: 42px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.map_button span.hover {
  background: #3498e9;
  color: #fff;
}
</style>
