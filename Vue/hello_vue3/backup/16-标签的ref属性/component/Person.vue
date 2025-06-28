<template>
    <div class="person">
        <h1>对于标签的ref属性</h1>
        <h2 ref="web">Web前端</h2>
        <h2 ref="study">学习</h2>
        <button @click="showLog">点击打印标签</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
import { ref } from 'vue';


    //在JavaScript中，通常是用DOM来获取页面元素
    //这里通过ID获取标签,但是如果父组件中如果有相同的id，则只会打印所遇见的第一个id，只打印父组件中的id
    // function showLog(){
    //     console.log(document.querySelector('#web').innerText);
    //     console.log(document.querySelector('#study').innerText);
    // }

    let web = ref();
    let study = ref();
    //使用标签的ref属性就可以解决这种情况
    function showLog() {
        console.log(web.value);
        console.log(study.value);
    }
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