<template>
    <div class="person">
        
        <h1>情况四:watch监视[对象类型]数据中的某个属性</h1>
        <h2>姓名:{{ person.name }}</h2>
        <h2>年龄:{{ person.age }}</h2>
        <button @click="changeName">改变姓名</button>
        <button @click="changeAge">改变年龄</button>
        <h2>汽车:{{ person.car.c1 }} {{ person.car.c2 }}</h2>
        <button @click="changeCar1">修改汽车1</button>
        <button @click="changeCar2">修改汽车2</button>
         <button @click="changeCar12">修改汽车1,2</button>

    </div>
</template>


<script setup lang="ts"  name="Person">
import { reactive, ref, watch } from 'vue';

    //watch使用场景三：对reactive对象的监视

    let person = reactive({
        name: '张三',
        age: 18,
        car:{
            c1:'AE86',
            c2:'AUV'
        }
    });



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

    function changeCar1(){
        person.car.c1 = 'GPC'
    }
    function changeCar2(){
        person.car.c2 = 'ABC'
    }
    function changeCar12(){
        person.car = {c1:'奔驰',c2:'本田'};
    }

    //对于对象类型数据中的基本数据类
    //若该属性值不是【对象类型】，需要写成函数形式
    // watch(()=>person.name,(newValue,oldValue)=>{
    //     console.log('person中的name发生了变化',newValue,oldValue);
    // })

    // 若该属性值是**依然**是【对象类型】，可直接编，也可写成函数，建议写成函数
    // 结论：监视的要是对象里的属性，那么最好写函数式，注意点：若是对象监视的是地址值，需要关注对象内部，需要手动开启深度监视。
    watch(()=>person.car,(newValue,oldValue)=>{
        console.log('person中的car发生了变化',newValue,oldValue);
    },{deep:true})

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