<template>
    <div class="person">
        <h1>情况一:watch监视ref定义的基本类型数据</h1>
        <h2>sum</h2>
        <span>{{ sum }}</span>
        <button @click="sumAdd">sum+1</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
    //场景1：使用watch监听ref
   import {ref,watch} from 'vue';
   let sum = ref(0);

   function sumAdd(){
        sum.value++;
   }

   //watch监视`ref`定义的【基本类型】数据：直接写数据名即可，监视的是其`value`值的改变。
   let stopWatch = watch(sum,(newSum,oldSum)=>{
        console.log('sum发生的变化',newSum,oldSum);
        if(sum.value >= 10){
            console.log("sum值大于等于10")

            //打印watch的返回函数,其函数的返回结果是undefined
            console.log(stopWatch);
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