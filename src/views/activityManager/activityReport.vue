<template>
  <div>
    <div class="activity-form">
      <el-form>
          <el-form-item label="活动名称">
            <el-select v-model="activity_form.name" placeholder="活动名称">
              <el-option
                v-for="item in activityName"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <el-main>
      <div class="activity-title">
         <div class="title">活动效果</div>
         <el-row style="margin-top: 20px">
           <el-col :span="4" class="header-data" v-for="item in dataHeadArr" :key="item">
              <div>
                 <img :src="item.imgUrl">
              </div>
              <ul>
                <li>{{item.dric}}</li>
                <li>
                  <countTo
                    :startVal="0"
                    :endVal="item.num"
                    :duration="2000"
                    class="card-panel-num"
                    v-if="item.num > 1"
                  ></countTo>
                </li>
              </ul>
              <div class="line"></div>
           </el-col>
         </el-row>
         <div class="hr"></div>
      </div>
      <div>
         <chart
            class="chart_box"
            :options="controlData"
            :auto-resize="true"
          ></chart>
      </div>
      <div class="hr" style="margin:20px;"></div>
      <div>
         <chart
            class="chart_box"
            :options="salemanContribute"
            :auto-resize="true"
          ></chart>
      </div>
    </el-main>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  components:{
    countTo
  },
  data(){
    return {
       activity_form:{
         name:''
       },
       activityName:['全部','活动名称1','活动名称2'],
       dataHeadArr : [
        {
          // title: `${this.yearName}/${this.methName}`,
          dric: "浏览量/PV",
          imgUrl: require("../../assets/images/activity/pv.png"),
          num: "3233",
         // ringThan: parseFloat(res.data.productionChainRatio * 100).toFixed("2"),   // 环比
          // vehicle: res.data.productionNum,  // 单位（辆）
        },
        {
          dric: "访客数/UV",
          imgUrl: require("../../assets/images/activity/uv.png"),
          num: "1233",
        },
        {
          dric: "参与用户数",
          imgUrl: require("../../assets/images/activity/users.png"),
          num: "1253",
        },
        {
          dric: "新增线索",
          imgUrl: require("../../assets/images/activity/add.png"),
          num: "43233",
        },
        {
          dric: "加热线索",
          imgUrl: require("../../assets/images/activity/hot.png"),
          num: "23233",
        },
        {
          dric: "订单成交量",
          imgUrl: require("../../assets/images/activity/order.png"),
          num: "233",
        }
      ],
       controlData:{},  //活动监控
       salemanContribute:{}  // 顾问贡献
    }
  },
  created () {
    this.chartInit()
  },
  methods: {
    chartInit(){
      this.controlData={
        color:['#3B86FF','#00C456','#FFBE00','#FF7065','#DB3A36','#545371','#8786A1'],
        title: {
            text: '活动监控',
            padding:[0,20]
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['浏览数', '监控数','收藏数','报名数', '参加数','转发量','邀约量']
        },
        dataZoom: [
          {
            // type: "slider",
            // realtime: true, //拖动滚动条时是否动态的更新图表数据
            // height: 25, //滚动条高度
            // start: 40, //滚动条开始位置（共100等份）
            // end: 65 //结束位置（共100等份）
          }
        ],
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [ '2021-5-12', '2021-4-11', '2021-3-10', '2021-2-9', '2021-1-8','2021-7-7', '2021-6-6', '2021-5-5', '2021-4-4', '2021-3-3', '2021-2-2', '2021-1-1']
        },
        yAxis: {
            type: 'value',
            // axisLabel: {
            //     formatter: '{value} °C'
            // }
        },
        series: [
            {
                name: '浏览数',
                type: 'line',
                data: [1000, 1100, 1300, 1100, 1200, 1050, 900,500,600,1000,1100,1200]
            },
            {
                name: '监控数',
                type: 'line',
                data: [1020, 2000, 1200, 500, 300, 200, 100,1500,1600,1530,1150,1050]
            },
            {
                name: '收藏数',
                type: 'line',
                data: [1050, 1060, 1030, 1010, 1020, 1005, 1090,500,2600,2000,1900,120]
            },
            {
                name: '报名数',
                type: 'line',
                data: [1002, 2000, 1020, 500, 300, 2000, 1000,500,600,1000,1100,1200]
            },
            {
                name: '参加数',
                type: 'line',
                data: [1010, 1011, 1303, 1102, 1202, 1505, 3090,500,3600,1010,1160,1260]
            },
            {
                name: '转发量',
                type: 'line',
                data: [1302, 2500, 1206, 1500, 3000, 2000, 1000,5030,2020,1800,1190,1500]
            },
            {
                name: '邀约量',
                type: 'line',
                data: [1500, 1001, 1003, 1011, 1060, 1095, 1090,5010,6010,1010,1190,1600]
            }
        ]
      }
      this.salemanContribute={
        color:['#3B86FF','#00C456','#FFBE00','#FF7065','#DB3A36','#545371','#8786A1'],
        title:{
           text: '顾问贡献',
           padding:[0,20]
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // Use axis to trigger tooltip
                type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
            }
        },
        legend: {
            //data: ['转发量', '邀约量', '参与量', '新增线索量', '加热线索量','活动线索下定量','活动线索成交量']
        },
        xAxis: {
           type: 'value',
        },
        yAxis: {
            type: 'category',
            data: ['杨兰敏', '李先丽', '张晓明', '吴瑶瑶', '陈驰', '赵莲莲']
        },
        series: [
            {
                name: '转发量',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [320, 302, 301, 334, 390, 330, 320]
            },
            {
                name: '邀约量',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
                name: '参与量',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
                name: '新增线索量',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [150, 212, 201, 154, 190, 330, 410]
            },
            {
                name: '加热线索量',
                type: 'bar',
                stack: 'total',
                label: {
                    show: true
                },
                emphasis: {
                    focus: 'series'
                },
                data: [820, 832, 901, 934, 120, 130, 120]
            },
            {
              name: '活动线索下定量',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [820, 832, 901, 934, 120, 130, 120]
            },
            {
              name: '活动线索成交量',
              type: 'bar',
              stack: 'total',
              label: {
                  show: true
              },
              emphasis: {
                  focus: 'series'
              },
              data: [200, 232, 101, 334, 120, 430, 520]
            }
        ]
      }
    }
  }
}
</script>

<style scoped>
  .el-main{
    padding: 0
  }
  /deep/ .el-row{
    margin: 0
  }
  /* /deep/ .el-header{
    height: 120px;
  } */
  .activity-form{
    background: #F5F6FA;
    padding: 10px 20px;
  }
  /deep/ .el-form-item{
    margin-bottom:0
  }
  /deep/ .el-form-item__label{
    font-size: 18px;
  }
  .activity-title{
    margin: 20px;
  }
  .activity-title .title{
    font-size: 18px;
  }
  .header-data{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
  }
  .header-data .line{
    height: 38px;
    border-right: 1px solid #E8E8E8;
    margin-left: 60px;
  }
  .header-data:last-child .line{
    display: none
  }
  .header-data ul{
    margin-left: 20px;
  }
  .header-data ul li:first-child{
    font-size: 14px;
    color: #000;
    opacity: 0.45;
  }
  .header-data ul li:last-child{
    font-size: 24px;
    color: #000;
    
  }
  .hr{
    border-top: 1px solid #E9E9F0;
    margin: 20px 0;
  }
  .chart_box{
    width: 100%;
  }
</style>
