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
        <div>{{ nu.a.b.c }}</div>
        <button @click="test">测试</button>
    </div>
</template>

<script setup lang="ts"  name="Person">
import { reactive } from 'vue';
    //reactive创建对象的响应式
    // 一个`Proxy`的实例对象，简称：响应式对象。
    // 而且是`reactive`定义的响应式数据是“深层次”的
    let car = reactive({
        name:'奔驰',
        producePlace:'本田'
        
    }
    )

    function changeCar(){
        car.name = '宝马';
        car.producePlace = '宝马';
    }
    //响应对象
    let games = reactive([
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


    function changeGame(){
        games[0].name = "MRFZ";
        console.log(games[0].name);
    }

    //深层式的响应数据
    let nu = reactive({
        a:{
            b:{
                c:'111111'
            }
        }
    })

    function test(){
        nu.a.b.c = '1111111111111111';
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