<template>
  <div class="page_body">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="一级渠道管理" name="primary">
            <primaryChannel />
        </el-tab-pane>
        <el-tab-pane label="二级渠道管理" name="secondary"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import primaryChannel from './components/primaryChannel'
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
    primaryChannel
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
}
</style>