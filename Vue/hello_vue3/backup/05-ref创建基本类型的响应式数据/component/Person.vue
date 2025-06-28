<template>
    <div class="person">


        <p>姓名：{{name}}</p>
        <p>性别: {{sex}}</p>
        <p>年龄: {{age}}</p>
    
        <button @click="changeName">修改姓名</button>
        <button @click="changeSex">修改性别</button>
        <button @click="changeAge">修改年龄</button>

    </div>
</template>
<!-- 这是vue的语法糖，也可以引入包 vite-plugin-vue-setup-extend -->
<script setup lang="ts"  name="Person">
import { ref } from 'vue';


    //使用ref创建基本类型的响应式数据   
    //ref相当与是refString类型，如果要改变值，只能通过value来进行操作
    let name = ref('老吴');
    let sex = ref('man');
    let age = ref(18);

    function changeName() {
        console.log(11);
        name.value = 'laoWu';
        console.log(name);
    }

    function changeAge(){
        console.log(11);
        age.value ++;
        console.log(age);
    }

    function changeSex(){
         console.log(11);
        sex.value = '男'
        console.log(sex)
    }

    
</script>



<style scoped>
    .person{
        background-color: red;
        border-radius: 10px;
        box-shadow: 0 0 10px;
        padding: 20px;
    }
    button{
        margin: 10px 10px;
    }

</style>