<template>
  <div>
    <div class="top">
      <span>省、自治区、直辖市</span>
      >
      <span>地级市、地区、自治州、盟</span>
      >
      <span>市辖区、县级市、县</span>
    </div>
    <div class="area">
      <div class="area_left">
        <div class="area_search">
          <el-input size="small" placeholder="输入省份查找" v-model="form['province']" style="width: 140px;">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search_province()"></i>
          </el-input>
        </div>
        <div class="area_left_content">
          <template v-for="(value) in list[0]">
            <span v-bind:class="[value['provinceCode'] == list_code[0] ? 'hover' : '']" @click="search_city(value['provinceCode'])">{{value['provinceName']}}</span>
          </template>
        </div>
      </div>
      <div class="area_left">
        <div class="area_search">
          <el-input size="small" placeholder="输入市查找" v-model="form['city']" style="width: 140px;">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search_city()"></i>
          </el-input>
        </div>
        <div class="area_left_content">
          <template v-for="(value, index) in list[1]">
            <span v-bind:class="[value['cityCode'] == list_code[1] ? 'hover' : '']" @click="search_district(value['cityCode'])">{{value['cityName']}}</span>
          </template>
        </div>
      </div>
      <div class="area_right">
        <div class="area_search">
          <el-input size="small" placeholder="输入区/县查找" v-model="form['district']" style="width: 140px;">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="search_district()"></i>
          </el-input>
        </div>
        <div class="area_right_content">
          <span v-for="(value, index) in list[2]">{{value['areaName']}}</span>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    selectProvinceInfo,
    selectCityInfo,
    selectAreaInfo
  } from "@/service/api/index";
  export default {
    data() {
      return {
        form: {
          province: '',
          city: '',
          district: ''
        },
        list: [
          [],
          [],
          []
        ],
        list_code: ['', '', '']
      }
    },
    created() {
      this.search_province()
    },
    methods: {
      search_province() {
        let obj = {}
        obj['provinceName'] = this.form['province']
        selectProvinceInfo(obj).then(res => {
          this.list[0] = res.data
          this.list.splice(0, 0)
        });
      },
      search_city(code) {
        if (code) {
          this.list_code[0] = code
          this.form['city'] = ''
        }
        let obj = {}
        obj['provinceCode'] = this.list_code[0]
        obj['cityName'] = this.form['city']
        selectCityInfo(obj).then(res => {
          this.list[1] = res.data
          this.list[2] = []
          this.list.splice(0, 0)
        });
      },
      search_district(code) {
        if (code) {
          this.list_code[1] = code
          this.form['district'] = ''
        }
        let obj = {}
        obj['cityCode'] = this.list_code[1]
        obj['areaName'] = this.form['district']
        selectAreaInfo(obj).then(res => {
          this.list[2] = res.data
          this.list.splice(0, 0)
        });
      }
    }
  }
</script>

<style scoped>
  /deep/ .area_search .el-icon-search {
    cursor: pointer;
  }

  .area_right_content span {
    padding: 0 15px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #D7DAE2;
    display: block;
    border-radius: 4px;
    margin-left: 20px;
    float: left;
    text-align: center;
    margin-top: 12px;
  }

  .area_right_content {
    width: 100%;
    padding-top: 10px;
    height: calc(100vh - 300px);
    overflow-y: scroll;
  }

  .area_left_content {
    padding-top: 10px;
    height: calc(100vh - 300px);
    overflow-y: scroll;
  }

  .area_left_content span {
    width: 100%;
    height: 52px;
    line-height: 52px;
    display: block;
    text-indent: 30px;
    color: #333;
    cursor: pointer;
    box-sizing: border-box;
  }

  .area_left_content span.hover {
    color: #0685FE;
    background: #F5F6FA;
    border-right: 3px solid #3B86FF;
    height: 42px;
    line-height: 45px;
    margin: 5px 0;
  }

  .top {
    background: #F5F6FA;
    width: 1584px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 20px;
    color: #A4AFB7;
    font-size: 14px;
  }

  .top span {
    color: #333;
    margin: 0 20px;
  }

  .area {
    display: flex;
    margin-top: 20px;
  }

  .area_left {
    width: 210px;
    border-right: 1px solid #E4E6ED;
  }

  .area_right {
    flex: 1;
  }

  .area_search {
    margin-left: 20px;
  }
</style>
