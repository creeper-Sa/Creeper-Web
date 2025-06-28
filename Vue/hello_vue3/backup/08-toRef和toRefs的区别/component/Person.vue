<template>
    <div class="person">
        <p>姓名：{{ uName }}</p>
        <p>年龄: {{ uAge }}</p>
        <button @click="changeName">修改姓名</button>
        <button @click="changeAge">修改年龄</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
import { ref,reactive,toRefs,toRef } from 'vue';
   //toRef和toRefs的区别

    // - 作用：将一个响应式对象中的每一个属性，转换为`ref`对象。
    // - 备注：`toRefs`与`toRef`功能一致，但`toRefs`可以批量转换。
    let person = reactive({
        name:'张珊',
        age: 18
    })

    //通过解构，得到name和age
    //注意！ 此时得到的name和age是ref对象，如果需要改变则需.value
    let {name:uName,age:uAge} = toRefs(person);
    console.log(uName,uAge);

    //通过toRef来解构
    let dl = toRef(person,'name');
    console.log(dl.value);
    function changeName() {
        uName.value = "王五";
        console.log(person.name);
        console.log(name);
    }
    function changeAge() {
        uAge.value ++;
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