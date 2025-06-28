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
<script setup lang="ts"  name="Person1223">
            let name = '老吴';
            let sex = 'man';
            let age = 18;

            function changeName() {
                //name值虽然修改了，但是name不是响应式所以页面的值不会改变
                console.log(11);
                name = 'laoWu'
                console.log(name);
            }

            function changeAge(){
                //age值虽然修改了，但是name不是响应式所以页面的值不会改变
                console.log(11);
                age ++;
                console.log(age);
            }

            function changeSex(){
                //sex值虽然修改了，但是name不是响应式所以页面的值不会改变
                console.log(11);
                sex = '男'
                console.log(sex)
            }

    
</script>



<style scoped>
    .person{
        background-color: red;
        border-radius: 10px;
        padding: 20px;
    }
    button{
        margin: 10px 10px;
    }

</style>