<template>
  <div class="drawerContent">
    <div class="changeItem" v-for="value in info" :key="value">
      <div class="changeTime">{{value['editTimeStr'] && value['editTimeStr'].substr(0,16)}}</div>
      <div class="limit"></div>
      <div class="changeInfo">
        <div class="changeInfo_item" v-if="value['deptIdsAgo'] && value['deptIdsAfter']">
          <div class="changeLabel">组织异动</div>
          <div class="changeContent">
            <div>操作人：{{value['userName']}}</div>
            <div>组织由<span class="textBlue">{{value['deptIdsAgo']}}</span>异动到<span class="textBlue">{{value['deptIdsAfter']}}</span></div>
          </div>
        </div>
        <div class="changeInfo_item" v-if="value['roleIdsAgo'] && value['roleIdsAfter']">
          <div class="changeLabel">角色异动</div>
          <div class="changeContent">
            <div>操作人：{{value['userName']}}</div>
            <div>角色由<span class="textBlue">{{value['roleIdsAgo']}}</span>异动到<span class="textBlue">{{value['roleIdsAfter']}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
  .drawerContent {
    width: 100%;
    padding: 10px 60px 20px 60px;
    box-sizing: border-box;

    .changeItem {
      width: 100%;
      display: flex;
      display: -webkit-flex;
      display: -webkit-inline-flex;

      .changeTime {
        width: 90px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        line-height: 24px;
        color: #4D4F5C;
        opacity: 0.5;
        white-space: normal;
        word-break: break-all;
      }

      .limit {
        margin: 0 30px;
        width: 1px;
        min-height: 81px;
        background-color: #D7DAE2;
        position: relative;
        top: 15px;

        &::after {
          content: '';
          display: inline-block;
          width: 11px;
          height: 11px;
          background: #FFFFFF;
          border: 1px solid #4D4F5C;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: -6px;
        }
      }

      .changeInfo {
        flex: 1;
        display: flex;
        display: -webkit-flex;
        display: -webkit-inline-flex;
        flex-wrap: wrap-reverse;
        padding-bottom: 10px;

        .changeInfo_item {
          width: 100%;
          display: flex;
          display: -webkit-flex;
          display: -webkit-inline-flex;
          padding-bottom: 10px;
        }

        .changeLabel {
          width: 63px;
          height: 19px;
          background: #FFBE00;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 20px;
          color: #43425D;
          text-align: center;
          margin-right: 20px;
          margin-top: 5px;
        }

        .changeContent {
          flex: 1;
          font-size: 16px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          line-height: 24px;
          color: #4D4F5C;
        }

        .textBlue {
          color: #3B86FF;
        }
      }

      &:last-child {
        .limit {
          min-height: 28px;
        }
      }
    }

  }
</style>
