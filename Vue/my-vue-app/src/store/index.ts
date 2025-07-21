import { MenuItem } from '@/interface/Interface';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { RouteRecordRaw } from 'vue-router';
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
    menuList:[],
    token:'',
    routerList:[] as RouteRecordRaw[],
};
}

export const useAllDataStore = defineStore('allData',()=>{
    const state = ref(initState());

    watch(state,(newObj)=>{
        if(!newObj.token ) return
        localStorage.setItem("store",JSON.stringify(newObj));
      },
      { deep: true}
    )


    function selectMenu(item:any){
        if(item.name === 'home'){
            state.value.currentMenu = null;
        }
        else{
              state.value.currentMenu = item;
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

    function updateMenuList(item:any){
        state.value.menuList = item;
    }

    function addMenu(router: any,type:string) {
        console.log(state.value)
        //持续保存在浏览器中
        if (type === 'refresh') {
            const storeStr = localStorage.getItem('store');
            if (storeStr) {
                Object.assign(state.value, JSON.parse(storeStr));
                state.value.routerList = [];

                console.log(storeStr)
            } 
            else {
                return;
            }
        }

        const menu = state.value.menuList as MenuItem[];
        const modules = import.meta.glob('../views/**/*.vue');
        const routeArr: any[] = [];

        menu.forEach(item => {
            if (item.children && Array.isArray(item.children)) {
                item.children.forEach(val => {
                    const path = `../views/${val.url}.vue`;
                    if (modules[path]) {
                        val.component = () => modules[path]();
                    } else {
                        console.warn(`模块未找到: ${path}`);
                    }
                });
                routeArr.push(...item.children);
            } else {
                const path = `../views/${item.url}.vue`;
                if (modules[path]) {
                    item.component = () => modules[path]();
                } else {
                    console.warn(`模块未找到: ${path}`);
                }
                routeArr.push(item);
            }
        });

        let routers = router.getRoutes()
        routers.forEach((item:any)=>{
        if(item.name =='main' || item.name == 'login' || item.name == '404'){
            return
        }
        else{
            router.removeRoute(item.name);
        }
        })
        routeArr.forEach(item=>{
            state.value.routerList.push(router.addRoute("main",item))
        })
    }

    function clean(){
        state.value.routerList.forEach((item:any)=>{
        if(item) item();
        })
            state.value = initState();
            //删除本地缓存
            localStorage.removeItem("store")
    }

    return {
        state,
        selectMenu,
        updataTags,
        updateMenuList,
        addMenu,
        clean,
    };
});











