<template>
    <div class="Talk">
        <button @click="getLoveTalk">获取一点土味情话</button>
        <ul>
            <li v-for="talk in talkList" :key="talk.id">
                {{ talk.text }}
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" name="LoveTalk">
import axios from 'axios';
import { nanoid } from 'nanoid';
import { reactive } from 'vue';
import { useLoveTalkStore } from '@/store/loveTalk';
import { storeToRefs } from 'pinia';
//获取store
const talkStore = useLoveTalkStore();

const {talkList} = storeToRefs(talkStore);

async function getLoveTalk() {
    talkStore.addTalk();

}
//通过 store 的 `$subscribe()` 方法侦听 `state` 及其变化
    talkStore.$subscribe((mutate,state)=>{
        console.log('LoveTalk',mutate,state);
        localStorage.setItem('loveTalk',JSON.stringify(state.talkList));
    })


</script>


<style scoped>
    .Talk {
        margin: 50px auto;
        width: 400px;
        background-color: rebeccapurple;
        padding: 10px;
        border-radius: 10px;
        box-shadow: 0 0 10px;
    }
</style>