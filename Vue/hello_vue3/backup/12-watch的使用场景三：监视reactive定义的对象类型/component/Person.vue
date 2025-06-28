<template>
    <div class="person">
        
        <h1>情况三:watch监视reactive定义的[对象类型]</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <button @click="changeName">改变姓名</button>
        <button @click="changeAge">改变年龄</button>
        <button @click="changeAll">改变全部</button>
        <h2>对于深度deep的测试: {{ deep.a.b.c }}</h2>
        <button @click="changeDeep">修改deep内C的值</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
import { reactive, ref, watch } from 'vue';

    //watch使用场景三：对reactive对象的监视

    let person = reactive({
        name: '张三',
        age: 18
    });

    let deep = reactive({
        a:{
            b:{
                c:1000
            }
        }
    })


    function changeName(){
        person.name += '~';
    }
    function changeAge(){
        person.age ++;
    }
    function changeAll(){
        // 这样写只是值发生了变化，地址并没有发生变化
        //assign是浅拷贝，并不会改变person的地址
        Object.assign(person,{name:'王五',age:19});
    }

    //注意: 对于reactive的监视，默认会转换成深度deep监视，是一直隐式深度转化，即使改变了deep:false 也仍然生效
    //因为对于reactive来说，改变的都仅仅是值，并没有改变对应的地址
    watch(person,(newValue,oldValue)=>{
        console.log('person发生了变化',newValue,oldValue);

    })


    function changeDeep(){
        deep.a.b.c = 10;
    }

    watch(deep,(newValue,oldValue)=>{
        console.log('deep发生了变化',newValue,oldValue);
    })
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