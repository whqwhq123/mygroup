<template>
  <div class="page_body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="一级渠道管理" name="primary">
            <primaryChannel />
        </el-tab-pane>
        <el-tab-pane label="二级渠道管理" name="secondary">
          <secondaryChannel />
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import primaryChannel from './components/primaryChannel'
import secondaryChannel from './components/secondaryChannel'
export default {
  name: 'channel',
  components: {  },
  data() {
    return {
     activeName: 'primary'
    }
  },
  computed: {

  },
  components: {
    primaryChannel,
    secondaryChannel
  },
  created() {
    
  },
  methods: {
      
  },
}
</script>
<style lang="scss" scoped>
.page_body {
    padding: 20px;
    box-sizing: border-box;

  /deep/.el-tabs__item{
    color: #4D4F5C !important;
    font-size: 18px;
  }

  /deep/.el-tabs__item.is-active {
    color: #3B86FF !important;
  }
  /deep/.el-tabs__active-bar {
    width: 108px !important;
    background-color: #3B86FF !important;
  }
  /deep/.el-tabs__nav-wrap::after {
    height: 1px;
      background-color: #D7DAE2 !important;
  }
}
</style>