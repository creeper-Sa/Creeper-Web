<script setup lang="ts">
import { CountDataItem, TableDataItem, VideoItem } from '@/interface/Interface';
import { getCurrentInstance, onMounted, onUnmounted, reactive, ref } from 'vue';
import * as echarts from 'echarts'
import { EChartsOption, PieSeriesOption, XAXisComponentOption } from 'echarts';


const getImageUrl = (user:string)=> new URL(`../assets/images/${user}.png`,import.meta.url).href;
const tableData = ref<TableDataItem[]>([]);

const tableLabel = ref({
    name: "品牌",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})
const countData = ref<CountDataItem[]>([]);


//三个折线图的REF
const echart = ref<HTMLElement | null>(null);
const userEchart = ref<HTMLElement | null>(null);
const videoEchart = ref<HTMLElement | null>(null);
const lineChart = ref<echarts.ECharts | null>(null);
const userChart = ref<echarts.ECharts | null>(null);
const videoChart = ref<echarts.ECharts | null>(null);

const observer = ref<ResizeObserver | null>(null);
//使用axios的基本交互
// axios({
//     url:'api/home/getTableData',
//     method:'get'
// }).then(res=>{
//     //传入数据后
//     console.log(res.data);
//     if(res.data.code === 200){
//         console.log(res.data.data.tableData);
//         tableData.value = res.data.data.tableData;
//     }
// })

//axios的二次封装
const instance = getCurrentInstance();
const proxy = instance?.proxy;  // 直接访问 proxy 属性

//获取tableData中的内容，利用Axios
const getTableData = async () =>{
   const data = await proxy?.$api.getTableData();
   tableData.value = data;
   // console.log(data);

}

const getCountData = async () =>{
   const data = await proxy?.$api.getCountData();
   countData.value = data;
   // console.log(countData);
}

const getChartData = async () => {
  const { orderData, userData, videoData } = await proxy?.$api.getChartData();

  if (echart.value && orderData && xOptions.xAxis && !Array.isArray(xOptions.xAxis)) {
    const xAxis = xOptions.xAxis as XAXisComponentOption & { data: string[] };
    xAxis.data = orderData.date;

    const brands = Object.keys(orderData.data[0]);
    xOptions.series = brands.map(brand => ({
      name: brand,
      type: 'line',
      data: orderData.data.map((item: Record<string, number>) => item[brand]),
    }));

    if (!lineChart.value) {
      lineChart.value = echarts.init(echart.value);
    }
    lineChart.value.setOption(xOptions);
  }

  // 用户新增柱状图
  if (userEchart.value && userData) {
    const userOptions: EChartsOption = {
      xAxis: {
        type: 'category',
        data: userData.map((item: any) => item.date),
      },
      yAxis: { type: 'value' },
      tooltip: { trigger: 'item' },
      legend: { data: ['新增用户', '活跃人数'] },
      series: [
        { name: '新增用户', type: 'bar', data: userData.map((item: any) => item.new) },
        { name: '活跃人数', type: 'bar', data: userData.map((item: any) => item.active) },
      ],
    };

    if (!userChart.value) {
      userChart.value = echarts.init(userEchart.value);
    }
    userChart.value.setOption(userOptions);
  }

  // 饼图
  if (videoEchart.value && videoData) {
    const pieSeries = {
      name: '品牌销量',
      type: 'pie',
      radius: '60%',
      data: videoData.map((item: VideoItem) => ({
        name: item.name,
        value: item.value,
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    } as const;

    pieOptions.series = [pieSeries];

    if (!videoChart.value) {
      videoChart.value = echarts.init(videoEchart.value);
    }
    videoChart.value.setOption(pieOptions);
  }

  // 监听容器大小变化，触发所有图表 resize
  observer.value = new ResizeObserver((en=>{
      lineChart.value?.resize();
      userChart.value?.resize();
      videoChart.value?.resize();
  }))

  if(proxy?.$refs['echart']){
      observer.value.observe(proxy?.$refs['echart'] as Element);
  }
};



// 定义 xAxis 具体类型，明确为单个对象
const xAxisOption: XAXisComponentOption = {
  type: 'category',
  data: [] as string[],
  axisLine: {
    lineStyle: {
      color: '#17b3a3',
    },
  },
  axisLabel: {
    interval: 0,
    color: '#333',
  },
};

const xOptions = reactive<EChartsOption>({
  textStyle: {
    color: '#333',
  },
  legend: {},
  grid: {
    left: '20%',
  },
  tooltip: {
    trigger: 'item',
  },
  xAxis: xAxisOption, // 这里明确是单个对象
  yAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#17b3a3',
        },
      },
    },
  ],
  color: ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3'],
  series: [],
});


const pieOptions = reactive<{
  tooltip: { trigger: string },
  legend: Record<string, any>,
  color: string[],
  series: PieSeriesOption[]
}>({
  tooltip: {
    trigger: "item",
  },
  legend: {},
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: []
});


onMounted(()=>{
   getTableData();
   getCountData();
   getChartData();
})


</script>

<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 20px;">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="getImageUrl('user')" class="user"/>
                    <div class="user-info">
                        <p class="user-info-admin">Admin</p>
                        <p class="user-info-p">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间: <span>2025-4-3</span></p>
                    <p>上次登录的地点: <span>湖北</span></p>
                </div>
            </el-card>

            <el-card shadow="hover" class="user-table">
                <el-table :data="tableData">
                    <el-table-column
                    v-for="(value,key) in tableLabel"
                    :key="key"
                    :prop="key"
                    :label="value"
                    ></el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 20px;">
            <div class="num">
               <el-card
               :body-style="{display:'flex',padding:0}"
               v-for="item in countData"
                  :key="item.name"

               >
                  <component :is="item.icon" class="icons" :style="{background:item.color }"></component>
                  <div class="detail">
                     <p class="num">￥{{ item.value }}</p>
                     <p class="txt">￥{{ item.name }}</p>
                  </div>
               </el-card>
            </div>
            <el-card class="top-echart">
               <div ref="echart" style="height: 280px;"></div>
            </el-card>

            <div class="graph">
               <el-card>
                  <div ref="userEchart" style="height: 240px;"></div>
               </el-card>
               <el-card>
                  <div ref="videoEchart" style="height: 240px;"></div>
               </el-card>
            </div>
        </el-col>
    </el-row>
</template>

<style scoped lang="less">
  .home{
   height:100%;
   overflow:hidden;
   .user{
      display:flex;
      align-items:center;
      border-bottom:1px solid #ccc;
      margin-bottom:20px;
      img{
         width:150px;
         height:150px;
         border-radius:50%;
         margin-right:40px; 

      }
      .user-info{
         p{
            line-height:40px;
         }
         .user-info-p{
            color:#999;
         }
         .user-info-admin{
            font-size:32px
         }
      }
   }
   .login-info{
      p{
         line-height:30px;
         font-size:14px;
         color:#999;
         span{
            color:#666;
            margin-left:60px;
         }
      }
   }
   .user-table{
      margin-top:20px;
   }
   .num{
      display:flex;
      flex-wrap:wrap;
      justify-content:space-between;
      .el-card{
         width:32%;
         margin-bottom:20px;
      }
      .icons{
         width:80px;
         height:80px;
         font-size:30px;
         text-align:center;
         line-height:80px;
         color:#fff;
      }
      .detail{
         margin-left:15px;
         display:flex;
         flex-direction:column;
         justify-content:center;
         .num{
            font-size:30px;
            margin-bottom:10px
         }
         .txt{
            font-size:15px;
            text-align:center;
            color:#999;
         }
      }
   }
   .graph{
      margin-top:20px;
      display:flex;
      justify-content:space-between;
      .el-card{
         width:48%;
         height:260px;
      }
   }
  }
</style>
