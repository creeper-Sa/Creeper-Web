import { createRouter,createWebHashHistory } from "vue-router";


//制定路由
const routes = [
    {
        path:'/',
        name:'main',
        component:()=>import('@/views/Main.vue'),
        redirect:'/home',
        children:[
            {
                path:'home',
                name:'home',
                component:()=>import('@/views/Home.vue')
            },
            {
                path:'user',
                name:'user',
                component:()=>import('@/views/User.vue')
            }
        ]
    },
];
//创建路由器
const router = createRouter({
    history:createWebHashHistory(),
    routes,
});

//暴露路由器
export default router;