<template>
    <div class="app">
      <Header/>
      <!-- 导航区 -->
      <div class="navigate">
        <!-- 使用RouterLink to 来进行定向导航, 使用active-class激活属性来设置激活状态 -->
        <!-- 2种写法，字符串写法，还有对象写法 -->
        <RouterLink to="/home" active-class="active">首页</RouterLink>
        <RouterLink :to="{name:'xinwen'}" active-class="active">新闻</RouterLink>
        <RouterLink :to="{path:'/about'}" active-class="active">关于</RouterLink>
      </div>
      <!-- 展示区 -->
      <div class="main-content">
        <RouterView></RouterView>
      </div>
  </div>
</template>

<script lang="ts">
    // - 路由组件通常存放在`pages` 或 `views`文件夹，一般组件通常存放在`components`文件夹。
  
    // - 通过点击导航，视觉效果上“消失” 了的路由组件，默认是被**卸载**掉的，需要的时候再去**挂载**。
    // js或者ts
    import {RouterView,RouterLink} from 'vue-router'
    import Header from './components/Header.vue';
    export default {
        name:'App', //组件名
        components:{
          Header
        }
    }
</script>

<style>
    /* CSS */
  .title {
    text-align: center;
    word-spacing: 5px;
    margin: 30px 0;
    height: 70px;
    line-height: 70px;
    background-image: linear-gradient(45deg, rgb(202, 116, 29), white);
    border-radius: 10px;
    box-shadow: 0 0 2px;
    font-size: 30px;
  }
  .navigate {
    display: flex;
    justify-content: space-around;
    margin: 0 100px;
  }
  .navigate a {
    display: block;
    text-align: center;
    width: 90px;
    height: 40px;
    line-height: 40px;
    border-radius: 10px;
    background-color: gray;
    text-decoration: none;
    color: white;
    font-size: 18px;
    letter-spacing: 2px;
  }
  .navigate a.active {
    background-color: #64967E;
    color: #ffc268;
    font-weight: 900;
    text-shadow: 0 0 1px black;
    font-family: 微软雅黑;
  }
  .main-content {
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 10px;
    width: 90%;
    height: 400px;
    border: 1px solid;
  }
</style>