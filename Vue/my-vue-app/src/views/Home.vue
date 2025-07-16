<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';




const getImageUrl = (user:string)=> new URL(`../assets/images/${user}.png`,import.meta.url).href;
const tableData = ref([
    {
      name: "Java",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    },
    {
      name: "Python",
      todayBuy: 100,
      monthBuy: 200,
      totalBuy: 300,
    }
])

const tableLabel = ref({
    name: "课程",
    todayBuy: "今日购买",
    monthBuy: "本月购买",
    totalBuy: "总购买",
})

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

const getTableData = async () =>{
   const data = await proxy?.$api.getTableData();
   tableData.value = data.tableData;
   console.log(data);
}
onMounted(()=>{
   getTableData();
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
