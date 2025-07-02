<template>
    <div class="home">
        <h1>Home过3秒自动跳转到NEWS</h1>
    </div>      
</template>



<script setup lang="ts" name="Home">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
    //获取路由器
    const router = useRouter(); 
    //直接对路由器的路径进行push，加入要跳转的url，是最简单的一种写法
    // onMounted(()=>{
    //     setInterval(()=>{
    //         router.push('/news');
    //     },3000)
    // })
</script>

<style>
    /* css */
    .home {
        background-color: skyblue;
        box-shadow: 0 0 10px;
        border-radius: 10px;
        padding: 20px;
    }
    button {
        margin: 5px;
    }
    img {
        height: 100px;
        margin: 5px;
    }
</style>