<template>
    <!-- //用于存放html -->
     <div class="app">
       <Person/>
     </div>
</template>

<script lang="ts" setup name="App">
import Person from './component/Person.vue';



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