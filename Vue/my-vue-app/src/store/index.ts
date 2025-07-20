import { defineStore } from 'pinia';
import { ref } from 'vue';
function initState(){
   return { 
    isCollapse:false,
    tags:[{
        path:'/home',
        name:'home',
        label:'首页',
        icon:'home'
    }],
    currentMenu:null,

};
}




export const useAllDataStore = defineStore('allData',()=>{
    const state = ref(initState());

    function selectMenu(item:any){
        if(item.name === 'home'){
            state.value.currentMenu = null;
        }
        else{
            //找到所选择的路由
            let index = state.value.tags.findIndex(index=> index.name === item.name);
            index === -1 ? state.value.tags.push(item) : '';
        }
    }
    //更新标签(close)
    function updataTags(tag:any){
        //找到要关闭的标签的name，再从标签中删除
        let index = state.value.tags.findIndex(item=>item.name === tag.name);
        state.value.tags.splice(index,1);
    }
    return {
        state,
        selectMenu,
        updataTags,
    };
});











