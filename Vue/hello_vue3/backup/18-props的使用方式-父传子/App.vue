<template>
    <!-- //用于存放html -->
     <div class="app">
       <Person :list="person"></Person>
     </div>
</template>

<script lang="ts" setup name="App">
  //vue3的App编写
  import { reactive } from "vue";
  import Person from "./component/Person.vue";
  import type { Persons } from "./types";
  //【props】从父组件传值回去


  let person = reactive<Persons>([
    {
      id:'1001',
      name:'王小桃',
      age:18
    },
    {
      id:'1002',
      name:'王小绿',
      age:18
    },
    {
      id:'1002',
      name:'柚子',
      age:18
    }
  ])

  
</script>

<style scoped>
    /* 用于存放样式格式 */

    .app{
        background-color: powderblue;
        border-radius: 10px;
        box-shadow: 0 0 10px;
        padding: 20px;
    }
    button {
      margin-bottom: 20px;
    }
</style>