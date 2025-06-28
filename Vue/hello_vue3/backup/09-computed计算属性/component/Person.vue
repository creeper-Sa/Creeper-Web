<template>
    <div class="person">
        姓: <input type="text" v-model="person.firstName"> <br/>
        名: <input type="text" v-model="person.lastName"> <br/>
        全名: <span>{{ fullName }}</span><br/>
        <button @click="changeFullName">修改全名</button>
    </div>
</template>


<script setup lang="ts"  name="Person">
    import {ref,reactive,computed} from 'vue'
    //计算属性computed
    //这里用的是reactive响应式，如果用ref响应式则会出现person.age无法修改的问题
    let person = reactive({
        firstName: 'zhang',
        lastName: 'san'
    })

    // console.log(person.firstName);
    //实现计算属性computed
    //基本操作属于只读，不可修改
    // let fullName = computed(()=>{
    //     return person.firstName + '-' + person.lastName;
    // })

    //可以修改的写法,要使用set和get方法

    let fullName = computed({
        get(){
            console.log(person.firstName.slice(0,1).toUpperCase()+person.firstName.slice(1))
            return person.firstName.slice(0,1).toUpperCase() + person.firstName.slice(1) + '-' + person.lastName
        },
        //触发式响应，如果要求原值修改，则会调用set，然后再调用get根据最新的响应式数据计算并返回值；
        //如果原值不被修改，那么只会调用一次，并将值存入缓存中
        set(val){
            //返回是数组，所以需要用数组接受
            console.log('有人修改了全名',val);
            const parts = val.split('-')
            person.firstName = parts[0]
            person.lastName = parts[1]
            
        }
    })


    function changeFullName(){
        fullName.value = 'li-si'
    }
    console.log(fullName);
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