<template>
    <div class="person">
       
    </div>
</template>


<script setup lang="ts"  name="Person">
    
    import {type personInterface, type Persons} from '@/types'
    //对于对象类型可以使用接口来进行定义，接口强制要求对象具有特定的结构，能有效防止拼写错误或缺少字段的问题。
    let person:personInterface = {
        id:'1111111',
        name:'王巧',
        age: 18
    }

    //泛型的写法
    // let people:Array<personInterface> = [{

    // }]
    let persons:Persons =[
        {
            id:'1111111',
            name:'王巧',
            age: 18
        },
        {
            id:'11111112',
            name:'王强',
            age: 19
        },
    ]   

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