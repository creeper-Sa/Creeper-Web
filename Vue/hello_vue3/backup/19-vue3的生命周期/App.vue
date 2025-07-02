<template>
    <!-- //用于存放html -->
     <div class="app">
      <!-- v-if 相当于 条件渲染（真的加/移除 DOM） -->
      <!-- v-show 是 控制显示（切换 display: none） -->
       <Person v-if="isShow"></Person>
     </div>
</template>

<script lang="ts" setup name="App">
  //vue3的App编写
  import { reactive, ref } from "vue";
  import Person from "./component/Person.vue";
  let isShow = ref(true);
  
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