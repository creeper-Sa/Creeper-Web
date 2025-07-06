<template>
    <div class="Count">
        <h2>
            SUM求和: {{ sum }} <span>最大值: {{ getMaxValue }}</span>
        </h2>
        <h2>
            学号: {{ id }}  <span>更改后的学号：{{ changeID }}</span>
        </h2>
        <h2>
            姓名: {{ name }}    <span>更改后的姓名：{{ changeName }}</span>
        </h2>
        <!-- 由于默认是字符串所以要转成数字类型 -->
        <select v-model.number="n">
            <option value="1">1</option>       
            <option value="2">2</option>       
            <option value="3">3</option>       
        </select>
        <button @click="addSum">添加</button>
        <button @click="reduce">减少</button>
    </div>
</template>
<script setup lang="ts" name="Count">
import { useCountStore } from '@/store/count';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

    //使用useCountStore
    const countStore = useCountStore();
    //使用storeToRefs也可以获取store中存储的数据
    const {sum,id,name,getMaxValue,changeID,changeName} = storeToRefs(countStore);

    
    let n = ref(1);

    function addSum(){
        //第一种修改方式
        // countStore.sum += n.value;
        // countStore.id = 1111111
        // countStore.name = 'bia'

        //第二种修改方式 使用$path
        // countStore.$patch({
        //     sum: n.value,
        //     id: 12345,
        //     name:'1'
        // })

        //第三种修改方式,通过action完成
        //直接进行调用也可以
        countStore.increaseCount(n.value);
    }

    function reduce(){
        countStore.sum -= n.value;
    }
</script>
<style scoped>
    .Count {
        margin: 0 auto;
        width: 500px;
        background-color: skyblue;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px;
    }

    select, button {
        margin: 0 5px;
        height: 25px;
    }
</style>