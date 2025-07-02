<template>
    <!-- 导航区 -->
     <div class="box">

         <div class="news">
             <ul>
                 <li v-for="news in newsList" :key='news.id'>
                    <!-- 第一种写法 -->
                    <!-- <RouterLink :to="`/news/detail?id=${news.id}&title=${news.title}&content=${news.content}`">{{ news.title }}</RouterLink> -->

                    <!-- 第二种写法 -->
                    <RouterLink 
                        :to="{
                            //query传参也可以使用name来找路由路径
                            path:'/news/detail',
                            query:{
                                id:news.id,
                                title:news.title,
                                content:news.content
                            }
                        }"
                    >
                        {{ news.title }}
                    </RouterLink>
                 </li>
             </ul>
         </div>   
         
         <!-- 展示区 -->
         <div class="news-content">
             <router-view></router-view>
         </div>

     </div>
</template>



<script setup lang="ts" name="News">
import { reactive } from 'vue';
import { RouterLink } from 'vue-router';

    

    const newsList = reactive([
        {id:'1001',title:'华山论剑1',content:'鼻窦大赛1'},
        {id:'1002',title:'华山论剑2',content:'鼻窦大赛2'},
        {id:'1003',title:'华山论剑3',content:'鼻窦大赛3'},
        {id:'1004',title:'华山论剑4',content:'鼻窦大赛4'},
        
    ])
    
</script>

<style scoped>
/* 整体页面布局 */
.box {
  display: flex;
  height: 100vh;
  background: #f4f6f8;
  font-family: "Segoe UI", "微软雅黑", sans-serif;
}

/* 左侧新闻列表区域 */
.news {
  width: 280px;
  min-width: 220px;
  background: #ffffff;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.05);
}

.news h2 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.news ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.news li {
  margin-bottom: 15px;
}

.news a {
  display: block;
  padding: 10px 15px;
  border-radius: 6px;
  text-decoration: none;
  color: #444;
  background-color: #f7f9fa;
  transition: all 0.3s ease;
  font-size: 16px;
  border: 1px solid transparent;
}

.news a:hover {
  background-color: #409eff;
  color: #fff;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
  border-color: #409eff;
}

/* 右侧详情展示区域 */
.news-content {
  flex: 1;
  padding: 30px;
  background-color: #fff;
  overflow-y: auto;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.04);
}

/* Detail 页面内部样式 */
.news-list ul {
  list-style: none;
  padding: 0;
}

.news-list li {
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
  line-height: 1.8;
}

.news-list li span {
  font-weight: bold;
  color: #409eff;
}

/* 通用按钮样式 */
button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #409eff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #66b1ff;
}

</style>
