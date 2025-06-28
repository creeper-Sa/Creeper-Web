<template>
    <div class="person">
        <h1>watchEffect的作用</h1>
        <h2>水位:{{ height }}</h2>
        <h2>温度:{{ temp }}</h2>
        <button @click="changeHeight">水位+10</button>
        <button @click="changeTemp">温度+10</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
import { h, ref, watchEffect } from 'vue';


    // watch`对比`watchEffect`

    // 1. 都能监听响应式数据的变化，不同的是监听数据变化的方式不同
    // 2. `watch`：要明确指出监视的数据
    // 3. `watchEffect`：不用明确指出监视的数据（函数中用到哪些属性，那就监视哪些属性）。
    let height  = ref(0);
    let temp = ref(0);

    function changeHeight(){
        height.value += 10;
    }
    function changeTemp(){
        temp.value += 10;
    }
 
    //watchEffect的写法
    const stopWatch = watchEffect(()=>{
       // 室温达到50℃，或水位达到20cm，立刻联系服务器
        if(temp.value >= 50 || height.value >= 20){
            console.log('联系服务器');
        }
        // 水温达到100，或水位达到50，取消监视
        if(temp.value === 100 || height.value === 50){
            console.log('清理了');
            stopWatch();
        }
    })

</script>



<style scoped>
    .person{
        background-color: skyblue;
        border-radius: 10px;
        box-shadow: 0 0 10px;
        padding: 20px;
        font-size: 20px;
    }
    button{
        margin: 10px 10px;
        font-size: 20px;
    }

</style>