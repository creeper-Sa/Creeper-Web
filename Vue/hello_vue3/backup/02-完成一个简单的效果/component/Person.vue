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

<script lang="ts">
    export default {
        //VUE2中的写法，通过OPtions Api 的方式完成
        name:'Person',
        data(){
            return {
                name : '张三',
                sex : '男',
                age : 18
            }
        },
        methods: {
            changeName(){
                this.name = '王五';
            },
            changeSex(){
                this.sex = '女';
            },
            changeAge(){
                this.age ++;
            },
        }
    }

</script>


<style scoped>
    .person{
        background-color: red;
        border-radius: 10px;
        padding: 20px;
    }

</style>