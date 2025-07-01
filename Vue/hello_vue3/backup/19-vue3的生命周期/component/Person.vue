<template>
    <h2>vue3的生命周期</h2>
    <h2>sum: {{ sum }}</h2>
    <button @click="add">sum+1</button>
</template>


<script setup lang="ts"  name="Person">
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated, ref } from 'vue';

    //生命周期的创建
    //对于vue3来说，
    //- Vue3`的生命周期
  
//   创建阶段：`setup`    
//   挂载阶段：`onBeforeMount`、`onMounted`
//   更新阶段：`onBeforeUpdate`、`onUpdated`
//   卸载阶段：`onBeforeUnmount`、`onUnmounted`
//   常用的钩子：`onMounted`(挂载完毕)、`onUpdated`(更新完毕)、`onBeforeUnmount`(卸载之前)

    let sum = ref(0);

    function add(){
        sum.value += 1;
    }

    //VUE3中的创建过程是在setup中就执行了，所以直接console打印就行了
    console.log('创建完毕')

    //调用生命函数的时候需要用匿名函数来调用所需的函数
    onBeforeMount(()=>{
        console.log('挂载前!')
    })

    onMounted(()=>{
        console.log('挂载完毕!')
    })

    onBeforeUpdate(()=>{
        console.log('更新之前!')
    })
    onUpdated(()=>{
        console.log('更新完毕!')
    })

    //vue3中的销毁相当于取消挂载
    onBeforeUnmount(()=>{
        console.log('销毁之前!')
    })

    onUnmounted(()=>{
        console.log('销毁完毕!')
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