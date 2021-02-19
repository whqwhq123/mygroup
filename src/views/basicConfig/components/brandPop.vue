<!-- 添加人员 修改人员 -->
<template>
  <el-dialog
    :title="addAndsee"
    append-to-body="true"
    :visible.sync="isbrandPop"
    :before-close="handleClose"
    width="458px"
    class="dialogStyle"
  >
    <!-- 表单内容 -->
    <div class="popContent">
      <el-input v-model="brandName" placeholder="请选择子品牌"></el-input>
      <!-- many -->
      <div class="screenBox">
        <ul>
          <li v-for="item in makeLetter" :class="[letter==item ? 'act_li':'']" :key="item" @click="letterSearch(item)">{{item}}</li>
        </ul>
        <el-cascader-panel ref="myCascader"  v-model="selectedOptions" :options="options" :multiple="cascaderProps.multiple" :props="cascaderProps" :key="isResouceShow" @change="changeCascader">
          <template slot-scope="{ node, data }" class="scrlltep">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader-panel>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" class="popBtn" @click="handleClose"
        >取 消</el-button
      >
      <el-button type="text" class="popBtn" @click="handleClose()"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import { getAddCarMakeTree, getMakGroupNameByGroupId } from '@/service/api/index';
export default {
  props: {
    isbrandPop: {
      type: Boolean,
      default: true
    },
    isMultiple: {
      type: Boolean,
      default: true
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    brandInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      addAndsee: '负责品牌',
      brandName: "",
      cascaderProps: { 
        multiple: true,
        value: 'value',
        label: 'label'
      },
      isResouceShow: 0,
      makeLetter: [],
      letter: '',
      options: [],
      dataList: [],
      selectedOptions: [''],
      brandIdS: []
    };
  },
  watch: {
    isbrandPop(newVal) {
      this.isbrandPop = newVal;
    },
    isMultiple(newVal) {
      // console.log(newVal)
      this.cascaderProps.multiple = newVal
      this.addAndsee = newVal ? '负责品牌' : '经营品牌'
    },
    isEdit(newVal) {
      this.newVal = newVal
    }
  },
  mounted() {
    this.init()
    this.getList()
  },
  methods: {
    init() {
      this.cascaderProps.multiple = this.isMultiple
      this.addAndsee = this.isMultiple ? '负责品牌' : '经营品牌'

      if(this.isEdit){
        this.selectedOptions = [this.brandInfo.parentBrandId, this.brandInfo.brandId]
        console.log(this.selectedOptions)
      }
    },
    getList(){
      getAddCarMakeTree({}).then(res=> {
        if(res.code == 0) {
          this.makeLetter = res.data.map(item => item.makeLetter)
          this.letter = this.makeLetter[0]
          let dataList = {}
          // let treedata = []
          res.data.forEach(item => {
            let data = []
            if(item.carMakeGroupVoList && item.carMakeGroupVoList.length > 0) {
              item.carMakeGroupVoList.forEach(x => {
                let children = []
                if(x.carGroupList && x.carGroupList.length > 0) {
                  x.carGroupList.forEach(y => {
                    children.push({
                      label: y.groupName,
                      value: y.groupId
                    })
                  })
                }
                data.push({
                  label: x.makeName,
                  value: x.makeId,
                  children
                }) 
              })
            }
            
            dataList[item.makeLetter] = data
          });
          this.dataList = dataList
          // console.log(dataList)

          let options = []
          Object.values(dataList).forEach(item => {
            options = options.concat(item)
          })
          this.options = options
        }
      })
    },
    letterSearch(val) {
      this.letter = val
      this.options = this.dataList[val]
      this.isResouceShow = val
    },
    changeCascader(value) {
      // console.log(value, this.$refs.myCascader.getCheckedNodes())
      if(!this.isMultiple) {
        let pathLabels = this.$refs.myCascader.getCheckedNodes()[0].pathLabels 
        this.brandInfo = {
          parentBrandId: value[0],
          parentBrandName: pathLabels[0],
          brandId: value[1],
          brandName: pathLabels[1]
        }
      } else {
        let brandIdS = value.map(item => {
          return item[1]
        })
        this.brandIdS = brandIdS
        // console.log(brandIdS)
        // console.log(value)
      }
      
    },

    async handleClose() {
      let data = ''
      if(!this.isMultiple) {
        data = this.brandInfo
      } else {
        data = await this.reqBrand()
      }
      this.isbrandPop = false
      this.$emit('brandClick', data)
    },

    async reqBrand(){
      let res = await getMakGroupNameByGroupId({groupIds: this.brandIdS.join()})
      return res.code == 0 ? res.data : {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/popStyle.scss";
.popContent {
  width: 338px;
  height: 362px;
  overflow: hidden;
  background: #f5f6fa;
  border: 1px solid #d7dae2;
  padding: 10px;
  box-sizing: border-box;

  .screenBox {
    width: 100%;
    height: 100%;
    margin-top: 12px;
    display: flex;
    display: -webkit-flex;
    display: -webkit-inline-flex;

    ul {
      width: 16px;
      cursor: pointer;
      overflow-y: auto;

      li {
        height: 19px;
        font-size: 11px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        line-height: 19px;
        color: rgba($color: #43425d, $alpha: 0.7);
        text-align: center;
      }

      .act_li {
        background: #3b86ff;
        opacity: 1;
        color: #ffffff;
        font-size: 14px;
      }
    }

    ::-webkit-scrollbar {
      display: none;
    }

    /deep/.el-cascader-menu {
      width: 150px;
      min-width: 150px;
      max-width: 150px;
      height: 305px;
      background: #ffffff;

      &:first-child {
        border: 1px solid #3b86ff;
        box-sizing: border-box;
      }
    }

    /deep/.el-cascader-node {
      padding: 0 10px !important;
    }

    /deep/.el-cascader-menu__wrap {
      margin-right: 0 !important;
      height: 100%;
    }

    .many {
      /deep/.el-cascader-node.in-active-path,
      /deep/.el-cascader-node.is-active,
      /deep/.el-cascader-node.is-selectable.in-checked-path {
        color: #fff !important;
        background: #3b86ff;
      }

      
    }
  }
  /deep/.el-input {
    width: 100% !important;
  }
  /deep/.el-cascader-node__prefix {
    left: 3px;
  }
}
.scrlltep{
  　overflow-y: scroll;
　　scrollbar-color: transparent transparent;
　　scrollbar-track-color: transparent;
　　-ms-scrollbar-track-color: transparent;
}

</style>
