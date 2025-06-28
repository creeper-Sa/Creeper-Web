<template>
    <div class="person">
       <ul>
            <li v-for="person in list" :key="person.id">
                {{ person.id }} -- {{ person.name }} -- {{ person.age }}
            </li>
       </ul>
    </div>
</template>


<script setup lang="ts"  name="Person">
import type { Persons } from '@/types';

    //想要接收到父组件中的值需要用

    //仅仅只作用于传参
    // defineProps(['list']);

    // //接受传参，但是限制类型
    // const props = defineProps<{list:Persons}>();
    // //这样写可以有类型提示
    // console.log(props.list);

    //接受传参，限制类型，设置默认值, 限制必要性
    const props = withDefaults(defineProps<{list?:Persons}>(),{
        //数组和对象都是引用类型
        //因为对象或数组作为默认值时，必须写成“返回对象/数组的函数”，否则会导致多个组件实例共享同一个引用
        list:()=>[
            {
            id:'1001',
            name:'王小桃',
            age:18
            }]
    })
    console.log(props.list);
    


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