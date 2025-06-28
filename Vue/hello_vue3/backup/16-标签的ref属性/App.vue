<template>
    <!-- //用于存放html -->
     <div class="app">
        <h2 ref="web">这是web标签</h2>
        <button @click="showLog">点击打印web标签</button>
        <Person ref="ren"/>
        <button @click="test">测试</button>
     </div>
</template>

<script lang="ts" setup name="App">
  //vue3的App编写
  import { ref } from "vue";
  import Person from "./component/Person.vue";
    //编写脚本js或者ts
  let web = ref();
  function showLog(){
    console.log(web.value);
  }

  let ren = ref()

  function test(){
    console.log(ren.value.name)
    console.log(ren.value.age)
  }
  
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