<template>
    <div class="person">
        <p>汽车信息</p>
        <p>名称:{{ car.name }}</p>
        <p>厂商:{{ car.producePlace }}</p>
        <button @click="changeCar">改变车</button>
        <div>
            游戏列表:
            <ul>
                <!-- v-for是vue里面的一种循环, 语法: v-for"(item,index) in source" :key="key" -->
                <li v-for="game in games" :key="game.id">{{ game.id }} - {{ game.name }} </li>
            </ul>
        </div>
        <button @click="changeGame">改变第一个游戏名称</button>
       
    </div>
</template>

<script setup lang="ts"  name="Person">
import { ref,reactive } from 'vue';
    //ref创建响应式对象

    //ref的代码基础层还是reactive
    //通过proxy转化成object对象
        // 使用原则：

    //  1. 若需要一个基本类型的响应式数据，必须使用`ref`。
    //  2. 若需要一个响应式对象，层级不深，`ref`、`reactive`都可以。
    //  3. 若需要一个响应式对象，且层级较深，推荐使用`reactive`。
    // 对于ref创建的响应式对象，可以直接赋值覆盖原先数据
    // 对于reactive创建的响应式对象，需要通过Object.assign(obj1,obj2)进行浅拷贝操作才能改变值
    let car = ref({
        name:'奔驰',
        producePlace:'本田'
        
    }
    )

    function changeCar(){
        car.value.name = '宝马';
        car.value.producePlace = '宝马';
    }
    //响应对象
    let games = ref([
        {
            id:"1",
            name:'原神'
        },
        {
            id:"2",
            name:'SZB'
        },
                {
            id:"3",
            name:'BA'
        }
    ])

    //想要访问对象需要先通过value值找
    function changeGame(){
        games.value[0].name = "MRFZ";
        console.log(games.value[0]);
        
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