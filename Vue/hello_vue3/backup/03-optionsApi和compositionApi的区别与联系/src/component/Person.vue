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

        //vue2的写法Options API 
        // name:'Person',
        // data(){
        //     return {
        //         name : '张三',
        //         sex : '男',
        //         age : 18
        //     }
        // },
        // methods: {
        //     changeName(){
        //         this.name = '王五';
        //     },
        //     changeSex(){
        //         this.sex = '女';
        //     },
        //     changeAge(){
        //         this.age ++;
        //     },
        // }

        //vue3的写法Composition Api
        //`setup`函数会在`beforeCreate`之前调用，它是“领先”所有钩子执行的。
        // setup函数中的this指针，指向的undefined属性
        //setup`函数返回的对象中的内容，可直接在模板中使用
        //setup 可以与vue2的Options API  API共存，但是vue2的Options API 无法调用setup中的内容
        name:'Person',
        beforeCreate(){
            console.log('beforeCreate');
            
        },
        setup(){
            let uname = '老吴';
            let sex = 'man';
            let age = 18;

            function changeName() {
                //name值虽然修改了，但是name不是响应式所以页面的值不会改变
                console.log(11);
                uname = 'laoWu'
                console.log(uname);
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

            return {name:uname,sex,age,changeName,changeSex,changeAge}
        }
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