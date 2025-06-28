<template>
    <!-- //用于存放html -->
     <div class="app">
       
       <Person></Person>
     </div>
</template>

<script lang="ts">
  
  import Person from "./component/Person.vue";
    //编写脚本js或者ts
  export default {
    name:'App', //组件名
    components:{Person}
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
</style>