<template>
    <div class="person">
        
        <h1>情况二:watch监视ref定义的[对象类型]</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <button @click="changeName">改变姓名</button>
        <button @click="changeAge">改变年龄</button>
        <button @click="changeAll">改变全部</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
import { ref, watch } from 'vue';

    //watch使用场景二：对ref对象的监视，但是只会监视ref对象地址，如果想要监视ref对象的内部值，需要添加属性 {deep:true}，才能监视其中的值变换

    let person = ref({
        name: '张三',
        age: 18
    });


    function changeName(){
        person.value.name += '~';
    }
    function changeAge(){
        person.value.age ++;
    }
    function changeAll(){
        // 这样写只是值发生了变化，地址并没有发生变化
        // person.value.name = '王五';
        // person.value.age ++;
        person.value = {
            name: '王五',
            age: 19
        }
    }

    //不进行deep监视，只有在地址发生变化的时候触发
    // watch(person,(newValue,oldValue)=>{
    //     console.log('person发生了改变',newValue,oldValue);
    // })


    //想要监视内部的数据，需要deep监视,immediate属性表示是否立即执行——无论person是否发生了改变
    //有时候 newValue和oldValue的结果一样
    //原因: 如果对象“引用”没有变，而是“内部属性”发生了变化，那么 newValue 和 oldValue 是同一个引用，因为 Vue 默认不会对它们做深拷贝，而是传引用。
    // deep: true 的意思是递归追踪对象内部的变化，但它不会做深拷贝来记录 oldValue 的快照，而只是“继续用原对象”。

    watch(person,(newValue,oldValue)=>{
        console.log('person发生了改变',newValue,oldValue);
    },{deep:true,immediate:true});
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