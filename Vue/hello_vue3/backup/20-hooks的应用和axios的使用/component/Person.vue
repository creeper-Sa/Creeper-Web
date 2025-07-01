<template>
    <h2>sum求和 : {{ sum }}</h2>
    <button @click="add">sum+1</button>
    <hr>
    <img v-for="(dog,index) in dogList" :src="dog" :key="index">
    <br>
    <button @click="addDog">点击再添加一个狗</button>
</template>


<script setup lang="ts"  name="Person">
//- 什么是`hook`？—— 本质是一个函数，把`setup`函数中使用的`Composition API`进行了封装，类似于`vue2.x`中的`mixin`。
  
// - 自定义`hook`的优势：复用代码, 让`setup`中的逻辑更清楚易懂

import useDog from '@/hooks/useDog';
import useSum from '@/hooks/useSum';


const {sum,add} = useSum();
const {dogList,addDog} = useDog();


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

    img {
        height: 440px;
        margin-right: 10px;
    }

</style>